import { createCrudModuleRouter } from '../../shared/crudModule';
import { shiftsCrudConfig } from '../service/shifts.service';
import { createShiftValidators, updateShiftValidators } from '../validation/shifts.validation';

export const createShiftsRouter = () =>
  createCrudModuleRouter({
    ...shiftsCrudConfig,
    createValidators: createShiftValidators,
    updateValidators: updateShiftValidators,
  });
