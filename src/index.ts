import { UserDatabase } from "./services/UserDatabase";
import express from "express";
import dotenv from "dotenv"
import { AddressInfo } from "net";
import { createUserEndpoint } from "./endpoints/CookeNuUsers";

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
