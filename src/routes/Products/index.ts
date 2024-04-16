import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from 'express';
import ErrorMessage from "../../utils/ErrorMessage";
import ProductController from "../../controller/Products";
import ProductValidation from "../../middleware/ValidateProduct";

const router = Router({ mergeParams: true });

const { validate } = new ProductValidation();

const productController = new ProductController();

router.put('/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const product = req.body;

    const result = await productController.update({ code, ...product });

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const product = (root: Router) => {
  root.use('/product',
    validate,
    router
  )
};

export default product;