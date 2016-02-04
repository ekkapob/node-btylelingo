'use strict'

const Hapi = require('hapi');
const server = new Hapi.Server();
const Good = require('good');
server.connection({
  host: 'localhost',
  port: 8080
});

server.register(require('inert'), (err) => {
  if (err) { throw err; }
  // server.route({
  //   method: 'GET',
  //   path: '/hello',
  //   handler: (request, reply) => {
  //     reply.file('./public/hello.html');
  //   }
  // })
});

server.register({
  register: Good,
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: {
        response: '*',
        log: '*'
      }
    }]
  }
}, (err) => {
  if (err) { throw err; }
});

server.route({
  method: 'GET',
  path: '/hello',
  handler: (request, reply) => {
    reply.file('./public/hello.html');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    reply(`Hello ${encodeURIComponent(request.params.name)} !`);
  }
});

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
