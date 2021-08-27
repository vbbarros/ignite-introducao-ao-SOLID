import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    const currentDate = new Date();

    Object.assign(user, {
      name,
      email,
      created_at: currentDate,
      updated_at: currentDate,
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  turnAdmin(receivedUser: User): User {
    const userIndex = this.users.findIndex(
      (user) => user.id === receivedUser.id
    );

    if (userIndex >= 0) {
      const user = this.users[userIndex];

      const currentDate = new Date();

      user.admin = true;
      user.updated_at = currentDate;

      return user;
    }

    return receivedUser;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
