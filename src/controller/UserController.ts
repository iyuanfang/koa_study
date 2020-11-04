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
  getOne(@Param("id") id: string) {
    return this.userService.getOne(id);
  }

  @Post("/user")
  post(@Body() userJson: any) {
    const user: User = Object.assign(new User(), userJson);
    this.userService.save(user);
    return "Saving user：" + JSON.stringify(user);
  }

  @Post("/login")
  login(@Body() loginForm: any) {
    const name = loginForm.name;
    const pwd = loginForm.pwd;
    return this.userService.login(name, pwd);
  }

  @Put("/user/:id")
  put(@Param("id") id: string, @Body() userJson: any) {
    const user: User = Object.assign(new User(), userJson);
    this.userService.update(id, user);
    return "Updating a user #" + id + ":" + JSON.stringify(user);
  }

  @Delete("/user/:id")
  delete(@Param("id") id: string) {
    this.userService.delete(id);
    return "Deleted user #" + id;
  }
}
