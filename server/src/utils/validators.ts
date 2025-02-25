import { body, validationResult } from 'express-validator';
import { RequestHandler } from 'express';

export const categoryValidationRules = () => {
  return [body('name')
    .notEmpty()
    .withMessage('Название категории обязательно')
];
};

export const productValidationRules = () => {
  return [
    body('name')
      .notEmpty()
      .withMessage('Название товара обязательно'),
    body('description')
      .notEmpty()
      .withMessage('Описание товара обязательно'),
    body('quantity')
      .notEmpty()
      .withMessage('Количество обязательно')
      .isNumeric()
      .withMessage('Количество должно быть числом')
      .custom((value) => {
        if (+value <= 0) {
          throw new Error('Количество должно быть больше 0');
        }
        return true;
      }),
    body('price')
      .notEmpty()
      .withMessage('Цена обязательна')
      .isNumeric()
      .withMessage('Цена должна быть числом')
      .custom((value) => {
        if (+value <= 0) {
          throw new Error('Цена должна быть больше 0');
        }
        return true;
      }),
    body('unit')
      .notEmpty()
      .withMessage('Единица измерения обязательна'),
  ];
};

export const validate: RequestHandler = (req, res, next): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  };
