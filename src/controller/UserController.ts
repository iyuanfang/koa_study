import { JsonController, Param, Body, Get, Post, Put, Delete } from "routing-controllers";
import { User } from "../entity/User";
import {UserService} from "../service/UserService"

@JsonController()
export class UserController {
    constructor(private userService:UserService){
    }

    @Get("/user")
    getAll() {
        return this.userService.getAll();
    }

    @Get("/user/:id")
    getOne(@Param("id") id: number) {
        return this.userService.getOne(id);
    }

    @Post("/user")
    post(@Body() user: any) {   
        const userr:User=new User();
        userr.id=user.id;
        userr.name=user.name;
        userr.pwd=user.pwd;
        
        this.userService.save(userr);
        return "Saving user："+JSON.stringify(userr);
    }

    @Put("/user/:id")
    put(@Param("id") id: number, @Body() user: any) {
        const userr:User=new User();
        userr.id=id;
        userr.name=user.name;
        userr.pwd=user.pwd;
        this.userService.update(id,userr);
        return "Updating a user #"+id+":"+JSON.stringify(userr);
    }

    @Delete("/user/:id")
    delete(@Param("id") id: number) {
        this.userService.delete(id);
        return "Deleted user #"+id;
    }
}