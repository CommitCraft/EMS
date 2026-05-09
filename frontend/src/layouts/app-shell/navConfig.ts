import {
  DashboardIcon,
  ArticleIcon,
  BellIcon,
  BuildIcon,
  ClipboardIcon,
  ErrorIcon,
  FolderSharedIcon,
  ListIcon,
  OrganizationIcon,
  RepeatIcon,
  TruckIcon,
  UserAvatarIcon,
  SettingsIcon,
  ShieldIcon,
} from "./icons";
import { NavSection } from "./types";

export const navSections: NavSection[] = [
  {
    title: "",
    items: [
      {
        label: "Dashboard",
        to: "/dashboard",
        icon: DashboardIcon,
        requiredPermissions: ["VIEW_DASHBOARD"],
      },
    ],
  },

  {
    title: "Organization Management",
    items: [
      {
        label: "Organization",
        icon: OrganizationIcon,
        requiredPermissions: [],
        children: [
          { label: "Plants", to: "/organization/plants", icon: FolderSharedIcon, requiredPermissions: ["VIEW_PLANTS"] },
          { label: "Lines", to: "/organization/lines", icon: ListIcon, requiredPermissions: ["VIEW_LINES"] },
          { label: "Shifts", to: "/organization/shifts", icon: RepeatIcon, requiredPermissions: ["VIEW_SHIFTS"] },
          { label: "Machines", to: "/organization/machines", icon: BuildIcon, requiredPermissions: ["VIEW_MACHINES"] },
          { label: "Suppliers", to: "/organization/suppliers", icon: TruckIcon, requiredPermissions: ["VIEW_SUPPLIERS"] },
          { label: "Departments", to: "/organization/departments", icon: ClipboardIcon, requiredPermissions: ["VIEW_DEPARTMENTS"] },
        ],
      },
    ],
  },

  {
    title: "Access Management",
    items: [
      {
        label: "Access Control",
        icon: ShieldIcon,
        requiredPermissions: [],
        children: [
          { label: "Roles", to: "/roles", icon: ShieldIcon, requiredPermissions: ["VIEW_ROLES"] },
          { label: "Users", to: "/users", icon: UserAvatarIcon, requiredPermissions: ["VIEW_USERS"] },
          { label: "Role User", to: "/roles/users", icon: FolderSharedIcon, requiredPermissions: ["VIEW_ROLE_USER"] },
        ],
      },
    ],
  },

  {
    title: "System Configuration",
    items: [
      {
        label: "Settings",
        icon: SettingsIcon,
        requiredPermissions: [],
        children: [
          { label: "Email SMTP Settings", to: "/settings/smtp", icon: BellIcon, requiredPermissions: ["VIEW_SMTP_SETTINGS"] },
          { label: "General Settings", to: "/settings", icon: SettingsIcon, requiredPermissions: ["VIEW_GENERAL_SETTINGS"] },
          { label: "Storage Settings", to: "/settings/storage", icon: FolderSharedIcon, requiredPermissions: ["VIEW_STORAGE_SETTINGS"] },
          { label: "Company Profile", to: "/settings/company-profile", icon: ArticleIcon, requiredPermissions: ["VIEW_COMPANY_PROFILE"] },
        ],
      },
    ],
  },

  {
    title: "System Monitoring",
    items: [
      {
        label: "System Logs",
        icon: ErrorIcon,
        requiredPermissions: [],
        children: [
          { label: "Error Logs", to: "/logs", icon: ErrorIcon, requiredPermissions: ["VIEW_ERROR_LOGS"] },
        ],
      },
    ],
  },
];