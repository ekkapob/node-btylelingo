'use strict'

const Hapi = require('hapi');
const server = new Hapi.Server();
const Good = require('good');
const Hoek = require('hoek');
server.connection({
  host: 'localhost',
  port: 8080
});

server.ext('onPreResponse', (request, reply) => {
  if(request.response.isBoom){
    let statusCode = request.response.output.statusCode;
    console.log(`failed: ${statusCode}`);
  }
  reply.continue();
});

server.register(require('inert'), (err) => {
  if (err) { throw err; }
});

server.register(require('vision'), (err) => {
  Hoek.assert(!err, err);

  server.views({
    engines: {
      html: require('handlebars')
    },
    relativeTo: __dirname + '/public',
    path: './views',
    layoutPath: './views/layout',
    layout: 'default',
    partialsPath: './views/partials',
    helpersPath: './views/helpers',
    isCached: false
  });
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

const routes = [
  // {
  //   method: 'GET',
  //   path: '/hello',
  //   handler: (request, reply) => {
  //     reply.file('./public/hello.html');
  //   }
  // },
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.view('index', { title: 'this is title'});
    }
  },
  {
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
      // reply(`Hello ${encodeURIComponent(request.params.name)} !`);
      reply.view(request.params.name, { title: 'this is title'});
    }
  }
]

// server.route({
//   method: 'GET',
//   path: '/hello',
//   handler: (request, reply) => {
//     reply.file('./public/hello.html');
//   }
// });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    // reply(`Hello ${encodeURIComponent(request.params.name)} !`);
    reply.view('index', { title: 'this is title'});
  }
});

server.route({
  method: 'GET',
  path: '/{filenamem*}',
  handler: {
    directory: {
      path: __dirname + '/public',
      listing: false,
      index: false
    }
  }
});

// server.route({
//   method: 'GET',
//   path: '/{param*}',
//   handler: (request, reply) => {
//     // reply(`Hello ${encodeURIComponent(request.params.name)} !`);
//     reply.view('404');
//   }
// });

// server.route({
//   method: 'GET',
//   path: '/hello',
//   handler: (request, reply) => {
//     reply.file('./public/hello.html');
//   }
// });
//
// server.route({
//   method: 'GET',
//   path: '/{name}',
//   handler: (request, reply) => {
//     reply(`Hello ${encodeURIComponent(request.params.name)} !`);
//   }
// });

// server.route(routes);

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
