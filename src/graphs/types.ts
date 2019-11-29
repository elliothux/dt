import * as React from "react";
import { RectGraph } from "./Rect";
import { Key, PX } from "../types";
import { Color, RGB } from "../modules/color";

export enum GraphTypes {
  CIRCLE = "circle",
  LINE = "line",
  POLYGON = "polygon",
  RECT = "rect"
}

export type Graph = RectGraph;

export interface BaseGraphRenderProps {
  x: PX;
  y: PX;
  width: PX;
  height: PX;
  rotate: PX;
  color: Color;
}

export const baseGraphRenderProps: BaseGraphRenderProps = {
  x: 0,
  y: 0,
  width: 50,
  height: 50,
  rotate: 0,
  color: RGB(128, 128, 128)
};

export interface BaseGraph<T extends BaseGraphRenderProps> {
  readonly type: GraphTypes;

  readonly key: Key;

  selected: boolean;

  renderProps: T;

  Render: React.ComponentType<T>;
}
