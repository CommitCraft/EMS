import { body } from 'express-validator';

export const createMachineValidators = [
  body('name').notEmpty().withMessage('Machine name is required'),
  body('code').notEmpty().withMessage('Machine code is required'),
  body('plantId').isInt({ min: 1 }).withMessage('Valid plant ID is required'),
  body('lineId').isInt({ min: 1 }).withMessage('Valid line ID is required'),
  body('specifications').optional().isLength({ max: 2000 }).withMessage('Machine specifications cannot exceed 2000 characters'),
];

export const updateMachineValidators = [
  body('name').optional().notEmpty().withMessage('Machine name cannot be empty'),
  body('code').optional().notEmpty().withMessage('Machine code cannot be empty'),
  body('plantId').optional().isInt({ min: 1 }).withMessage('Valid plant ID is required'),
  body('lineId').optional().isInt({ min: 1 }).withMessage('Valid line ID is required'),
  body('specifications').optional().isLength({ max: 2000 }).withMessage('Machine specifications cannot exceed 2000 characters'),
];
