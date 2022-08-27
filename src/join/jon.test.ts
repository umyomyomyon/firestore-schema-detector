import { ConvertedDocument } from "../types/convert";
import { JoinMeta, JoinResult } from "../types/join";
import { joinConvertedDocs } from "./join";

describe("joinConvertedDocs tests", () => {
  it("simple", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        strBool: "string",
      },
      {
        strBool: "boolean",
      },
    ];
    const joinResult: JoinResult = { string: ["string", "boolean"] };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    expect(joinConvertedDocs(convertedDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });

  it("simple, same type", () => {
    const convertDocs: ConvertedDocument[] = [
      {
        string: "string",
      },
      {
        string: "string",
      },
    ];
    const joinResult: JoinResult = { string: ["string"] };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    expect(joinConvertedDocs(convertDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });

  it("multiple properties", () => {
    const convertDocs: ConvertedDocument[] = [
      {
        strTime: "string",
        boolNull: "boolean",
        numStr: "number",
      },
      {
        strTime: "timestamp",
        boolNull: "null",
        numStr: "string",
      },
    ];
    const joinResult: JoinResult = {
      strTime: ["string", "timestamp"],
      boolNull: ["boolean", "null"],
      numStr: ["number", "string"],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    expect(joinConvertedDocs(convertDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });

  it("three", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        strBoolNull: "string",
      },
      {
        strBoolNull: "boolean",
      },
      {
        strBoolNull: "null",
      },
    ];
    const joinResult: JoinResult = {
      strBoolNull: ["string", "boolean", "null"],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    expect(joinConvertedDocs(convertedDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });

  it("has optional", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        str: "string",
      },
      {
        str: "null",
        bool: "boolean",
      },
    ];
    const joinResult: JoinResult = {
      str: ["string", "null"],
      bool: ["boolean"],
    };
    const joinMeta: JoinMeta = {
      optionals: ["bool"],
    };
    expect(joinConvertedDocs(convertedDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });

  it("all optional", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        str: "string",
      },
      {
        bool: "boolean",
      },
    ];
    const joinResult: JoinResult = {
      str: ["string"],
      bool: ["boolean"],
    };
    const joinMeta: JoinMeta = {
      optionals: ["str", "bool"],
    };
    expect(joinConvertedDocs(convertedDocs)).toStrictEqual([
      joinResult,
      joinMeta,
    ]);
  });
});
