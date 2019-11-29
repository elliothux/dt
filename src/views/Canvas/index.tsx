import "./index.scss";
import * as React from "react";
import { Maybe } from "types";
import { observer } from "mobx-react";
import { canvasStore } from "../../store";
import { renderGraph } from "../../graphs";

@observer
export class Canvas extends React.Component {
  private ref: Maybe<SVGSVGElement> = null;

  public componentDidMount(): void {
    canvasStore.addGraphs(new RectGraph())
  }

  private setRef = (node: SVGSVGElement) => {
    this.ref = node;
  };

  render() {
    return (
      <svg
        version="1.1"
        baseProfile="full"
        xmlns="http://www.w3.org/2000/svg"
        className="main-canvas"
        ref={this.setRef}
        width={1200}
        height={800}
      >
        {canvasStore.graphs.map(renderGraph)}
      </svg>
    );
  }
}
