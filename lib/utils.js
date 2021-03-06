"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildFileUrlFromIdentifier = exports.buildFileUrlFromCollectionAndName = exports.trimString = exports.parseParameterValue = exports.buildInputReferenceName = exports.buildInputNameForWorkflow = exports.buildInputNameForRequest = exports.getUrlParameters = exports.buildServiceNameForRequest = exports.checkStringNonEmpty = exports.checkXMLString = exports.checkString = exports.checkType = void 0;

var _config = require("../config");

var Constants = _interopRequireWildcard(require("./constants"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * utilities functions to check variable validity
 *
 */
const checkString = str => {
  if (typeof str !== "string") {
    throw `name ${str} is not a string`;
  }
};

exports.checkString = checkString;

const checkStringNonEmpty = str => {
  const trimmedStr = trimString(str);

  if (trimmedStr.length === 0 || trimmedStr === " ") {
    throw `str is empty string`;
  }
};

exports.checkStringNonEmpty = checkStringNonEmpty;

const checkStringNonSpace = str => {
  if (str.search(/\s/) !== -1) {
    throw `string ${str} contain a space`;
  }
};

const checkStringForbiddenCharacters = str => {
  if (str.search(/[$/]/g) !== -1) {
    throw `string ${str} contain a forbidden character`;
  }
};

const checkType = type => {
  if (!Object.values(Constants.Types).map(({
    type
  }) => type).includes(type)) {
    throw `type ${type} is not a valid type`;
  }
};

exports.checkType = checkType;

const checkXMLString = xml => {
  checkString(xml);
  const count1 = (xml.match("<") || []).length;
  const count2 = (xml.match(">") || []).length;

  if (count1 !== count2) {
    throw `xml have impared brackets`;
  }
};
/**
 * trim given string
 */


exports.checkXMLString = checkXMLString;

const trimString = str => {
  const regex = /(\s)+/g;
  return str.replace(regex, " ");
};
/**
 * Build name for request
 * Used for service and workflow name
 */


exports.trimString = trimString;

const buildServiceNameForRequest = (name, id) => {
  checkStringNonEmpty(name);
  checkStringNonEmpty(id);
  return `${name}-${id}`.replace(/\s/g, "");
};
/**
 * Build input name for request
 */


exports.buildServiceNameForRequest = buildServiceNameForRequest;

const buildInputName = str => {
  checkStringNonEmpty(str);
  return str.replace(/\s/g, "");
};
/**
 * Build input name for service
 * used to build workflow execution request (parameter key)
 */


const buildInputNameForWorkflow = (serviceName, inputName) => {
  checkStringNonEmpty(serviceName);
  checkStringNonEmpty(inputName);
  return `${buildInputName(serviceName)}_${buildInputName(inputName)}`;
};
/**
 * Build input name for service
 * used to build workflow execution request (parameter key)
 */


exports.buildInputNameForWorkflow = buildInputNameForWorkflow;

const buildInputNameForRequest = (isService, serviceName, inputName) => {
  checkStringNonEmpty(inputName);
  return isService ? inputName : buildInputNameForWorkflow(serviceName, inputName);
};
/**
 * Build input reference name
 * used to build workflow execution request (input reference name)
 */


exports.buildInputNameForRequest = buildInputNameForRequest;

const buildInputReferenceName = (serviceName, inputName) => {
  checkStringNonEmpty(serviceName);
  checkStringNonSpace(serviceName);
  checkStringForbiddenCharacters(serviceName);
  checkStringNonEmpty(inputName);
  checkStringNonSpace(inputName);
  checkStringForbiddenCharacters(inputName);
  return `$${serviceName}/$${inputName}`;
};
/**
 * retrieve parameters from url
 * by default, the parameters are separated by ';' (imposed by XML files)
 */


exports.buildInputReferenceName = buildInputReferenceName;

const getUrlParameters = (separator = ";", url = window.location.search.substring(1)) => {
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


exports.getUrlParameters = getUrlParameters;

const parseParameterValue = (value, type = Constants.Types.NUMBER.type) => {
  checkType(type); // for select, folder and text, return only strings

  if ([Constants.Types.SELECT.type, Constants.Types.FOLDER.type, Constants.Types.TEXT.type].includes(type)) {
    checkString(value);
    return value;
  } else {
    // return a number
    const ret = parseFloat(value);

    if (isNaN(ret) || ret != value) {
      throw `value ${value} is not a number`;
    } else {
      return ret;
    }
  }
};
/**
 * build file url from a collection name and a name
 */


exports.parseParameterValue = parseParameterValue;

const buildFileUrlFromCollectionAndName = (collection, name) => {
  checkStringNonSpace(collection);
  checkStringNonSpace(name);
  checkStringNonEmpty(collection);
  checkStringNonEmpty(name);
  return `${_config.DIVASERVICES_BASE_URL}/${_config.FILES_ENDPOINT}/${collection}/original/${name}`;
};
/**
 * build file url from the identifier
 * identifier is of form: collection/name
 */


exports.buildFileUrlFromCollectionAndName = buildFileUrlFromCollectionAndName;

const buildFileUrlFromIdentifier = identifier => {
  checkStringNonEmpty(identifier);
  const results = identifier.split("/");

  if (results.length <= 1) {
    throw `identifier ${identifier} does not contain '/'`;
  }

  const [collection, ...name] = results;
  return buildFileUrlFromCollectionAndName(collection, name.join("/"));
};

exports.buildFileUrlFromIdentifier = buildFileUrlFromIdentifier;