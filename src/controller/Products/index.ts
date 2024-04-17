import { IProductValidation, IUpdateProductDTO } from "../../entity/Products";
import ProductService from "../../services/Product";

export default class ProductController {
  private productService: ProductService;

  public constructor() {
    this.productService = new ProductService();
  };

  public async update(products: IUpdateProductDTO[]): Promise<any> {
    return this.productService.update(products);
  };

  public async validate(products: IUpdateProductDTO[]): Promise<IProductValidation[]> {
    return this.productService.validate(products);
  };
};