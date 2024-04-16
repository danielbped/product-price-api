import { IUpdateProductDTO } from "../../entity/Products";
import ProductService from "../../services/Product";

export default class ProductController {
  private productService: ProductService;

  public constructor() {
    this.productService = new ProductService();
  };

  public async update(product: IUpdateProductDTO): Promise<any> {
    return this.productService.update(product);
  };
};