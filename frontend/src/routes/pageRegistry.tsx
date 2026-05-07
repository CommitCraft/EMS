import { lazy } from 'react';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/ForgotPasswordPage'));
const ChangePasswordPage = lazy(() => import('../pages/ChangePasswordPage'));
const DashboardPage = lazy(() => import('../pages/dashboard'));
const UsersPage = lazy(() => import('../pages/access-control/users'));
const RolesPage = lazy(() => import('../pages/access-control/roles'));
const RoleUsersPage = lazy(() => import('../pages/access-control/role-users'));
const PermissionsPage = lazy(() => import('../pages/PermissionsPage'));
const DepartmentsPage = lazy(() => import('../pages/DepartmentsPage'));
const SuppliersPage = lazy(() => import('../pages/SuppliersPage'));
const ReportsPage = lazy(() => import('../pages/reports'));
const SettingsPage = lazy(() => import('../pages/settings'));
const SmtpSettingsPage = lazy(() => import('../pages/SmtpSettingsPage'));
const StorageSettingsPage = lazy(() => import('../pages/StorageSettingsPage'));
const CompanyProfilePage = lazy(() => import('../pages/CompanyProfilePage'));
const MyProfilePage = lazy(() => import('../pages/MyProfilePage'));
const ErrorLogsPage = lazy(() => import('../pages/ErrorLogsPage'));
const PlantsPage = lazy(() => import('../pages/organization/plants'));
const LinesPage = lazy(() => import('../pages/organization/lines'));
const ShiftsPage = lazy(() => import('../pages/organization/shifts'));
const MachinesPage = lazy(() => import('../pages/organization/machines'));
const PageNotFound = lazy(() => import('../pages/NotFoundPage'));

export {
  LoginPage,
  ForgotPasswordPage,
  ChangePasswordPage,
  DashboardPage,
  UsersPage,
  RolesPage,
  RoleUsersPage,
  PermissionsPage,
  DepartmentsPage,
  SuppliersPage,
  ReportsPage,
  SettingsPage,
  SmtpSettingsPage,
  StorageSettingsPage,
  CompanyProfilePage,
  MyProfilePage,
  ErrorLogsPage,
  PlantsPage,
  LinesPage,
  ShiftsPage,
  MachinesPage,
  PageNotFound,
};
