"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.torRequestLogger = exports.requestLogger = void 0;

var _requestObfuscator = require("./request-obfuscator");

var _requestLogger2 = _interopRequireDefault(require("@uphold/request-logger"));

var _request = _interopRequireDefault(require("request"));

var _torRequest = _interopRequireDefault(require("tor-request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Module dependencies.
 */

/**
 * Exports.
 */
const requestLogger = logger => (0, _requestLogger2.default)(_request.default, (request, instance) => {
  (0, _requestObfuscator.obfuscate)(request, instance);

  if (request.type === 'response') {
    return logger.debug({
      request
    }, `Received response for request ${request.id}`);
  }

  return logger.debug({
    request
  }, `Making request ${request.id} to ${request.method} ${request.uri}`);
});

exports.requestLogger = requestLogger;

const torRequestLogger = logger => (0, _requestLogger2.default)(_torRequest.default.torRequest, (request, instance) => {
  (0, _requestObfuscator.obfuscate)(request, instance);

  if (request.type === 'response') {
    return logger.debug({
      request
    }, `Received response for request ${request.id}`);
  }

  return logger.debug({
    request
  }, `Making request ${request.id} to ${request.method} ${request.uri}`);
});

exports.torRequestLogger = torRequestLogger;