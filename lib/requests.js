"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendExecutionRequest = exports.getExperimentViewUrl = exports.sendExecutionRequestToWorkflow = exports.sendExecutionRequestToService = exports.uploadCollection = exports.getWorkflowById = exports.getServices = exports.getServiceById = exports.getExperimentById = exports.getCollections = exports.saveWorkflow = exports.getWorkflowExecutionViewUrl = exports.getServiceViewUrl = exports.getWorkflowByIdJSON = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _config = require("../config");

var Decorators = _interopRequireWildcard(require("./decorators"));

var _constants = require("./constants");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file contains all requests functions to Diva Services server and website
 */
const getServices = async () => {
  let xml;
  const xmlApi = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.SERVICES_API_ENDPOINT}`);
  xml = await xmlApi.text();
  return await Decorators.webservicesDecorator(xml);
};

exports.getServices = getServices;

const getExperimentById = async id => {
  const xmlApi = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.EXPERIMENTS_API_ENDPOINT}?id=${id}`);
  return await Decorators.experimentDecorator((await xmlApi.text()));
};

exports.getExperimentById = getExperimentById;

const getWorkflowById = async (id, webservices) => {
  if (webservices === undefined) {
    throw "webservices is not defined";
  }

  let xml;
  const workflow = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.WORKFLOWS_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  xml = await Decorators.workflowDecorator((await workflow.text()), webservices);
  return xml;
};

exports.getWorkflowById = getWorkflowById;

const getWorkflowByIdJSON = async id => {
  const workflow = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.WORKFLOWS_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  return await workflow.text();
};

exports.getWorkflowByIdJSON = getWorkflowByIdJSON;

const getCollections = async () => {
  const xml = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.COLLECTIONS_API_ENDPOINT}`);
  return await Decorators.collectionsDecorator((await xml.text()));
};

exports.getCollections = getCollections;

const getServiceById = async id => {
  let xml;
  const service = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.SERVICES_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  xml = Decorators.serviceDecorator((await service.text()));
  return xml;
};

exports.getServiceById = getServiceById;

const uploadCollection = async request => {
  const result = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.COLLECTIONS_API_ENDPOINT}`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return result;
};

exports.uploadCollection = uploadCollection;

const sendExecutionRequestToWorkflow = async (request, id) => {
  const data = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.WORKFLOWS_EXECUTION_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return await data.text();
};

exports.sendExecutionRequestToWorkflow = sendExecutionRequestToWorkflow;

const sendExecutionRequestToService = async (request, id) => {
  const data = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.SERVICES_EXECUTION_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    },
    method: "POST",
    body: request
  });
  return await data.text();
};

exports.sendExecutionRequestToService = sendExecutionRequestToService;

const sendExecutionRequest = async (type, request, id) => {
  switch (type) {
    case _constants.ExecutionTypes.SERVICE:
      {
        return await sendExecutionRequestToService(request, id);
      }

    case _constants.ExecutionTypes.WORKFLOW:
      {
        return await sendExecutionRequestToWorkflow(request, id);
      }

    default:
      {
        throw "Unknown execution type " + type;
      }
  }
};

exports.sendExecutionRequest = sendExecutionRequest;

const getExperimentViewUrl = id => {
  return `${_config.BASE_URL}/experiments/${id}/explore`;
};

exports.getExperimentViewUrl = getExperimentViewUrl;

const getServiceViewUrl = id => {
  return `${_config.BASE_URL}/services/${id}/view`;
};

exports.getServiceViewUrl = getServiceViewUrl;

const getWorkflowExecutionViewUrl = id => {
  return `${_config.BASE_URL}/workflows/${id}/${_config.WORKFLOWS_EXECUTION_VIEW}`;
};

exports.getWorkflowExecutionViewUrl = getWorkflowExecutionViewUrl;

const saveWorkflow = async (xml, id, installation = false) => {
  const install = installation ? "install=true&" : "";
  return await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.WORKFLOWS_API_ENDPOINT}/save?${install}id=${id}`, {
    method: "POST",
    body: xml,
    headers: {
      "Content-Type": "text/xml"
    }
  });
};

exports.saveWorkflow = saveWorkflow;