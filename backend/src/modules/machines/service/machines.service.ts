import { Line, Machine, Plant, MachineType, MachineSpecification } from '../../../models';

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
    {
      model: MachineType,
      as: 'machineType',
      attributes: ['id', 'name', 'code', 'category'],
    },
    {
      model: MachineSpecification,
      as: 'machineSpec',
      attributes: ['id', 'name', 'code', 'type'],
    },
  ],
};
