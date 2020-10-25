var handlers = {};
var indexService = require('./indexService');
var authenticationService = require('./AuthenticationService');
const taskService = require('./taskService');

handlers['/index.html'] = indexService.execute;
handlers['/login'] = authenticationService.login;

console.log('Response Handlers')

exports.handlers = handlers
