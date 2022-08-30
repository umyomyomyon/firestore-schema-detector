import { ConvertedDocumentValue, isConvertedDocument } from "../types/convert";
import { JoinResult, JoinMeta } from "../types/join";

export class ViewTextBuilder {
  result: JoinResult;

  meta: JoinMeta;

  constructor(joinResult: JoinResult, joinMeta: JoinMeta) {
    this.result = joinResult;
    this.meta = joinMeta;
  }

  build(name: string): string {
    const typeName = name[0].toUpperCase() + name.slice(1);
    const propertyTypes = this.makePropertyTypes();
    const text = `
type ${typeName} = {
  ${propertyTypes}
};`;
    return text;
  }

  makePropertyTypes() {
    const propertyTypes = Object.entries(this.result).map(
      ([key, convertedDocumentValue]) => {
        const propertyTypeText = this.makePropertyTypeText(
          convertedDocumentValue
        );
        if (this.meta.optionals.includes(key)) {
          return `${key}?: ${propertyTypeText};`;
        }
        return `${key}: ${propertyTypeText};`;
      }
    );
    return propertyTypes.join("\n  ");
  }

  // eslint-disable-next-line class-methods-use-this
  makePropertyTypeText(convertedDocumentValues: ConvertedDocumentValue[]) {
    return convertedDocumentValues
      .map((convertedDocumentValue) => {
        if (isConvertedDocument(convertedDocumentValue)) {
          return "Record<string, unknown>";
        }
        return convertedDocumentValue;
      })
      .join(" | ");
  }
}
