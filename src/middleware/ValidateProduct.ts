import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ErrorMessage from '../utils/ErrorMessage';
import ProductService from '../services/Product';
import ComparePrices from '../helper/comparePrices';

export default class ProductValidation {
  private productService = new ProductService();
  private comparePrices = new ComparePrices();

  public constructor() {
    this.validate = this.validate.bind(this)
  };

  public async validate(req: Request, res: Response, next: NextFunction): Promise<void | Response> {
    try {
      const { code, cost_price, sales_price } = req.body;

      if (!code) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.MissingProductCode,
        });
      }

      const product = await this.productService.findByCode(code);

      if (!product) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.ProductNotFount,
        });
      }

      if (sales_price < cost_price) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: ErrorMessage.SalePriceBellowCostPrice,
        });
      };

      if (this.comparePrices.isHigher(product.sales_price, sales_price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `sales_price ${ErrorMessage.HigherThanItself}`,
        });
      };

      if (this.comparePrices.isLower(product.cost_price, cost_price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `sales_price ${ErrorMessage.LowerThanItself}`,
        });
      };

      if (this.comparePrices.isHigher(product.cost_price, cost_price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `cost_price ${ErrorMessage.HigherThanItself}`,
        });
      };

      if (this.comparePrices.isLower(product.sales_price, sales_price)) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: `cost_price ${ErrorMessage.LowerThanItself}`,
        });
      };

      return next();
    } catch (err: any) {
      console.error(err);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: err.message || ErrorMessage.InternalServerError });
    };
  };
};