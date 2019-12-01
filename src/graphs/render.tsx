import * as React from "react";
import { observer } from "mobx-react";
import { Graph } from "./types";

interface Props {
  graph: Graph;
  index: number;
}

function IGraphRender({ graph, index }: Props) {
  const { Controller } = graph;
  return (
    <Controller key={graph.key} graph={graph} index={index}>
      {React.createElement(graph.Render, graph.renderProps)}
    </Controller>
  );
}

export const GraphRender = observer(IGraphRender);
