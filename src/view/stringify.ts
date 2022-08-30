import { ConvertedDocument } from "../types/convert";

export const stringify = (doc: ConvertedDocument) =>
  JSON.stringify(doc, null, "  ").replace(/"([^"]+)":/g, "$1:");
