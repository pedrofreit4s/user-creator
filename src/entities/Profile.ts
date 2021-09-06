import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'

@Entity('profiles')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  github: string

  @OneToOne(() => User, (user) => user.profile)
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
