"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectionDecorator = exports.collectionsDecorator = void 0;

var _utils = require("./utils");

/**
 * This file contains a decorator to translate the
 * given collections xml file to an equivalent JSON file
 */
const _collectionDecorator = collection => {
  const {
    Id: [id],
    Name: [name],
    Url: [url],
    Error: error
  } = collection;

  if (error) {
    throw {
      error: error[0],
      name,
      url
    };
  } else {
    const files = [];
    const {
      Files,
      StatusMessage
    } = collection; // files

    if (Files && Files[0].File) {
      for (const file of Files[0].File) {
        const {
          Url: [url],
          Identifier: [identifier],
          Options
        } = file;
        const f = {
          url,
          identifier
        }; // options

        if (Options) {
          const options = {};

          for (const [k, v] of Object.entries(Options[0])) {
            // const options = Options[0].map((k,v) => ({[k.lowerCase()]: v})).reduce((arr, el) => ({arr, ...el}))
            options[k.toLowerCase()] = v[0];
          }

          f["options"] = options;
        }

        files.push(f);
      }
    }

    return {
      id,
      files,
      name,
      statusMessage: StatusMessage ? StatusMessage[0] : undefined,
      url
    };
  }
};

const collectionDecorator = async xmlFile => {
  const xml = await (0, _utils.createXml2jsPromise)(xmlFile);
  return _collectionDecorator(xml.Collection);
};

exports.collectionDecorator = collectionDecorator;

const collectionsDecorator = async xmlFile => {
  const xml = await (0, _utils.createXml2jsPromise)(xmlFile);
  return xml.Collections ? xml.Collections.Collection.map(c => _collectionDecorator(c)) : [];
};

exports.collectionsDecorator = collectionsDecorator;