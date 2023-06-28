import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import Advertisement from "./advertisement.entity";

@Entity("images")
class Image {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 250 })
  image: string;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.images, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "advertisement_id", referencedColumnName: "id" })
  advertisement: Advertisement;
}

export default Image;
