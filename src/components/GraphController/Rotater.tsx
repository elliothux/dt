import * as React from "react";
import { DEG, PX } from "../../types";
import { DragObserver } from "../DragObserver";

interface Props {
  width: PX;
  height: PX;
  onMoveRotate: (rotate: DEG) => void;
  onMoveRotateEnd: (rotate: DEG) => void;
}

export class Rotater extends React.PureComponent<Props> {
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

  private onMoveRotate = (moveX: PX, moveY: PX) => {
    this.props.onMoveRotate(Rotater.calcRotate(moveX, moveY));
  };

  private onMoveRotateEnd = (moveX: PX, moveY: PX) => {
    this.props.onMoveRotateEnd(Rotater.calcRotate(moveX, moveY));
  };

  // private onMoveStart

  public render() {
    const { width, height } = this.props;

    return (
      <>
        <rect className="rotate-controller top-left" x={-10} y={-10} />

        <DragObserver>
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
