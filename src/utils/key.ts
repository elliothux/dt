import { Key } from "types";

const keyMap = new Map<string, number>();

export enum KeyNamespace {
  GRAPH = "graph"
}

export function generateKey(namespace: string = "default"): Key {
  const current = keyMap.get(namespace);
  if (current) {
    keyMap.set(namespace, current + 1);
    return current;
  }

  keyMap.set(namespace, 2);
  return 1;
}
