import { action, observable, toJS } from "mobx";
import { Graph } from "../graphs";
import { PX } from "../types";
import { isArray } from "../utils";

export class CanvasStore {
  @observable
  public graphs: Graph[] = [];

  @action
  public addGraph = (graph: Graph): Graph => {
    this.graphs.push(graph);
    return graph;
  };

  private selectedIndex: number = -1;

  @action
  public selectGraph = (index: number): void => {
    if (this.selectedIndex === index) {
      return;
    }

    if (this.selectedIndex > -1) {
      this.graphs[this.selectedIndex]!.selected = false;
    }

    this.graphs[index]!.selected = true;
    this.selectedIndex = index;
  };

  @action
  public unSelectGraph = (): void => {
    if (this.selectedIndex < 0) {
      return;
    }

    this.graphs[this.selectedIndex]!.selected = false;
    this.selectedIndex = -1;
  };

  @action
  public setGraphPosition = (index: number, x: number, y: number): void => {
    const { renderProps } = this.graphs[index]!;
    renderProps.x = x;
    renderProps.y = y;
  };

  @action
  public moveGraphPosition = (
    index: number,
    moveX: number,
    moveY: number
  ): void => {
    const { renderProps } = this.graphs[index]!;
    renderProps.x += moveX;
    renderProps.y += moveY;
  };

  @action
  public setGraphSize = (index: number, width: PX, height: PX): void => {
    const { renderProps } = this.graphs[index]!;
    renderProps.width = width;
    renderProps.height = height;
  };

  @action
  public changeGraphSize = (
    index: number,
    changeWidth: PX,
    changeHeight: PX
  ): void => {
    const { renderProps } = this.graphs[index]!;
    renderProps.width += changeWidth;
    renderProps.height += changeHeight;
  };
}

export const canvasStore = new CanvasStore();

Object.defineProperty(window, "__canvasStore", {
  get(): CanvasStore {
    return canvasStore;
  }
});
