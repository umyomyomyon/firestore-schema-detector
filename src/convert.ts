import { DocumentData } from "firebase-admin/firestore";

type ConvertReturnType =
  | "boolean"
  | "string"
  | "number"
  | "null"
  | "array"
  | "{}"
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
    if (keys.length === 0) {
      return "{}";
    }
    if (keys.includes("_seconds") && keys.includes("_nanoseconds")) {
      return "timestamp";
    }
    return "map";
  }
  return undefined;
};

export const convertDocumentData = (docData: DocumentData): any => {
  const keyConvertValues = Object.entries(docData).map(([key, value]) => ({
    key,
    value,
    typeString: convert(value),
  }));
  const result = {} as { [key: string]: ConvertReturnType | undefined};
  keyConvertValues.forEach(({ key, value, typeString }) => {
    if (typeString === 'map') {
      result[key] = convertDocumentData(value);
    } else {
      result[key] = typeString
    }
  });
  return result;
};
