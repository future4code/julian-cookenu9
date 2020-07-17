import * as jwt from "jsonwebtoken";

interface AuthenticationData{
    id: string
}

export class Authenticator {
    private static EXPIRES_IN = "2min";

    generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            { id: input.id}
            ,
            "bananinha"
            ,
            {
              expiresIn: Authenticator.EXPIRES_IN 
            }
          )
          return token 
    }
    
    checkToken(token: string): AuthenticationData {
        const payload = jwt.verify(token, "bananinha") as any
        const result:  AuthenticationData = {
            id: payload.id
        }
        return result
    }
}




