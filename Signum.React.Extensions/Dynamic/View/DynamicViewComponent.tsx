﻿import * as React from 'react'
import { FormGroup, FormControlStatic, ValueLine, ValueLineType, EntityLine, EntityCombo, EntityList, EntityRepeater } from '../../../../Framework/Signum.React/Scripts/Lines'
import { ModifiableEntity } from '../../../../Framework/Signum.React/Scripts/Signum.Entities'
import { classes } from '../../../../Framework/Signum.React/Scripts/Globals'
import * as Finder from '../../../../Framework/Signum.React/Scripts/Finder'
import { FindOptions } from '../../../../Framework/Signum.React/Scripts/FindOptions'
import { getQueryNiceName } from '../../../../Framework/Signum.React/Scripts/Reflection'
import * as Navigator from '../../../../Framework/Signum.React/Scripts/Navigator'
import { TypeContext, FormGroupStyle } from '../../../../Framework/Signum.React/Scripts/TypeContext'
import { DesignerContext, BaseNode } from './Nodes'
import * as Nodes from './Nodes'
import { DynamicViewInspector } from './Designer'
import { DynamicViewTree } from './DynamicViewTree'
import { DynamicViewEntity } from '../Signum.Entities.Dynamic'

require("!style!css!./DynamicView.css");

export interface DynamicViewComponentProps {
    ctx: TypeContext<ModifiableEntity>;
    dynamicView: DynamicViewEntity;
}

export default class DynamicViewComponent extends React.Component<DynamicViewComponentProps, { isDesignerOpen: boolean , rootNode: BaseNode }>{

    constructor(props: DynamicViewComponentProps) {
        super(props);
        this.state = {
            isDesignerOpen: false,
            rootNode: JSON.parse(props.dynamicView.viewContent!) as BaseNode
        };
    }

    handleOpen= () => {
        this.changeState(s => s.isDesignerOpen = true);
    }

    handleClose = () => {
        this.changeState(s => s.isDesignerOpen = false);
    }

    render() {

        return (<div className="design-main">
            <div className={classes("design-left", this.state.isDesignerOpen && "open")}>

                {!this.state.isDesignerOpen ?
                    <i className="fa fa-pencil-square-o design-open-icon" aria-hidden="true" onClick={this.handleOpen}></i> :
                    <DynamicViewDesigner rootNode={this.state.rootNode} dynamicView={this.props.dynamicView} dc={{ refreshView: () => this.forceUpdate(), onClose: this.handleClose }} />
                }
            </div>
            <div className={classes("design-content", this.state.isDesignerOpen && "open")}>
                {Nodes.render(this.state.rootNode, this.props.ctx)}
            </div>
        </div>);
    }
}

interface DynamicViewDesignerProps {
    rootNode: BaseNode;
    dynamicView: DynamicViewEntity;
    dc: DesignerContext;
}

class DynamicViewDesigner extends React.Component<DynamicViewDesignerProps , { selectedNode?: BaseNode }>{

    constructor(props: any) {
        super(props);
        this.state = { selectedNode: undefined };
    }

    handleSelectedNode = (selectedNode: BaseNode) => {
        this.changeState(s => s.selectedNode = selectedNode);
    }

    render() {
        var dv = this.props.dynamicView;
        var ctx = TypeContext.root(DynamicViewEntity, dv);
        return (
            <div className="form-vertical">
                <button type="button" className="close" aria-label="Close" onClick={this.props.dc.onClose}><span aria-hidden="true">×</span></button>
                <h3>
                    <small>{Navigator.getTypeTitle(this.props.dynamicView, undefined)}</small>
                </h3>
                <ValueLine ctx={ctx.subCtx(e => e.viewName)} formGroupStyle="Basic" />
                <DynamicViewTree rootNode={this.props.rootNode} dc={this.props.dc} selectedNode={this.state.selectedNode} onSelected={this.handleSelectedNode} />
                <DynamicViewInspector selectedNode={this.state.selectedNode} dc={this.props.dc} />
            </div>
        );
    }
}
