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

  it("one object", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        map: {
          string: "string",
          boolean: "boolean",
        },
      },
    ];
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          boolean: "boolean",
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("one deep object", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        map: {
          map: {
            map: {
              map: {
                map: {
                  map: {
                    string: "string",
                    boolean: "boolean",
                  },
                },
              },
            },
          },
        },
      },
    ];
    const joinResult: JoinResult = {
      map: [
        {
          map: {
            map: {
              map: {
                map: {
                  map: {
                    string: "string",
                    boolean: "boolean",
                  },
                },
              },
            },
          },
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("has objects", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        map1: {
          string: "string",
          boolean: "boolean",
        },
        map2: {
          null: "null",
        },
      },
    ];
    const joinResult: JoinResult = {
      map1: [
        {
          string: "string",
          boolean: "boolean",
        },
      ],
      map2: [
        {
          null: "null",
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("same objects", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        map: {
          string: "string",
          boolean: "boolean",
        },
      },
      {
        map: {
          string: "string",
          boolean: "boolean",
        },
      },
    ];
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          boolean: "boolean",
        },
        {
          string: "string",
          boolean: "boolean",
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: [],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("all optional", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        map: {
          string: "string",
          boolean: "boolean",
        },
      },
      {
        pam: {
          string: "string",
          boolean: "boolean",
        },
      },
    ];
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          boolean: "boolean",
        },
      ],
      pam: [
        {
          string: "string",
          boolean: "boolean",
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: ["map", "pam"],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });

  it("partial optional", () => {
    const convertedDocs: ConvertedDocument[] = [
      {
        string: "string",
        map: {
          string: "string",
          boolean: "boolean",
        },
        boolean: "boolean",
      },
      {
        string: "boolean",
        map: {
          array: "array",
          timastamp: "timestamp",
        },
        boolean: "boolean",
        opt: {
          null: "null",
        },
      },
    ];
    const joinResult: JoinResult = {
      string: ["string", "boolean"],
      map: [
        {
          string: "string",
          boolean: "boolean",
        },
        {
          array: "array",
          timastamp: "timestamp",
        },
      ],
      boolean: ["boolean"],
      opt: [
        {
          null: "null",
        },
      ],
    };
    const joinMeta: JoinMeta = {
      optionals: ["opt"],
    };
    const intergrater = new DocsIntegrater(convertedDocs);
    expect(intergrater.joinDocs()).toStrictEqual([joinResult, joinMeta]);
  });
});
