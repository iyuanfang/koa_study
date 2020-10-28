import { Column, Entity, ObjectID, ObjectIdColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectID;

  @Column()
  id:number;

  @Column()
  name: string;

  @Column()
  brief:string;

  @Column()
  pwd: string;
}
