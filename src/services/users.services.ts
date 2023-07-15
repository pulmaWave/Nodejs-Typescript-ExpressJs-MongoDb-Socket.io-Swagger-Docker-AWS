import jwt from 'jsonwebtoken'
import User from '~/models/schemas/User.schema'
import databaseService from './database.services'
import { RegisterRequestBody } from '~/models/request/User.request'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'

class UsersService {
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.AccessToken
      },
      options: {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES
      }
    })
  }

  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id,
        token_type: TokenType.RefreshToken
      },
      options: {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES
      }
    })
  }

  async register(payload: RegisterRequestBody) {
    try {
      const result = await databaseService.users.insertOne(
        new User({
          ...payload,
          date_of_birth: new Date(payload.date_of_birth),
          password: hashPassword(payload.password)
        })
      )
      const user_id = result.insertedId.toString()
      const [access_token, refresh_token] = await Promise.all([
        this.signAccessToken(user_id),
        this.signRefreshToken(user_id)
      ])
      return {
        access_token,
        refresh_token
      }
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
