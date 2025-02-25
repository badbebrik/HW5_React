import { Router } from "express";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { categoryValidationRules, validate } from "../utils/validators";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Категории товаров
 */

/**
 * @openapi
 * /api/categories:
 *   get:
 *     tags: [Categories]
 *     summary: Получить все категории
 *     responses:
 *       200:
 *         description: Возвращает массив категорий
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 */
router.get("/", getCategories);

/**
 * @openapi
 * /api/categories:
 *   post:
 *     tags: [Categories]
 *     summary: Создать категорию
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       201:
 *         description: Категория успешно создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Ошибка валидации
 */
router.post("/", categoryValidationRules(), validate, createCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   get:
 *     tags: [Categories]
 *     summary: Получить категорию по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID категории
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Объект категории
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Категория не найдена
 */
router.get("/:id", getCategoryById);

/**
 * @openapi
 * /api/categories/{id}:
 *   put:
 *     tags: [Categories]
 *     summary: Обновить категорию
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID категории
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCategoryRequest'
 *     responses:
 *       200:
 *         description: Успешно обновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Категория не найдена
 */
router.put("/:id", categoryValidationRules(), validate, updateCategory);

/**
 * @openapi
 * /api/categories/{id}:
 *   delete:
 *     tags: [Categories]
 *     summary: Удалить категорию
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID категории
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Сообщение об успешном удалении
 *       404:
 *         description: Категория не найдена
 */
router.delete("/:id", deleteCategory);

export default router;
