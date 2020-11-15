import { Memory } from "../entity/Memory";
import { getRepository } from "typeorm";
import { ObjectId } from "mongodb";

export default class MemoryService {
  async getAll() {
    return await getRepository(Memory).find();
  }

  async getOne(id: string) {
    const memory: Memory = await getRepository(Memory).findOne({ "_id": new ObjectId(id) });

    console.log("find memory:", memory);

    return memory;
  }

  async getByUser(user_id:string,take:number,skip:number) { 
    // const memories=await getRepository(Memory).createQueryBuilder("memory").where("memory.user._id :=id",{id:id});
    const memories=await getRepository(Memory).find({where:{"user_id":user_id },order:{date:"DESC"},take:take,skip:skip});
    console.log("get memory by user:",user_id);
    return memories;
  }

  async save(memory: Memory) {
    return await getRepository(Memory).save(memory);
  }

  async update(id: string, memory: Memory) {
    await getRepository(Memory).update({ "_id": new ObjectId(id) }, memory);
    console.log("Update memory ", memory);
  }

  async delete(id: string) {
    await getRepository(Memory).delete({ "_id": new ObjectId(id) });
    console.log("Remove memory id:", id);
  }
}
