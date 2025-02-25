import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import { RequestHandler } from "express";
import Product from "../models/Product";

export const createCategory: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      res.status(404).json({
        errors: [
          {
            msg: "Категория не найдена",
          },
        ],
      });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!updatedCategory)
      res.status(404).json({
        errors: [
          {
            msg: "Категория не найдена",
          },
        ],
      });
    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      res.status(404).json({
        errors: [
          {
            msg: "Категория не найдена",
          },
        ],
      });
      return;
    }
    await Product.updateMany(
      { category: req.params.id },
      { $unset: { category: null } }
    );
    res.json({ message: "Категория удалена и товары обновлены" });
  } catch (error) {
    next(error);
  }
};
