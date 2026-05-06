import { body } from 'express-validator';

export const createShiftValidators = [
  body('name').notEmpty().withMessage('Shift name is required'),
  body('startTime').matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time (HH:MM) is required'),
  body('endTime').matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid end time (HH:MM) is required'),
  body('duration').isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
];

export const updateShiftValidators = [
  body('name').optional().notEmpty().withMessage('Shift name cannot be empty'),
  body('startTime').optional().matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid start time (HH:MM) is required'),
  body('endTime').optional().matches(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid end time (HH:MM) is required'),
  body('duration').optional().isInt({ min: 1 }).withMessage('Duration must be a positive integer'),
];
