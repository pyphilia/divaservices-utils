"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sendExecutionRequest = exports.sendExecutionRequestToService = exports.sendExecutionRequestToWorkflow = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _config = require("../config");

var _decorators = _interopRequireDefault(require("./decorators"));

var _constants = _interopRequireDefault(require("./constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This file contains all requests functions to Diva Services server and website
 */
const {
  ExecutionTypes
} = _constants.default;

const getServices = async () => {
  let xml;
  const xmlApi = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.SERVICES_API_ENDPOINT}`);
  xml = await xmlApi.text();
  return await _decorators.default.webservicesDecorator(xml);
};

const getExperimentById = async id => {
  const xmlApi = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.EXPERIMENTS_API_ENDPOINT}?id=${id}`);
  return await _decorators.default.experimentDecorator((await xmlApi.text()));
};

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
  xml = await _decorators.default.workflowDecorator((await workflow.text()), webservices);
  return xml;
};

const getWorkflowByIdJSON = async id => {
  const workflow = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.WORKFLOWS_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  return await workflow.text();
};

const getCollections = async () => {
  const xml = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.COLLECTIONS_API_ENDPOINT}`);
  return await _decorators.default.collectionsDecorator((await xml.text()));
};

const getServiceById = async id => {
  let xml;
  const service = await (0, _nodeFetch.default)(`${_config.BASE_URL}/${_config.SERVICES_API_ENDPOINT}?id=${id}`, {
    headers: {
      "Content-Type": "text/xml"
    }
  });
  xml = _decorators.default.serviceDecorator((await service.text()));
  return xml;
};

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
    case ExecutionTypes.SERVICE:
      {
        return await sendExecutionRequestToService(request, id);
      }

    case ExecutionTypes.WORKFLOW:
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

const getServiceViewUrl = id => {
  return `${_config.BASE_URL}/services/${id}/view`;
};

const getWorkflowExecutionViewUrl = id => {
  return `${_config.BASE_URL}/workflows/${id}/${_config.WORKFLOWS_EXECUTION_VIEW}`;
};

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

var _default = {
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
exports.default = _default;