import User from '~/models/schemas/User.schema'
import databaseService from './database.services'

class UsersService {
  async register(payload: { email: string; password: string; name: string; date_of_birth: Date }) {
    try {
      const { email, password, name, date_of_birth } = payload
      const result = await databaseService.users.insertOne(new User({ email, password, name, date_of_birth }))
      return result
    } catch (error) {
      return error
    }
  }

  async login(payload: { email: string; password: string }) {
    try {
      const { email, password } = payload
      const result = await databaseService.users.findOne({ email, password })
      return result
    } catch (error) {
      return error
    }
  }

  async checkEmailExists(email: string) {
    try {
      const result = await databaseService.users.findOne({ email })
      return Boolean(result)
    } catch (error) {
      return error
    }
  }
}

const usersService = new UsersService()
export default usersService
