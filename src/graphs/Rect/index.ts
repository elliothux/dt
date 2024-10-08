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
import { GraphController } from "../../components/GraphController";

export interface RectProps extends BaseGraphRenderProps {}

export class RectGraph implements BaseGraph<RectProps> {
  constructor(props?: Partial<RectProps>) {
    if (props) {
      this.renderProps = { ...this.renderProps, ...props };
    }
  }

  public readonly type: GraphTypes = GraphTypes.RECT;

  public readonly key: Key = generateKey(KeyNamespace.GRAPH);

  public readonly Render = RectRender;

  public readonly Controller = GraphController;

  @observable
  public selected: boolean = false;

  @observable
  public renderProps: RectProps = {
    ...baseGraphRenderProps
  };
}
