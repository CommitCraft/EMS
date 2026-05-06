import { Plant } from '../../../models';

export const plantsCrudConfig = {
  path: '/plants',
  entityName: 'plant',
  model: Plant,
  permissionBase: 'plants',
  searchFields: ['name', 'code', 'location', 'manager'],
};
