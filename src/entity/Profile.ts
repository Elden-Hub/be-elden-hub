import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  BeforeInsert,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column("text", { unique: true })
  email: string;

  @Field()
  @Column("text")
  username: string;

  @Field()
  @Column("text")
  avatar: string;

  @Column()
  password: string;

  @Field()
  @Column("bool", { default: false })
  mailingList: boolean;

  @Column("bool", { default: false })
  confirmed: boolean;

  @BeforeInsert()
  addId(): void {
    this.id = v4();
  }

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 12);
    }
  }
}
