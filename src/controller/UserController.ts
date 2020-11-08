import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { User } from "../entity/User";
import { UserService } from "../service/UserService";
import { fileUploadOptions } from "./Upload";

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

  @Get("/user/name/:name")
  getName(@Param("name") name: string) {
    return this.userService.isNameExist(name);
  }

  @Post("/user")
  async post(@Body() userJson: any) {
    const user: User = Object.assign(new User(), userJson);
    const userSaved = await this.userService.save(user);
    return JSON.stringify(userSaved);
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
    return "Updating a user #" + id + ":" + JSON.stringify(userJson);
  }

  @Patch("/user/:id")
  async patch(@Param("id") id: string, @Body() userJson: any) {
    let user: User = await this.userService.getOne(id);
    user = Object.assign(user, userJson);
    this.userService.update(id, user);
    return "Patching a user #" + id + ":" + JSON.stringify(userJson);
  }

  @Delete("/user/:id")
  delete(@Param("id") id: string) {
    this.userService.delete(id);
    return "Deleted user #" + id;
  }

  @Post("/avatar/:id")
  async avatar(@UploadedFile("avatar", { options: fileUploadOptions }) file: any, @Param("id") id: string) {
    let user: User = await this.userService.getOne(id);
    user.avatar=file.filename
    this.userService.update(id, user);
    console.log("upload avatar:", file);
    return file.filename;
  }
}
