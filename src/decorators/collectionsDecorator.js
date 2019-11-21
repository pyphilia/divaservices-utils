/**
 * This file contains a decorator to traslate the
 * given webservices xml file to an equivalent JSON file
 */

const collectionsDecorator = xml => {
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
        Files: [filesArr],
        StatusMessage: [statusMessage]
      } = collection;

      for (const file of filesArr.File) {
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

      coll = {
        files,
        name,
        statusMessage,
        url
      };
    }

    json.push(coll);
  }
  return json;
};

export default collectionsDecorator;
