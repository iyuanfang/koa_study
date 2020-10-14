import { Controller, Param, Body, Get, Post, Put, Delete } from "routing-controllers";

@Controller()
export class UserController {

    @Get("/user")
    getAll() {
        return "This action returns all users";
    }

    @Get("/user/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

    @Post("/user")
    post(@Body() user: any) {
        return "Saving user "+JSON.stringify(user);
    }

    @Put("/user/:id")
    put(@Param("id") id: number, @Body() user: any) {
        return "Updating a user #"+id+":"+JSON.stringify(user);
    }

    @Delete("/user/:id")
    remove(@Param("id") id: number) {
        return "Removing user #"+id;
    }
}