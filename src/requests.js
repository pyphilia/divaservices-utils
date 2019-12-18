import fetch from "node-fetch";
import {
  BASE_URL,
  SERVICES_API_ENDPOINT,
  EXPERIMENTS_API_ENDPOINT,
  WORKFLOWS_API_ENDPOINT,
  COLLECTIONS_API_ENDPOINT,
  DIVASERVICES_BASE_URL,
  FILES_ENDPOINT
} from "../config";
import Decorators from "./decorators";

const getServices = async () => {
  let xml;
  const xmlApi = await fetch(`${BASE_URL}/${SERVICES_API_ENDPOINT}`);
  xml = await xmlApi.text();
  return await Decorators.webservicesDecorators(xml);
};

const getExperimentById = async id => {
  const xmlApi = await fetch(
    `${BASE_URL}/${EXPERIMENTS_API_ENDPOINT}?id=${id}`
  );
  return await Decorators.experimentDecorator(await xmlApi.text());
};

const getWorkflowById = async id => {
  let xml;
  const workflow = await fetch(
    `${BASE_URL}/${WORKFLOWS_API_ENDPOINT}?id=${id}`,
    {
      headers: {
        "Content-Type": "text/xml"
      }
    }
  );
  xml = await Decorators.workflowDecorator(await workflow.text());

  return xml;
};

const getCollections = async () => {
  const xml = await fetch(COLLECTIONS_API);
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
    `${BASE_URL}/workflows/${id}/${WORKFLOWS_EXECUTION_ENDPOINT}`,
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
  const data = await fetch(`${BASE_URL}/services/${id}/execution`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return await data.text();
};

const buildFileUrlFromCollectionAndName = (collection, name) => {
  return `${DIVASERVICES_BASE_URL}/${FILES_ENDPOINT}/${collection}/original/${name}`;
};

const buildFileUrlFromIdentifier = identifier => {
  const [collection, name] = identifier.split("/");
  return buildFileUrlFromCollectionAndName(collection, name);
};

const getExperimentViewUrl = id => {
  return `${BASE_URL}/experiments/${id}/explore`;
};

export default {
  getCollections,
  getExperimentById,
  getServiceById,
  getServices,
  getWorkflowById,
  buildFileUrlFromCollectionAndName,
  buildFileUrlFromIdentifier,
  uploadCollection,
  sendExecutionRequestToService,
  sendExecutionRequestToWorkflow,
  getExperimentViewUrl
};
