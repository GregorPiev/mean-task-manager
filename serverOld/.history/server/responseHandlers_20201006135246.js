var handlers = {};
var indexService = require('./indexService')
handlers['/index.html'] = indexService.execute;
exports.handlers = handlers
