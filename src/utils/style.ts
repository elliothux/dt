import { DEG, PX } from "../types";

export function translate(x: PX, y: PX): string {
  return `translate(${x}, ${y})`;
}

export function rotateDeg(rotate: DEG) {
  if (rotate === 0) {
    return "";
  }
  return `rotate(${rotate})`;
}
