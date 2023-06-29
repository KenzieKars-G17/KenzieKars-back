import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./user.entity";

@Entity("adresses")
class Address {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 45 })
  cep: string;

  @Column({ type: "varchar", length: 45 })
  city: string;

  @Column({ type: "varchar", length: 11 })
  state: string;

  @Column({ type: "varchar", length: 45 })
  street: string;

  @Column({ type: "varchar", length: 45 })
  number: string;

  @Column({ type: "varchar", length: 90, nullable: true })
  complement: string | null;

  @OneToOne(() => User, (user) => user.address, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: User;
}

export default Address;
