import React from 'react';
import { CrudPage } from '../entity/CrudPage';
import { machineCategoriesConfig } from '../entity/entityConfigs';

export default function MachineCategoriesPage() {
  return <CrudPage config={machineCategoriesConfig} />;
}