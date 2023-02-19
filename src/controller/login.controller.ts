import { Request, Response } from "express";
import { loginService } from "../services/login/loginService.services";


export async function loginController (request: Request, response: Response): Promise<Response>{
    const login = await loginService(request)

    return response.status(200).json({ token: login })
}