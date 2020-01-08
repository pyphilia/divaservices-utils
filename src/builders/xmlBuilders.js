/**
 * This file contains xml builder functions
 * These functions returns XML content as string
 */

import DivaServices from "../utils";
const { buildNameForRequest, trimString } = DivaServices;

/**
 * Build a parameter element given name and value
 */
export const Parameter = (name, value) => {
  const xml = `<Parameter>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Parameter>`;
  return trimString(xml);
};

/**
 * Build a data element given name and value
 */
export const Data = (name, value) => {
  const xml = `<Data>
  <Name>${name}</Name>
  <Value>${value}</Value>
  </Data>`;
  return trimString(xml);
};

/**
 * Build a step element given number, name and inputs xml string
 */
export const Step = (no, name, inputsXML) => {
  const xml = `<Step><No>${no}</No><Name>
  ${buildNameForRequest(name)}
  </Name><Inputs>${inputsXML}</Inputs></Step>`;
  return trimString(xml);
};

/**
 * Build an execution request xml element
 * this request is send to start an execution
 */
export const ExecutionRequest = (steps, jsonRequest) => {
  const xml = `<Request>
  <Steps>${steps}</Steps>
  <JsonRequest>${JSON.stringify(jsonRequest)}</JsonRequest>
  </Request>`;
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
  return trimString(xml);
};

export default { Parameter, Data, Step, ExecutionRequest, SaveRequest };
