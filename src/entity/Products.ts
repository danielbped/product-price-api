import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from "typeorm";

export interface IProductValidation {
  code: number,
  name?: string,
  sales_price?: number,
  new_sales_price: number
}

export interface IUpdateProductDTO extends Omit<Products, 'cost_price' | 'name' | 'createdAt' | 'updatedAt'> {};

@Entity()
export default class Products {
  @PrimaryColumn({ type: "bigint" })
  public readonly code!: number;

  @Column({ type: "varchar", length: 100 })
  public readonly name!: string;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  public readonly cost_price!: number;

  @Column({ type: "decimal", precision: 9, scale: 2 })
  public readonly sales_price!: number;

  @CreateDateColumn()
  public readonly createdAt!: Date;

  @UpdateDateColumn()
  public readonly updatedAt!: Date;
};