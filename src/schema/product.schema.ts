import { object, array, number } from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *         sales_price:
 *           type: number
 *
 *     ValidateProductsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           code:
 *             type: number
 *           name:
 *             type: string
 *           sales_price:
 *             type: number
 *           new_sales_price:
 *             type: number
 *     ListProductsResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           code:
 *             type: number
 *           name:
 *             type: string
 *           sales_price:
 *             type: number
 *           cost_price:
 *             type: number
 *           createdAt:
 *             type: string
 *           updatedAt:
 *             type: string
 *
 *     ValidateProductsErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         errors:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *               code:
 *                 type: number
 * 
 *     ValidateProductInput:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 */

const payload = {
  body: object({
    products: array(object({
      code: number(),
      sales_price: number(),
    })),
  }),
};

export const validateProductsSchema = object({
  ...payload,
});

export type ValidateProductsInput = { products: { code: number; sales_price: number }[] };