import { build } from "./server"

// Top level await を避けるためアロー関数配下に追加
const main = async (): Promise<void> => {
  const server = build({ logger: true })
  server.log.debug("start hello server")
  try {
    await server.listen(3000, "0.0.0.0")
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

main()
