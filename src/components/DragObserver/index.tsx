import * as React from "react";
import { Maybe, WithReactChild } from "../../types";
import { isNumber } from "../../utils";

interface Props extends WithReactChild {
  onDragStart?: (startX: number, startY: number) => void;
  onDrag?: (moveX: number, moveY: number) => void;
  onDragEnd?: (moveX: number, moveY: number) => void;
  onDragX?: (moveX: number) => void;
  onDragXEnd?: (moveX: number) => void;
  onDragY?: (moveY: number) => void;
  onDragYEnd?: (moveY: number) => void;
  minX?: number;
  maxX?: number;
  minY?: number;
  maxY?: number;
}

export class DragObserver<T extends Element> extends React.Component<Props> {
  private startPosition: Maybe<[number, number]> = null;

  public state = {
    moveX: 0,
    moveY: 0
  };

  private get injectProps() {
    return {
      onMouseDown: this.onMouseDown,
      onMouseUp: this.onMouseUp,
      onMouseMove: this.onMouseMove
    };
  }

  private getX = (originalX: number) => {
    const { minX = -Infinity, maxX = Infinity } = this.props;
    if (originalX < minX) {
      return minX;
    }

    if (originalX > maxX) {
      return maxX;
    }

    return originalX;
  };

  private getY = (originalY: number) => {
    const { minY = -Infinity, maxY = Infinity } = this.props;
    if (originalY < minY) {
      return minY;
    }

    if (originalY > maxY) {
      return maxY;
    }

    return originalY;
  };

  private onMouseDown = (e: React.MouseEvent<T>) => {
    e.stopPropagation();
    e.preventDefault();

    this.bindEvent();
    if (this.props.onDragStart) {
      this.props.onDragStart(e.clientX, e.clientY);
    }
    this.startPosition = [e.clientX, e.clientY];
  };

  private onMouseUp = (e: React.MouseEvent<T> | MouseEvent) => {
    // e.stopPropagation();
    // e.preventDefault();

    this.unbindEvent();
    this.startPosition = null;
    this.onDragEnd();
  };

  private onMouseMove = (e: React.MouseEvent<T> | MouseEvent) => {
    // e.stopPropagation();
    // e.preventDefault();

    if (!this.startPosition) {
      return;
    }

    const [startX, startY] = this.startPosition;
    this.onDrag(e.clientX - startX, e.clientY - startY);
  };

  private onDrag = (iMoveX: number, iMoveY: number) => {
    const moveX = this.getX(iMoveX);
    const moveY = this.getY(iMoveY);

    if (this.props.onDragX) {
      this.props.onDragX(moveX);
    }

    if (this.props.onDragY) {
      this.props.onDragY(moveY);
    }

    if (this.props.onDrag) {
      this.props.onDrag(moveX, moveY);
    }

    this.setState({ moveX, moveY });
  };

  private onDragEnd = () => {
    const { moveX, moveY } = this.state;

    if (this.props.onDragEnd) {
      this.props.onDragEnd(moveX, moveY);
    }

    if (this.props.onDragXEnd) {
      this.props.onDragXEnd(moveX);
    }

    if (this.props.onDragYEnd) {
      this.props.onDragYEnd(moveY);
    }

    this.setState({ moveX: 0, moveY: 0 });
  };

  private bindEvent = () => {
    window.addEventListener("mousemove", this.onMouseMove);
    window.addEventListener("mouseup", this.onMouseUp);
  };

  private unbindEvent = () => {
    window.removeEventListener("mousemove", this.onMouseMove);
    window.removeEventListener("mouseup", this.onMouseUp);
  };

  public render() {
    return React.cloneElement(this.props.children, this.injectProps);
  }
}
