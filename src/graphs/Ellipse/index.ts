import { Key } from "types";
import { generateKey, KeyNamespace } from "utils";
import {
  BaseGraph,
  BaseGraphRenderProps,
  baseGraphRenderProps,
  GraphTypes
} from "../types";
import { observable } from "mobx";
import { EllipseRender } from "./render";
import { GraphController } from "../../components/GraphController";

export interface EllipseRenderProps extends BaseGraphRenderProps {}

export class EllipseGraph implements BaseGraph<EllipseRenderProps> {
  constructor(props?: Partial<EllipseRenderProps>) {
    if (props) {
      this.renderProps = { ...this.renderProps, ...props };
    }
  }

  public readonly type: GraphTypes = GraphTypes.ELLIPSE;

  public readonly key: Key = generateKey(KeyNamespace.GRAPH);

  public readonly Render = EllipseRender;

  public readonly Controller = GraphController;

  @observable
  public selected: boolean = false;

  @observable
  public renderProps: EllipseRenderProps = {
    ...baseGraphRenderProps
  };
}
