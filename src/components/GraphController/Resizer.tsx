import * as React from "react";
import { DEG, PX } from "../../types";
import { DragObserver } from "../DragObserver";

interface Props {
  width: PX;
  height: PX;
  originalWidth: PX;
  originalHeight: PX;
  onMoveTop: (move: PX) => void;
  onMoveBottom: (move: PX) => void;
  onMoveLeft: (move: PX) => void;
  onMoveRight: (move: PX) => void;
  onMoveTopEnd: (move: PX) => void;
  onMoveBottomEnd: (move: PX) => void;
  onMoveLeftEnd: (move: PX) => void;
  onMoveRightEnd: (move: PX) => void;
  onMoveRotate: (rotate: DEG) => void;
  onMoveRotateEnd: (rotate: DEG) => void;
}

export class Resizer extends React.PureComponent<Props> {
  public static calcRotate = (x: PX, y: PX): DEG => {
    // if (x === 0 && y === 0) {
    //   return 0;
    // }

    const deg = (180 / Math.PI) * Math.atan2(y + (y > 0 ? 1 : -1) * 30, x);

    // if (x > 0) {
    //   return 90 - deg;
    // }
    //
    // if (x < 0) {
    //   return deg - 90;
    // }

    return deg;
  };

  private onMoveLeftTop = (moveX: PX, moveY: PX) => {
    this.props.onMoveLeft(moveX);
    this.props.onMoveTop(moveY);
  };

  private onMoveLeftTopEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveLeftEnd(moveX);
    this.props.onMoveTopEnd(moveY);
  };

  private onMoveLeftBottom = (moveX: PX, moveY: PX) => {
    this.props.onMoveLeft(moveX);
    this.props.onMoveBottom(moveY);
  };

  private onMoveLeftBottomEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveLeftEnd(moveX);
    this.props.onMoveBottomEnd(moveY);
  };

  private onMoveRightTop = (moveX: PX, moveY: PX) => {
    this.props.onMoveRight(moveX);
    this.props.onMoveTop(moveY);
  };

  private onMoveRightTopEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveRightEnd(moveX);
    this.props.onMoveTopEnd(moveY);
  };

  private onMoveRightBottom = (moveX: PX, moveY: PX) => {
    this.props.onMoveRight(moveX);
    this.props.onMoveBottom(moveY);
  };

  private onMoveRightBottomEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveRightEnd(moveX);
    this.props.onMoveBottomEnd(moveY);
  };

  private onMoveRotate = (moveX: PX, moveY: PX) => {
    this.props.onMoveRotate(Resizer.calcRotate(moveX, moveY));
  };

  private onMoveRotateEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveRotateEnd(Resizer.calcRotate(moveX, moveY));
  };

  public render() {
    const { width, height, originalWidth, originalHeight } = this.props;
    const halfW = width / 2;
    const halfH = height / 2;

    return (
      <>
        <rect
          className="controller-outline-rect"
          width={width}
          height={height}
        />

        <DragObserver
          onDrag={this.onMoveLeftTop}
          onDragEnd={this.onMoveLeftTopEnd}
          maxX={originalWidth - 1}
          maxY={originalHeight - 1}
        >
          <rect className="controller-rect top-left" x={-4} y={-4} />
        </DragObserver>
        <DragObserver
          onDrag={this.onMoveRightTop}
          onDragEnd={this.onMoveRightTopEnd}
          minX={-originalWidth + 1}
          maxY={originalHeight - 1}
        >
          <rect className="controller-rect top-right" x={width - 4} y={-4} />
        </DragObserver>
        <DragObserver
          onDrag={this.onMoveLeftBottom}
          onDragEnd={this.onMoveLeftBottomEnd}
          maxX={originalWidth - 1}
          minY={-originalHeight + 1}
        >
          <rect className="controller-rect bottom-left" x={-4} y={height - 4} />
        </DragObserver>
        <DragObserver
          onDrag={this.onMoveRightBottom}
          onDragEnd={this.onMoveRightBottomEnd}
          minX={-originalWidth + 1}
          minY={-originalHeight + 1}
        >
          <rect
            className="controller-rect bottom-right"
            x={width - 4}
            y={height - 4}
          />
        </DragObserver>

        <DragObserver
          onDragY={this.props.onMoveTop}
          onDragYEnd={this.props.onMoveTopEnd}
          maxY={originalHeight - 1}
        >
          <rect className="controller-rect top" x={halfW - 4} y={-4} />
        </DragObserver>
        <DragObserver
          onDragX={this.props.onMoveLeft}
          onDragXEnd={this.props.onMoveLeftEnd}
          maxX={originalWidth - 1}
        >
          <rect className="controller-rect left" x={-4} y={halfH - 4} />
        </DragObserver>
        <DragObserver
          onDragY={this.props.onMoveBottom}
          onDragYEnd={this.props.onMoveBottomEnd}
          minY={-originalHeight + 1}
        >
          <rect
            className="controller-rect bottom"
            x={halfW - 4}
            y={height - 4}
          />
        </DragObserver>
        <DragObserver
          onDragX={this.props.onMoveRight}
          onDragXEnd={this.props.onMoveRightEnd}
          minX={-originalWidth + 1}
        >
          <rect className="controller-rect right" x={width - 4} y={halfH - 4} />
        </DragObserver>

        <line
          className="controller-line"
          x1={halfW}
          y1={-4}
          x2={halfW}
          y2={-42}
        />
        <DragObserver
          onDrag={this.onMoveRotate}
          onDragEnd={this.onMoveRotateEnd}
        >
          <circle className="controller-circle" cx={halfW} cy={-46} r={4} />
        </DragObserver>
      </>
    );
  }
}
