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

// const getResults = async url => {
//   let result;
//   const xmlApi = await fetch(url);
//   result = await xmlApi.json();
//   return result;
// };

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

const uploadCollectionAPI = async request => {
  const result = await fetch(`${BASE_URL}/${COLLECTIONS_API_ENDPOINT}`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return result;
};

const buildFileUrlFromCollectionAndName = (collection, name) => {
  return `${DIVASERVICES_BASE_URL}/${FILES_ENDPOINT}/${collection}/original/${name}`;
};

const buildFileUrlFromIdentifier = identifier => {
  const [collection, name] = identifier.split("/");
  return buildFileUrlFromCollectionAndName(collection, name);
};

export default {
  uploadCollectionAPI,
  getExperimentById,
  getServiceById,
  getServices,
  getWorkflowById,
  buildFileUrlFromCollectionAndName,
  buildFileUrlFromIdentifier
};
