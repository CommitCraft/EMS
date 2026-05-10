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
  requirePermission('machine_specifications', 'view'),
  getMachineSpecs
);

router.get(
  '/:id',
  requirePermission('machine_specifications', 'view'),
  getMachineSpecById
);

router.post(
  '/',
  requirePermission('machine_specifications', 'create'),
  createMachineSpecValidators,
  validateRequest,
  createMachineSpec
);

router.put(
  '/:id',
  requirePermission('machine_specifications', 'update'),
  updateMachineSpecValidators,
  validateRequest,
  updateMachineSpec
);

router.delete(
  '/:id',
  requirePermission('machine_specifications', 'delete'),
  deleteMachineSpec
);

export default router;