import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from 'express';
import ErrorMessage from "../../utils/ErrorMessage";
import ProductController from "../../controller/Products";
import ProductValidation from "../../middleware/ValidateProduct";

const router = Router({ mergeParams: true });

const { validate } = new ProductValidation();

const productController = new ProductController();

/**
 * @openapi
 * /product/validate:
 *   post:
 *     tags:
 *       - Product
 *     description: Valida os produtos a serem atualizados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidateProductInput'
 *     responses:
 *       200:
 *         description: Sucesso, os produtos estão aptos a serem atualizados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateProductsResponse'
 *       500:
 *         description: Erro interno do sistema.
 *       400:
 *         description: Dados inválidos, para cada produto contendo erro, uma mensagem de erro será exibida junto do código do produto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateProductsErrorResponse'
*/
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { products } = req.body;

    const result = await productController.validate(products);

    return res.status(StatusCodes.OK).json(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

/**
 * @openapi
 * /product:
 *   put:
 *     tags:
 *       - Product
 *     description: Atualiza os produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ValidateProductInput'
 *     responses:
 *       200:
 *         description: Sucesso, os produtos foram atualizados.
 *       500:
 *         description: Erro interno do sistema.
 *       400:
 *         description: Dados inválidos, para cada produto contendo erro, uma mensagem de erro será exibida junto do código do produto.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ValidateProductsErrorResponse'
*/
router.put('/', async (req: Request, res: Response) => {
  try {
    const { products } = req.body;

    await productController.update(products);

    return res.status(StatusCodes.OK).send();
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