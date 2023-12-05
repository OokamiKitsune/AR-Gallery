'use strict';

/**
 * uploaded-content service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::uploaded-content.uploaded-content');
