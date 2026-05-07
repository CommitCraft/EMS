import { body } from 'express-validator';

export const createSupplierValidators = [
  body('name').notEmpty().withMessage('Supplier name is required'),
  body('code').notEmpty().withMessage('Supplier code is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];

export const updateSupplierValidators = [
  body('name').optional().notEmpty().withMessage('Supplier name is required'),
  body('code').optional().notEmpty().withMessage('Supplier code is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('rating').optional().isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
];
