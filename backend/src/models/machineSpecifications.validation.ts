import { body } from 'express-validator';

export const createMachineSpecValidators = [
  body('name').notEmpty().withMessage('Specification name is required'),
  body('code').notEmpty().withMessage('Specification code is required'),
  body('typeId').notEmpty().isNumeric().withMessage('Valid specification type ID is required'),
  body('uom').optional({ checkFalsy: true }).isString(),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];

export const updateMachineSpecValidators = [
  body('name').optional().notEmpty().withMessage('Specification name is required'),
  body('code').optional().notEmpty().withMessage('Specification code is required'),
  body('typeId').optional().isNumeric().withMessage('Valid specification type ID is required'),
  body('uom').optional({ checkFalsy: true }).isString(),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];