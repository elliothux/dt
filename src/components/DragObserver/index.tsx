import * as React from "react";
import { Maybe, WithReactChild } from "../../types";

interface Props extends WithReactChild {
  onDragStart?: (e: React.MouseEvent, startX: number, startY: number) => void;
  onDrag?: (e: React.MouseEvent, moveX: number, moveY: number) => void;
  onDragEnd?: (e: React.MouseEvent, moveX: number, moveY: number) => void;
  onDragX?: (e: React.MouseEvent, moveX: number) => void;
  onDragXEnd?: (e: React.MouseEvent, moveX: number) => void;
  onDragY?: (e: React.MouseEvent, moveY: number) => void;
  onDragYEnd?: (e: React.MouseEvent, moveY: number) => void;
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
      this.props.onDragStart(e, e.clientX, e.clientY);
    }
    this.startPosition = [e.clientX, e.clientY];
  };

  private onMouseUp = (e: React.MouseEvent<T> | MouseEvent) => {
    // e.stopPropagation();
    // e.preventDefault();

    this.unbindEvent();
    this.startPosition = null;
    this.onDragEnd(e as React.MouseEvent);
  };

  private onMouseMove = (e: React.MouseEvent<T> | MouseEvent) => {
    // e.stopPropagation();
    // e.preventDefault();

    if (!this.startPosition) {
      return;
    }

    const [startX, startY] = this.startPosition;
    this.onDrag(e as React.MouseEvent, e.clientX - startX, e.clientY - startY);
  };

  private onDrag = (e: React.MouseEvent, iMoveX: number, iMoveY: number) => {
    const moveX = this.getX(iMoveX);
    const moveY = this.getY(iMoveY);

    if (this.props.onDragX) {
      this.props.onDragX(e, moveX);
    }

    if (this.props.onDragY) {
      this.props.onDragY(e, moveY);
    }

    if (this.props.onDrag) {
      this.props.onDrag(e, moveX, moveY);
    }

    this.setState({ moveX, moveY });
  };

  private onDragEnd = (e: React.MouseEvent) => {
    const { moveX, moveY } = this.state;

    if (this.props.onDragEnd) {
      this.props.onDragEnd(e, moveX, moveY);
    }

    if (this.props.onDragXEnd) {
      this.props.onDragXEnd(e, moveX);
    }

    if (this.props.onDragYEnd) {
      this.props.onDragYEnd(e, moveY);
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
