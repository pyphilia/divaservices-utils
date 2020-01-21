"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "collectionsDecorator", {
  enumerable: true,
  get: function () {
    return _collectionsDecorator.collectionsDecorator;
  }
});
Object.defineProperty(exports, "collectionDecorator", {
  enumerable: true,
  get: function () {
    return _collectionsDecorator.collectionDecorator;
  }
});
Object.defineProperty(exports, "webservicesDecorator", {
  enumerable: true,
  get: function () {
    return _webservicesDecorator.webservicesDecorator;
  }
});
Object.defineProperty(exports, "serviceDecorator", {
  enumerable: true,
  get: function () {
    return _webservicesDecorator.serviceDecorator;
  }
});
Object.defineProperty(exports, "workflowDecorator", {
  enumerable: true,
  get: function () {
    return _workflowDecorator.default;
  }
});
Object.defineProperty(exports, "experimentDecorator", {
  enumerable: true,
  get: function () {
    return _experimentDecorator.default;
  }
});

var _collectionsDecorator = require("./collectionsDecorator");

var _webservicesDecorator = require("./webservicesDecorator");

var _workflowDecorator = _interopRequireDefault(require("./workflowDecorator"));

var _experimentDecorator = _interopRequireDefault(require("./experimentDecorator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }