import { Router } from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";
import { productValidationRules, validate } from "../utils/validators";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Products
 *   description: Товары
 */

/**
 * @openapi
 * /api/products:
 *   get:
 *     tags: [Products]
 *     summary: Получить список товаров (с пагинацией)
 *     parameters:
 *       - name: limit
 *         in: query
 *         description: Максимальное кол-во товаров
 *         required: false
 *         schema:
 *           type: integer
 *       - name: offset
 *         in: query
 *         description: Пропустить N товаров
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Список товаров + общее кол-во
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *                 total:
 *                   type: number
 */
router.get("/", getProducts);

/**
 * @openapi
 * /api/products:
 *   post:
 *     tags: [Products]
 *     summary: Создать товар
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       201:
 *         description: Товар успешно создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Указана несуществующая категория
 */
router.post("/", productValidationRules(), validate, createProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   get:
 *     tags: [Products]
 *     summary: Получить товар по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID товара
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Объект товара
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
router.get("/:id", getProductById);

/**
 * @openapi
 * /api/products/{id}:
 *   put:
 *     tags: [Products]
 *     summary: Обновить товар
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID товара
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateProductRequest'
 *     responses:
 *       200:
 *         description: Успешно обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Товар не найден
 */
router.put("/:id", productValidationRules(), validate, updateProduct);

/**
 * @openapi
 * /api/products/{id}:
 *   delete:
 *     tags: [Products]
 *     summary: Удалить товар
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID товара
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Сообщение об успешном удалении
 *       404:
 *         description: Товар не найден
 */
router.delete("/:id", deleteProduct);

export default router;
