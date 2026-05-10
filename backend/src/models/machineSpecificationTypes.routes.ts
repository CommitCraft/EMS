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

router.get("/", requirePermission("machine_specification_types", "view"), getMachineSpecTypes);

router.get("/:id", requirePermission("machine_specification_types", "view"), getMachineSpecTypeById);

router.post(
  "/",
  requirePermission("machine_specification_types", "create"),
  createMachineSpecTypeValidators,
  validateRequest,
  createMachineSpecType,
);

router.put(
  "/:id",
  requirePermission("machine_specification_types", "update"),
  updateMachineSpecTypeValidators,
  validateRequest,
  updateMachineSpecType,
);

router.delete("/:id", requirePermission("machine_specification_types", "delete"), deleteMachineSpecType);

export default router;