import { Memory } from "../entity/Memory";
import { getManager } from "typeorm";

export class MemoryService {
  async getAll() {
    return await getManager().find(Memory);
  }

  async getOne(id: number) {
    const memory: Memory = await getManager().findOne(Memory, { id: id });

    console.log("find memory:", memory);

    return memory ? memory : {};
  }

  async save(memory: Memory) {
    await getManager().save(memory);
    console.log("Save memory ", memory);
  }

  async update(id: number, memory: Memory) {
    await getManager().update(Memory, { id: id }, memory);
    console.log("Update memory ", memory);
  }

  async delete(id: number) {
    await getManager().delete(Memory, { id: id });
    console.log("Remove memory id:", id);
  }
}
