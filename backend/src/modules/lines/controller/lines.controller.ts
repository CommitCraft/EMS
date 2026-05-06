import { createCrudModuleRouter } from '../../shared/crudModule';
import { linesCrudConfig } from '../service/lines.service';
import { createLineValidators, updateLineValidators } from '../validation/lines.validation';

export const createLinesRouter = () =>
  createCrudModuleRouter({
    ...linesCrudConfig,
    createValidators: createLineValidators,
    updateValidators: updateLineValidators,
  });
