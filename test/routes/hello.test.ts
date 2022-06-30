import { build } from "../helper"

describe("hello tests", () => {
  const app = build()

  const random_email = Math.random()

  test("post hello", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/hello",
      payload: `{"name":"test", "email": "test${random_email}@expmple.com"}`,
      headers: { "Content-Type": "application/json" },
    })
    expect(JSON.parse(res.payload)).toEqual({
      req: { id: 1, name: "test", email: `test${random_email}@expmple.com` },
    })
  })

  test("get hello", async () => {
    const res = await app.inject({
      url: "/hello/1",
    })
    expect(JSON.parse(res.payload)).toEqual({
      req: { id: 1, name: "test", email: `test${random_email}@expmple.com` },
    })
  })
})
