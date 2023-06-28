import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";
import Image from "./image";
import Comment from "./comments.entity";

@Entity("advertisements")
class Advertisement {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 125 })
  brand: string;

  @Column({ type: "varchar", length: 125 })
  model: string;

  @Column({ type: "varchar", length: 125 })
  fuel: string;

  @Column({ type: "varchar", length: 45 })
  mileage: string;

  @Column({ type: "varchar", length: 45 })
  description: string;

  @Column({ type: "varchar", length: 4 })
  year: string;

  @Column({ type: "varchar", length: 45 })
  color: string;

  @Column({ type: "decimal", scale: 2 })
  table_price: number;

  @Column({ type: "decimal", scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 250 })
  cover_image: string;

  @Column({ type: "boolean", default: true })
  is_active: boolean;

  @OneToMany(() => Image, (image) => image.advertisement)
  images: Image[];

  @OneToMany(() => Comment, (comment) => comment.advertisement)
  comments: Comment[];

  @ManyToOne(() => User, (user) => user.advertisements, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}

export default Advertisement;
