export const ROUTE_PATHS = {
  root: '/',
  login: '/login',
  forgotPassword: '/forgot-password',
  changePassword: '/change-password',
  pageNotFound: '/pageNotFound',

  dashboard: '/dashboard',
  users: '/users',
  roles: '/roles',
  rolesManage: '/roles/manage',
  roleUsers: '/roles/users',
  permissions: '/permissions',

  // Organization
  departments: '/organization/departments',
  suppliers: '/organization/suppliers',
  plants: '/organization/plants',
  lines: '/organization/lines',
  shifts: '/organization/shifts',
  machineTypes: '/organization/machine-types',
  machineSpecifications: '/organization/machine-specifications',
  machines: '/organization/machines',

  reports: '/reports',
  logs: '/logs',

  settings: '/settings',
  settingsProfile: '/settings/profile',
  settingsSmtp: '/settings/smtp',
  settingsStorage: '/settings/storage',
  settingsCompanyProfile: '/settings/company-profile',
} as const;
