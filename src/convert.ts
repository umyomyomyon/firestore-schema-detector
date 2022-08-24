import { DocumentData } from "firebase-admin/firestore";

type ConvertReturnType =
  | "boolean"
  | "string"
  | "number"
  | "null"
  | "array"
  | "map"
  | "timestamp";

export const convert = (field: unknown): ConvertReturnType | undefined => {
  if (typeof field === "boolean") {
    return "boolean";
  }
  if (typeof field === "string") {
    return "string";
  }
  if (typeof field === "number") {
    return "number";
  }
  if (field === null) {
    return "null";
  }
  if (Array.isArray(field)) {
    return "array";
  }
  if (typeof field === "object") {
    const keys = Object.keys(field);
    if (keys.includes("_seconds") && keys.includes("_nanoseconds")) {
      return "timestamp";
    }
    return "map";
  }
  return undefined;
};

export const convertDocumentData = (docData: DocumentData) => {
  const keyConvertValues = Object.entries(docData).map(([key, value]) => ({
    key,
    value: convert(value),
  }));
  const result = {} as { [key: string]: ConvertReturnType | undefined };
  keyConvertValues.forEach(({ key, value }) => {
    result[key] = value;
  });
  return result;
};
