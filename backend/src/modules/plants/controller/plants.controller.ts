import { createCrudModuleRouter } from '../../shared/crudModule';
import { plantsCrudConfig } from '../service/plants.service';
import { createPlantValidators, updatePlantValidators } from '../validation/plants.validation';

export const createPlantsRouter = () =>
  createCrudModuleRouter({
    ...plantsCrudConfig,
    createValidators: createPlantValidators,
    updateValidators: updatePlantValidators,
  });
