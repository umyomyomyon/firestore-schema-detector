import { ConvertedDocument, ConvertedDocumentValue } from "../types/convert";
import { JoinResult, JoinMeta } from "../types/join";

export class DocsIntegrater {
  docs: ConvertedDocument[];

  constructor(convertedDocs: ConvertedDocument[]) {
    this.docs = convertedDocs;
  }

  joinDocs(): [JoinResult, JoinMeta] {
    const result = this.makeResult();
    const meta = this.makeMeta();
    return [result, meta];
  }

  private makeResult(): JoinResult {
    const allKeys = this.extractAllKeysFromDocs();
    const keyWithEmptyList = this.makeKeyWithEmptyList(allKeys);
    const result = this.fillKeyWithEmptyList(keyWithEmptyList);
    return result;
  }

  private makeMeta(): JoinMeta {
    const allKeys = this.extractAllKeysFromDocs();
    const countUp = this.makeCountUp(allKeys);
    const optionals = this.makeOptionals(countUp);
    return { optionals };
  }

  private extractAllKeysFromDocs() {
    const allKeysAllowDuplication = this.docs.flatMap((doc) =>
      Object.keys(doc)
    );
    return [...new Set(allKeysAllowDuplication)];
  }

  // eslint-disable-next-line class-methods-use-this
  private makeKeyWithEmptyList(allKeys: string[]): {
    [key: string]: ConvertedDocumentValue[];
  } {
    return allKeys.reduce(
      (acc, key) => ({ ...acc, [key]: [] }),
      {} as { [key: string]: ConvertedDocumentValue[] }
    );
  }

  private makeCountUp(allKeys: string[]) {
    const countUpBase: { [key: string]: number } = {};
    const initialCountUp = allKeys.reduce((acc, key) => {
      acc[key] = 0;
      return acc;
    }, countUpBase);
    const countUp = this.docs.reduce((acc, doc) => {
      Object.keys(doc).forEach((key) => {
        acc[key] += 1;
      });
      return acc;
    }, initialCountUp);
    return countUp;
  }

  private fillKeyWithEmptyList(keyWithEmptyList: {
    [key: string]: ConvertedDocumentValue[];
  }) {
    const filled = this.docs.reduce((acc, doc) => {
      Object.entries(doc).forEach(([key, convertedDocumentValue]) => {
        if (acc[key].length) {
          acc[key].push(convertedDocumentValue);
        } else {
          acc[key] = [convertedDocumentValue];
        }
      });
      return acc;
    }, keyWithEmptyList);
    return Object.entries(filled).reduce((acc, [key, filledDocValues]) => {
      acc[key] = [...new Set(filledDocValues)];
      return acc;
    }, filled);
  }

  private makeOptionals(countUp: { [key: string]: number }) {
    return Object.entries(countUp)
      .map(([key, count]) => {
        if (count !== this.docs.length) return key;
        return undefined;
      })
      .filter((v): v is string => !!v);
  }
}
