import "./index.scss";
import * as React from "react";
import { Maybe } from "types";
import { observer } from "mobx-react";
import { canvasStore } from "../../store";
import { GraphRender } from "../../graphs";
import { RectGraph } from "../../graphs";

@observer
export class Canvas extends React.Component {
  private ref: Maybe<SVGSVGElement> = null;

  public componentDidMount(): void {
    canvasStore.addGraphs(
      new RectGraph({ width: 100, height: 200, x: 100, y: 100 })
    );
    window.addEventListener("click", canvasStore.unSelectGraph);
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
        width={1200}
        height={800}
        ref={this.setRef}
      >
        {canvasStore.graphs.map((graph, index) => (
          <GraphRender key={graph.key} index={index} graph={graph} />
        ))}
      </svg>
    );
  }
}
