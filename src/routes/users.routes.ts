import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post('/register', registerValidator, registerController)

export default usersRouter

/**
 * @openapi
 * components:
 *  schemas:
 *    CreateUserInput:
 *      type: object
 *      required:
 *        - name
 *        - email
 *        - password
 *        - confirm_password
 *        - date_of_birth
 *      properties:
 *        name:
 *          type: string
 *          example: publisher nguyen
 *        email:
 *          type: string
 *          example: publisher@gmail.com
 *        password:
 *          type: string
 *          example: StrongPassword@132
 *        confirm_password:
 *          type: string
 *          example: StrongPassword@132
 *        date_of_birth:
 *          type: string
 *          example: 2023-07-09T13:18:49.709Z
 *    CreateUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Register successful
 *        result:
 *          type: object
 *          properties:
 *            access_token:
 *              type: string
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *            refresh_token:
 *              type: string
 *              example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_1ew12qe
 *    LoginUserInput:
 *      type: object
 *      required:
 *        - email
 *        - password
 *      properties:
 *        email:
 *          type: string
 *          example: publisher@gmail.com
 *        password:
 *          type: string
 *          example: StrongPassword@132
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: Login successful
 *        result:
 *          type: object
 *          example: ...
 */

/**
 * @openapi
 * /users/login:
 *  post:
 *    tags: [Users]
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserInput'
 *    responses:
 *      201:
 *        description: Register successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 */

/**
 * @openapi
 * /users/register:
 *  post:
 *    tags: [Users]
 *    summary: Register a user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *    responses:
 *      201:
 *        description: Register successful
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
