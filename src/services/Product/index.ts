
import Products, { IProductValidation, IUpdateProductDTO } from "../../entity/Products";
import ProductModel from "../../model/Product";
import ErrorMessage from "../../utils/ErrorMessage";
import PackService from "../Pack";

export default class ProductService {
  private productModel = new ProductModel();
  private packService: PackService;

  constructor() {
    this.packService = new PackService();
  }

  public async findByCode(code: number): Promise<Products | null> {
    try {
      return this.productModel.findByCode(code);
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  };  

  public async validate(products: IUpdateProductDTO[]): Promise<IProductValidation[]> {
    try {
      const result: IProductValidation[] = []
      for (const product of products) {
        const foundProduct = await this.findByCode(product.code);

        result.push({
          code: product.code,
          name: foundProduct?.name,
          sales_price: foundProduct?.sales_price,
          new_sales_price: product.sales_price
        });
      };

      return result;
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  };

  public async update(products: IUpdateProductDTO[]): Promise<void> {
    try {
      for (const product of products) {
        await this.productModel.update(product)

        const packs = await this.packService.findByProductCode(product.code);

        if (packs.length > 0) {
          for (const pack of packs) {
            const newValue = pack.qty * product.sales_price;
            await this.packService.updateValue(pack.id, newValue);
          }
        }
      };
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  };

  public async getAll(): Promise<Products[]> {
    try {
      return this.productModel.getAll();
    } catch (err: any) {
      console.error(err);
      throw new Error(err.message || ErrorMessage.UnexpectedError);
    };
  }
};