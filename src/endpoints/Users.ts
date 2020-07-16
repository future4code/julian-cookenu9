import {Request, Response} from "express"
import {UserDatabase} from "../services/UserDatabase"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenicator"
import { hash } from "bcryptjs"


export const createUserEndpoint = async (req: Request, res: Response): Promise<void> =>{
    try {

        if(req.body.password.length < 6){
            throw new Error("A senha tem que ser maior que 6 digitos")
        }
        
        const generatorId = new GeneratorId()
        const id = generatorId.generate()

        const hashManager = new HashManager()
        const cipherText = await hashManager.hash(req.body.password)

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            email: req.body.email, 
            password: req.body.password
        })

        const userDb = new UserDatabase()
        await userDb.createUser(
            id,
            req.body.name, 
            req.body.email, 
            cipherText
        )

        res.status(200).send({
            token: token 
        })    
    } catch (error) {
        res.status(400).send({
            message: error.message
        })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const userData = {
            email: req.body.email,
            password: req.body.password
        }
        
        const userDb = new UserDatabase()
        const dataUser = await userDb.getByEmail(req.body.email)

        const hashManager = new HashManager()
        const passwordIsCorrect = hashManager.compare(userData.password, dataUser.password)
        if(!passwordIsCorrect){
            throw new Error("Invalid Password")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            email: dataUser.email,
            password: dataUser.password
        })

        res.status(200).send({
            token: token,

        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
}

