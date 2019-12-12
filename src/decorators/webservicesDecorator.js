/**
 * This file contains both decorators to traslate
 * a given webservices or single service xml file to an equivalent JSON file
 */

import { createXml2jsPromise } from "./utils";

const getTypeName = data => {
  if (data.MimeTypes) {
    const {
      MimeTypes: [mimeTypes]
    } = data;
    return {
      type: "file",
      allowed: mimeTypes.Allowed,
      defaultValue: mimeTypes.Default[0]
    };
  } else if (data.Type[0].EnumeratedType) {
    const {
      Default: [defaultValue],
      Value
    } = data.Type[0].EnumeratedType[0];
    return {
      defaultValue,
      values: Value,
      type: "select"
    };
  } else if (data.Type[0].StepNumberType) {
    const { Default, Min, Max, Step } = data.Type[0].StepNumberType[0];
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

export const serviceDecorator = async xml => {
  const json = await createXml2jsPromise(xml);
  return _serviceDecorator(json.Service);
};

export const _serviceDecorator = xml => {
  const {
    Id: [id],
    Information: [information],
    API: [api]
  } = xml;
  const {
    Name: [name],
    Description: [description],
    Category: [category],
    ExpectedRuntime
  } = information;
  const {
    Inputs: [inputsData],
    Outputs: [outputsData],
    EndPoint: [endpoint],
    BaseURL: [baseurl]
  } = api;
  const { Data, Parameter } = inputsData;

  const inputs = [];
  if (Data) {
    for (const paramData of Data) {
      const {
        Description: [description],
        Name: [name]
      } = paramData;
      const { type, allowed, defaultValue } = getTypeName(paramData);
      const param = {
        description,
        name,
        type,
        mimeTypes: { allowed, defaultValue }
      };
      inputs.push(param);
    }
  }

  if (Parameter) {
    for (const parameter of Parameter) {
      const {
        Description: [description],
        Name: [name]
      } = parameter;
      const { type, defaultValue, values } = getTypeName(parameter);
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
        Name: [name]
      } = output;

      let description;
      if (Description) {
        description = Description[0];
      }

      const { type, allowed } = getTypeName(output);
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
    category,
    description,
    method: `${baseurl}/${endpoint}`,
    expectedRuntime: ExpectedRuntime ? ExpectedRuntime[0] : undefined,
    inputs,
    outputs
  };
};

export const webservicesDecorator = async xmlFile => {
  const xml = await createXml2jsPromise(xmlFile);
  const json = [];
  for (const s of xml.Services.Service) {
    const service = _serviceDecorator(s);
    json.push(service);
  }
  return json;
};
