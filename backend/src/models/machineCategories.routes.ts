import { Router } from "express";
import {
  getMachineCategories,
  getMachineCategoryById,
  createMachineCategory,
  updateMachineCategory,
  deleteMachineCategory,
} from "./machineCategories.controller";
import {
  createMachineCategoryValidators,
  updateMachineCategoryValidators,
} from "./machineCategories.validation";
import {
  validateRequest,
  authenticate,
  requirePermission,
} from "../common/middleware";

const router = Router();

router.use(authenticate);

router.get("/", requirePermission("machine_categories", "view"), getMachineCategories);

router.get("/:id", requirePermission("machine_categories", "view"), getMachineCategoryById);

router.post(
  "/",
  requirePermission("machine_categories", "create"),
  createMachineCategoryValidators,
  validateRequest,
  createMachineCategory,
);

router.put(
  "/:id",
  requirePermission("machine_categories", "update"),
  updateMachineCategoryValidators,
  validateRequest,
  updateMachineCategory,
);

router.delete("/:id", requirePermission("machine_categories", "delete"), deleteMachineCategory);

export default router;