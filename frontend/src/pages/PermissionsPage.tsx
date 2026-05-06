import { CrudPage } from './entity/CrudPage';
import { permissionConfig } from './entity/entityConfigs';
import PermissionMatrix from '../components/PermissionMatrix';

const PermissionsPage = () => (
	<>
		<CrudPage config={permissionConfig} />
		<PermissionMatrix />
	</>
);

export default PermissionsPage;
