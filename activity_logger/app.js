var server = require('pushstate-server');

server.start({
  port: 3001,
  directory: './app'
});