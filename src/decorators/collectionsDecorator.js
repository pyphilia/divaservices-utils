/**
 * This file contains a decorator to traslate the
 * given collections xml file to an equivalent JSON file
 */

import { createXml2jsPromise } from "./utils";

const _collectionDecorator = collection => {
  const {
    Id: [id],
    Name: [name],
    Url: [url],
    Error: error
  } = collection;

  if (error) {
    coll = {
      error: error[0],
      name,
      url
    };
  } else {
    const files = [];
    const { Files, StatusMessage } = collection;

    if (Files && Files[0].File) {
      for (const file of Files[0].File) {
        const {
          Url: [url],
          Identifier: [identifier],
          Options
        } = file;

        const f = { url, identifier };
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
  const xml = await createXml2jsPromise(xmlFile);
  return _collectionDecorator(xml.Collection);
};

const collectionsDecorator = async xmlFile => {
  const xml = await createXml2jsPromise(xmlFile);

  return xml.Collections
    ? xml.Collections.Collection.map(c => _collectionDecorator(c))
    : [];
};

export { collectionsDecorator, collectionDecorator };
