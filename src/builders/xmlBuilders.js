import DivaServices from "../utils";
const { buildNameForRequest } = DivaServices;

export const Parameter = (name, value) => {
  return `<Parameter>
      <Name>${name}</Name>
      <Value>${value}</Value>
    </Parameter>`;
};

export const Data = (name, value) => {
  return `<Data>
  <Name>${name}</Name>
  <Value>${value}</Value>
</Data>`;
};

export const Step = (no, name, inputsXML) => {
  return `<Step><No>${no}</No><Name>
    ${buildNameForRequest(name)}
    </Name><Inputs>${inputsXML}</Inputs></Step>`;
};

export const ExecutionRequest = (steps, jsonRequest) => {
  return `<Request>
  <Steps>${steps}</Steps>
  <JsonRequest>${JSON.stringify(jsonRequest)}</JsonRequest>
  </Request>`;
};

export const SaveRequest = (steps, request) => {
  return `<Request>
  <JsonRequest>${request}</JsonRequest>
  ${steps}
</Request>`;
};

export default { Parameter, Data, Step, ExecutionRequest, SaveRequest };
