import * as React from 'react';



interface PaneProps {
    vertical: boolean;
    primary: boolean;
    size: number;
    percentage: boolean;
    children: React.ReactNode;
}

export default class Pane extends React.Component<PaneProps> {
    static defaultProps: PaneProps = {
        vertical: false,
        primary: false,
        size: 0,
        percentage: false,
        children: []
    };
    render() {
        var props = this.props;
        const size = props.size || 0;
        const unit = props.percentage ? '%' : 'px';
        let classes = 'layout-pane';
        const style: React.CSSProperties = {};
        if (!props.primary) {
            if (props.vertical) {
                style.height = `${size}${unit}`;
            } else {
                style.width = `${size}${unit}`;
            }
        } else {
            classes += ' layout-pane-primary';
        }
        return (
            <div className={classes} style={style}>{props.children}</div>
        );
    }
}
