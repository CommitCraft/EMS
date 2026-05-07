import { CrudPage } from './entity/CrudPage';
import { supplierConfig } from './entity/entityConfigs';

const SuppliersPage = () => <CrudPage config={supplierConfig} />;

export default SuppliersPage;
