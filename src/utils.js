import { DIVASERVICES_BASE_URL, FILES_ENDPOINT } from "../config";
import Constants from "./constants";

/**
 * Build name for request
 * Used for service and workflow name
 */
const buildServiceNameForRequest = (name, id) => {
  return `${name.replace(/\s/g, "")}-${id}`;
};

/**
 * Build input name for request
 */
const buildInputName = str => {
  return str.replace(/\s/g, "");
};

/**
 * Build input name for service
 * used to build workflow execution request (parameter key)
 */
const buildInputNameForWorkflow = (serviceName, inputName) => {
  return `${buildInputName(serviceName)}_${buildInputName(inputName)}`;
};

/**
 * Build input name for service
 * used to build workflow execution request (parameter key)
 */
const buildInputNameForRequest = (isService, serviceName, inputName) => {
  return isService
    ? inputName
    : buildInputNameForWorkflow(serviceName, inputName);
};

/**
 * Build input reference name
 * used to build workflow execution request (input reference name)
 */
const buildInputReferenceName = (serviceName, inputName) => {
  return `$${serviceName}/$${inputName}`;
};

/**
 * retrieve parameters from url
 * by default, the parameters are separated by ';' (imposed by XML files)
 */
const getUrlParameters = (
  separator = ";",
  url = window.location.search.substring(1)
) => {
  const sURLVariables = url.split(separator);
  const parameters = {};
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    parameters[sParameterName[0]] = sParameterName[1];
  }
  return parameters;
};

/**
 * parse the parameter to the correct type
 */
const parseParameterValue = (value, type = Constants.Types.NUMBER.type) => {
  // for select, return only strings
  if (type === Constants.Types.SELECT.type) {
    return value;
  } else {
    // return a number if it is convertible, a string otherwise
    const ret = parseFloat(value);
    return isNaN(ret) ? value : ret;
  }
};

/**
 * trim given string
 */
const trimString = str => {
  const regex = /(\s)+/g;
  return str.replace(regex, " ");
};

/**
 * build file url from a collection name and a name
 */
const buildFileUrlFromCollectionAndName = (collection, name) => {
  return `${DIVASERVICES_BASE_URL}/${FILES_ENDPOINT}/${collection}/original/${name}`;
};

/**
 * build file url from the identifier
 * identifier is of form: collection/name
 */
const buildFileUrlFromIdentifier = identifier => {
  const results = identifier.split("/");
  const [collection, ...name] = results;
  return buildFileUrlFromCollectionAndName(collection, name.join(""));
};

export default {
  buildServiceNameForRequest,
  getUrlParameters,
  buildInputNameForRequest,
  buildInputNameForWorkflow,
  buildInputReferenceName,
  parseParameterValue,
  trimString,
  buildFileUrlFromCollectionAndName,
  buildFileUrlFromIdentifier
};
