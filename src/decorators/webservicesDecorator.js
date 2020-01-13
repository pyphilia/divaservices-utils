/**
 * This file contains both decorators to traslate
 * a given webservices or single service xml file to an equivalent JSON file
 */

import { createXml2jsPromise } from "./utils";
import Constants from "../constants.js";
const { Types } = Constants;

/**
 * builds input data
 */
const buildDataInformation = data => {
  if (data.MimeTypes) {
    const {
      MimeTypes: [mimeTypes]
    } = data;
    // handle file and folder cases
    const type =
      mimeTypes.Default[0] === Types.FOLDER.type
        ? Types.FOLDER.type
        : Types.FILE.type;
    return {
      type,
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
      type: Types.SELECT.type
    };
  } else if (data.Type[0].StepNumberType) {
    const { Default, Min, Max, Step } = data.Type[0].StepNumberType[0];
    const res = {
      type: Types.NUMBER.type,
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
  const { Data, Parameter, Text, Highlighter } = inputsData;

  const inputs = [];
  if (Data) {
    for (const paramData of Data) {
      const {
        Description: [description],
        Name: [name]
      } = paramData;
      const { type, allowed, defaultValue } = buildDataInformation(paramData);
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
      const { type, defaultValue, values } = buildDataInformation(parameter);
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

  if (Text) {
    for (const text of Text) {
      const {
        Description: [description],
        Name: [name],
        Default
      } = text;
      const param = {
        description,
        name,
        type: Types.TEXT.type
      };
      if (Default) {
        param.defaultValue = Default[0];
      }
      inputs.push(param);
    }
  }

  if (Highlighter) {
    // @TODO
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

      const { type, allowed } = buildDataInformation(output);
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
