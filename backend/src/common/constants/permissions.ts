export type PermissionActionSeed = {
  label: string;
  code: string;
};

export type PermissionPageSeed = {
  label: string;
  actions: PermissionActionSeed[];
};

export type PermissionModuleSeed = {
  label: string;
  pages: PermissionPageSeed[];
};

const viewOnly = (label: string, code: string): PermissionActionSeed[] => [{ label, code }];
const commonCrud = (baseCode: string): PermissionActionSeed[] => [
  { label: 'View', code: `VIEW_${baseCode}` },
  { label: 'Add', code: `ADD_${baseCode}` },
  { label: 'Edit', code: `EDIT_${baseCode}` },
  { label: 'Delete', code: `DELETE_${baseCode}` },
];
const manageActions = (baseCode: string): PermissionActionSeed[] => [
  { label: 'View', code: `VIEW_${baseCode}` },
  { label: 'Manage', code: `MANAGE_${baseCode}` },
];

export const PERMISSION_CATALOG: PermissionModuleSeed[] = [
  {
    label: 'Dashboard',
    pages: [{ label: 'Dashboard', actions: viewOnly('View', 'VIEW_DASHBOARD') }],
  },
  {
    label: 'Organization',
    pages: [
      { label: 'Plants', actions: commonCrud('PLANTS') },
      { label: 'Lines', actions: commonCrud('LINES') },
      { label: 'Shifts', actions: commonCrud('SHIFTS') },
      { label: 'Machines', actions: commonCrud('MACHINES') },
    ],
  },
  {
    label: 'Access Control',
    pages: [
      { label: 'Roles', actions: commonCrud('ROLES') },
      { label: 'Users', actions: commonCrud('USERS') },
      { label: 'Role User', actions: manageActions('ROLE_USER') },
      { label: 'Departments', actions: commonCrud('DEPARTMENTS') },
      { label: 'Permissions', actions: viewOnly('View', 'VIEW_PERMISSIONS') },
    ],
  },
  {
    label: 'Settings',
    pages: [
      { label: 'Email SMTP Settings', actions: viewOnly('View', 'VIEW_SMTP_SETTINGS') },
      { label: 'General Settings', actions: viewOnly('View', 'VIEW_GENERAL_SETTINGS') },
      { label: 'Storage Settings', actions: viewOnly('View', 'VIEW_STORAGE_SETTINGS') },
      { label: 'Company Profile', actions: viewOnly('View', 'VIEW_COMPANY_PROFILE') },
    ],
  },
  {
    label: 'Logs',
    pages: [
      { label: 'Error Logs', actions: viewOnly('View', 'VIEW_ERROR_LOGS') },
    ],
  },
];

export const CORE_PERMISSIONS = {
  roles: {
    read: 'VIEW_ROLES',
    write: 'EDIT_ROLES',
    remove: 'DELETE_ROLES',
  },
  users: {
    read: 'VIEW_USERS',
    write: 'EDIT_USERS',
    remove: 'DELETE_USERS',
  },
  roleUsers: {
    view: 'VIEW_ROLE_USER',
    manage: 'MANAGE_ROLE_USER',
  },
} as const;

export type PermissionSeedRecord = {
  module: string;
  action: string;
  name: string;
  description: string;
};

export const flattenPermissionCatalog = (): PermissionSeedRecord[] =>
  PERMISSION_CATALOG.flatMap((module) =>
    module.pages.flatMap((page) =>
      page.actions.map((action) => ({
        module: module.label,
        action: action.label,
        name: action.code,
        description: `${page.label} - ${action.label}`,
      })),
    ),
  );

export const findPermissionMeta = (code: string) =>
  PERMISSION_CATALOG.flatMap((module) =>
    module.pages.flatMap((page) =>
      page.actions.map((action) => ({
        module: module.label,
        page: page.label,
        action: action.label,
        code: action.code,
      })),
    ),
  ).find((item) => item.code === code);
