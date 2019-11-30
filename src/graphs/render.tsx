import * as React from "react";
import { observer } from "mobx-react";
import { Graph } from "./types";
import { GraphController } from "../components/GraphController";

interface Props {
  graph: Graph;
  index: number;
}

function IGraphRender({ graph, index }: Props) {
  return (
    <GraphController key={graph.key} graph={graph} index={index}>
      {React.createElement(graph.Render, graph.renderProps)}
    </GraphController>
  );
}

export const GraphRender = observer(IGraphRender);
