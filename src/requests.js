/**
 * This file contains all requests functions to Diva Services server and website
 */

import fetch from "node-fetch";
import {
  BASE_URL,
  SERVICES_API_ENDPOINT,
  EXPERIMENTS_API_ENDPOINT,
  WORKFLOWS_API_ENDPOINT,
  COLLECTIONS_API_ENDPOINT,
  WORKFLOWS_EXECUTION_ENDPOINT,
  SERVICES_EXECUTION_ENDPOINT,
  WORKFLOWS_EXECUTION_VIEW
} from "../config";
import Decorators from "./decorators";
import Constants from "./constants";
const { ExecutionTypes } = Constants;

const getServices = async () => {
  let xml;
  const xmlApi = await fetch(`${BASE_URL}/${SERVICES_API_ENDPOINT}`);
  xml = await xmlApi.text();
  return await Decorators.webservicesDecorator(xml);
};

const getExperimentById = async id => {
  const xmlApi = await fetch(
    `${BASE_URL}/${EXPERIMENTS_API_ENDPOINT}?id=${id}`
  );
  return await Decorators.experimentDecorator(await xmlApi.text());
};

const getWorkflowById = async (id, webservices) => {
  if (webservices === undefined) {
    throw "webservices is not defined";
  }

  let xml;
  const workflow = await fetch(
    `${BASE_URL}/${WORKFLOWS_API_ENDPOINT}?id=${id}`,
    {
      headers: {
        "Content-Type": "text/xml"
      }
    }
  );
  xml = await Decorators.workflowDecorator(await workflow.text(), webservices);

  return xml;
};

const getWorkflowByIdJSON = async id => {
  const workflow = await fetch(
    `${BASE_URL}/${WORKFLOWS_API_ENDPOINT}?id=${id}`,
    {
      headers: {
        "Content-Type": "text/xml"
      }
    }
  );
  return await workflow.text();
};

const getCollections = async () => {
  const xml = await fetch(`${BASE_URL}/${COLLECTIONS_API_ENDPOINT}`);
  return await Decorators.collectionsDecorator(await xml.text());
};

const getServiceById = async id => {
  let xml;
  const service = await fetch(`${BASE_URL}/${SERVICES_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  xml = Decorators.serviceDecorator(await service.text());
  return xml;
};

const uploadCollection = async request => {
  const result = await fetch(`${BASE_URL}/${COLLECTIONS_API_ENDPOINT}`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return result;
};

export const sendExecutionRequestToWorkflow = async (request, id) => {
  const data = await fetch(
    `${BASE_URL}/${WORKFLOWS_EXECUTION_ENDPOINT}?id=${id}`,
    {
      headers: {
        "Content-Type": "text/xml"
      },
      method: "POST",
      body: request
    }
  );
  return await data.text();
};

export const sendExecutionRequestToService = async (request, id) => {
  const data = await fetch(
    `${BASE_URL}/${SERVICES_EXECUTION_ENDPOINT}?id=${id}`,
    {
      headers: {
        "Content-Type": "text/xml"
      },
      method: "POST",
      body: request
    }
  );
  return await data.text();
};

export const sendExecutionRequest = async (type, request, id) => {
  switch (type) {
    case ExecutionTypes.SERVICE: {
      return await sendExecutionRequestToService(request, id);
    }
    case ExecutionTypes.WORKFLOW: {
      return await sendExecutionRequestToWorkflow(request, id);
    }
    default: {
      throw "Unknown execution type " + type;
    }
  }
};

const getExperimentViewUrl = id => {
  return `${BASE_URL}/experiments/${id}/explore`;
};

const getServiceViewUrl = id => {
  return `${BASE_URL}/services/${id}/view`;
};

const getWorkflowExecutionViewUrl = id => {
  return `${BASE_URL}/workflows/${id}/${WORKFLOWS_EXECUTION_VIEW}`;
};

const saveWorkflow = async (xml, id, installation = false) => {
  const install = installation ? "install=true&" : "";

  return await fetch(
    `${BASE_URL}/${WORKFLOWS_API_ENDPOINT}/save?${install}id=${id}`,
    {
      method: "POST",
      body: xml,
      headers: {
        "Content-Type": "text/xml"
      }
    }
  );
};

export default {
  getWorkflowByIdJSON,
  getServiceViewUrl,
  getWorkflowExecutionViewUrl,
  saveWorkflow,
  getCollections,
  getExperimentById,
  getServiceById,
  getServices,
  getWorkflowById,
  uploadCollection,
  sendExecutionRequestToService,
  sendExecutionRequestToWorkflow,
  getExperimentViewUrl,
  sendExecutionRequest
};
