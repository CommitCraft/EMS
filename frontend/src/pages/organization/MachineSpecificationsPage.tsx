import React from 'react';
import { machineSpecificationsConfig } from '../entity/entityConfigs';
import { CrudPage } from '../entity/CrudPage';

export default function MachineSpecificationsPage() {
  return <CrudPage config={machineSpecificationsConfig} />;
}