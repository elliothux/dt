import { action, observable } from "mobx";
import { Graph } from "../graphs";

export class CanvasStore {
  @observable
  public graphs: Graph[] = [];

  @action
  public addGraphs = (graph: Graph) => {
    this.graphs.push(graph);
    return graph;
  };
}

export const canvasStore = new CanvasStore();
