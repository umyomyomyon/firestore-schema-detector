import { ViewTextBuilder } from "./builder";
import { JoinResult, JoinMeta } from "../types/join";
import { ConvertedDocument } from "../types/convert";

describe("builder tests", () => {
  it("simple", () => {
    const name = "document";
    const joinResult: JoinResult = {
      string: ["string", "boolean", "timestamp"],
    };
    const joinMeta: JoinMeta = { optionals: [] };
    const expectedValue = `
type Document = {
  string: string | boolean | timestamp;
};`;
    const builder = new ViewTextBuilder(joinResult, joinMeta);
    expect(builder.build(name)).toBe(expectedValue);
  });

  it("has optional property", () => {
    const name = "document";
    const joinResult: JoinResult = {
      string: ["string", "boolean"],
      opt: ["array"],
    };
    const joinMeta: JoinMeta = { optionals: ["opt"] };
    const expectedValue = `
type Document = {
  string: string | boolean;
  opt?: array;
};`;
    const builder = new ViewTextBuilder(joinResult, joinMeta);
    expect(builder.build(name)).toBe(expectedValue);
  });

  it("has optional properties", () => {
    const name = "document";
    const joinResult: JoinResult = {
      string: ["string", "boolean"],
      opt1: ["array", "number"],
      opt2: ["string", "timestamp"],
    };
    const joinMeta: JoinMeta = { optionals: ["opt1", "opt2"] };
    const expectedValue = `
type Document = {
  string: string | boolean;
  opt1?: array | number;
  opt2?: string | timestamp;
};`;
    const builder = new ViewTextBuilder(joinResult, joinMeta);
    expect(builder.build(name)).toBe(expectedValue);
  });
});

describe("map build tests", () => {
  it("simple", () => {
    const name = "document";
    const converted: ConvertedDocument = {
      map: {
        map: {
          map: {
            map: {
              string: "string",
              number: "number",
            },
          },
        },
      },
    };
    const joinResult: JoinResult = {
      map: [converted],
    };
    const expectedValue = `
type Document = {
  map: Record<string, unknown>;
};`;
    const builder = new ViewTextBuilder(joinResult, { optionals: [] });
    expect(builder.build(name)).toStrictEqual(expectedValue);
  });
});
