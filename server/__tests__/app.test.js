import {app, db} from "../app.mjs"
import request from "supertest"



describe("GET /pokemonList", () => {
  test("Should respond with a list of pokemons names of length 151", async () => {
    const response = await request(app).get('/pokemonList')

    expect(response.body.length).toBe(151)
    expect(response.statusCode).toBe(200)
  })
})

describe("GET /pokemonDetails", () => {
  test("Should respond with a list of pokemons stats of length 151", async () => {
    const response = await request(app).get("/pokemonDetails")

    expect(response.body.length).toBe(151)
    expect(response.statusCode).toBe(200)
  })
})

describe("GET /pokemon/:name", () => {
  test("Should respond with the data for a single pokemon", async () => {
    const response = await request(app).get("/pokemon/mewtwo")

    console.log(response.body)

    expect(response.body[0].name).toEqual("mewtwo")
    expect(response.statusCode).toBe(200)
  })
})

describe("Get /", () => {
  test("Should respond with a 404 error", async () => {
    const response = await request(app).get("/")

    expect(response.statusCode).toBe(404)
  })
})

afterAll(done => {
  db.close()
  done()
})