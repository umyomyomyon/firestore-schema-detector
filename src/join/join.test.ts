import { ConvertedDocument } from "../types/convert";
import { JoinMeta, JoinResult } from "../types/join";
import { DocsIntegrater } from "./join";

describe("joinConvertedDocs tests", () => {
  it("empty", () => {
    const convertedDocs: ConvertedDocument[] = [];
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([{}, { optionals: [] }]);
  });

  it("one", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        string: "string",
      },
    ];
    const joinResult: JoinResult = {
      string: ["string"],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("simple", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        strBool: "string",
      },
      {
        strBool: "boolean",
      },
    ];
    const joinResult: JoinResult = { strBool: ["string", "boolean"] };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("simple, same type", () => {
    const convertedDocs: ConvertedDocument[] = [
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
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("multiple properties", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        strTime: "string",
        boolNull: "boolean",
        numStr: "number",
        someOptional: "string",
      },
      {
        strTime: "timestamp",
        boolNull: "null",
        numStr: "string",
        someOp: "{}",
        thisIsOp: "timestamp",
      },
    ];
    const joinResult: JoinResult = {
      strTime: ["string", "timestamp"],
      boolNull: ["boolean", "null"],
      numStr: ["number", "string"],
      someOptional: ["string"],
      someOp: ["{}"],
      thisIsOp: ["timestamp"],
    };
    const joinMeta: JoinMeta = {
      optionals: ["someOptional", "someOp", "thisIsOp"],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
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
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
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
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
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
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });
});
