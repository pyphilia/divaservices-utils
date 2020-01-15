/**
 * This file contains xml builder functions
 * These functions returns XML content as string
 */

import DivaServices from "../utils";
const { trimString } = DivaServices;

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
 * Build a run element given steps
 */
export const Run = steps => {
  const xml = `<Run>
  ${Steps(steps)}
  </Run>`;
  return trimString(xml);
};

/**
 * Build a step element given number, name and inputs xml string
 */
export const Step = (no, name, inputsXML) => {
  const xml = `<Step><No>${no}</No><Name>
  ${name}
  </Name><Inputs>${inputsXML}</Inputs></Step>`;
  return trimString(xml);
};

/**
 * Build a step element given number, name and inputs xml string
 */
export const Steps = steps => {
  const xml = `<Steps>${steps}</Steps>`;
  return trimString(xml);
};

/**
 * Build an execution request xml element
 * this request is send to start an execution
 */
export const ExecutionRequest = (runs, jsonRequest) => {
  const xml = `<Request>
  <Runs>${runs}</Runs>
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

export default {
  Parameter,
  Data,
  Step,
  ExecutionRequest,
  SaveRequest,
  Steps,
  Run
};
