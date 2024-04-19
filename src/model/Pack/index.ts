import { Repository } from "typeorm";
import { AppDataSource } from "../../database";
import Packs from "../../entity/Packs";

export default class PackModel {
  private packRepository: Repository<Packs>;

  public constructor() {
    this.packRepository = AppDataSource.getRepository(Packs);
  };

  public async getAll(): Promise<Packs[]> {
    return this.packRepository.find();
  }
};