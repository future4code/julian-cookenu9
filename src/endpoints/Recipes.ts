import {Request, Response} from "express"
import { GeneratorId } from "../services/GeneratorId"
import { HashManager } from "../services/HashManager"
import { Authenticator } from "../services/Authenicator"
import { RecipesDatabase } from "../services/RecipesDatabase"

export const create = async (res: Response, req: Request): Promise<void> =>{
    try {
        const authenticator = new Authenticator()
        const user_id = authenticator.checkToken(String(req.headers.authorization))
        
        const generatorId = new GeneratorId()
        const id = generatorId.generate()

        const dataRecipe = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            user_id: user_id.id,
        }

        const recipesDb = new RecipesDatabase()
        await recipesDb.create(dataRecipe.id, dataRecipe.title, dataRecipe.description, dataRecipe.user_id)

        res.status(200).send("Criado com sucesso!")
    } catch (error) {
        res.status(400).send(error)
    }
}