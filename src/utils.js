const buildFileUrlFromCollectionAndName = (baseUrl, collection, name) => {
  return `${baseUrl}/${collection}/original/${name}`;
};

const buildFileUrlFromIdentifier = (baseUrl, identifier) => {
  const [collection, name] = identifier.split("/");
  return buildFileUrlFromCollectionAndName(baseUrl, collection, name);
};

const buildNameForRequest = str => {
  return str.replace(/\s/g, "");
};

const buildInputNameForService = (serviceName, inputName) => {
  return `${buildNameForRequest(serviceName)}_${buildNameForRequest(
    inputName
  )}`;
};

const buildInputReferenceName = (serviceName, inputName) => {
  return `$${serviceName}/$${inputName}`;
};

const getUrlParameters = (
  separator = ";",
  getParameters = window.location.search.substring(1)
) => {
  const sURLVariables = getParameters.split(separator);
  const parameters = {};
  for (let i = 0; i < sURLVariables.length; i++) {
    const sParameterName = sURLVariables[i].split("=");
    parameters[sParameterName[0]] = sParameterName[1];
  }
  return parameters;
};

export const parseParameterValue = value => {
  const ret = parseFloat(value);
  return isNaN(ret) ? value : ret;
};

export default {
  buildFileUrlFromCollectionAndName,
  buildFileUrlFromIdentifier,
  getUrlParameters,
  buildNameForRequest,
  buildInputNameForService,
  buildInputReferenceName,
  parseParameterValue
};
