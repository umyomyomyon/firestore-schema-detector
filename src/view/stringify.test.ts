import { ConvertedDocument } from "../types/convert";
import { stringify } from "./stringify";

describe("stringify tests", () => {
  it("only 1 key", () => {
    const input: ConvertedDocument = {
      key: "string",
    };
    const e = `{
  key: "string"
}`;
    expect(stringify(input)).toBe(e);
  });

  it("2 keys", () => {
    const input: ConvertedDocument = {
      key: "string",
      key2: "number",
    };
    const e = `{
  key: "string",
  key2: "number"
}`;
    expect(stringify(input)).toBe(e);
  });

  it("nest", () => {
    const input: ConvertedDocument = {
      key: {
        innerKey: "string",
        innerKey2: "string",
      },
    };
    const e = `{
  key: {
    innerKey: "string",
    innerKey2: "string"
  }
}`;
    expect(stringify(input)).toBe(e);
  });

  it("more nest", () => {
    const input: ConvertedDocument = {
      key: {
        key: {
          moreInnerKey: "string",
        },
      },
    };
    const e = `{
  key: {
    key: {
      moreInnerKey: "string"
    }
  }
}`;
    expect(stringify(input)).toBe(e);
  });

  it("deep nest", () => {
    const input: ConvertedDocument = {
      key: {
        key: {
          key: {
            key: {
              key: {
                deepInnerKey: "string",
                key: {
                  moreDeepInnerKey: "number",
                },
              },
            },
          },
        },
      },
    };
    const e = `{
  key: {
    key: {
      key: {
        key: {
          key: {
            deepInnerKey: "string",
            key: {
              moreDeepInnerKey: "number"
            }
          }
        }
      }
    }
  }
}`;
    expect(stringify(input)).toBe(e);
  });
});
