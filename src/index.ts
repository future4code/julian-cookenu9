import express from "express";
import dotenv from "dotenv"
import { AddressInfo } from "net";
import { createUserEndpoint, login, profile, profileById } from "./endpoints/Users";
import { create } from "./endpoints/Recipes";


dotenv.config();

const app = express()

app.use(express.json())

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Server is running in http://localhost:${address.port}`);
      }else {
      console.error(`Failure upon starting server.`);
      }
});

app.post("/signup", createUserEndpoint)

app.post("/login", login)

app.get("/user/profile", profile)

app.get("/user/:id", profileById)

app.post("/recipe", create)