import { FastifyPluginAsync } from "fastify"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface IHelloParams {
  id: number
  name: string
  email: string
}

const hello2: FastifyPluginAsync = async (fastify) => {
  fastify.get<{ Params: IHelloParams }>("/hell2/:id", async (request, reply) => {
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
}

export { hello2 }
