import * as React from "react";
import { Graph } from "./types";
import { GraphController } from "../components/GraphController";

export function renderGraph(graph: Graph, index: number) {
  return (
    <GraphController key={graph.key} graph={graph} index={index}>
      {React.createElement(graph.Render, graph.renderProps)}
    </GraphController>
  );
}
