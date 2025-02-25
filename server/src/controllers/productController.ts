import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import Category from "../models/Category";

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 64123456abc123def4567890
 *         name:
 *           type: string
 *           example: "Нижнее белье"
 *     CreateCategoryRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Игрушки"
 *
 *     Product:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6434c97eec30e3f68b10acc7
 *         name:
 *           type: string
 *           example: "Трусы"
 *         description:
 *           type: string
 *           example: "Шикарные трусы"
 *         category:
 *           type: string
 *           nullable: true
 *           example: 64123456abc123def4567890
 *         quantity:
 *           type: number
 *           example: 10
 *         price:
 *           type: number
 *           example: 499
 *         unit:
 *           type: string
 *           example: "шт"
 *         imageUrl:
 *           type: string
 *           example: "https://..."
 *     CreateProductRequest:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Новый товар"
 *         description:
 *           type: string
 *           example: "Описание товара"
 *         category:
 *           type: string
 *           example: "64123456abc123def4567890"
 *         quantity:
 *           type: number
 *           example: 5
 *         price:
 *           type: number
 *           example: 999
 *         unit:
 *           type: string
 *           example: "шт"
 *         imageUrl:
 *           type: string
 *           example: "http://..."
 */

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, category, quantity, price, unit, imageUrl } =
      req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(400).json({
          errors: [
            {
              msg: "Категория не найдена",
            },
          ],
        });
        return;
      }
    }

    const product = new Product({
      name,
      description,
      category: category || null,
      quantity,
      price,
      unit,
      imageUrl,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;

    const [products, total] = await Promise.all([
      Product.find().skip(offset).limit(limit),
      Product.countDocuments(),
    ]);

    res.json({
      products,
      total,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({
        errors: [
          {
            msg: "Товар не найден",
          },
        ],
      });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, description, category, quantity, price, unit, imageUrl } =
      req.body;

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        res.status(400).json({
          errors: [
            {
              msg: "Категория не найдена",
            },
          ],
        });
        return;
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        category: category,
        quantity,
        price,
        unit,
        imageUrl,
      },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      res.status(404).json({
        errors: [
          {
            msg: "Товар не найден",
          },
        ],
      });
      return;
    }
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      res.status(404).json({
        errors: [
          {
            msg: "Товар не найден",
          },
        ],
      });
      return;
    }
    res.json({ message: "Товар удалён" });
  } catch (error) {
    next(error);
  }
};
