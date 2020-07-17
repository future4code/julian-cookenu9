import {Request, Response} from "express"
import {UserDatabase} from "../services/UserDatabase"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenicator"

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
            id: req.body.id
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
        const dataUser = await userDb.getByEmail(userData.email)

        const hashManager = new HashManager()
        const passwordIsCorrect = await hashManager.compare(userData.password, dataUser.password)
        if(!passwordIsCorrect){
            throw new Error("Invalid Password")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generateToken({
            id: dataUser.id
        })

        res.status(200).send({
            token: token
        })

    } catch (error) {
        res.status(400).send({
            message: error.message,
        })
    }
}

export const profile = async (req: Request, res: Response) =>{
    try {
        const authorization = String(req.headers.authorization)

        const authenticator = new Authenticator()
        const answerAuthentication = authenticator.checkToken(authorization)

        const userDb = new UserDatabase()
        const dataUser = await userDb.getById(answerAuthentication.id)

        res.status(200).send(
            {
                id: dataUser.id,
                name: dataUser.name,
                email: dataUser.email
            }
        )
    } catch (error) {
        res.status(400).send(error)
    }
}

export const profileById = async(req: Request, res: Response): Promise<any> =>{
    try {
        const id = req.params.id
        const token = String(req.headers.authorization)

        
        const authenticator = new Authenticator()
        authenticator.checkToken(token)

        const userDb = new UserDatabase()
        const dataUser = await userDb.getById(id)
        console.log(dataUser)

        res.status(200).send({
            id: dataUser.id,
            name: dataUser.name,
            email: dataUser.email
        })
    } catch (error) {
        res.status(400).send(error)
    }
}