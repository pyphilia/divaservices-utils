"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _collectionsDecorator = require("./collectionsDecorator");

var _webservicesDecorator = require("./webservicesDecorator");

var _workflowDecorator = _interopRequireDefault(require("./workflowDecorator"));

var _experimentDecorator = _interopRequireDefault(require("./experimentDecorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  collectionDecorator: _collectionsDecorator.collectionDecorator,
  collectionsDecorator: _collectionsDecorator.collectionsDecorator,
  serviceDecorator: _webservicesDecorator.serviceDecorator,
  webservicesDecorator: _webservicesDecorator.webservicesDecorator,
  workflowDecorator: _workflowDecorator.default,
  experimentDecorator: _experimentDecorator.default
};
exports.default = _default;