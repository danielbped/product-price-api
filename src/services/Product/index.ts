
import Products, { IUpdateProductDTO } from "../../entity/Products";
import ProductModel from "../../model/Product";
import ErrorMessage from "../../utils/ErrorMessage";

export default class ProductService {
  private productModel = new ProductModel();

  public async findByCode(code: number): Promise<Products | null> {
    try {
      return this.productModel.findByCode(code);
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  };  

  public async update(product: IUpdateProductDTO): Promise<boolean> {
    try {
      return this.productModel.update(product);
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  };
};