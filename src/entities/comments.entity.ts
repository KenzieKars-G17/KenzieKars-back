import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Advertisement from "./advertisement.entity";
import User from "./user.entity";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text" })
  comment: string;

  @ManyToOne(() => Advertisement)
  advertisement: Advertisement;

  @ManyToOne(() => User)
  user: User;
}

export default Comment;
