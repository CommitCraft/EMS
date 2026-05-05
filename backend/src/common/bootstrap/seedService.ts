import bcrypt from 'bcryptjs';
import { CompanyProfile, Department, Permission, Role, RolePermission, User } from '../../models';
import { flattenPermissionCatalog } from '../constants/permissions';

const defaultPermissions = flattenPermissionCatalog();

export const seedDatabase = async () => {
  const [adminRole] = await Role.findOrCreate({ where: { name: 'Admin' }, defaults: { name: 'Admin', description: 'System administrator' } });
  const [managerRole] = await Role.findOrCreate({ where: { name: 'Manager' }, defaults: { name: 'Manager', description: 'Department manager' } });
  const [employeeRole] = await Role.findOrCreate({ where: { name: 'Employee' }, defaults: { name: 'Employee', description: 'Standard employee access' } });

  const permissions = [];
  for (const permission of defaultPermissions) {
    const [record] = await Permission.findOrCreate({ where: { name: permission.name }, defaults: permission });
    await record.update(permission);
    permissions.push(record);
  }

  const adminMappings = permissions.map((permission) => ({ roleId: adminRole.id, permissionId: permission.id }));
  for (const mapping of adminMappings) {
    await RolePermission.findOrCreate({ where: mapping, defaults: mapping });
  }

  const limitedPermissionNames = ['dashboard.read', 'reports.read'];
  const limitedPermissions = permissions.filter((permission) => limitedPermissionNames.includes(permission.name));
  for (const permission of limitedPermissions) {
    await RolePermission.findOrCreate({ where: { roleId: managerRole.id, permissionId: permission.id }, defaults: { roleId: managerRole.id, permissionId: permission.id } });
    await RolePermission.findOrCreate({ where: { roleId: employeeRole.id, permissionId: permission.id }, defaults: { roleId: employeeRole.id, permissionId: permission.id } });
  }

  const departments = [
    { name: 'Quality Assurance', code: 'QA', manager: 'Priya Sharma', description: 'Quality compliance and release approval.', status: 'Active' },
    { name: 'Production', code: 'PRD', manager: 'Ravi Kumar', description: 'Manufacturing and shop floor operations.', status: 'Active' },
    { name: 'Maintenance', code: 'MNT', manager: 'Asha Nair', description: 'Equipment maintenance and calibration.', status: 'Active' },
  ];

  const seededDepartments = [];
  for (const department of departments) {
    const [record] = await Department.findOrCreate({ where: { code: department.code }, defaults: department });
    seededDepartments.push(record);
  }

  const adminPassword = await bcrypt.hash('admin123', 12);
  const [adminUser] = await User.findOrCreate({
    where: { username: 'admin' },
    defaults: {
      name: 'System Admin',
      username: 'admin',
      email: 'admin@qms.local',
      mobile: '9999999999',
      password: adminPassword,
      roleId: adminRole.id,
      departmentId: seededDepartments[0]?.id ?? null,
      status: 'Active',
    },
  });

  const userPassword = await bcrypt.hash('password123', 12);
  await User.findOrCreate({
    where: { username: 'supervisor' },
    defaults: {
      name: 'Production Supervisor',
      username: 'supervisor',
      email: 'supervisor@qms.local',
      mobile: '8888888888',
      password: userPassword,
      roleId: managerRole.id,
      departmentId: seededDepartments[1]?.id ?? null,
      status: 'Active',
    },
  });

  await CompanyProfile.findOrCreate({
    where: { companyTitle: 'QMS - Quality Management System' },
    defaults: {
      companyTitle: 'QMS - Quality Management System',
      logoUrl: null,
      faviconUrl: null,
      bannerUrl: null,
      isActive: true,
      isDefault: true,
    },
  });
};