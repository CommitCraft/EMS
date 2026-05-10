import { CrudPage } from '../entity/CrudPage';
import { machineTypesConfig } from '../entity/entityConfigs';

const MachineTypesPage = () => (
  <CrudPage config={machineTypesConfig} />
);

export default MachineTypesPage;