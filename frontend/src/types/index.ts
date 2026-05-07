import React from 'react';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  meta?: PaginationMeta;
  accessToken?: string;
  user?: UserSession;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface UserSession {
  id: number;
  name: string;
  username: string;
  email: string;
  mobile?: string | null;
  profileImage?: string | null;
  roleId: number;
  roleName?: string;
  permissions?: string[];
  department?: { id: number; name: string };
}

export interface DashboardSummary {
  totalUsers: number;
  departments: number;
  plants: number;
  lines: number;
  shifts: number;
  machines: number;
  roles: number;
  roleUsers: number;
  pendingApprovals: number;
}

export interface DashboardCharts {
  departmentIssues: Array<{ name: string; users?: string | number }>;
}

export interface CompanyProfile {
  id?: number;
  companyTitle: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  bannerUrl?: string | null;
  isDefault?: boolean;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn {
  key: string;
  label: string;
  render?: (row: any) => string | React.ReactNode;
  sortable?: boolean;
}

export interface CrudConfig {
  title: string;
  endpoint: string;
  description: string;
  searchPlaceholder: string;
  columns: TableColumn[];
  fields: FormField[];
  selectSources?: Record<string, { endpoint: string; labelKey: string; valueKey: string }>;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'textarea' | 'checkbox' | 'asset' | 'number' | 'time' | 'date';
  required?: boolean;
  options?: SelectOption[];
  optionalOnEdit?: boolean;
  helperText?: string;
  endpoint?: string;
  uploadEndpoint?: string;
  uploadAssetType?: string;
  placeholder?: string;
  maxLength?: number;
  previewWidth?: number;
  previewHeight?: number;
  defaultValue?: any;
  showWhen?: { values?: any; field?: string } | ((values: any) => boolean);
  buttonText?: string;
}

export interface Entity {
  id: number;
  name: string;
  [key: string]: any;
}
