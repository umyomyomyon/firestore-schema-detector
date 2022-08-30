import { ViewTextBuilder } from "./builder";
import { JoinResult, JoinMeta } from "../types/join";

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
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          number: "number",
        },
      ],
    };
    const expectedValue = `
type Document = {
  map: {string:string,number:number};
};`;
    const builder = new ViewTextBuilder(joinResult, { optionals: [] });
    expect(builder.build(name)).toStrictEqual(expectedValue);
  });

  it("or", () => {
    const name = "document";
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          number: "number",
        },
        {
          null: "null",
        },
      ],
    };
    const expectedValue = `
type Document = {
  map: {string:string,number:number} | {null:null};
};`;
    const builder = new ViewTextBuilder(joinResult, { optionals: [] });
    expect(builder.build(name)).toStrictEqual(expectedValue);
  });

  it("multi properties", () => {
    const name = "document";
    const joinResult: JoinResult = {
      map: [
        {
          string: "string",
          number: "number",
        },
        {
          null: "null",
        },
      ],
      map2: [
        {
          number: "number",
          null: "null",
        },
        {
          boolean: "boolean",
        },
      ],
    };
    const expectedValue = `
type Document = {
  map: {string:string,number:number} | {null:null};
  map2: {number:number,null:null} | {boolean:boolean};
};`;
    const builder = new ViewTextBuilder(joinResult, { optionals: [] });
    expect(builder.build(name)).toStrictEqual(expectedValue);
  });
});
