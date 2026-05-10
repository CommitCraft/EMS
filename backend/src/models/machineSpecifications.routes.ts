import { Router } from 'express';
import {
  getMachineSpecs,
  getMachineSpecById,
  createMachineSpec,
  updateMachineSpec,
  deleteMachineSpec,
} from './machineSpecifications.controller';
import { createMachineSpecValidators, updateMachineSpecValidators } from './machineSpecifications.validation';
import { validateRequest, authenticate, requirePermission } from '../common/middleware';

const router = Router();

router.use(authenticate);

router.get(
  '/',
  requirePermission('VIEW_MACHINE_SPECIFICATIONS'),
  getMachineSpecs
);

router.get(
  '/:id',
  requirePermission('VIEW_MACHINE_SPECIFICATIONS'),
  getMachineSpecById
);

router.post(
  '/',
  requirePermission('CREATE_MACHINE_SPECIFICATIONS'),
  createMachineSpecValidators,
  validateRequest,
  createMachineSpec
);

router.put(
  '/:id',
  requirePermission('UPDATE_MACHINE_SPECIFICATIONS'),
  updateMachineSpecValidators,
  validateRequest,
  updateMachineSpec
);

router.delete(
  '/:id',
  requirePermission('DELETE_MACHINE_SPECIFICATIONS'),
  deleteMachineSpec
);

export default router;