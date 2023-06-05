import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import Advertisement from "./advertisement.entity";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 250 })
  image: string;

  @ManyToOne(() => Advertisement)
  advertisement: Advertisement;
}

export default Image;
