import bcrypt from 'bcryptjs';
import { CompanyProfile, Department, Permission, Role, RolePermission, User, Plant, Line, Shift } from '../../models';
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

  // Seed Plants
  const plants = [
    { name: 'Plant A - Mumbai', code: 'PLANT_A', location: 'Mumbai, India', manager: 'Rajesh Gupta', description: 'Main production facility', status: 'Active' },
    { name: 'Plant B - Bangalore', code: 'PLANT_B', location: 'Bangalore, India', manager: 'Sunita Verma', description: 'Secondary production facility', status: 'Active' },
    { name: 'Plant C - Pune', code: 'PLANT_C', location: 'Pune, India', manager: 'Arjun Singh', description: 'Assembly and testing facility', status: 'Active' },
  ];

  const seededPlants = [];
  for (const plant of plants) {
    const [record] = await Plant.findOrCreate({ where: { code: plant.code }, defaults: plant });
    seededPlants.push(record);
  }

  // Seed Lines
  const lines = [
    { name: 'Assembly Line 1', code: 'LINE_A1', plantId: seededPlants[0]?.id ?? 1, supervisor: 'Vikram Reddy', capacity: 100, description: 'Primary assembly line', status: 'Active' },
    { name: 'Assembly Line 2', code: 'LINE_A2', plantId: seededPlants[0]?.id ?? 1, supervisor: 'Meena Iyer', capacity: 85, description: 'Secondary assembly line', status: 'Active' },
    { name: 'Testing Line 1', code: 'LINE_T1', plantId: seededPlants[1]?.id ?? 2, supervisor: 'Anil Kumar', capacity: 50, description: 'Quality testing line', status: 'Active' },
    { name: 'Packing Line 1', code: 'LINE_P1', plantId: seededPlants[2]?.id ?? 3, supervisor: 'Priya Nair', capacity: 120, description: 'Final packing line', status: 'Active' },
  ];

  for (const line of lines) {
    await Line.findOrCreate({ where: { code: line.code }, defaults: line });
  }

  // Seed Shifts
  const shifts = [
    { name: 'Morning Shift', startTime: '06:00', endTime: '14:00', duration: 480, description: 'Early morning production shift', status: 'Active' },
    { name: 'Afternoon Shift', startTime: '14:00', endTime: '22:00', duration: 480, description: 'Afternoon production shift', status: 'Active' },
    { name: 'Night Shift', startTime: '22:00', endTime: '06:00', duration: 480, description: 'Night production shift', status: 'Active' },
  ];

  for (const shift of shifts) {
    await Shift.findOrCreate({ where: { name: shift.name }, defaults: shift });
  }
}