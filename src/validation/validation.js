/**
 * This file contains validation function
 */

import Constants from "../constants.js";
const { Types } = Constants;
import DivaServices from "../utils";
const { checkType } = DivaServices;
/**
 * check whether currentVal verifies the given step
 * or less precise
 */
// because of js inconsistency with float computations
// we transform it to a string, round it to the the least precision
// and check if it is a integer, so whether it matches the step
const checkStep = (step, currentVal) => {
  let checkStep = true;
  if (step) {
    const valueFloat = parseFloat(currentVal / step);

    // case step = 1
    if (step == 1) {
      return valueFloat == parseInt(currentVal);
    }

    const stepNumber = step.toString().split(".");
    let precision = 0;
    if (stepNumber.length == 1) {
      precision = 0;
    } else {
      precision = stepNumber[1].length + 1;
    }
    checkStep = Number.isInteger(+valueFloat.toFixed(precision));
  }
  return checkStep;
};

/**
 * check a number value. It must satisfy, if the constrain is specified:
 * number > min
 * number < max
 * checkStep(number)
 */
const checkNumberValue = (value, values) => {
  let valueInt = value;
  if (typeof value !== "number") {
    valueInt = parseFloat(value);
  }

  let isValid = true;
  if (values) {
    let { min, max, step } = values;
    min = parseFloat(min);
    max = parseFloat(max);
    const minCondition = !isNaN(min) ? valueInt >= min : true;
    const maxCondition = !isNaN(max) ? valueInt <= max : true;
    const stepCondition = checkStep(step, valueInt);
    isValid = minCondition && maxCondition && stepCondition;
  }

  return isValid;
};

/** return whether value is a valid value given possible values
 * suppose that value and values inputs are strings
 */
const checkSelectValue = (value, values) => {
  if (value == undefined) {
    throw "value is not valid: " + value;
  }
  if (!values || values.filter(el => el).length == 0) {
    throw "values is not valid: " + values;
  }
  return values.indexOf(value) >= 0;
};

/**
 * generic validation check, redirects to correct
 * validation function depending on the type
 */
const checkValue = (value, type, values, allowEmptyValue = true) => {
  if (value == undefined) {
    throw "value is not valid: " + value;
  }

  checkType(type);

  let isValid;
  switch (type) {
    case Types.NUMBER.type:
      isValid = checkNumberValue(value, values);
      break;
    case Types.SELECT.type:
      isValid = checkSelectValue(value, values);
      break;
    case Types.TEXT.type:
    case Types.FOLDER.type:
      // no validation for text types
      isValid = typeof value === "string";
      break;
    default:
      throw `Type ${type} unknown`;
  }
  const emptyCondition =
    allowEmptyValue || (value !== undefined && value.length !== 0);
  return isValid && emptyCondition;
};

export default { checkNumberValue, checkSelectValue, checkValue };
