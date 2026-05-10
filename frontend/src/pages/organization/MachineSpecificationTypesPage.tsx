import React from 'react';
import { CrudPage } from '../entity/CrudPage';
import { machineSpecificationTypesConfig } from '../entity/entityConfigs';

export default function MachineSpecificationTypesPage() {
  return <CrudPage config={machineSpecificationTypesConfig} />;
}