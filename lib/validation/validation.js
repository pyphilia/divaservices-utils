"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkValue = exports.checkSelectValue = exports.checkNumberValue = void 0;

var _constants = require("../constants.js");

var _utils = require("../utils");

/**
 * This file contains validation function
 */

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
    const valueFloat = parseFloat(currentVal / step); // case step = 1

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
  let valueFloat = value;

  if (typeof value !== "number") {
    valueFloat = parseFloat(value);

    if (isNaN(valueFloat) || valueFloat != value) {
      throw `value ${value} is not a number`;
    }
  }

  let isValid = true;

  if (values) {
    let {
      min,
      max,
      step
    } = values;
    min = parseFloat(min);
    max = parseFloat(max);
    const minCondition = !isNaN(min) ? valueFloat >= min : true;
    const maxCondition = !isNaN(max) ? valueFloat <= max : true;
    const stepCondition = checkStep(step, valueFloat);
    isValid = minCondition && maxCondition && stepCondition;
  }

  return isValid;
};
/** return whether value is a valid value given possible values
 * suppose that value and values inputs are strings
 */


exports.checkNumberValue = checkNumberValue;

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


exports.checkSelectValue = checkSelectValue;

const checkValue = (value, type, values, allowEmptyValue = true) => {
  if (value == undefined) {
    throw "value is not valid: " + value;
  }

  (0, _utils.checkType)(type);
  let isValid;

  switch (type) {
    case _constants.Types.NUMBER.type:
      isValid = checkNumberValue(value, values);
      break;

    case _constants.Types.SELECT.type:
      isValid = checkSelectValue(value, values);
      break;

    case _constants.Types.TEXT.type:
    case _constants.Types.FOLDER.type:
      // no validation for text types
      isValid = typeof value === "string";
      break;

    default:
      throw `Type ${type} unknown`;
  }

  const emptyCondition = allowEmptyValue || value !== undefined && value.length !== 0;
  return isValid && emptyCondition;
};

exports.checkValue = checkValue;