import { ConvertedDocumentValue } from "./convert";

export type JoinResult = Record<string, ConvertedDocumentValue[]>;

export type JoinMeta = {
  optionals: string[];
};
