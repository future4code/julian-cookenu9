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
        const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.tableName)
        .where({ email: email })

        return result 
            
        } catch (error) {
            console.log(error)
            
        }   
        
    }
}

