import xml2js from "xml2js";

/**
 * async utility function to retrieve xml content as JSON data
 */
export const createXml2jsPromise = xml => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, async (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
