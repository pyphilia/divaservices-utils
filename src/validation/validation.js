import { Types } from "../constants";

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

const checkValue = (value, type, values) => {
  let isValid = true;
  switch (type) {
    case Types.NUMBER.type: {
      let { min, max, step } = values;
      min = parseFloat(min);
      max = parseFloat(max);
      const minCondition = min ? value >= min : true;
      const maxCondition = max ? value <= max : true;

      // because of js inconsistency with float computations
      // we transform it to a string, round it to the the least precision
      // and check if it is a integer, so whether it matches the step
      const stepCondition = checkStep(step, value);
      isValid = minCondition && maxCondition && stepCondition;
    }
  }
  return isValid;
};

export default { checkValue };
