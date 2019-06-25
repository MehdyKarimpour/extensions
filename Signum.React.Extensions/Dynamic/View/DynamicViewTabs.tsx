import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { classes, Dic } from '@framework/Globals'
import * as Finder from '@framework/Finder'
import {PropertyRoute, Binding } from '@framework/Reflection'
import { Expression, DesignerNode } from './NodeUtils'
import { BaseNode } from './Nodes'
import { DynamicViewMessage, DynamicViewEntity, DynamicViewPropEmbedded } from '../Signum.Entities.Dynamic'
import { Modal, Typeahead, UncontrolledTabs, Tab } from '@framework/Components';
import { TypeContext, EntityTable, ValueLine } from '../../../../Framework/Signum.React/Scripts/Lines';
import { DynamicViewTree } from './DynamicViewTree';
import { DynamicViewInspector, ModulesHelp, PropsHelp } from './Designer';
import JavascriptCodeMirror from '../../Codemirror/JavascriptCodeMirror';

export function DynamicViewTabs({ ctx, rootNode }: { ctx: TypeContext<DynamicViewEntity>, rootNode: DesignerNode<BaseNode> }) {

  const typeName = rootNode.route!.typeReference().name;
  const handleChange = () => rootNode.context.refreshView();

  return (
    <UncontrolledTabs>
      <Tab eventKey="render" title="Render">
        <DynamicViewTree rootNode={rootNode} />
        <DynamicViewInspector selectedNode={rootNode.context.getSelectedNode()} />
      </Tab>
      <Tab eventKey="props" title="Props">
        <EntityTable ctx={ctx.subCtx(a => a.props)} onChange={handleChange}
          columns={EntityTable.typedColumns<DynamicViewPropEmbedded>([
            { property: a => a.name, template: sctx => <ValueLine ctx={sctx.subCtx(a => a.name)} onChange={handleChange} /> },
            { property: a => a.type, template: sctx => <ValueLine ctx={sctx.subCtx(a => a.type)} onChange={handleChange} /> },
          ])} />
      </Tab>
      <Tab eventKey="locals" title="Locals">
        <div className="code-container">
          <pre style={{ border: "0px", margin: "0px", overflow: "visible" }}>
            {"(ctx: TypeContext<" + typeName + "Entity>, "}
            <div style={{ display: "inline-flex" }}>
              <ModulesHelp cleanName={typeName} />{", "}<PropsHelp node={rootNode} />{") =>"}
            </div>
          </pre>
          <JavascriptCodeMirror code={ctx.value.locals || ""} onChange={newCode => { ctx.value.locals = newCode; handleChange(); }} />
        </div>
      </Tab>
    </UncontrolledTabs>
  );
}