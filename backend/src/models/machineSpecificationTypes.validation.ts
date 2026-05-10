import { body } from 'express-validator';

export const createMachineSpecTypeValidators = [
  body('name').notEmpty().withMessage('Type name is required'),
  body('code').notEmpty().withMessage('Type code is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];

export const updateMachineSpecTypeValidators = [
  body('name').optional().notEmpty().withMessage('Type name is required'),
  body('code').optional().notEmpty().withMessage('Type code is required'),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];