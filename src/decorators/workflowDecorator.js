import { createXml2jsPromise } from "./utils";

const workflowDecorator = async (xmlFile, webservices) => {
  const xml = await createXml2jsPromise(xmlFile);
  const services = [];

  const {
    Id: [id],
    Information: [inf],
    Steps: [steps]
  } = xml.Workflow;

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
      category,
      description: serviceDescription
    } = currentWebservice;

    const service = {
      no: stepNo,
      inputs: JSON.parse(JSON.stringify(serviceInputs)), // deep clone, otherwise it shares inputs with same named services
      name: serviceName,
      outputs: serviceOutputs,
      description: serviceDescription,
      expectedRuntime,
      category,
      serviceId: parseInt(stepKey)
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
          Value,
          Path
        } = input;
        const serviceInput = service.inputs.find(({ name }) => name == pName);

        if (Value) {
          const {
            Ref: [ref],
            ServiceOutputName: [serviceOutputName]
          } = Value[0].WorkflowStep[0]; // @TODO multiple ones
          serviceInput.definedValue = { ref, serviceOutputName };
        }
        // defined workflow value with existing image
        else if (Path) {
          serviceInput.definedValue = { path: Path[0] };
        }
      }
    }

    services.push(service);
  }
  return { id, information, services };
};

export default workflowDecorator;
