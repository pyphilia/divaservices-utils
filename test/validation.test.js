import Validation from "../src/validation/validation"
const {checkValue} = Validation;
import Constants from "../src/constants"

describe('Type: NUMBER', () => {

  it('checkValue with valid inputs', () => {
    const SELECT = Constants.Types.NUMBER.type;
    expect(checkValue(1, SELECT, {})).toBeTruthy()
    expect(checkValue(1, SELECT, {min:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {max:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {step:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {min:0, step:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {max:1, step:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {min:0, max:1, step:1})).toBeTruthy()
    expect(checkValue(1, SELECT, {min:0, max:1, step:0.1})).toBeTruthy()
  
    expect(checkValue(1.1, SELECT, {})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {min:1})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {max:2})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {step:0.1})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {min:0, step:0.1})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {max:2, step:0.1})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {min:0, max:2, step:0.1})).toBeTruthy()
    expect(checkValue(1.1, SELECT, {min:0, max:2, step:0.01})).toBeTruthy()
  });

  it('checkValue with invalid inputs', () => {
    const SELECT = Constants.Types.NUMBER.type;
    expect(checkValue(1, SELECT, {min:2})).toBeFalsy()
    expect(checkValue(1, SELECT, {max:0})).toBeFalsy()
    expect(checkValue(1, SELECT, {min:2, step:1})).toBeFalsy()
    expect(checkValue(1, SELECT, {max:0, step:1})).toBeFalsy()
    expect(checkValue(1, SELECT, {min:2, max:1, step:1})).toBeFalsy()
    expect(checkValue(1, SELECT, {min:0, max:0, step:0.1})).toBeFalsy()
  
    expect(checkValue(1.1, SELECT, {min:2.2})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {max:0.5})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {step:1})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {step:0.5})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {min:0, step:0.5})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {max:0, step:0.1})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {min:1.4, max:2, step:0.1})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {min:0, max:1, step:0.01})).toBeFalsy()
    expect(checkValue(1.1, SELECT, {min:0, max:2, step:1})).toBeFalsy()
  });

})