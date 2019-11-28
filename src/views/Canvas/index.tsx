import "./index.scss";
import * as React from "react";
import { Graph, Maybe } from "types";

export class Canvas extends React.Component {
  private ref: Maybe<HTMLCanvasElement> = null;

  private ctx: Maybe<CanvasRenderingContext2D> = null;

  private canvasPosition: [number, number] = [100, 100];

  private startPosition: [number, number] = [0, 0];

  private graphs: Graph[] = [];

  private drawingGraph: Maybe<Graph> = null;

  public componentDidMount(): void {
    const ctx = this.ctx!;
    ctx!.fillStyle = "red";
    ctx.fillRect(10, 10, 55, 50);
  }

  private setRef = (node: HTMLCanvasElement) => {
    this.ref = node;
    this.ctx = node.getContext("2d");
  };

  private onMouseDown = (e: React.MouseEvent) => {
    console.log(e.clientX, e.clientY);
    const [x, y] = this.canvasPosition;
    this.startPosition = [e.clientX - x, e.clientY - y];
  };

  private drawRect = (endX: number, endY: number) => {
    const [startX, startY] = this.startPosition;
  };

  render() {
    return (
      <canvas
        className="main-canvas"
        ref={this.setRef}
        onMouseDown={this.onMouseDown}
        width={1200}
        height={800}
      />
    );
  }
}
