import Constants from "../constants.js";
const { Types } = Constants;

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

const checkNumberValue = (value, values) => {
  let isValid = true;
  let { min, max, step } = values;
  min = parseFloat(min);
  max = parseFloat(max);
  const minCondition = !isNaN(min) ? value >= min : true;
  const maxCondition = !isNaN(max) ? value <= max : true;

  // because of js inconsistency with float computations
  // we transform it to a string, round it to the the least precision
  // and check if it is a integer, so whether it matches the step
  const stepCondition = checkStep(step, value);
  isValid = minCondition && maxCondition && stepCondition;

  return isValid;
};

// return whether value is a valid value given possible values
// suppose that value and values inputs are strings
const checkSelectValue = (value, values) => {
  return values.indexOf(value) >= 0;
};

const checkValue = (value, type, values) => {
  let isValid;
  switch (type) {
    case Types.NUMBER.type:
      isValid = checkNumberValue(value, values);
      break;
    case Types.SELECT.type:
      isValid = checkSelectValue(value, values);
      break;
    default:
      throw `Type ${type} unknown`;
  }
  return isValid;
};

export default { checkNumberValue, checkSelectValue, checkValue };
