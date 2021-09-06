import { EntityRepository, Repository } from 'typeorm'
import { Profile } from '../entities/Profile'
import { User } from '../entities/User'

@EntityRepository(Profile)
export class ProfileRepository extends Repository<Profile> {
  createUserProfile(name: string, github?: string) {
    return this.save({ name, github: github || '' })
  }
  findAllUsers() {
    return this.find({ relations: ['user'] })
  }

  editProfile(user: User, profile: Profile, newProfile: {}) {
    return this.save({ ...profile, ...newProfile, user })
  }
}
