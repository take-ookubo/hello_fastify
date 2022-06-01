import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})

// Declare a route
fastify.get('/', function (request, reply) {
  reply.send({ hello: 'world' })
})

interface IHelloParams {
  id: number;
  name: string;
}

fastify.get<{Params: IHelloParams}>('/hello/:id/:name', (request, reply) => {
  reply.send({
    req: {
      id: request.params.id + 1,
      name: request.params.name,
    }
  })
})

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})