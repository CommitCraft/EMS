import { body } from 'express-validator';

export const createMachineTypeValidators = [
  body('name').notEmpty().withMessage('Machine type name is required'),
  body('code').notEmpty().withMessage('Machine type code is required'),
  body('categoryId').notEmpty().isNumeric().withMessage('Valid category ID is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];

export const updateMachineTypeValidators = [
  body('name').optional().notEmpty().withMessage('Machine type name is required'),
  body('code').optional().notEmpty().withMessage('Machine type code is required'),
  body('categoryId').optional().isNumeric().withMessage('Valid category ID is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];