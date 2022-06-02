import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})


interface IHelloParams {
  id: number;
  name: string;
}

// Top level await を避けるためアロー関数配下に追加
const main = async () => {
  // Declare a route
  fastify.get('/', function (request, reply) {
    reply.send({ hello: 'world' })
  })

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
}

main()