import * as React from 'react';
import Pane from './Pane';
import './Splitter.css';

function clearSelection() {
    if (window.getSelection) {
        if (window.getSelection().empty) {
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {
            window.getSelection().removeAllRanges();
        }
    } else if ((document as any).selection) {
        (document as any).selection.empty();
    }
}

const DEFAULT_SPLITTER_SIZE = 4;

export interface SplitterLayoutProps {
    customClassName?: string;
    vertical?: boolean;
    percentage?: boolean;
    primaryIndex?: number;
    primaryMinSize?: number;
    secondaryInitialSize?: number;
    secondaryMinSize?: number;
    onDragStart?: () => void;
    onDragEnd?: () => void;
    onSecondaryPaneSizeChange?: (secondaryPaneSize: number) => void;
    children: React.ReactNode;
};

export interface SplitterLayoutState {
    secondaryPaneSize: number;
    resizing: boolean;
    containerRect?: ClientRect;
}

export default class SplitterLayout extends React.Component<SplitterLayoutProps, SplitterLayoutState> {

    static defaultProps: SplitterLayoutProps = {
        customClassName: '',
        vertical: false,
        percentage: false,
        primaryIndex: 0,
        primaryMinSize: 0,
        secondaryInitialSize: undefined,
        secondaryMinSize: 0,
        onDragStart: undefined,
        onDragEnd: undefined,
        onSecondaryPaneSizeChange: undefined,
        children: []
    };

    constructor(props: SplitterLayoutProps) {
        super(props);
        this.state = {
            secondaryPaneSize: 0,
            resizing: false,
            containerRect: undefined
        };
    }

    container?: HTMLDivElement | null;
    splitter?: HTMLDivElement | null;

    componentDidMount() {
        window.addEventListener('resize', this.handleResize);
        document.addEventListener('mouseup', this.handleMouseUp);
        document.addEventListener('mousemove', this.handleMouseMove);

        let containerRect: ClientRect | undefined;
        let secondaryPaneSize: number | undefined;
        if (typeof this.props.secondaryInitialSize !== 'undefined') {
            secondaryPaneSize = this.props.secondaryInitialSize;
        } else {
            containerRect = this.container!.getBoundingClientRect();
            let splitterRect;
            if (this.splitter) {
                splitterRect = this.splitter.getBoundingClientRect();
            } else {
                // Simulate a splitter
                splitterRect = { width: DEFAULT_SPLITTER_SIZE, height: DEFAULT_SPLITTER_SIZE };
            }
            secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: containerRect.left + ((containerRect.width - splitterRect.width) / 2),
                top: containerRect.top + ((containerRect.height - splitterRect.height) / 2)
            }, false);

        }
        this.setState({ secondaryPaneSize, containerRect });
    }

    componentDidUpdate(prevProps: SplitterLayoutProps, prevState: SplitterLayoutState) {
        if (prevState.secondaryPaneSize !== this.state.secondaryPaneSize && this.props.onSecondaryPaneSizeChange) {
            this.props.onSecondaryPaneSizeChange(this.state.secondaryPaneSize);
        }
        if (prevState.resizing !== this.state.resizing) {
            if (this.state.resizing) {
                if (this.props.onDragStart) {
                    this.props.onDragStart();
                }
            } else if (this.props.onDragEnd) {
                this.props.onDragEnd();
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('mouseup', this.handleMouseUp);
        document.removeEventListener('mousemove', this.handleMouseMove);
    }

    getSecondaryPaneSize(containerRect: ClientRect, splitterRect: {width: number, height: number}, clientPosition: { left: number, top: number }, offsetMouse: boolean) {
        let totalSize;
        let splitterSize;
        let offset;
        if (this.props.vertical) {
            totalSize = containerRect.height;
            splitterSize = splitterRect.height;
            offset = clientPosition.top - containerRect.top;
        } else {
            totalSize = containerRect.width;
            splitterSize = splitterRect.width;
            offset = clientPosition.left - containerRect.left;
        }
        if (offsetMouse) {
            offset -= splitterSize / 2;
        }
        if (offset < 0) {
            offset = 0;
        } else if (offset > totalSize - splitterSize) {
            offset = totalSize - splitterSize;
        }

        let secondaryPaneSize;
        if (this.props.primaryIndex === 1) {
            secondaryPaneSize = offset;
        } else {
            secondaryPaneSize = totalSize - splitterSize - offset;
        }
        let primaryPaneSize = totalSize - splitterSize - secondaryPaneSize;
        if (this.props.percentage) {
            secondaryPaneSize = (secondaryPaneSize * 100) / totalSize;
            primaryPaneSize = (primaryPaneSize * 100) / totalSize;
            splitterSize = (splitterSize * 100) / totalSize;
            totalSize = 100;
        }

        if (primaryPaneSize < this.props.primaryMinSize!) {
            secondaryPaneSize = Math.max(secondaryPaneSize - (this.props.primaryMinSize! - primaryPaneSize), 0);
        } else if (secondaryPaneSize < this.props.secondaryMinSize!) {
            secondaryPaneSize = Math.min(totalSize - splitterSize - this.props.primaryMinSize!, this.props.secondaryMinSize!);
        }

        return secondaryPaneSize;
    }

    handleResize = () => {
        if (this.splitter && !this.props.percentage) {
            const containerRect = this.container!.getBoundingClientRect();
            const splitterRect = this.splitter.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: splitterRect.left,
                top: splitterRect.top
            }, false);
            this.setState({ secondaryPaneSize });
        }
    }

    handleMouseMove = (e: MouseEvent) => {
        if (this.state.resizing) {
            const containerRect = this.container!.getBoundingClientRect();
            const splitterRect = this.splitter!.getBoundingClientRect();
            const secondaryPaneSize = this.getSecondaryPaneSize(containerRect, splitterRect, {
                left: e.clientX,
                top: e.clientY
            }, true);
            clearSelection();
            this.setState({ secondaryPaneSize });
        }
    }

    handleSplitterMouseDown = () => {
        clearSelection();
        this.setState({ resizing: true });
    }

    handleMouseUp = () => {
        this.setState({ resizing: false });
    }

    render() {
        let containerClasses = 'splitter-layout';
        if (this.props.customClassName) {
            containerClasses += ` ${this.props.customClassName}`;
        }
        if (this.props.vertical) {
            containerClasses += ' splitter-layout-vertical';
        }
        if (this.state.resizing) {
            containerClasses += ' layout-changing';
        }

        const children = React.Children.toArray(this.props.children).slice(0, 2);
        if (children.length === 0) {
            children.push(<div />);
        }
        const wrappedChildren = [];
        const primaryIndex = (this.props.primaryIndex !== 0 && this.props.primaryIndex !== 1) ? 0 : this.props.primaryIndex;
        for (let i = 0; i < children.length; ++i) {
            let primary = true;
            let size = null;
            if (children.length > 1 && i !== primaryIndex) {
                primary = false;
                size = this.state.secondaryPaneSize;
            }
            wrappedChildren.push(
                <Pane vertical={this.props.vertical!} percentage={this.props.percentage!} primary={primary} size={size!}>
                    {children[i]}
                </Pane>
            );
        }

        return (
            <div style={this.state.containerRect && { height: this.state.containerRect.height + "px" }}>
                <div className={containerClasses} ref={(c) => { this.container = c; }}>
                    {wrappedChildren[0]}
                    {wrappedChildren.length > 1 &&
                        <div
                            role="separator"
                            className="layout-splitter"
                            ref={(c) => { this.splitter = c; }}
                            onMouseDown={this.handleSplitterMouseDown}
                        />
                    }
                    {wrappedChildren.length > 1 && wrappedChildren[1]}
                </div>
            </div>
        );
    }
}

