import { User } from "../entity/User";
import { getManager} from "typeorm";
import { ObjectId} from "mongodb";

export class UserService {
  async getAll() {
    return await getManager().find(User);
  }

  async getOne(id: string) {
    const user: User = await getManager().findOne(User, { "_id": ObjectId(id) });

    console.log("find user:", user);

    return user ? user : {};
  }

  async login(name:string,pwd:string) :Promise<string> {
    const user: User = await getManager().findOne(User, { "name": name,"pwd":pwd });
    console.log("login:",user);
    if(!user){
      return "";
    }else{
      return String(user._id);
    }
  }

  async save(user: User) {
    await getManager().save(user);
    console.log("Save user ", user);
  }

  async update(id: string, user: User) {
    await getManager().update(User, { "_id": ObjectId(id) }, user);
    console.log("Update user ", user);
  }

  async delete(id: string) {
    await getManager().delete(User, { "_id": ObjectId(id) });
    console.log("Remove user id:", id);
  }
}
