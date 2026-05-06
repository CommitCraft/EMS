import { Line, Plant } from '../../../models';

export const linesCrudConfig = {
  path: '/lines',
  entityName: 'line',
  model: Line,
  permissionBase: 'lines',
  searchFields: ['name', 'code', 'supervisor'],
  include: [
    {
      model: Plant,
      as: 'plant',
      attributes: ['id', 'name', 'code'],
    },
  ],
};
