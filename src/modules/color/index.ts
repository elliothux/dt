export enum ColorTypes {
  RGB = "rgb",
  RGBA = "rgba",
  HSL = "hsl",
  HEX = "hex"
}

export interface RGBColor {
  type: ColorTypes.RGB;
  value: [number, number, number];
}

export function RGB(
  r: number = 255,
  g: number = 255,
  b: number = 255
): RGBColor {
  return {
    type: ColorTypes.RGB,
    value: [r, g, b]
  };
}

export interface RGBAColor {
  type: ColorTypes.RGBA;
  value: [number, number, number, number];
}

export function RGBA(
  r: number = 255,
  g: number = 255,
  b: number = 255,
  a: number = 1
): RGBAColor {
  return {
    type: ColorTypes.RGBA,
    value: [r, g, b, a]
  };
}

export interface HSLColor {
  type: ColorTypes.HSL;
  value: [number, number, number];
}

export function HSL(h: number, s: number, l: number): HSLColor {
  return {
    type: ColorTypes.HSL,
    value: [h, s, l]
  };
}

export interface HEXColor {
  type: ColorTypes.HEX;
  value: number;
}

export function HEX(hex: number): HEXColor {
  return {
    type: ColorTypes.HEX,
    value: hex
  };
}

export type Color = RGBAColor | RGBColor | HSLColor | HEXColor;
