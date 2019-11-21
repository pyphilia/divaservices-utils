export const workflowDecorator = (xml, webservices) => {
  const services = [];

  const {
    Id: [id],
    Information,
    Steps: [steps]
  } = xml.WorkflowDefinition;
  // console.log("TCL: workflowDecorator -> steps", steps)
  for (const step of steps.Step) {
    const {
      Id: [stepId],
      No: [stepNo],
      // Name: [stepName],
      Service: [key],
      Inputs: [inputs]
    } = step;

    const {
      Key: [stepKey]
    } = key;
    const currentWebservice = webservices.find(({ id }) => id == stepKey);
    // console.log("TCL: workflowDecorator -> currentWebservice", currentWebservice)
    const {
      inputs: serviceInputs,
      name: serviceName,
      outputs: serviceOutputs
    } = currentWebservice;

    const service = {
      id: stepId,
      no: stepNo,
      inputs: serviceInputs,
      name: serviceName,
      outputs: serviceOutputs
    };

    // WORKFLOW SET DATA -  should be disabled
    const { Parameter, Data } = inputs;
    if (Parameter) {
      for (const input of Parameter) {
        const {
          paramName: [pName],
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
  return { id, Information, services };
};
