import * as React from "react";
import { RectGraph } from "./Rect";
import { EllipseGraph } from "./Ellipse";
import { Key, PX, WithReactChild } from "../types";
import { Color, RGB } from "../modules/color";

export enum GraphTypes {
  ELLIPSE = "ellipse",
  LINE = "line",
  POLYGON = "polygon",
  RECT = "rect"
}

export type Graph = RectGraph | EllipseGraph;

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

export interface BaseGraphControllerProps extends WithReactChild {
  index: number;
  graph: Graph;
}

export interface BaseGraph<
  T extends BaseGraphRenderProps,
  U extends BaseGraphControllerProps = BaseGraphControllerProps
> {
  readonly type: GraphTypes;

  readonly key: Key;

  readonly Render: React.ComponentType<T>;

  readonly Controller: React.ComponentType<U>;

  selected: boolean;

  renderProps: T;
}
