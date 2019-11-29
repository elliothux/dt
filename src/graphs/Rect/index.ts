import { Key } from "types";
import { generateKey, KeyNamespace } from "utils";
import {
  BaseGraph,
  baseGraphRenderProps,
  BaseGraphRenderProps,
  GraphTypes
} from "../types";
import { RectRender } from "./render";

export interface RectProps extends BaseGraphRenderProps {}

export class RectGraph implements BaseGraph<RectProps> {
  constructor(props?: Partial<RectProps>) {
    if (props) {
      this.renderProps = { ...this.renderProps, ...props };
    }
  }

  public readonly type: GraphTypes = GraphTypes.RECT;

  public readonly key: Key = generateKey(KeyNamespace.GRAPH);

  public selected: boolean = false;

  public renderProps: RectProps = {
    ...baseGraphRenderProps
  };

  public Render = RectRender;
}
