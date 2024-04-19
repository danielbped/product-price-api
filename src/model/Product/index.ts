import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import Products, { IUpdateProductDTO } from "../../entity/Products";

export default class ProductModel {
  private productRepository: Repository<Products>;

  public constructor() {
    this.productRepository = AppDataSource.getRepository(Products);
  };

  public async findByCode(code: number): Promise<Products | null> {
    return this.productRepository.findOne({ where: { code } });
  };

  public async update(product: IUpdateProductDTO): Promise<boolean> {
    await this.productRepository.update(product.code, { sales_price: product.sales_price });

    return true;
  };

  public async getAll(): Promise<Products[]> {
    return this.productRepository.find();
  }
};