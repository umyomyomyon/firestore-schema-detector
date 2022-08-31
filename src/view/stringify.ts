import { ConvertedDocument } from "../types/convert";

export const stringify = (doc: ConvertedDocument) => {
  const json = JSON.stringify(doc).replace(/"([^"]+)":/g, "$1:");
  const strToType = json.replace(
    /"(string|number|boolean|null|array|{}|timestamp|ref)"/g,
    (match) => {
      if (match === `"null"`) return "null";
      if (match === `"array"`) return "Array<unknown>";
      if (match === `"{}"`) return "Record<string, never>";
      if (match === `"timestamp"`) return "firebase.firestore.Timestamp";
      if (match === `"ref"`) return "firebase.firestore.DocumentReference";
      return match.replaceAll(`"`, "");
    }
  );
  return strToType;
};
