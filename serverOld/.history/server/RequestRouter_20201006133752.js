function route(handlers, pathname, response, queryString) {
  if (typeof handlers[pathname] === 'function') {
    handlers[pathname](response, queryString);
  } else {
    response.writeHeader(404, { "Content-Type": "text/plain" })
    response.write('404 not found')
    response.end()
  }
}
