import { BaseDatabase } from "./BaseDatabase";


export class RecipesDatabase extends BaseDatabase {
    private static tableName = "CookeNuRecipes"

    create = async(
        id: string,
        title: string, 
        description: string,
        user_id: string
        ):Promise<void> =>{
            try {
                await this.getConnection().raw(`
                    INSERT INTO ${RecipesDatabase.tableName} (id, title, description, user_id)
                    VALUES (
                        "${id}",
                        "${title}",
                        "${description}",
                        "${user_id}"
                    )
                `)
            } catch (error) {
                console.log(error)
            }
            
            
    }
}