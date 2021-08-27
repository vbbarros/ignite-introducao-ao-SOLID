import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const userRequesting = users.find((user) => user.id === user_id);

    if (!userRequesting || !userRequesting.admin) {
      throw new Error("Usuário não tem permissão para listar usuários");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
