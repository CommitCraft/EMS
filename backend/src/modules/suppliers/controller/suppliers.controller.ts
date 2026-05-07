import { createCrudModuleRouter } from '../../shared/crudModule';
import { suppliersCrudConfig } from '../service/suppliers.service';
import { createSupplierValidators, updateSupplierValidators } from '../validation/suppliers.validation';

export const createSuppliersRouter = () =>
  createCrudModuleRouter({
    ...suppliersCrudConfig,
    createValidators: createSupplierValidators,
    updateValidators: updateSupplierValidators,
  });
