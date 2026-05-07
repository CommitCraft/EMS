import {
   DashboardIcon,
  ErrorIcon,
  ListIcon,
  OrganizationIcon,

  SettingsIcon,
  ShieldIcon,
  
} from "./icons";
import { NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: DashboardIcon, requiredPermissions: ["VIEW_DASHBOARD"] },
    ],
  },
  {
    title: "Administration",
    items: [
      {
        label: "Organization",
        icon: OrganizationIcon,
        requiredPermissions: [],
        children: [
          { label: "Plants", to: "/organization/plants", requiredPermissions: ["VIEW_PLANTS"] },
          { label: "Lines", to: "/organization/lines", requiredPermissions: ["VIEW_LINES"] },
          { label: "Shifts", to: "/organization/shifts", requiredPermissions: ["VIEW_SHIFTS"] },
          { label: "Machines", to: "/organization/machines", requiredPermissions: ["VIEW_MACHINES"] },
          { label: "Departments", to: "/organization/departments", requiredPermissions: ["VIEW_USERS"] },
        ],
      },
      {
        label: "Access Control",
        icon: ShieldIcon,
        requiredPermissions: [],
        children: [
          { label: "Roles", to: "/roles", requiredPermissions: ["VIEW_ROLES"] },
          { label: "Users", to: "/users", requiredPermissions: ["VIEW_USERS"] },
          { label: "Role User", to: "/roles/users", requiredPermissions: ["VIEW_ROLE_USER"] },
        ],
      },
      {
        label: "Settings",
        icon: SettingsIcon,
        requiredPermissions: [],
        children: [
          { label: "Email SMTP Settings", to: "/settings/smtp", requiredPermissions: ["VIEW_SMTP_SETTINGS"] },
          { label: "General Settings", to: "/settings", requiredPermissions: ["VIEW_GENERAL_SETTINGS"] },
          { label: "Storage Settings", to: "/settings/storage", requiredPermissions: ["VIEW_STORAGE_SETTINGS"] },
          { label: "Company Profile", to: "/settings/company-profile", requiredPermissions: ["VIEW_COMPANY_PROFILE"] },
        ],
      },
      {
        label: "System Logs",
        icon: ErrorIcon,
        requiredPermissions: [],
        children: [
          { label: "Error Logs", to: "/logs", requiredPermissions: ["VIEW_ERROR_LOGS"] },
        ],
      },
    ],
  },
];
