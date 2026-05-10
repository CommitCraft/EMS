import { Router } from "express";
import {
  getMachineSpecTypes,
  getMachineSpecTypeById,
  createMachineSpecType,
  updateMachineSpecType,
  deleteMachineSpecType,
} from "./machineSpecificationTypes.controller";
import {
  createMachineSpecTypeValidators,
  updateMachineSpecTypeValidators,
} from "./machineSpecificationTypes.validation";
import {
  validateRequest,
  authenticate,
  requirePermission,
} from "../common/middleware";

const router = Router();

router.use(authenticate);

router.get("/", requirePermission("VIEW_MACHINE_SPECIFICATION_TYPES"), getMachineSpecTypes);

router.get("/:id", requirePermission("VIEW_MACHINE_SPECIFICATION_TYPES"), getMachineSpecTypeById);

router.post(
  "/",
  requirePermission("CREATE_MACHINE_SPECIFICATION_TYPES"),
  createMachineSpecTypeValidators,
  validateRequest,
  createMachineSpecType,
);

router.put(
  "/:id",
  requirePermission("UPDATE_MACHINE_SPECIFICATION_TYPES"),
  updateMachineSpecTypeValidators,
  validateRequest,
  updateMachineSpecType,
);

router.delete("/:id", requirePermission("DELETE_MACHINE_SPECIFICATION_TYPES"), deleteMachineSpecType);

export default router;