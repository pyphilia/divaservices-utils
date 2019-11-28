import { createXml2jsPromise } from "./utils";

/**
 * This file contains a decorator to traslate the
 * given collections xml file to an equivalent JSON file
 */
const collectionsDecorator = async xmlFile => {
  const xml = await createXml2jsPromise(xmlFile);
  const json = [];

  for (const collection of xml.Collections.Collection) {
    const {
      Name: [name],
      Url: [url],
      Error: error
    } = collection;

    let coll;

    if (error) {
      coll = {
        error: error[0],
        name,
        url
      };
    } else {
      const files = [];
      const {
        Files,
        StatusMessage
      } = collection;

      if(Files) {
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

      coll = {
        files,
        name,
        statusMessage: StatusMessage ? StatusMessage[0] : undefined,
        url
      };
    }

    json.push(coll);
  }
  return json;
};

export default collectionsDecorator;
