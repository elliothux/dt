import { PX } from "../types";

export function translate(x: PX, y: PX): string {
  return `translate(${x}, ${y})`;
}
