import { ConvertedDocument } from "../types/convert";
import { JoinResult, JoinMeta } from "../types/join";

export const joinConvertedDocs = (
  convertedDocs: ConvertedDocument[]
): [JoinResult, JoinMeta] => [{ a: ["string"] }, { optionals: [] }];
