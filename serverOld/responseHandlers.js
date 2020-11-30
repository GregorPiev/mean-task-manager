console.log('Response Handlers');
var handlers = {};
var indexService = require('./indexService');
var authenticationService = require('./AuthenticationService');
const taskService = require('./taskService');

handlers['/index.html'] = indexService.execute;
handlers['/login'] = authenticationService.login;
handlers['/taskService/getFilteredTasks'] = taskService.getFilteredTasks;



exports.handlers = handlers
