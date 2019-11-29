import "./index.scss";

import * as React from "react";
import { RectProps } from "./index";

export function RectRender({ width, height, color }: RectProps) {
  return <rect className="graph-rect" width={width} height={height} />;
}
