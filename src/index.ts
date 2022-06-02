import { PrismaClient } from '@prisma/client'
import Fastify from 'fastify'

const prisma = new PrismaClient()
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

  fastify.get<{Params: IHelloParams}>('/hello/:id', async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: {id: Number(request.params?.id)}
    })
    reply.send({
      req: {
        id: user?.id,
        name: user?.name,
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