import * as React from "react";
import { DEG, PX } from "../../types";
import { DragObserver } from "../DragObserver";

interface Props {
  width: PX;
  height: PX;
  onMoveRotate: (rotate: DEG) => void;
  onMoveRotateEnd: (rotate: DEG) => void;
}

function pow2(i: number): number {
  return i * i;
}

export class Rotater extends React.PureComponent<Props> {
  public static calcRotate = (x: PX, y: PX, w: PX, h: PX): DEG => {
    const sinHalfA =
      (0.5 * Math.sqrt(pow2(x) + pow2(y))) /
      Math.sqrt(pow2(w * 0.5) + pow2(h * 0.5));
    const halfA = Math.asin(sinHalfA);
    return halfA * 2;
  };

  private onMoveRotate = (e: React.MouseEvent, moveX: PX, moveY: PX) => {
    const rotate = Rotater.calcRotate(
      moveX,
      moveY,
      this.props.width,
      this.props.height
    );
    console.log(rotate);
    this.props.onMoveRotate(rotate);
  };

  private onMoveRotateEnd = (moveX: PX, moveY: PX) => {
    // this.props.onMoveRotateEnd(Rotater.calcRotate(moveX, moveY));
  };

  // private onMoveStart

  public render() {
    const { width, height } = this.props;

    return (
      <>
        <rect className="rotate-controller top-left" x={-10} y={-10} />

        <DragObserver onDrag={this.onMoveRotate}>
          <rect className="rotate-controller top-right" x={width - 8} y={-10} />
        </DragObserver>

        <rect
          className="rotate-controller bottom-left"
          x={-10}
          y={height - 8}
        />
        <rect
          className="rotate-controller bottom-right"
          x={width - 8}
          y={height - 8}
        />
      </>
    );
  }
}
