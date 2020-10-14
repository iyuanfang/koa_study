import {User} from '../model/User';

export class UserService{
    getAll():User[]{
        return [{id:1,name:"yuanfang",pwd:"123456"},{id:2,name:"yuanfang2",pwd:"123456"}];
    }

    getOne(id:number):User{
        return {id:1,name:"yuanfang",pwd:"123456"};
    }

    save(user:User){
        console.log("Save user ",user);
    }

    remove(id:number){
        console.log("Remove user id:",id);
    }
}