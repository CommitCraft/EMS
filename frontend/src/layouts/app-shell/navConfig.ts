import {
   DashboardIcon,
  ErrorIcon,
  ListIcon,

  SettingsIcon,
  ShieldIcon,
  
} from "./icons";
import { NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    title: "Main",
    items: [
      { label: "Dashboard", to: "/dashboard", icon: DashboardIcon, requiredPermissions: ["VIEW_DASHBOARD"] },
     {
        label: "Access Control",
        icon: ShieldIcon,
        requiredPermissions: ["VIEW_ROLES"],
        children: [
          { label: "Roles", to: "/roles", requiredPermissions: ["VIEW_ROLES"] },
          { label: "Users", to: "/users", requiredPermissions: ["VIEW_USERS"] },
          { label: "Role User", to: "/roles/users", requiredPermissions: ["VIEW_ROLE_USER"] },
        ],
      },
      {
        label: "Settings",
        icon: SettingsIcon,
        requiredPermissions: ["VIEW_GENERAL_SETTINGS"],
        children: [
          { label: "Email SMTP Settings", to: "/settings/smtp", requiredPermissions: ["VIEW_SMTP_SETTINGS"] },
          { label: "General Settings", to: "/settings", requiredPermissions: ["VIEW_GENERAL_SETTINGS"] },
          { label: "Storage Settings", to: "/settings/storage", requiredPermissions: ["VIEW_STORAGE_SETTINGS"] },
          { label: "Company Profile", to: "/settings/company-profile", requiredPermissions: ["VIEW_COMPANY_PROFILE"] },
        ],
      },
      {
        label: "Logs",
        icon: ErrorIcon,
        requiredPermissions: ["VIEW_ERROR_LOGS"],
        children: [
          { label: "Error Logs", to: "/logs", requiredPermissions: ["VIEW_ERROR_LOGS"] },
        ],
      },
    ],
  },
];
