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
  color: string;

  @Column({ type: "decimal", scale: 2 })
  table_price: number;

  @Column({ type: "decimal", scale: 2 })
  price: number;

  @Column({ type: "varchar", length: 250 })
  cover_image: string;

  @OneToMany(() => Image, (image) => image.advertisement)
  images: Image[];

  @ManyToOne(() => User)
  user: User;
}

export default Advertisement;
