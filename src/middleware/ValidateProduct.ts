import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessage from '../utils/ErrorMessage';
import ProductService from '../services/Product';
import ComparePrices from '../helper/comparePrices';

interface Errors {
  code: number;
  message: string;
};

export default class ProductValidation {
  private productService = new ProductService();
  private comparePrices = new ComparePrices();

  public constructor() {
    this.validate = this.validate.bind(this);
  };

  public async validate(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { products } = req.body;
      const errors: Errors[] = [];

      for (const product of products) {
        const { code, sales_price } = product;

        if (!code) {
          errors.push({
            message: ErrorMessage.MissingProductCode,
            code
          });
          continue;
        };

        const foundProduct = await this.productService.findByCode(code);

        if (!foundProduct) {
          errors.push({
            message: ErrorMessage.ProductNotFound,
            code
          });
          continue;
        };

        if (isNaN(sales_price)) {
          errors.push({
            message: ErrorMessage.InvalidProductPrice,
            code
          });
          continue;
        }

        if (sales_price < foundProduct.cost_price) {
          errors.push({
            message: ErrorMessage.SalePriceBellowCostPrice,
            code
          });
        };

        if (this.comparePrices.isHigher(foundProduct.sales_price, sales_price)) {
          errors.push({
            message: ErrorMessage.HigherThanItself,
            code
          });
        };

        if (this.comparePrices.isLower(foundProduct.sales_price, sales_price)) {
          errors.push({
            message: ErrorMessage.LowerThanItself,
            code
          });
        };
      };

      if (errors.length > 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.NoneProductsUpdated,
          errors
        });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || ErrorMessage.InternalServerError });
    };
  };
};
