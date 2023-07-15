import { createHash } from 'crypto'

export function hashPassword(password: string) {
  return createHash('sha256')
    .update(password + process.env.PASSWORD_SECRET)
    .digest('hex')
}
