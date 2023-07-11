import databaseService from '~/services/database.services'
import { Request, Response } from 'express'
import usersService from '~/services/users.services'

export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const result = await usersService.login({ email, password })
    if (result) {
      return res.status(200).json({
        message: 'Login successful',
        result
      })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Login failed',
      error
    })
  }
}

export const registerController = async (req: Request, res: Response) => {
  const { email, password, name, date_of_birth } = req.body
  try {
    const result: any = await usersService.register({ email, password, name, date_of_birth })
    const newUser = await databaseService.users.findOne({ _id: result.insertedId })
    return res.status(201).json({
      message: 'Register successful',
      newUser
    })
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: 'Register failed',
      error
    })
  }
}
