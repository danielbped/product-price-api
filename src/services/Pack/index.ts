
import Packs from "../../entity/Packs";
import PackModel from "../../model/Pack";
import ErrorMessage from "../../utils/ErrorMessage";

export default class PackService {
  private packModel = new PackModel();

  public async getAll(): Promise<Packs[]> {
    try {
      return this.packModel.getAll();
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  }
};