import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Product from "./Products";

@Entity()
export default class Packs {
  @PrimaryGeneratedColumn({ type: "bigint" })
  public readonly id!: number;

  @Column({ type: "bigint" })
  public readonly pack_id!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "pack_id" })
  public readonly pack!: Product;

  @Column({ type: "bigint" })
  public readonly product_id!: number;

  @ManyToOne(() => Product)
  @JoinColumn({ name: "product_id" })
  public readonly product!: Product;

  @Column({ type: "bigint" })
  public readonly qty!: number;

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;
};