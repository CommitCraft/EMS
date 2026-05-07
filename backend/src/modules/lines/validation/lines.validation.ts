import { body } from 'express-validator';

export const createLineValidators = [
  body('name').notEmpty().withMessage('Line name is required'),
  body('code').notEmpty().withMessage('Line code is required'),
  body('plantId').isInt({ min: 1 }).withMessage('Valid plant ID is required'),
  body('specifications').optional().isLength({ max: 2000 }).withMessage('Line specifications cannot exceed 2000 characters'),
];

export const updateLineValidators = [
  body('name').optional().notEmpty().withMessage('Line name cannot be empty'),
  body('code').optional().notEmpty().withMessage('Line code cannot be empty'),
  body('plantId').optional().isInt({ min: 1 }).withMessage('Valid plant ID is required'),
  body('specifications').optional().isLength({ max: 2000 }).withMessage('Line specifications cannot exceed 2000 characters'),
];
