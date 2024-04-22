import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import Packs from "../../entity/Packs";

export default class PackModel {
  private packRepository: Repository<Packs>;

  public constructor() {
    this.packRepository = AppDataSource.getRepository(Packs);
  };

  public async findByProductCode(code: number): Promise<Packs[]> {
    return this.packRepository.find({ where: { product_id: code } });
  };

  public async getAll(): Promise<Packs[]> {
    return this.packRepository.find({ relations: ['product'] });
  };

  public async updateValue(id: number, value: number): Promise<boolean> {
    const result = await this.packRepository.update({ id }, { value });
    return result.affected ? result.affected > 0 : false;
  }
};