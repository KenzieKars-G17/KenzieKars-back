import { getRounds, hashSync } from "bcryptjs";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
  OneToMany,
} from "typeorm";
import Address from "./address.entity";
import Advertisement from "./advertisement.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ type: "varchar", length: 45 })
  phone: string;

  @Column({ type: "varchar", length: 45 })
  birthdate: string;

  @Column({ type: "varchar" })
  description: string | null;

  @Column({ type: "boolean", default: false })
  seller: boolean;

  @Column({ type: "varchar", length: 120 })
  password: string;

  @Column({type:"varchar", length: 120, nullable: true})
  resetToken: string | null;

  @CreateDateColumn({ type: "date" })
  createdAt: string;

  @UpdateDateColumn({ type: "date" })
  updatedAt: string;

  @DeleteDateColumn({ type: "date" })
  deletedAt: string;

  @OneToOne(() => Address, (address) => address.user)
  address: Address;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.user)
  advertisements: Advertisement[];

  @BeforeInsert()
  @BeforeUpdate()
  hashPassword() {
    const isEncrypted = getRounds(this.password);
    if (!isEncrypted) {
      this.password = hashSync(this.password, 10);
    }
  }
}

export default User;
