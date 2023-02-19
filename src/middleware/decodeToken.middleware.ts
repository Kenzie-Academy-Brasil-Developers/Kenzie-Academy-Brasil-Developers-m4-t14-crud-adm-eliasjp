import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/handleError"
import { ITokenDecode } from "../interface/verifyToken.interface"


export async function decodeTokenMiddleware (request: Request, response: Response, next: NextFunction): Promise<void>{
    if (!request.headers.authorization){
        throw new AppError("Missing Bearer Token.", 401)
    }
    
    const tokenString: string | undefined = request.headers.authorization?.split(" ")[1]
    const decode: ITokenDecode | void = verify(tokenString!, String(process.env.SECRET_KEY)!, (error: any, decoded: any) => {
        if (error instanceof Error){
            throw new AppError(error.message, 401)
        }
        return decoded
    })
    request.user = {
        id: Number(decode!.sub)
    }

    next()
}