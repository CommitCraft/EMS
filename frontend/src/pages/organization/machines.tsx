import { CrudPage } from '../entity/CrudPage';
import { machinesConfig } from '../entity/entityConfigs';

const MachinesPage = () => <CrudPage config={machinesConfig} />;

export default MachinesPage;
