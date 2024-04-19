import Packs from "../../entity/Packs";
import PackService from "../../services/Pack";

export default class PackController {
  private packService: PackService;

  public constructor() {
    this.packService = new PackService();
  };

  public async getAll(): Promise<Packs[]> {
    return this.packService.getAll();
  };
};