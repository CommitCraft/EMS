import { body } from 'express-validator';

export const createPlantValidators = [
  body('name').notEmpty().withMessage('Plant name is required'),
  body('code').notEmpty().withMessage('Plant code is required'),
  body('location').notEmpty().withMessage('Location is required'),
];

export const updatePlantValidators = [
  body('name').optional().notEmpty().withMessage('Plant name cannot be empty'),
  body('code').optional().notEmpty().withMessage('Plant code cannot be empty'),
  body('location').optional().notEmpty().withMessage('Location cannot be empty'),
];
