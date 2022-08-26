import { Timestamp } from "firebase-admin/firestore";
import { convertDocs } from "../convert";

describe("convertDocs tests", () => {
  it("", () => {
    const input = [
      {
        number: 0,
        string: "",
        boolean: false,
        map: {
          map: {
            map: {
              timestamp: Timestamp.fromDate(new Date()),
            },
          },
        },
      },
      {
        array: [],
        null: null,
        emptyObject: {},
        timestamp: Timestamp.fromDate(new Date()),
      },
    ];
    const expectedValue = [
      {
        number: "number",
        string: "string",
        boolean: "boolean",
        map: {
          map: {
            map: {
              timestamp: "timestamp",
            },
          },
        },
      },
      {
        array: "array",
        null: "null",
        emptyObject: "{}",
        timestamp: "timestamp",
      },
    ];
    expect(convertDocs(input)).toStrictEqual(expectedValue);
  });
});
