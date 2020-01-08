/**
 * This file contains a decorator to traslate the
 * given webservices xml file to an equivalent JSON file
 */

import { createXml2jsPromise } from "./utils";

const experimentDecorator = async xml => {
  const data = (await createXml2jsPromise(xml)).Response;

  const additionalInfos = {};
  const { ServiceName, Steps } = data.Infos[0];

  if (ServiceName) {
    additionalInfos.serviceName = ServiceName[0];
  } else if (Steps) {
    additionalInfos.steps = {};
    for (const step of Steps[0].Step) {
      additionalInfos.steps[step.No[0]] = step.Name[0];
    }
  } else {
    throw "This Experiment is not from Service nor Workflow";
  }

  const {
    Information,
    Id: [id],
    Workflow,
    Service
  } = data.Experiment[0];

  const {
    Name: [name],
    Author: [author],
    Datetime: [datetime]
  } = Information[0];

  let stepsData;
  let type;
  if (Workflow) {
    type = { workflow: parseInt(Workflow[0].Key[0]) };
    stepsData = Workflow[0].Steps[0].Step;
  } else if (Service) {
    type = { service: parseInt(Service[0].Key[0]) };
    stepsData = Service;
  } else {
    throw "This Experiment is not from Service nor Workflow";
  }

  const steps = [];
  for (const step of stepsData) {
    const info = {};
    if (Workflow) {
      const {
        No: [no]
      } = step;
      info.name = additionalInfos.steps[no];
      info.no = no;
    } else {
      info.name = additionalInfos.serviceName;
    }

    const {
      Inputs: [Inp],
      Outputs: [Out]
    } = step;

    /* Inputs */
    const inputs = { parameters: {}, data: {} };

    if (Inp.Parameter) {
      for (const param of Inp.Parameter) {
        inputs.parameters[param.Name[0]] = param.Value[0];
      }
    }
    if (Inp.Data) {
      for (const d of Inp.Data) {
        inputs.data[d.Name[0]] = d.Value[0];
      }
    }

    /* Outputs */
    const outputs = { files: [], data: {} };
    for (const param of Out.Collection[0].Files[0].File) {
      const {
        Name: [name],
        Options: [Opt],
        Type,
        Url: [url],
        "Mime-type": [mimeType]
      } = param;
      const type = Type ? Type[0] : "unknown";
      const file = { name, type, url, mimeType };
      file.options = {};
      for (const [k, [v]] of Object.entries(Opt)) {
        file.options[k] = v;
      }

      outputs.files.push(file);
    }

    steps.push({ inputs, outputs, ...info });
  }

  return {
    id: parseInt(id),
    ...type,
    information: {
      name,
      author,
      datetime
    },
    steps
  };
};

export default experimentDecorator;
