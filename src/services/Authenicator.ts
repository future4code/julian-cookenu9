import * as jwt from "jsonwebtoken";

interface AuthenticationData {
    email: string,
    password: string
}

export class Authenticator {
    private static EXPIRES_IN = "2min";

    generateToken(input: AuthenticationData): string {
        const token = jwt.sign(
            { email: input.email, password: input.password}
            ,
            "bananinha"
            ,
            {
              expiresIn: Authenticator.EXPIRES_IN 
            }
          )
          return token 
    }
    
    getData(token: string): AuthenticationData {
        const payload = jwt.verify(token, "bananinha") as any
        const result:  AuthenticationData = {
            email: payload.email,
            password: payload.password
        }
        return result
    }
}




