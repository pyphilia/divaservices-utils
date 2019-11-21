/**
 * This file contains a decorator to traslate the
 * given webservices xml file to an equivalent JSON file
 */

const getTypeName = type => {
  if (type.File) {
    const {
      MimeTypes: [mimeTypes]
    } = type.File[0];
    return { type: "file", allowed: mimeTypes.Allowed };
  } else if (type.Folder) {
    return { type: "folder" };
  } else if (type.EnumeratedType) {
    const {
      Default: [defaultValue],
      Value
    } = type.EnumeratedType[0];
    return {
      defaultValue,
      values: Value,
      type: "select"
    };
  } else if (type.StepNumberType) {
    const { Default, Min, Max, Step } = type.StepNumberType[0];
    const res = {
      type: "number",
      values: {}
    };
    if (Min) {
      res.values.min = Min[0];
    }
    if (Max) {
      res.values.max = Max[0];
    }
    if (Step) {
      res.values.step = Step[0];
    }
    if (Default) {
      res.defaultValue = Default[0];
    }
    return res;
  }
};

export const serviceDecorator = xml => {
  const {
    Id: [id],
    Information: [information],
    API: [api]
  } = xml;
  const {
    Name: [name],
    Description: [description],
    Type: [type]
  } = information;
  const {
    Inputs: [inputsData],
    Outputs: [outputsData]
  } = api;
  const { Data, Parameter } = inputsData;

  const inputs = [];
  if (Data) {
    for (const paramData of Data) {
      const {
        Description: [description],
        Name: [name],
        Type: [typeData]
      } = paramData;
      const { type, allowed } = getTypeName(typeData);
      const param = {
        description,
        name,
        type,
        mimeTypes: { allowed }
      };
      inputs.push(param);
    }
  }

  if (Parameter) {
    for (const parameter of Parameter) {
      const {
        Description: [description],
        Name: [name],
        Type: [typeData]
      } = parameter;
      const { type, defaultValue, values } = getTypeName(typeData);
      const param = {
        description,
        name,
        type,
        values,
        defaultValue
      };
      inputs.push(param);
    }
  }

  const outputs = [];
  if (outputsData) {
    for (const output of outputsData.Output) {
      const {
        Description,
        Name: [name],
        Type: [typeData]
      } = output;

      let description;
      if (Description) {
        description = Description[0];
      }

      const { type, allowed } = getTypeName(typeData);
      const out = {
        description,
        name,
        type,
        mimeTypes: { allowed }
      };
      outputs.push(out);
    }
  }

  return {
    id: parseInt(id),
    name,
    type,
    description,
    inputs,
    outputs
  };
};

export const webservicesDecorator = xml => {
  const json = [];
  for (const s of xml.Services.Service) {
    const service = serviceDecorator(s);
    json.push(service);
  }
  return json;
};
