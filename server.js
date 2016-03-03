'use strict';

const Hapi      = require('hapi');
const server    = new Hapi.Server();
const Good      = require('good');
const Hoek      = require('hoek');
const Data   = require('./data/courses');

server.connection({
  // host: 'localhost',
  // host: '0.0.0.0',
  port: process.env.PORT || 8080
});

server.ext('onPreResponse', (request, reply) => {
  if(request.response.isBoom){
    let statusCode = request.response.output.statusCode;
    console.log(`failed: ${statusCode}`);
    return reply.view('404');
  }
  reply.continue();
});

server.register(require('inert'), (err) => {
  if (err) { throw err; }
  server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: {
      directory: {
        path: __dirname + '/public',
        listing: false,
        index: false
      }
    }
  });
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

  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      // reply(`Hello ${encodeURIComponent(request.params.name)} !`);
      reply.view('index', { courses: Data.courses });
    }
  });


  server.route({
    method: 'GET',
    path: '/courses/website-development-101',
    handler: (request, reply) => {
      reply.view('courses/web_101', { title: 'Website Development 101' });
    }
  });

});

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
