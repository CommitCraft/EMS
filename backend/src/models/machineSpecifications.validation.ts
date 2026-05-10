import { body } from 'express-validator';

export const createMachineSpecValidators = [
  body('name').notEmpty().withMessage('Specification name is required'),
  body('code').notEmpty().withMessage('Specification code is required'),
  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['Electrical', 'Mechanical', 'Operational', 'Environmental', 'Other']).withMessage('Invalid specification type'),
  body('uom').optional({ checkFalsy: true }).isString(),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];

export const updateMachineSpecValidators = [
  body('name').optional().notEmpty().withMessage('Specification name is required'),
  body('code').optional().notEmpty().withMessage('Specification code is required'),
  body('type')
    .optional()
    .isIn(['Electrical', 'Mechanical', 'Operational', 'Environmental', 'Other']).withMessage('Invalid specification type'),
  body('uom').optional({ checkFalsy: true }).isString(),
  body('description').optional({ checkFalsy: true }).isString(),
  body('status').optional().isIn(['Active', 'Inactive']).withMessage('Invalid status'),
];