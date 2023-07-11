import { error } from 'console'
import { validate } from './../utils/validation'
import { Request, Response, NextFunction } from 'express'
import { checkSchema } from 'express-validator'
import databaseService from '~/services/database.services'
import usersService from '~/services/users.services'

export const loginValidator = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({
      error: 'Invalid email or password'
    })
  }
  next()
}

export const registerValidator = validate(
  checkSchema({
    name: {
      notEmpty: true,
      isLength: {
        options: {
          min: 3,
          max: 30
        }
      },
      isString: true,
      errorMessage: 'Name must be between 3 and 30 characters'
    },
    email: {
      notEmpty: true,
      isEmail: true,
      trim: true,
      errorMessage: 'Invalid email address',
      custom: {
        options: async (value) => {
          const isEmailExists = await usersService.checkEmailExists(value)
          if (isEmailExists) {
            throw new Error('Email already exists')
          }
          return !isEmailExists
        }
      }
    },
    password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 30
        },
        errorMessage: 'Password must be between 6 and 30 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password must be contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
      }
    },
    confirm_password: {
      notEmpty: true,
      isString: true,
      isLength: {
        options: {
          min: 6,
          max: 30
        },
        errorMessage: 'Password must be between 6 and 30 characters'
      },
      isStrongPassword: {
        options: {
          minLength: 6,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1
        },
        errorMessage:
          'Password must be contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character'
      },
      custom: {
        options: (value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords do not match')
          }
          return true
        }
      }
    },
    date_of_birth: {
      notEmpty: true,
      isISO8601: {
        options: {
          strict: true,
          strictSeparator: true
        }
      }
    }
  })
)
