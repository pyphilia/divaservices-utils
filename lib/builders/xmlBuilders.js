"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Run = exports.Steps = exports.SaveRequest = exports.ExecutionRequest = exports.Step = exports.Data = exports.Parameter = void 0;

var _utils = require("../utils");

/**
 * This file contains xml builder functions
 * These functions returns XML content as string
 */

/**
 * Build a parameter element given name and value
 */
const Parameter = (name, value) => {
  (0, _utils.checkString)(name);
  (0, _utils.checkStringNonEmpty)(name);
  const xml = `<Parameter>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Parameter>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
};
/**
 * Build a data element given name and value
 */


exports.Parameter = Parameter;

const Data = (name, value) => {
  (0, _utils.checkString)(name);
  (0, _utils.checkStringNonEmpty)(name);
  const xml = `<Data>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Data>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
};
/**
 * Build a run element given steps
 */


exports.Data = Data;

const Run = steps => {
  const xml = `<Run>
  ${Steps(steps)}
  </Run>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
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

  (0, _utils.checkString)(name);
  (0, _utils.checkStringNonEmpty)(name);
  const xml = `<Step><No>${noInt}</No><Name>
  ${name}
  </Name><Inputs>${inputsXML}</Inputs></Step>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
};
/**
 * Build a step element given number, name and inputs xml string
 */


exports.Step = Step;

const Steps = steps => {
  const xml = `<Steps>${steps}</Steps>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
};
/**
 * Build an execution request xml element
 * this request is send to start an execution
 */


exports.Steps = Steps;

const ExecutionRequest = (runs, jsonRequest) => {
  (0, _utils.checkString)(runs);
  (0, _utils.checkStringNonEmpty)(runs);

  if (typeof jsonRequest !== "object") {
    throw `jsonRequest is not a JSON object`;
  }

  const xml = `<Request>
  <Runs>${runs}</Runs>
  <JsonRequest>${JSON.stringify(jsonRequest)}</JsonRequest>
  </Request>`;
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
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
  (0, _utils.checkXMLString)(xml);
  return (0, _utils.trimString)(xml);
};

exports.SaveRequest = SaveRequest;