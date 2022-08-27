import { TypeString } from "./convert";

export type JoinResult = Record<string, TypeString[]>;

export type JoinMeta = {
  optionals: string[];
};
