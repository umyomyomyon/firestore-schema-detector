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

  it("convert to string from timestamp", () => {
    const input = Timestamp.fromDate(new Date());
    expect(convert(input)).toBe("timestamp");
  });

  it("convert to string from empty map", () => {
    const input = {};
    expect(convert(input)).toBe("{}");
  });
});

describe("recursive convert", () => {
  it("recursive", () => {
    const input = {
      map: {
        boolean: false,
        string: "",
        number: 0,
        null: null,
        array: [],
        timestamp: Timestamp.fromDate(new Date()),
      },
    };
    const expectedValue = {
      map: {
        boolean: "boolean",
        string: "string",
        number: "number",
        null: "null",
        array: "array",
        timestamp: "timestamp",
      },
    };
    expect(convert(input)).toBe(expectedValue);
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

// describe("deep map convert", () => {
//   it("deep map test", () => {
//     const input = {
//       start: {
//         mapfield: "",
//         map1: {
//           map1field: "",
//           map2: {
//             map2field: "",
//             map3: {
//               map3field: "",
//               map4: {
//                 map4field: "",
//                 map5: {
//                   array: ["", 0, true, null],
//                   boolean: false,
//                   null: null,
//                   number: 0,
//                   string: "",
//                   timestamp: Timestamp.fromDate(new Date()),
//                 },
//               },
//             },
//           },
//         },
//       },
//     };
//     const expectedValue = {
//       start: {
//         mapfield: "string",
//         map1: {
//           map1field: "string",
//           map2: {
//             map2field: "string",
//             map3: {
//               map3field: "string",
//               map4: {
//                 map4: "string",
//                 map5: {
//                   array: "array",
//                   boolean: "boolean",
//                   null: "null",
//                   string: "string",
//                   timestamp: "timestamp",
//                 },
//               },
//             },
//           },
//         },
//       },
//     };
//   });
// });
