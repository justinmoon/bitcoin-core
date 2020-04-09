
/**
 * Module dependencies.
 */

import { obfuscate } from './request-obfuscator';
import _requestLogger from '@uphold/request-logger';
import request from 'request';
import torRequest from 'tor-request';

/**
 * Exports.
 */

export const requestLogger = logger => _requestLogger(request, (request, instance) => {
  obfuscate(request, instance);

  if (request.type === 'response') {
    return logger.debug({ request }, `Received response for request ${request.id}`);
  }

  return logger.debug({ request }, `Making request ${request.id} to ${request.method} ${request.uri}`);
});

export const torRequestLogger = logger => _requestLogger(torRequest.torRequest, (request, instance) => {
  obfuscate(request, instance);

  if (request.type === 'response') {
    return logger.debug({ request }, `Received response for request ${request.id}`);
  }

  return logger.debug({ request }, `Making request ${request.id} to ${request.method} ${request.uri}`);
});
