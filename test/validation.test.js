import Validation from "../src/validation/validation";
const { checkNumberValue, checkSelectValue } = Validation;

describe("checkNumberValue", () => {
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
