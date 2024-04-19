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

  @Column({ type: "bigint" })
  public readonly value!: number;

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;

  public constructor(props: Omit<Packs, 'id' | 'createdAt' | 'updatedAt'>, value?: number) {
    Object.assign(this, props);

    if (!value && this.product && this.product.sales_price && this.qty) {
      this.value = this.qty * this.product.sales_price;
    };
  };
};