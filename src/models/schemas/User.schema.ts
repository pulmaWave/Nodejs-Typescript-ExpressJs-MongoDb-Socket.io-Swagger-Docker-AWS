import { ObjectId } from 'mongodb'
import { UserVerifyStatus } from '~/constants/enums'

export interface UserType {
  _id?: ObjectId
  name?: string
  email: string
  password: string
  created_at?: Date
  updated_at?: Date
  date_of_birth?: Date
  email_verify_token?: string // jwt or '' if verified
  password_reset_token?: string // jwt or '' if verified
  verify?: UserVerifyStatus
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}

export default class User {
  _id?: ObjectId
  name: string
  email: string
  password: string
  created_at: Date
  updated_at: Date
  date_of_birth: Date
  email_verify_token: string // jwt or '' if verified
  password_reset_token: string // jwt or '' if verified
  verify: UserVerifyStatus
  bio: string
  location: string
  website: string
  username: string
  avatar: string
  cover_photo: string

  constructor(user: UserType) {
    const date = new Date()
    this._id = user._id || new ObjectId()
    this.name = user.name || ''
    this.email = user.email
    this.password = user.password
    this.created_at = user.created_at || date
    this.updated_at = user.updated_at || date
    this.date_of_birth = user.date_of_birth || new Date()
    this.email_verify_token = user.email_verify_token || ''
    this.password_reset_token = user.password_reset_token || ''
    this.verify = user.verify || UserVerifyStatus.Unverified
    this.bio = user.bio || ''
    this.location = user.location || ''
    this.website = user.website || ''
    this.username = user.username || ''
    this.avatar = user.avatar || ''
    this.cover_photo = user.cover_photo || ''
  }
}
