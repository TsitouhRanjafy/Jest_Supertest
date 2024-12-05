import  request  from "supertest";
import app from "./app";

// Nous allons tester qu'une demande POST à '/users' fonctionne correctement 
describe("POST /users", () => {

    describe("given a username and password", () => {
        
        // should respond with a 200 status code
        test("should responde with a 200 code", async () => {
            const reponse = await request(app).post("/users").send({
                username : "username",
                password: "password"
            })
            expect(reponse.statusCode).toBe(200)
        })
        
        // should specify json as the content type in the http header.
        test("should specify json as the content type in the http header",async () => {
            const response = await request(app).post("/users").send({ 
              username: "username", 
              password: "password" 
            })
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
        })        

        // should respond with a json object that contains the id from the database. (probably jwt in the real world)
        test("should contain a userId in the response body",async () => {
            const response = await request(app).post("/users").send({ 
              username: "username", 
              password: "password" 
            })
            expect(response.body.userId).toBeDefined()
        })
        
    })
    
    describe("when the username or password is missing", () => {
        // should return a 400 status code to show there was a user error.
        test("should return a 400 status code",async () => {
            const bodies = [
                { username: "username" },
                { password: "password" },
                {}
            ]
            for (const body of bodies) {
                const response = await request(app).post("/users").send(body)
                expect(response.statusCode).toBe(400)
            }
          })
        // should return a json object that contains an error message.
        // should specify json as the content type in the http header.
    })
})

