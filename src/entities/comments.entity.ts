import moment from "moment";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import Advertisement from "./advertisement.entity";
import User from "./user.entity";

@Entity("comments")
class Comment {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "text" })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.comments, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "advertisement_id", referencedColumnName: "id" })
  advertisement: Advertisement;

  @ManyToOne(() => User)
  user: User;
}

export default Comment;
