import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class Memory {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id:number;

  @Column()
  date: string; //yyyy-MM-dd hh:ss 格式

  @Column()
  img:string;

  @Column()
  story:string; //想说的话

}