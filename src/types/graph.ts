export enum GraphTypes {
  RECT = "rect"
}

export interface BaseGraph {
  type: GraphTypes;
}

export interface RectGraph extends BaseGraph {
  type: GraphTypes.RECT;
}

export type Graph = RectGraph;
