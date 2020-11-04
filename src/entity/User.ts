import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  // @Column()
  // id:string;

  @Column()
  name: string;

  @Column()
  brief:string;

  @Column()
  avatar:string; //头像文件地址，用服务器文件方案而非oss

  @Column()
  pwd: string;
}
