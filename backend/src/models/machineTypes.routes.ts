import { Router } from "express";
import {
  getMachineTypes,
  getMachineTypeById,
  createMachineType,
  updateMachineType,
  deleteMachineType,
} from "./machineTypes.controller";
import {
  createMachineTypeValidators,
  updateMachineTypeValidators,
} from "./machineTypes.validation";
import {
  validateRequest,
  authenticate,
  requirePermission,
} from "../common/middleware";

const router = Router();

router.use(authenticate); // Ensure all endpoints are protected

router.get("/", requirePermission("VIEW_MACHINE_TYPES"), getMachineTypes);

router.get(
  "/:id",
  requirePermission("VIEW_MACHINE_TYPES"),
  getMachineTypeById,
);

router.post(
  "/",
  requirePermission("CREATE_MACHINE_TYPES"),
  createMachineTypeValidators,
  validateRequest,
  createMachineType,
);

router.put(
  "/:id",
  requirePermission("UPDATE_MACHINE_TYPES"),
  updateMachineTypeValidators,
  validateRequest,
  updateMachineType,
);

router.delete(
  "/:id",
  requirePermission("DELETE_MACHINE_TYPES"),
  deleteMachineType,
);

export default router;
