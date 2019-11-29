import * as React from "react";
import { RectProps } from "./index";

export function RectRender({ width, height, fill, x, y }: RectProps) {
  return <rect x={x} y={y} width={width} height={height} />;
}
