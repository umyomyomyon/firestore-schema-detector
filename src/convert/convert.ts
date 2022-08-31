import { DocumentData } from "firebase-admin/firestore";
import { TypeString, ConvertedDocument } from "../types/convert";

export const convert = (field: unknown): TypeString | undefined => {
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
    if (keys.includes("_firestore") && keys.includes("_path")) {
      return "ref";
    }
    return "map";
  }
  return undefined;
};

export const convertDocumentData = (
  docData: DocumentData
): ConvertedDocument => {
  const keyConvertValues = Object.entries(docData).map(([key, value]) => ({
    key,
    value,
    typeString: convert(value),
  }));
  const result = {} as ConvertedDocument;
  keyConvertValues.forEach(({ key, value, typeString }) => {
    // 再帰処理
    // typeStringがmapではなくなるまでconvertDocumentDataを繰り返す
    if (typeString === "map") {
      result[key] = convertDocumentData(value);
    } else {
      result[key] = typeString;
    }
  });
  return result;
};

export const convertDocs = (docs: DocumentData[]) =>
  docs.map((doc) => convertDocumentData(doc));
