import { StatusCodes } from "http-status-codes";
import { Request, Response, Router } from 'express';
import ErrorMessage from "../../utils/ErrorMessage";
import PackController from "../../controller/Packs";

const router = Router({ mergeParams: true });

const packController = new PackController();

/**
 * @openapi
 * /pack:
 *  get:
 *     tags:
 *     - Pack
 *     description: Retorna uma lista com todos os pacotes
 *     responses:
 *       200:
 *         description: Retorna uma lista com todos os pacotes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ListPacksResponse'
 *       500:
 *         description: Erro interno do sistema.
*/
router.get('/', async (_req: Request, res: Response) => {
  try {
    const result = await packController.getAll();

    return res.status(StatusCodes.OK).send(result);
  } catch (err: any) {
    console.error(err);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || ErrorMessage.InternalServerError
    });
  };
});

const pack = (root: Router) => {
  root.use('/pack',
    router
  )
};

export default pack;