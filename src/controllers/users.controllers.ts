import databaseService from '~/services/database.services'
import { Request, Response } from 'express'
import usersService from '~/services/users.services'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterRequestBody } from '~/models/request/User.request'

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const result = await usersService.login({ email, password })
  return res.status(200).json({
    message: 'Login successful',
    result
  })
}

export const registerController = async (req: Request<ParamsDictionary, any, RegisterRequestBody>, res: Response) => {
  const result = await usersService.register(req.body)
  return res.status(201).json({
    message: 'Register successful',
    result
  })
}
