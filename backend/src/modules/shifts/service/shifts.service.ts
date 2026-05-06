import { Shift } from '../../../models';

export const shiftsCrudConfig = {
  path: '/shifts',
  entityName: 'shift',
  model: Shift,
  permissionBase: 'shifts',
  searchFields: ['name', 'startTime', 'endTime'],
};
