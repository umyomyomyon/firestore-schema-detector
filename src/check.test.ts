import { Timestamp } from "firebase-admin/firestore";
import { convert, convertDocumentData } from "./convert";

describe("convert tests.", () => {
  it("convert to string from boolean", () => {
    const input = false;
    expect(convert(input)).toBe("boolean");
  });

  it("convert to string from string", () => {
    const input = "";
    expect(convert(input)).toBe("string");
  });

  it("convert to string from number", () => {
    const input = 0;
    expect(convert(input)).toBe("number");
  });

  it("convert to string from null", () => {
    const input = null;
    expect(convert(input)).toBe("null");
  });

  it("convert to string from array", () => {
    const input: unknown[] = [];
    expect(convert(input)).toBe("array");
  });

  it("convert to string from map", () => {
    const input = {};
    expect(convert(input)).toBe("map");
  });

  it("convert to string from timestamp", () => {
    const input = Timestamp.fromDate(new Date());
    expect(convert(input)).toBe("timestamp");
  });
});

describe("convertDocumentData tests.", () => {
  it("type check", () => {
    const input = {
      array: [],
      boolean: false,
      map: { key: "value" },
      null: null,
      timestamp: Timestamp.fromDate(new Date()),
      string: "",
      number: 0,
    };

    const testExpect = {
      array: "array",
      boolean: "boolean",
      map: "map",
      null: "null",
      timestamp: "timestamp",
      string: "string",
      number: "number",
    };
    expect(convertDocumentData(input)).toStrictEqual(testExpect);
  });
});
