import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Post,
  Put,
} from "routing-controllers";
import { Memory } from "../entity/Memory";
import MemoryService from "../service/MemoryService";

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

  @Get("/memory/user/:id")
  getByUser(@Param("id") id:string) {
    return this.memoryService.getByUser(id);
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
}
