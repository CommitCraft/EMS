import { CrudPage } from '../entity/CrudPage';
import { plantsConfig } from '../entity/entityConfigs';

const PlantsPage = () => <CrudPage config={plantsConfig} />;

export default PlantsPage;
