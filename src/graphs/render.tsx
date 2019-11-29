import * as React from "react";
import { Graph } from "./types";

export function renderGraph(graph: Graph, index: number) {
  return React.createElement(graph.Render, graph.props);
}
