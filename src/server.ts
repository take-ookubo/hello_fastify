import fastify, { FastifyServerOptions } from "fastify"
import { hello } from "./routes"

function build({ ...fastifyOptions }: FastifyServerOptions) {
  const app = fastify(fastifyOptions)
  app.register(hello)
  return app
}

export { build }
