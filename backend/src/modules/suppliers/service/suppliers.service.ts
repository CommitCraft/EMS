import { Supplier } from '../../../models';

export const suppliersCrudConfig = {
  path: '/suppliers',
  entityName: 'supplier',
  model: Supplier,
  permissionBase: 'suppliers',
  searchFields: ['name', 'code', 'email', 'phone', 'city', 'country', 'contactPerson'],
};
