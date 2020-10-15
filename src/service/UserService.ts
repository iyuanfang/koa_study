import { User } from "../entity/User";
import { getManager } from "typeorm";

export class UserService {
  async getAll() {
    return await getManager().find(User);
  }

  async getOne(id: number) {
    const user: User = await getManager().findOne(User, { id: id });

    console.log("find user:", user);

    return user ? user : {};
  }

  async save(user: User) {
    await getManager().save(user);
    console.log("Save user ", user);
  }

  async update(id: number, user: User) {
    await getManager().update(User, { id: id }, user);
    console.log("Update user ", user);
  }

  async delete(id: number) {
    await getManager().delete(User, { id: id });
    console.log("Remove user id:", id);
  }
}
