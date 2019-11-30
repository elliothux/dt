import { Key } from "types";
import { generateKey, KeyNamespace } from "utils";
import {
  BaseGraph,
  baseGraphRenderProps,
  BaseGraphRenderProps,
  GraphTypes
} from "../types";
import { observable } from "mobx";
import { RectRender } from "./render";

export interface RectProps extends BaseGraphRenderProps {}

export class RectGraph implements BaseGraph<RectProps> {
  constructor(props?: Partial<RectProps>) {
    if (props) {
      this.renderProps = { ...this.renderProps, ...props };
    }
  }

  public readonly type: GraphTypes = GraphTypes.RECT;

  public readonly Render = RectRender;

  public readonly key: Key = generateKey(KeyNamespace.GRAPH);

  @observable
  public selected: boolean = false;

  @observable
  public renderProps: RectProps = {
    ...baseGraphRenderProps
  };
}
