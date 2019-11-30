import "./index.scss";

import * as React from "react";
import { observer } from "mobx-react";
import { Graph } from "graphs";
import { PX, WithReactChild } from "types";
import { translate } from "../../utils";
import { canvasStore } from "../../store";
import { DragObserver } from "../DragObserver";
import { Resizer } from "./Resizer";

interface Props extends WithReactChild {
  graph: Graph;
  index: number;
}

@observer
export class GraphController extends React.Component<Props> {
  public state = {
    moveX: 0,
    moveY: 0,
    moveTop: 0,
    moveBottom: 0,
    moveLeft: 0,
    moveRight: 0
  };

  private selectGraph = () => canvasStore.selectGraph(this.props.index);

  private onClick = (e: React.MouseEvent<SVGGElement>) => {
    e.stopPropagation();
    e.preventDefault();
    this.selectGraph();
  };

  private onDrag = (moveX: number, moveY: number) => {
    this.setState({ moveX, moveY });
  };

  private onDragEnd = (moveX: number, moveY: number) => {
    canvasStore.moveGraphPosition(this.props.index, moveX, moveY);
    this.setState({ moveX: 0, moveY: 0 });
  };

  private onMoveTop = (moveTop: PX) => {
    this.setState({ moveTop });
  };

  private onMoveTopEnd = (moveTop: PX) => {
    this.setState({ moveTop: 0 });
    this.selectGraph();
    canvasStore.moveGraphPosition(this.props.index, 0, moveTop);
    canvasStore.changeGraphSize(this.props.index, 0, -moveTop);
  };

  private onMoveBottom = (moveBottom: PX) => {
    this.setState({ moveBottom });
  };

  private onMoveBottomEnd = (moveBottom: PX) => {
    this.setState({ moveBottom: 0 });
    this.selectGraph();
    canvasStore.changeGraphSize(this.props.index, 0, moveBottom);
  };

  private onMoveLeft = (moveLeft: PX) => {
    this.setState({ moveLeft });
  };

  private onMoveLeftEnd = (moveLeft: PX) => {
    this.setState({ moveLeft: 0 });
    this.selectGraph();
    canvasStore.moveGraphPosition(this.props.index, moveLeft, 0);
    canvasStore.changeGraphSize(this.props.index, -moveLeft, 0);
  };

  private onMoveRight = (moveRight: PX) => {
    this.setState({ moveRight });
  };

  private onMoveRightEnd = (moveRight: PX) => {
    this.setState({ moveRight: 0 });
    this.selectGraph();
    canvasStore.changeGraphSize(this.props.index, moveRight, 0);
  };

  public render() {
    const {
      moveX,
      moveY,
      moveTop,
      moveBottom,
      moveLeft,
      moveRight
    } = this.state;
    const { graph, children } = this.props;
    const {
      renderProps: { x, y, width, height },
      selected
    } = graph;

    const newWidth = width + moveRight - moveLeft;
    const newHeight = height + moveBottom - moveTop;

    return (
      <DragObserver
        onDragStart={this.selectGraph}
        onDrag={this.onDrag}
        onDragEnd={this.onDragEnd}
      >
        <g
          className={`graph-controller${selected ? " selected" : ""}`}
          transform={translate(x + moveX + moveLeft, y + moveY + moveTop)}
          onClick={this.onClick}
        >
          {React.cloneElement(children, {
            width: newWidth,
            height: newHeight
          })}

          {graph.selected ? (
            <Resizer
              width={newWidth}
              height={newHeight}
              originalWidth={width}
              originalHeight={height}
              onMoveTop={this.onMoveTop}
              onMoveTopEnd={this.onMoveTopEnd}
              onMoveBottom={this.onMoveBottom}
              onMoveBottomEnd={this.onMoveBottomEnd}
              onMoveLeft={this.onMoveLeft}
              onMoveLeftEnd={this.onMoveLeftEnd}
              onMoveRight={this.onMoveRight}
              onMoveRightEnd={this.onMoveRightEnd}
            />
          ) : null}
        </g>
      </DragObserver>
    );
  }
}
