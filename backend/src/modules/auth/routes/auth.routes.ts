import { Router } from 'express';
import { body } from 'express-validator';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { env } from '../../../config/env';
import { AppError, AuthenticatedRequest } from '../../../common/middleware';
import {
  changePassword,
  forgotPassword,
  login,
  logout,
  me,
  refresh,
  updateProfile,
} from '../controller/auth.controller';
import { loginValidators } from '../validation/auth.validation';
import { authenticate, validateRequest } from '../../../common/middleware';

const authRoutes = Router();

authRoutes.post('/login', loginValidators, validateRequest, login);
authRoutes.post('/refresh', refresh);
authRoutes.post('/logout', logout);
authRoutes.get('/me', authenticate, me);
authRoutes.put(
  '/profile',
  authenticate,
  [body('name').optional().trim().notEmpty(), body('email').optional().isEmail(), body('mobile').optional().trim()],
  validateRequest,
  updateProfile,
);

// Avatar upload for authenticated user
const avatarStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const destination = path.join(process.cwd(), env.uploadDir, 'avatars');
    fs.mkdirSync(destination, { recursive: true });
    cb(null, destination);
  },
  filename: (_req, file, cb) => {
    const safe = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${Date.now()}-${safe}`);
  },
});

const avatarUpload = multer({
  storage: avatarStorage,
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
      cb(new Error('File type not allowed'));
      return;
    }
    cb(null, true);
  },
});

authRoutes.post('/profile/avatar', authenticate, avatarUpload.single('file'), (req: AuthenticatedRequest, res) => {
  if (!req.user) {
    throw new AppError('Authentication required', 401);
  }

  const file = req.file;
  if (!file) {
    throw new AppError('File upload failed', 400);
  }

  const baseUrl = (env.uploadBaseUrl || '').replace(/\/$/, '');
  const relative = file.path.replace(process.cwd(), '').replace(/\\/g, '/').replace(/^\/+/, '');
  const publicUrl = baseUrl ? `${baseUrl}/${relative}` : `/${relative}`;

  res.json({ success: true, url: publicUrl });
});
authRoutes.post(
  '/change-password',
  authenticate,
  [body('currentPassword').notEmpty(), body('newPassword').isLength({ min: 6 })],
  validateRequest,
  changePassword,
);
authRoutes.post('/forgot-password', [body('email').isEmail()], validateRequest, forgotPassword);

export default authRoutes;
