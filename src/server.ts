import fastify, { FastifyServerOptions } from "fastify"
import { hello, hello2 } from "./routes"

function build({ ...fastifyOptions }: FastifyServerOptions) {
  const app = fastify(fastifyOptions)
  app.register(hello)
  app.register(hello2)
  return app
}

export { build }
