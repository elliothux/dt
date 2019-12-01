import "./index.scss";

import * as React from "react";
import { EllipseRenderProps } from "./index";
import { translate } from "../../utils";

export function EllipseRender({ width, height, color }: EllipseRenderProps) {
  const halfW = width / 2;
  const halfH = height / 2;
  return (
    <ellipse
      className="graph-ellipse"
      transform={translate(halfW, halfH)}
      rx={halfW}
      ry={halfH}
    />
  );
}
