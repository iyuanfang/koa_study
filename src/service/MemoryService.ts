import { Memory } from "../entity/Memory";
import { getManager } from "typeorm";
import { ObjectId } from "mongodb";

export class MemoryService {
  async getAll() {
    return await getManager().find(Memory);
  }

  async getOne(id: string) {
    const memory: Memory = await getManager().findOne(Memory, { "_id": new ObjectId(id) });

    console.log("find memory:", memory);

    return memory;
  }

  async save(memory: Memory) {
    return await getManager().save(memory);
  }

  async update(id: string, memory: Memory) {
    await getManager().update(Memory, { "_id": new ObjectId(id) }, memory);
    console.log("Update memory ", memory);
  }

  async delete(id: string) {
    await getManager().delete(Memory, { "_id": new ObjectId(id) });
    console.log("Remove memory id:", id);
  }
}
