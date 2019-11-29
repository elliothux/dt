import * as React from "react";
import { RectGraph } from "./Rect";

export enum GraphTypes {
  CIRCLE = "circle",
  LINE = "line",
  POLYGON = "polygon",
  RECT = "rect"
}

export type Graph = RectGraph;

export interface BaseGraph<T> {
  readonly type: GraphTypes;

  selected: boolean;

  props: T;

  Render: React.ComponentType<T>;
}
