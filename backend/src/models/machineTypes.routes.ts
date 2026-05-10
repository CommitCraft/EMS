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

router.get("/", requirePermission("machine_types", "view"), getMachineTypes);

router.get(
  "/:id",
  requirePermission("machine_types", "view"),
  getMachineTypeById,
);

router.post(
  "/",
  requirePermission("machine_types", "create"),
  createMachineTypeValidators,
  validateRequest,
  createMachineType,
);

router.put(
  "/:id",
  requirePermission("machine_types", "update"),
  updateMachineTypeValidators,
  validateRequest,
  updateMachineType,
);

router.delete(
  "/:id",
  requirePermission("machine_types", "delete"),
  deleteMachineType,
);

export default router;
