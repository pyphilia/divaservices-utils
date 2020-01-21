"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createXml2jsPromise = void 0;

var _xml2js = _interopRequireDefault(require("xml2js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * async utility function to retrieve xml content as JSON data
 */
const createXml2jsPromise = xml => {
  return new Promise((resolve, reject) => {
    _xml2js.default.parseString(xml, async (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

exports.createXml2jsPromise = createXml2jsPromise;