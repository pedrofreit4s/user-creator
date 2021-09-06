import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UserRepository } from '../repositories/UserRepository'
import { ProfileRepository } from '../repositories/ProfileRepository'

export class UserController {
  async createUser(request: Request, response: Response) {
    const { name, email, password } = request.body
    const userRepository = getCustomRepository(UserRepository)
    const profileRepository = getCustomRepository(ProfileRepository)

    if (!name || !email || !password)
      return response.status(400).json({
        code: 400,
        message: 'Informe todos os campos para criar sua conta',
      })

    const userAlreadyExists = await userRepository.findByEmail(email)

    if (userAlreadyExists)
      return response.status(403).json({
        code: 403,
        message: 'Seu e-mail já foi registrado.',
      })

    const userProfileCreated = await profileRepository.createUserProfile(name)

    if (!userProfileCreated)
      return response.status(403).json({
        code: 500,
        message: 'Algo deu errado.. Dica, refaça a ação novamente!',
      })

    const userCreated = await userRepository.createUser(
      userProfileCreated,
      email,
      password
    )

    return response.status(201).json({
      code: 201,
      message: 'Criamos o seu usuário, você será redirecionado..',
      data: {
        user: userCreated,
      },
    })
  }

  async getAllUsers(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.profile', 'profile')
      // @ts-ignore
      .paginate()

    return response.status(200).json(users)
  }

  async getUserById(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findById(Number(request.params.id))

    if (!user)
      return response.status(403).json({
        code: 404,
        message: 'Não encontramos o usuário.. Dica, refaça a ação novamente!',
      })

    return response.status(200).json(user)
  }

  async deleteUserById(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const deleted = await userRepository.deleteById(Number(request.params.id))

    if (deleted.affected <= 0)
      return response.status(403).json({
        code: 404,
        message: 'Não encontramos o usuário.. Dica, refaça a ação novamente!',
      })

    return response.status(200).json({
      code: 200,
      message: 'Usuário apagado com sucesso!',
    })
  }

  async editUserById(request: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const profileRepository = getCustomRepository(ProfileRepository)

    const user = await userRepository.findById(Number(request.params.id))

    await profileRepository.editProfile(
      user,
      user.profile,
      request.body.profile
    )
    const editedUser = await userRepository.editUser(user, request.body)

    return response.status(200).json({
      code: 200,
      message: 'Usuário editado com sucesso!',
      data: {
        user: editedUser,
      },
    })
  }
}
