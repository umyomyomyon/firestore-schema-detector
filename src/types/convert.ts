export type TypeString =
  | "boolean"
  | "string"
  | "number"
  | "null"
  | "array"
  | "{}"
  | "map"
  | "timestamp";

// recursive type definition
// eslint-disable-next-line no-use-before-define
export type ConvertedDocumentValue = TypeString | undefined | ConvertedDocument;
export interface ConvertedDocument {
  [key: string]: ConvertedDocumentValue;
}

export const isConvertedDocument = (
  value: ConvertedDocumentValue
): value is ConvertedDocument => {
  if (value === undefined) return false;
  if (typeof value === "string") return false;
  return true;
};
