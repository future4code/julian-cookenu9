import {Request, Response} from "express"
import {UserDatabase} from "../services/UserDatabase"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"


export const createUserEndpoint = async (req: Request, res: Response): Promise<void> =>{
    try {

        if(req.body.password.length < 6){
            throw new Error("A senha tem que ser maior que 6 digitos")
        }
        
        const generatorId = new GeneratorId()
        const id = generatorId.generate()

        const hashManager = new HashManager()
        const cipherText = await hashManager.hash(req.body.password)

        const userDb = new UserDatabase()
        await userDb.createUser(
            id,
            req.body.name, 
            req.body.email, 
            cipherText
        )

        res.status(200).send("ok")
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}