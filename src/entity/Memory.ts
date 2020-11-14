import { Column, Entity, ManyToOne, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class Memory {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  date: Date; //当前时间

  @Column()
  imgs:string[]; //图片列表

  @Column()
  story:string; //想说的话

  // @ManyToOne(type => User, user => user.memories)
  // user:User;
  @Column()
  user_id:string; //用户id，存string

}