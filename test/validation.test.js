import {
  checkNumberValue,
  checkSelectValue,
  checkValue
} from "../src/validation/validation";
import { Types } from "../src/constants";

describe("checkNumberValue", () => {
  it("checkNumberValue corner cases", () => {
    expect(() => {
      checkNumberValue(1, null);
    }).toBeTruthy();
    expect(() => {
      checkNumberValue(1, undefined);
    }).toBeTruthy();

    expect(() => {
      checkNumberValue(undefined, { min: 1 });
    }).toThrow();
    expect(() => {
      checkNumberValue("1eifudjk", { min: 1 });
    }).toThrow();
    expect(() => {
      checkNumberValue(null, { min: 1 });
    }).toThrow();
    expect(() => {
      checkNumberValue(null, null);
    }).toThrow();
  });
  it("checkNumberValue with valid inputs", () => {
    expect(checkNumberValue(1, {})).toBeTruthy();
    expect(checkNumberValue(1, { min: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { max: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { step: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { min: 0, step: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { max: 1, step: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { min: 0, max: 1, step: 1 })).toBeTruthy();
    expect(checkNumberValue(1, { min: 0, max: 1, step: 0.1 })).toBeTruthy();

    expect(checkNumberValue(1.1, {})).toBeTruthy();
    expect(checkNumberValue(1.1, { min: 1 })).toBeTruthy();
    expect(checkNumberValue(1.1, { max: 2 })).toBeTruthy();
    expect(checkNumberValue(1.1, { step: 0.1 })).toBeTruthy();
    expect(checkNumberValue(1.1, { min: 0, step: 0.1 })).toBeTruthy();
    expect(checkNumberValue(1.1, { max: 2, step: 0.1 })).toBeTruthy();
    expect(checkNumberValue(1.1, { min: 0, max: 2, step: 0.1 })).toBeTruthy();
    expect(checkNumberValue(1.1, { min: 0, max: 2, step: 0.01 })).toBeTruthy();

    expect(() => {
      checkNumberValue("1", { min: 1 });
    }).toBeTruthy();
  });

  it("checkNumberValue with invalid inputs", () => {
    expect(checkNumberValue(1, { min: 2 })).toBeFalsy();
    expect(checkNumberValue(1, { max: 0 })).toBeFalsy();
    expect(checkNumberValue(1, { min: 2, step: 1 })).toBeFalsy();
    expect(checkNumberValue(1, { max: 0, step: 1 })).toBeFalsy();
    expect(checkNumberValue(1, { min: 2, max: 1, step: 1 })).toBeFalsy();
    expect(checkNumberValue(1, { min: 0, max: 0, step: 0.1 })).toBeFalsy();

    expect(checkNumberValue(1.1, { min: 2.2 })).toBeFalsy();
    expect(checkNumberValue(1.1, { max: 0.5 })).toBeFalsy();
    expect(checkNumberValue(1.1, { step: 1 })).toBeFalsy();
    expect(checkNumberValue(1.1, { step: 0.5 })).toBeFalsy();
    expect(checkNumberValue(1.1, { min: 0, step: 0.5 })).toBeFalsy();
    expect(checkNumberValue(1.1, { max: 0, step: 0.1 })).toBeFalsy();
    expect(checkNumberValue(1.1, { min: 1.4, max: 2, step: 0.1 })).toBeFalsy();
    expect(checkNumberValue(1.1, { min: 0, max: 1, step: 0.01 })).toBeFalsy();
    expect(checkNumberValue(1.1, { min: 0, max: 2, step: 1 })).toBeFalsy();
  });
});

describe("checkSelectValue", () => {
  it("checkSelectValue corner cases", () => {
    expect(() => {
      checkSelectValue(undefined, [1, 2, 3]);
    }).toThrow();
    expect(() => {
      checkSelectValue(null, [1, 2, 3]);
    }).toThrow();
    expect(() => {
      checkSelectValue(1, [null]);
    }).toThrow();
    expect(() => {
      checkSelectValue(1, []);
    }).toThrow();
    expect(() => {
      checkSelectValue(1, null);
    }).toThrow();
    expect(() => {
      checkSelectValue(1, undefined);
    }).toThrow();
    expect(() => {
      checkSelectValue(null, null);
    }).toThrow();
  });

  it("checkSelectValue with valid inputs", () => {
    expect(checkSelectValue(1, [1, 2, 3])).toBeTruthy();
    expect(checkSelectValue(1, [1])).toBeTruthy();
    expect(checkSelectValue(1, [4, 2, 5, 1])).toBeTruthy();
    expect(checkSelectValue("1", ["1", "2"])).toBeTruthy();
    expect(checkSelectValue("one", ["two", "one", "three"])).toBeTruthy();
  });

  it("checkSelectValue with invalid inputs", () => {
    expect(checkSelectValue(4, [1, 2, 3])).toBeFalsy();
    expect(checkSelectValue(2, [1])).toBeFalsy();
    expect(checkSelectValue(3, [4, 2, 5, 1])).toBeFalsy();
    expect(checkSelectValue("3", ["1", "2"])).toBeFalsy();
    expect(checkSelectValue("four", ["two", "one", "three"])).toBeFalsy();
  });
});

describe("checkValue", () => {
  it("checkValue corner cases", () => {
    expect(() => {
      checkValue(1, "unknown", [1, 2, 3]);
    }).toThrow();
    expect(() => {
      checkValue(undefined, Types.SELECT.type, [1, 2, 3]);
    }).toThrow();
    expect(() => {
      checkValue(null, Types.SELECT.type, [1, 2, 3]);
    }).toThrow();
  });

  it("checkValue with valid SELECT inputs", () => {
    expect(checkValue(1, Types.SELECT.type, [1, 2, 3])).toBeTruthy();
    expect(checkValue(1, Types.SELECT.type, [1])).toBeTruthy();
    expect(checkValue(1, Types.SELECT.type, [4, 2, 5, 1])).toBeTruthy();
    expect(checkValue("1", Types.SELECT.type, ["1", "2"])).toBeTruthy();
    expect(
      checkValue("one", Types.SELECT.type, ["two", "one", "three"])
    ).toBeTruthy();
  });

  it("checkValue with invalid SELECT inputs", () => {
    expect(checkValue(4, Types.SELECT.type, [1, 2, 3])).toBeFalsy();
    expect(checkValue(2, Types.SELECT.type, [1])).toBeFalsy();
    expect(checkValue(3, Types.SELECT.type, [4, 2, 5, 1])).toBeFalsy();
    expect(checkValue("3", Types.SELECT.type, ["1", "2"])).toBeFalsy();
    expect(
      checkValue("four", Types.SELECT.type, ["two", "one", "three"])
    ).toBeFalsy();
  });

  it("checkValue with FOLDER corner cases", () => {
    expect(() => {
      checkValue(null, Types.FOLDER.type, null);
    }).toThrow();
    expect(() => {
      checkValue(null, Types.FOLDER.type, null, false);
    }).toThrow();
    expect(() => {
      checkValue(undefined, Types.FOLDER.type, null);
    }).toThrow();
    expect(() => {
      checkValue(undefined, Types.FOLDER.type, null, false);
    }).toThrow();

    expect(checkValue("", Types.FOLDER.type, null, false)).toBeFalsy();
    expect(checkValue("", Types.FOLDER.type, null)).toBeTruthy();
  });
  it("checkValue with valid FOLDER inputs", () => {
    expect(checkValue("ddd", Types.FOLDER.type, null)).toBeTruthy();
    expect(checkValue("1", Types.FOLDER.type, null)).toBeTruthy();
    expect(checkValue("one", Types.FOLDER.type, null)).toBeTruthy();
    expect(checkValue("ddd", Types.FOLDER.type, null, false)).toBeTruthy();
    expect(checkValue("1", Types.FOLDER.type, null, false)).toBeTruthy();
    expect(checkValue("one", Types.FOLDER.type, null, false)).toBeTruthy();
  });

  it("checkValue with invalid FOLDER inputs", () => {
    expect(checkValue(4, Types.FOLDER.type, [1, 2, 3])).toBeFalsy();
    expect(checkValue(2, Types.FOLDER.type, [1])).toBeFalsy();
    expect(checkValue(3, Types.FOLDER.type, [4, 2, 5, 1])).toBeFalsy();
  });

  it("checkValue with TEXT corner cases", () => {
    expect(() => {
      checkValue(null, Types.TEXT.type, null);
    }).toThrow();
    expect(() => {
      checkValue(null, Types.TEXT.type, null, false);
    }).toThrow();
    expect(() => {
      checkValue(undefined, Types.TEXT.type, null);
    }).toThrow();
    expect(() => {
      checkValue(undefined, Types.TEXT.type, null, false);
    }).toThrow();

    expect(checkValue("", Types.TEXT.type, null, false)).toBeFalsy();
    expect(checkValue("", Types.TEXT.type, null)).toBeTruthy();
  });
  it("checkValue with valid TEXT inputs", () => {
    expect(checkValue("ddd", Types.TEXT.type, null)).toBeTruthy();
    expect(checkValue("1", Types.TEXT.type, null)).toBeTruthy();
    expect(checkValue("one", Types.TEXT.type, null)).toBeTruthy();
    expect(checkValue("ddd", Types.TEXT.type, null, false)).toBeTruthy();
    expect(checkValue("1", Types.TEXT.type, null, false)).toBeTruthy();
    expect(checkValue("one", Types.TEXT.type, null, false)).toBeTruthy();
  });

  it("checkValue with invalid TEXT inputs", () => {
    expect(checkValue(4, Types.TEXT.type, [1, 2, 3])).toBeFalsy();
    expect(checkValue(2, Types.TEXT.type, [1])).toBeFalsy();
    expect(checkValue(3, Types.TEXT.type, [4, 2, 5, 1])).toBeFalsy();
  });
});
