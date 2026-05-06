import { Line, Machine, Plant } from '../../../models';

export const machinesCrudConfig = {
  path: '/machines',
  entityName: 'machine',
  model: Machine,
  permissionBase: 'machines',
  searchFields: ['name', 'code', 'serialNumber', 'modelNumber', 'operator'],
  include: [
    {
      model: Plant,
      as: 'plant',
      attributes: ['id', 'name', 'code'],
    },
    {
      model: Line,
      as: 'line',
      attributes: ['id', 'name', 'code'],
    },
  ],
};
