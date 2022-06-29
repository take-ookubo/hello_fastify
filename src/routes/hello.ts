import { FastifyPluginAsync } from "fastify"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface IHelloParams {
  id: number
  name: string
  email: string
}

const hello: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: IHelloParams }>("/hello/:id", async (request, reply) => {
    const user = await prisma.user.findUnique({
      where: { id: Number(request.params?.id) },
    })

    reply.send({
      req: {
        id: user?.id,
        name: user?.name,
        email: user?.email,
      },
    })
  })

  // NOTE: curl http://localhost:3000/hello -X POST -H "Content-Type: application/json" -d '{"name":"test", "email": "test@example.com"}'
  fastify.post<{ Body: IHelloParams }>("/hello", async (request, reply) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: request.body.name,
          email: request.body.email,
        },
      })
      reply.send({
        req: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
        },
      })
    } catch (e) {
      console.log(e)
      if (e.code == "P2002") {
        reply.code(400).send(`Not unique email: ${request.body.email}`)
      } else {
        reply.code(500).send(" Internal Server Error")
      }
    }
  })
}

export { hello }
