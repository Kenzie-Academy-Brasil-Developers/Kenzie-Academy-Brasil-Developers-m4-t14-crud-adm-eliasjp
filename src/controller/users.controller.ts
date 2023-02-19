import { Request, Response } from "express"
import { createUserService } from "../services/users/createUser.services"
import { deactivateUserService } from "../services/users/deactivateUser.services"
import { patchUserService } from "../services/users/patchUser.services"
import { reactivateUserService } from "../services/users/reactivateUser.services"
import { readLoggedUserService } from "../services/users/readLoggedUser.services"
import { readAllProfilesService } from "../services/users/readUser.services"

export async function createUserController (request: Request, response: Response): Promise<Response>{
    const createUser = await createUserService(request.body)

    return response.status(201).json(createUser)
}

export async function readAllProfilesController (request: Request, response: Response): Promise<Response>{
    const profiles = await readAllProfilesService(request)

    return response.status(200).json(profiles)
}

export async function readLoggedUserController (request: Request, response: Response): Promise<Response>{
    const profileById = await readLoggedUserService(request)

    return response.status(200).json(profileById)
}

export async function patchUserController (request: Request, response: Response): Promise<Response>{
    const patchUser = await patchUserService(request)

    return response.status(200).json(patchUser)
}

export async function deactivateUserController (request: Request, response: Response): Promise<Response>{
    await deactivateUserService(request)

    return response.status(204).json()
}

export async function reactivateUserController (request: Request, response: Response): Promise<Response>{
    const reactivated = await reactivateUserService(request)

    return response.status(200).json(reactivated)
}