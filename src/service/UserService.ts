import {Service} from "typedi";
import {User} from '../model/User';

@Service()
export class UserService{
    getUser(id:number):User{
        return {id:1,name:"yuanfang",pwd:"123456"};
    }
}