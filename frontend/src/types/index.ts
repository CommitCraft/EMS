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
  roleId: number;
  roleName?: string;
  permissions?: string[];
  department?: { id: number; name: string };
}

export interface DashboardSummary {
  totalUsers: number;
  departments: number;
  pendingApprovals: number;
}

export interface DashboardCharts {
  departmentIssues: Array<{ name: string; users?: string | number }>;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface TableColumn {
  key: string;
  label: string;
  render?: (item: Record<string, unknown>) => React.ReactNode;
}

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'textarea' | 'select' | 'date' | 'time' | 'number' | 'asset';
  placeholder?: string;
  helperText?: string;
  uploadEndpoint?: string;
  uploadAssetType?: 'logo' | 'favicon' | 'banner';
  buttonText?: string;
  previewWidth?: number;
  previewHeight?: number;
  showWhen?: {
    field: string;
    values: string[];
  };
  required?: boolean;
  optionalOnEdit?: boolean;
  defaultValue?: string | number;
  options?: SelectOption[];
}

export interface CrudConfig {
  title: string;
  endpoint: string;
  description: string;
  columns: TableColumn[];
  fields: FormField[];
  searchPlaceholder: string;
  selectSources?: Record<string, { endpoint: string; labelKey: string; valueKey: string }>;
}

export interface CompanyProfile {
  id: number;
  companyTitle: string;
  logoUrl?: string | null;
  faviconUrl?: string | null;
  bannerUrl?: string | null;
  isActive?: boolean;
  isDefault?: boolean;
}