/**
 * This file contains xml builder functions
 * These functions returns XML content as string
 */

import DivaServices from "../utils";
const {
  trimString,
  checkXMLString,
  checkStringNonEmpty,
  checkString
} = DivaServices;

/**
 * Build a parameter element given name and value
 */
export const Parameter = (name, value) => {
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
export const Data = (name, value) => {
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
export const Run = steps => {
  const xml = `<Run>
  ${Steps(steps)}
  </Run>`;
  checkXMLString(xml);
  return trimString(xml);
};

/**
 * Build a step element given number, name and inputs xml string
 */
export const Step = (no, name, inputsXML) => {
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
export const Steps = steps => {
  const xml = `<Steps>${steps}</Steps>`;
  checkXMLString(xml);
  return trimString(xml);
};

/**
 * Build an execution request xml element
 * this request is send to start an execution
 */
export const ExecutionRequest = (runs, jsonRequest) => {
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
export const SaveRequest = (steps, request) => {
  const xml = `<Request>
  <JsonRequest>${request}</JsonRequest>
  ${steps}
  </Request>`;
  checkXMLString(xml);
  return trimString(xml);
};

export default {
  Parameter,
  Data,
  Step,
  ExecutionRequest,
  SaveRequest,
  Steps,
  Run
};
