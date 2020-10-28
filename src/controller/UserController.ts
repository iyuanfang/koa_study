import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";

@JsonController()
export class UserController {
  constructor(private userService: UserService) {
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
  post(@Body() userJson: any) {
    const user: User = Object.assign(new User(), userJson);
    this.userService.save(user);
    return "Saving user：" + JSON.stringify(user);
  }

  @Put("/user/:id")
  put(@Param("id") id: number, @Body() userJson: any) {
    const user: User = Object.assign(new User(), userJson);
    this.userService.update(id, user);
    return "Updating a user #" + id + ":" + JSON.stringify(user);
  }

  @Delete("/user/:id")
  delete(@Param("id") id: number) {
    this.userService.delete(id);
    return "Deleted user #" + id;
  }
}
