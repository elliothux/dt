import * as React from "react";
import { Graph } from "graphs";
import { WithReactChild } from "types";
import { translate } from "../../utils";

interface Props extends WithReactChild {
  graph: Graph;
  index: number;
}

export function GraphController({ graph, index, children }: Props) {
  const {
    renderProps: { x, y }
  } = graph;
  return <g transform={translate(x, y)}>{children}</g>;
}
