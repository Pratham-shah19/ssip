'use strict';

let Mime = require('./mime');
module.exports = new Mime(require('./types/standard'), require('./types/other'));
