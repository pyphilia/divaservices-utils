"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SaveRequest = exports.ExecutionRequest = exports.Steps = exports.Step = exports.Run = exports.Data = exports.Parameter = void 0;

var _utils = _interopRequireDefault(require("../utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file contains xml builder functions
 * These functions returns XML content as string
 */
const {
  trimString,
  checkXMLString,
  checkStringNonEmpty,
  checkString
} = _utils.default;
/**
 * Build a parameter element given name and value
 */

const Parameter = (name, value) => {
  checkString(name);
  checkStringNonEmpty(name);
  const xml = `<Parameter>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Parameter>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build a data element given name and value
 */


exports.Parameter = Parameter;

const Data = (name, value) => {
  checkString(name);
  checkStringNonEmpty(name);
  const xml = `<Data>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Data>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build a run element given steps
 */


exports.Data = Data;

const Run = steps => {
  const xml = `<Run>
  ${Steps(steps)}
  </Run>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build a step element given number, name and inputs xml string
 */


exports.Run = Run;

const Step = (no, name, inputsXML) => {
  if (no == undefined) {
    throw `no {no} is not valid`;
  }

  const noInt = parseInt(no);

  if (isNaN(noInt)) {
    throw `no ${no} is not an integer`;
  }

  checkString(name);
  checkStringNonEmpty(name);
  const xml = `<Step><No>${noInt}</No><Name>
  ${name}
  </Name><Inputs>${inputsXML}</Inputs></Step>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build a step element given number, name and inputs xml string
 */


exports.Step = Step;

const Steps = steps => {
  const xml = `<Steps>${steps}</Steps>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build an execution request xml element
 * this request is send to start an execution
 */


exports.Steps = Steps;

const ExecutionRequest = (runs, jsonRequest) => {
  checkString(runs);
  checkStringNonEmpty(runs);

  if (typeof jsonRequest !== "object") {
    throw `jsonRequest is not a JSON object`;
  }

  const xml = `<Request>
  <Runs>${runs}</Runs>
  <JsonRequest>${JSON.stringify(jsonRequest)}</JsonRequest>
  </Request>`;
  checkXMLString(xml);
  return trimString(xml);
};
/**
 * Build a save request
 */


exports.ExecutionRequest = ExecutionRequest;

const SaveRequest = (steps, request) => {
  const xml = `<Request>
  <JsonRequest>${request}</JsonRequest>
  ${steps}
  </Request>`;
  checkXMLString(xml);
  return trimString(xml);
};

exports.SaveRequest = SaveRequest;
var _default = {
  Parameter,
  Data,
  Step,
  ExecutionRequest,
  SaveRequest,
  Steps,
  Run
};
exports.default = _default;