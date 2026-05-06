import { createCrudModuleRouter } from '../../shared/crudModule';
import { machinesCrudConfig } from '../service/machines.service';
import { createMachineValidators, updateMachineValidators } from '../validation/machines.validation';

export const createMachinesRouter = () =>
  createCrudModuleRouter({
    ...machinesCrudConfig,
    createValidators: createMachineValidators,
    updateValidators: updateMachineValidators,
  });
