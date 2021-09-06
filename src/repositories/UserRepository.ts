import { EntityRepository, Repository } from 'typeorm'
import { User } from '../entities/User'
import bcrypt from 'bcrypt'
import { Profile } from '../entities/Profile'

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.findOne({ where: { email } })
  }

  createUser(profile: Profile, email: string, password: string) {
    password = bcrypt.hashSync(password, 8)

    return this.save({ email, password, profile })
  }

  findById(id: number) {
    return this.findOne({ where: { id }, relations: ['profile'] })
  }

  deleteById(id: number) {
    return this.delete(id)
  }

  editUser(user: User, newUser: any) {
    if (newUser.password)
      newUser.password = bcrypt.hashSync(newUser.password, 8)

    return this.save({ ...user, ...newUser })
  }
}
