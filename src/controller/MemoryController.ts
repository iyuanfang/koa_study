import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
  UploadedFile,
} from "routing-controllers";
import { Memory } from "../entity/Memory";
import MemoryService from "../service/MemoryService";
import { memoryUploadOptions } from "./Upload";

@JsonController()
export class MemoryController {
  constructor(private memoryService: MemoryService) {
  }

  @Get("/memory")
  getAll() {
    return this.memoryService.getAll();
  }

  @Get("/memory/:id")
  getOne(@Param("id") id: string) {
    return this.memoryService.getOne(id);
  }

  @Get("/memory/user/:id/:take/:skip")
  getByUser(@Param("id") id:string,@Param("take") take:number,@Param("skip") skip:number) {
    return this.memoryService.getByUser(id,take,skip);
  }

  @Post("/memory")
  post(@Body() memoryJson: any) {
    const memory: Memory = Object.assign(new Memory(), memoryJson);
    memory.date=new Date();
    this.memoryService.save(memory);
    return "Saving memory：" + JSON.stringify(memory);
  }

  @Put("/memory/:id")
  put(@Param("id") id: string, @Body() memoryJson: any) {
    const memory: Memory = Object.assign(new Memory(), memoryJson);
    this.memoryService.update(id, memory);
    return "Updating a memory #" + id + ":" + JSON.stringify(memory);
  }

  @Delete("/memory/:id")
  delete(@Param("id") id: string) {
    this.memoryService.delete(id);
    return "Deleted memory #" + id;
  }

  @Post("/memory/upload")
  async avatar(@UploadedFile("memory", { options: memoryUploadOptions }) file: any) {
    console.log("upload memory':", file);
    return file.filename;
  }
}
