import { createXml2jsPromise } from "./utils";

const workflowDecorator = async (xmlFile, webservices) => {
  const xml = await createXml2jsPromise(xmlFile);
  const services = [];

  const {
    Id: [id],
    Information: [inf],
    Steps: [steps]
  } = xml.WorkflowDefinition;

  const information = {};
  for (const [k, v] of Object.entries(inf)) {
    //@TODO
    information[k.toLowerCase()] = v[0];
  }

  for (const step of steps.Step) {
    const {
      No: [stepNo],
      // Name: [stepName],
      Service: [key],
      Inputs: [inputs]
    } = step;

    const {
      Key: [stepKey]
    } = key;
    const currentWebservice = webservices.find(({ id }) => id == stepKey);

    const {
      inputs: serviceInputs,
      name: serviceName,
      outputs: serviceOutputs,
      expectedRuntime,
      type,
      description: serviceDescription
    } = currentWebservice;

    const service = {
      no: stepNo,
      inputs: JSON.parse(JSON.stringify(serviceInputs)), // deep clone, otherwise it shares inputs with same named services
      name: serviceName,
      outputs: serviceOutputs,
      description: serviceDescription,
      expectedRuntime,
      type
    };

    const { Parameter, Data } = inputs;
    if (Parameter) {
      for (const input of Parameter) {
        const {
          Name: [pName],
          Value: [value]
        } = input;

        const serviceInput = service.inputs.find(({ name }) => name == pName);
        serviceInput.definedValue = value;
      }
    }
    if (Data) {
      for (const input of Data) {
        const {
          Name: [pName],
          Value: [value]
        } = input;
        const {
          Ref: [ref],
          ServiceOutputName: [serviceOutputName]
        } = value.WorkflowStep[0]; // @TODO multiple ones
        const serviceInput = service.inputs.find(({ name }) => name == pName);
        serviceInput.definedValue = { ref, serviceOutputName };
      }
    }

    services.push(service);
  }
  return { id, information, services };
};

export default workflowDecorator;
