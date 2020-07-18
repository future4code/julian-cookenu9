import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenicator"
import { RecipesDatabase } from "../services/RecipesDatabase"

export const create = async (req: Request, res: Response): Promise<void> =>{
    try {
        const authenticator = new Authenticator()
        const token = String(req.headers.authorization)
        const userId = authenticator.checkToken(token)
        
        const generatorId = new GeneratorId()
        const id = generatorId.generate()

        const title = req.body.title
        const description = req.body.description

        const dataRecipe = {
            id: id,
            title: title,
            description: description,
            user_id: userId.id
        }
        

        const recipesDb = new RecipesDatabase()
        await recipesDb.create(
            dataRecipe.id, 
            dataRecipe.title, 
            dataRecipe.description, 
            dataRecipe.user_id)

        res.status(200)
        .send("Criado com sucesso!")
    } catch (error) {
        console.log("estou aqui no erro")
        res.status(400).send({
            message: error.message,
        })
    }
}