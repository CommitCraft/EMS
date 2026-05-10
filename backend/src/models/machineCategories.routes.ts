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

router.get("/", requirePermission("VIEW_MACHINE_CATEGORIES"), getMachineCategories);

router.get("/:id", requirePermission("VIEW_MACHINE_CATEGORIES"), getMachineCategoryById);

router.post(
  "/",
  requirePermission("CREATE_MACHINE_CATEGORIES"),
  createMachineCategoryValidators,
  validateRequest,
  createMachineCategory,
);

router.put(
  "/:id",
  requirePermission("UPDATE_MACHINE_CATEGORIES"),
  updateMachineCategoryValidators,
  validateRequest,
  updateMachineCategory,
);

router.delete("/:id", requirePermission("DELETE_MACHINE_CATEGORIES"), deleteMachineCategory);

export default router;