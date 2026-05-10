import { body } from 'express-validator';

export const createMachineCategoryValidators = [
  body('name').notEmpty().withMessage('Category name is required'),
  body('code').notEmpty().withMessage('Category code is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];

export const updateMachineCategoryValidators = [
  body('name').optional().notEmpty().withMessage('Category name is required'),
  body('code').optional().notEmpty().withMessage('Category code is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];