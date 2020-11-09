import { User } from "../entity/User";
import { getManager} from "typeorm";
import { ObjectId} from "mongodb";

export class UserService {
  async getAll() {
    return await getManager().find(User);
  }

  async getOne(id: string) :Promise<User> {
    const user: User = await getManager().findOne(User, { "_id": new ObjectId(id) });

    console.log("find user:", user);

    return user;
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

  async save(user: User) :Promise<User>{
    return await getManager().save(user);
  }

  async update(id: string, user: User) {
    await getManager().update(User, { "_id": new ObjectId(id) }, user);
    console.log("Update user ", user);
  }

  async delete(id: string) {
    await getManager().delete(User, { "_id": new ObjectId(id) });
    console.log("Remove user id:", id);
  }

  async isNameExist(name:string) :Promise<boolean>{
    const user: User = await getManager().findOne(User, { "name": name});
    if(user){
      return true;
    }else{
      return false;
    }
  }
}
