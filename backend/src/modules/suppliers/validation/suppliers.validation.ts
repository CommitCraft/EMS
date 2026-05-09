import { body } from 'express-validator';

export const createSupplierValidators = [
  body('name').notEmpty().withMessage('Supplier name is required'),
  body('code').notEmpty().withMessage('Supplier code is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('rating')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || value === '') {
        return true; // Allow empty/null for optional field
      }
      const num = Number(value);
      if (isNaN(num) || num < 0 || num > 5) {
        throw new Error('Rating must be a decimal number between 0 and 5');
      }
      return true;
    }),
];

export const updateSupplierValidators = [
  body('name').optional().notEmpty().withMessage('Supplier name is required'),
  body('code').optional().notEmpty().withMessage('Supplier code is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
  body('rating')
    .optional()
    .custom((value) => {
      if (value === null || value === undefined || value === '') {
        return true; // Allow empty/null for optional field
      }
      const num = Number(value);
      if (isNaN(num) || num < 0 || num > 5) {
        throw new Error('Rating must be a decimal number between 0 and 5');
      }
      return true;
    }),
];
