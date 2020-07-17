import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase{
    private static tableName = "CookeNuUsers"

    createUser = async(id: string, name: string, email: string, password: string): Promise<void> =>{
        try {
            
            await this.getConnection().insert({
                id, 
                name, 
                email, 
                password
            }).into(UserDatabase.tableName)
        } catch (error) {
            console.log(error)
        }
        
    }
   
    getByEmail = async(email: string): Promise<any> => {
        try {
        const result = await this.getConnection().raw(`
        SELECT * FROM ${UserDatabase.tableName} WHERE email = "${email}"
        `)
        // .select("*")
        // .from(UserDatabase.tableName)
        // .where({ email: email })

        return result[0][0]
            
        } catch (error) {
            console.log(error)
            
        }   
    }

    getById = async(id:string): Promise<any> =>{
        try {
            const result = await this.getConnection().raw(`
                SELECT * 
                FROM ${UserDatabase.tableName}
                WHERE id = "${id}"
            `)

            return result[0][0]
        } catch (error) {
            console.log(error)
        }
    }
}