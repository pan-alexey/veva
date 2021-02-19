import Render from '@veva/core/react';

// Example
import fastify from 'fastify';

const app = fastify({
  logger: true
})

(async () => {
  const render = await Render.init('./build/server/render');
  app.get('/', function (request, reply) {
    // render with props;
    const result = await render({
      text: 'example'
    });

    // reply.send(header);
    // reply.send(result.html);
    // reply.send(result.js);
  });

  // Run the server!
  app.listen(3000, function (err, address) {
    if (err) {
      fastify.log.error(err)
    }
    fastify.log.info(`server listening on ${address}`)
  });
})();