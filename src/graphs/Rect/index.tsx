import * as React from "react";
import { PX } from "types";
import { BaseGraph, GraphTypes } from "graphs/types";
import { Color, RGB } from "modules/color";
import { RectRender } from "./render";

export interface RectProps {
  width: PX;
  height: PX;
  x: PX;
  y: PX;
  fill: Color;
}

export class RectGraph implements BaseGraph<RectProps> {
  constructor(props?: RectProps) {
    if (props) {
      this.props = props;
    }
  }

  public readonly type: GraphTypes = GraphTypes.RECT;

  public selected: boolean = false;

  public props: RectProps = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    fill: RGB(128, 128, 128)
  };

  public Render = RectRender;
}
