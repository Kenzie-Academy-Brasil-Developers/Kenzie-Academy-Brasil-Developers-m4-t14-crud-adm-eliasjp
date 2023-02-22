import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export class AppError extends Error {
    statusCode: number
    constructor(message: string, statusCode: number = 400){
        super(message)
        this.statusCode = statusCode
    }
}

export function handleError (err: Error, request: Request, response: Response, _:NextFunction){
    if (err instanceof AppError){
        return response.status(err.statusCode).json({ message: err.message })
    } else if (err instanceof ZodError){
        return response.status(400).json(err.flatten().fieldErrors)
    } else if (err.message.includes("violates unique constraint" && "users_email_key")){
        return response.status(409).json({ message: "Email already registered."})
    } else {
        console.log(err.message)
        return response.status(500).json({ message: "Internal server error."})
    }
}