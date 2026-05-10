import { CrudConfig } from '../../types';

const countryOptions = (() => {
  try {
    const regionCodes =
      (Intl as typeof Intl & { supportedValuesOf?: (key: 'region') => string[] }).supportedValuesOf?.('region') || [];
    const displayNames = new Intl.DisplayNames(['en'], { type: 'region' });

    return regionCodes
      .map((code) => {
        const label = displayNames.of(code) || code;
        return { label, value: label };
      })
      .sort((left, right) => left.label.localeCompare(right.label));
  } catch {
    return [
      'Afghanistan',
      'Albania',
      'Algeria',
      'Argentina',
      'Australia',
      'Austria',
      'Bangladesh',
      'Belgium',
      'Brazil',
      'Canada',
      'China',
      'Denmark',
      'Egypt',
      'France',
      'Germany',
      'India',
      'Indonesia',
      'Italy',
      'Japan',
      'Malaysia',
      'Mexico',
      'Netherlands',
      'New Zealand',
      'Pakistan',
      'Philippines',
      'Poland',
      'Singapore',
      'South Africa',
      'South Korea',
      'Spain',
      'Sri Lanka',
      'Sweden',
      'Switzerland',
      'Thailand',
      'Turkey',
      'United Arab Emirates',
      'United Kingdom',
      'United States',
      'Vietnam',
    ].map((label) => ({ label, value: label }));
  }
})();

export const userConfig: CrudConfig & { selectSources: Record<string, { endpoint: string; labelKey: string; valueKey: string; dependsOn?: string; filterKey?: string }> } = {
  title: 'Users',
  endpoint: '/users',
  description: 'Manage operator, approver, auditor, and admin access across the QMS platform.',
  searchPlaceholder: 'Search users by name, username, email, or mobile',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'username', label: 'Username' },
    { key: 'email', label: 'Email' },
    { key: 'status', label: 'Status' },
    { key: 'role', label: 'Role', render: (row) => String((row.role as { name?: string } | undefined)?.name || '-') },
    { key: 'department', label: 'Department', render: (row) => String((row.department as { name?: string } | undefined)?.name || '-') },
  ],
  fields: [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'username', label: 'Username', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'mobile', label: 'Mobile', type: 'text' },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      optionalOnEdit: true,
      helperText: 'Leave blank while editing to keep the current password unchanged',
    },
    { name: 'roleId', label: 'Role', type: 'select', required: true },
    { name: 'departmentId', label: 'Department', type: 'select' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
  selectSources: {
    roleId: { endpoint: '/roles?limit=100', labelKey: 'name', valueKey: 'id' },
    departmentId: { endpoint: '/organization/departments?limit=100', labelKey: 'name', valueKey: 'id' },
  },
};

export const roleConfig: CrudConfig = {
  title: 'Roles',
  endpoint: '/roles',
  description: 'Define role profiles used to group permissions and workflows.',
  searchPlaceholder: 'Search roles',
  columns: [
    { key: 'name', label: 'Role' },
    { key: 'description', label: 'Description' },
  ],
  fields: [
    { name: 'name', label: 'Role Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
};

export const permissionConfig: CrudConfig = {
  title: 'Permissions',
  endpoint: '/permissions',
  description: 'Manage page-level and action-level access controls.',
  searchPlaceholder: 'Search permissions',
  columns: [
    { key: 'name', label: 'Permission' },
    { key: 'module', label: 'Module' },
    { key: 'action', label: 'Action' },
  ],
  fields: [
    { name: 'module', label: 'Module', type: 'text', required: true },
    { name: 'action', label: 'Action', type: 'text', required: true },
    { name: 'name', label: 'Permission Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
  ],
};

export const departmentConfig: CrudConfig = {
  title: 'Departments',
  endpoint: '/organization/departments',
  description: 'Maintain master department records for owners, workflows, and reporting.',
  searchPlaceholder: 'Search departments',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'manager', label: 'Manager' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Department Name', type: 'text', required: true },
    { name: 'code', label: 'Code', type: 'text', required: true },
    { name: 'manager', label: 'Manager', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};

export const supplierConfig: CrudConfig = {
  title: 'Suppliers',
  endpoint: '/organization/suppliers',
  description: 'Manage supplier master data including contact information, payment terms, and ratings.',
  searchPlaceholder: 'Search suppliers by name, code, email, phone, city, or country',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'city', label: 'City' },
    { key: 'rating', label: 'Rating' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Supplier Name', type: 'text', required: true },
    { name: 'code', label: 'Supplier Code', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'address', label: 'Address', type: 'textarea' },
    { name: 'city', label: 'City', type: 'text' },
    { name: 'country', label: 'Country', type: 'select', searchable: true, options: countryOptions, placeholder: 'Search and select country' },
    { name: 'contactPerson', label: 'Contact Person', type: 'text' },
    { name: 'paymentTerms', label: 'Payment Terms', type: 'text' },
    { name: 'rating', label: 'Rating (0.00-5.00)', type: 'number', min: 0, max: 5, step: 0.01, placeholder: 'Enter rating 0-5', helperText: 'Decimal values allowed (e.g., 4.5)' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};


export const smtpConfig: CrudConfig = {
  title: 'SMTP Settings',
  endpoint: '/smtp-settings',
  description: 'Configure outbound email server profiles used for notifications, OTPs, and workflow alerts.',
  searchPlaceholder: 'Search SMTP profiles by name, host, username, or sender email',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'host', label: 'Host' },
    { key: 'port', label: 'Port' },
    {
      key: 'secure',
      label: 'Encryption',
      render: (row) => (row.secure ? 'SSL/TLS Enabled' : 'STARTTLS / Not Forced'),
    },
    { key: 'fromEmail', label: 'From Email' },
    {
      key: 'isActive',
      label: 'Status',
      render: (row) => (row.isActive ? 'Active' : 'Inactive'),
    },
  ],
  fields: [
    { name: 'name', label: 'Profile Name', type: 'text', required: true, placeholder: 'e.g. Main Transactional SMTP' },
    { name: 'host', label: 'SMTP Host', type: 'text', required: true, placeholder: 'smtp.gmail.com' },
    { name: 'port', label: 'Port', type: 'number', required: true, defaultValue: 587, helperText: 'Common ports: 587 (TLS), 465 (SSL), 25 (non-secure)' },
    {
      name: 'secure',
      label: 'Encryption',
      type: 'select',
      required: true,
      defaultValue: 'false',
      helperText: 'Enable for SSL/TLS based SMTP servers',
      options: [{ label: 'SSL/TLS Enabled', value: 'true' }, { label: 'STARTTLS / Not Forced', value: 'false' }],
    },
    { name: 'username', label: 'Username', type: 'text', required: true, placeholder: 'smtp-user@company.com' },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      required: true,
      optionalOnEdit: true,
      helperText: 'Leave blank while editing to keep current password unchanged',
    },
    { name: 'fromEmail', label: 'From Email', type: 'email', required: true, placeholder: 'noreply@company.com' },
    { name: 'fromName', label: 'From Name', type: 'text', placeholder: 'QMS Notification Bot' },
    {
      name: 'isActive',
      label: 'Profile Status',
      type: 'select',
      required: true,
      defaultValue: 'true',
      options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }],
    },
  ],
};

export const storageConfig: CrudConfig = {
  title: 'Storage Settings',
  endpoint: '/storage-settings',
  description: 'Manage storage providers for document/file persistence. Local storage is supported by default, cloud providers can be added as needed.',
  searchPlaceholder: 'Search storage profiles by name, provider, bucket, region, or endpoint',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'provider', label: 'Provider' },
    { key: 'basePath', label: 'Local Path' },
    { key: 'bucketName', label: 'Bucket/Container' },
    { key: 'region', label: 'Region' },
    { key: 'isDefault', label: 'Default', render: (row) => (row.isDefault ? 'Yes' : 'No') },
    { key: 'isActive', label: 'Status', render: (row) => (row.isActive ? 'Active' : 'Inactive') },
  ],
  fields: [
    { name: 'name', label: 'Profile Name', type: 'text', required: true, placeholder: 'e.g. Local Main Storage' },
    {
      name: 'provider',
      label: 'Provider',
      type: 'select',
      required: true,
      defaultValue: 'local',
      options: [
        { label: 'Local', value: 'local' },
        { label: 'AWS S3', value: 'aws' },
        { label: 'Google Cloud Storage', value: 'gcp' },
        { label: 'Azure Blob', value: 'azure' },
        { label: 'Other / S3 Compatible', value: 'other' },
      ],
    },
    {
      name: 'basePath',
      label: 'Local Base Path',
      type: 'text',
      defaultValue: '/uploads',
      helperText: 'Used primarily for Local provider. Example: /uploads',
      showWhen: { field: 'provider', values: ['local'] },
    },
    {
      name: 'bucketName',
      label: 'Bucket / Container Name',
      type: 'text',
      placeholder: 'e.g. qms-documents',
      helperText: 'For cloud storage providers like AWS/GCP/Azure',
      showWhen: { field: 'provider', values: ['aws', 'gcp', 'azure', 'other'] },
    },
    {
      name: 'region',
      label: 'Region',
      type: 'text',
      placeholder: 'e.g. ap-south-1',
      showWhen: { field: 'provider', values: ['aws', 'gcp', 'azure', 'other'] },
    },
    {
      name: 'endpoint',
      label: 'Endpoint URL',
      type: 'text',
      placeholder: 'https://s3.amazonaws.com',
      showWhen: { field: 'provider', values: ['aws', 'gcp', 'azure', 'other'] },
    },
    {
      name: 'accessKey',
      label: 'Access Key',
      type: 'text',
      placeholder: 'API/Access key for provider',
      showWhen: { field: 'provider', values: ['aws', 'gcp', 'azure', 'other'] },
    },
    {
      name: 'secretKey',
      label: 'Secret Key',
      type: 'password',
      optionalOnEdit: true,
      helperText: 'Leave blank in edit mode to keep existing secret key',
      showWhen: { field: 'provider', values: ['aws', 'gcp', 'azure', 'other'] },
    },
    {
      name: 'isDefault',
      label: 'Set as Default',
      type: 'select',
      required: true,
      defaultValue: 'false',
      options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }],
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'true',
      options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }],
    },
  ],
};

export const companyProfileConfig: CrudConfig = {
  title: 'Company Profile',
  endpoint: '/company-profiles',
  description: '',
  searchPlaceholder: 'Search company profile by title',
  columns: [
    { key: 'companyTitle', label: 'Company Title' },
    { key: 'logoUrl', label: 'Logo URL' },
    { key: 'faviconUrl', label: 'Icon Logo URL' },
    { key: 'bannerUrl', label: 'Banner URL' },
    { key: 'isDefault', label: 'Default', render: (row) => (row.isDefault ? 'Yes' : 'No') },
    { key: 'isActive', label: 'Status', render: (row) => (row.isActive ? 'Active' : 'Inactive') },
  ],
  fields: [
    { name: 'companyTitle', label: 'Company Title', type: 'text', required: true, placeholder: 'Quality Management' },
    {
      name: 'logoUrl',
      label: 'Company Logo',
      type: 'asset',
      uploadEndpoint: '/company-profiles/upload-asset',
      uploadAssetType: 'logo',
      buttonText: 'Change Logo',
      helperText: 'Note: The logo size must be 200px (width) by 45px (height).',
      previewWidth: 200,
      previewHeight: 45,
    },
    {
      name: 'faviconUrl',
      label: 'Company Icon Logo',
      type: 'asset',
      uploadEndpoint: '/company-profiles/upload-asset',
      uploadAssetType: 'favicon',
      buttonText: 'Change Icon Logo',
      helperText: 'Note: The icon logo size must be 48px (width) by 48px (height).',
      previewWidth: 48,
      previewHeight: 48,
    },
    {
      name: 'bannerUrl',
      label: 'Company Banner',
      type: 'asset',
      uploadEndpoint: '/company-profiles/upload-asset',
      uploadAssetType: 'banner',
      buttonText: 'Change Banner',
      helperText: 'Note: The banner size must be 1620px (width) by 1080px (height).',
      previewWidth: 1620,
      previewHeight: 1080,
    },
    {
      name: 'isDefault',
      label: 'Set as Default Profile',
      type: 'select',
      required: true,
      defaultValue: 'true',
      options: [{ label: 'Yes', value: 'true' }, { label: 'No', value: 'false' }],
    },
    {
      name: 'isActive',
      label: 'Status',
      type: 'select',
      required: true,
      defaultValue: 'true',
      options: [{ label: 'Active', value: 'true' }, { label: 'Inactive', value: 'false' }],
    },
  ],
};

export const plantsConfig: CrudConfig = {
  title: 'Plants',
  endpoint: '/organization/plants',
  description: 'Manage manufacturing plants and facilities.',
  searchPlaceholder: 'Search plants by name or code',
  columns: [
    { key: 'name', label: 'Plant Name' },
    { key: 'code', label: 'Code' },
    { key: 'location', label: 'Location' },
    { key: 'manager', label: 'Manager' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Plant Name', type: 'text', required: true },
    { name: 'code', label: 'Plant Code', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'manager', label: 'Manager', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};

export const linesConfig: CrudConfig = {
  title: 'Lines',
  endpoint: '/organization/lines',
  description: 'Manage production lines within plants.',
  searchPlaceholder: 'Search lines by name or code',
  columns: [
    { key: 'name', label: 'Line Name' },
    { key: 'code', label: 'Code' },
    {
      key: 'plant',
      label: 'Plant',
      render: (row) => String((row.plant as { name?: string } | undefined)?.name || '-'),
    },
    { key: 'specifications', label: 'Specifications' },
    { key: 'supervisor', label: 'Supervisor' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Line Name', type: 'text', required: true },
    { name: 'code', label: 'Line Code', type: 'text', required: true },
    { name: 'plantId', label: 'Plant', type: 'select', required: true },
    {
      name: 'specifications',
      label: 'Line Specifications',
      type: 'textarea',
      maxLength: 2000,
      helperText: 'Max 2000 characters. Add technical details such as dimensions, material, tolerance, and operating parameters.',
    },
    { name: 'supervisor', label: 'Supervisor', type: 'text' },
    { name: 'capacity', label: 'Capacity', type: 'number' },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
  selectSources: {
    plantId: { endpoint: '/organization/plants?limit=100', labelKey: 'name', valueKey: 'id' },
  },
};

export const shiftsConfig: CrudConfig = {
  title: 'Shifts',
  endpoint: '/organization/shifts',
  description: 'Manage work shifts and timings.',
  searchPlaceholder: 'Search shifts by name',
  columns: [
    { key: 'name', label: 'Shift Name' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { key: 'duration', label: 'Duration' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Shift Name', type: 'text', required: true },
    { name: 'startTime', label: 'Start Time', type: 'time', required: true },
    { name: 'endTime', label: 'End Time', type: 'time', required: true },
    { name: 'duration', label: 'Duration (minutes)', type: 'number', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};

export const machinesConfig: CrudConfig & { selectSources: Record<string, { endpoint: string; labelKey: string; valueKey: string; dependsOn?: string; filterKey?: string }> } = {
  title: 'Machines',
  endpoint: '/organization/machines',
  description: 'Manage production machines across plants and lines.',
  searchPlaceholder: 'Search machines by name, code, serial number, or operator',
  columns: [
    { key: 'name', label: 'Machine Name' },
    { key: 'code', label: 'Code' },
    { key: 'machineType', label: 'Type', render: (row) => String((row.machineType as { name?: string } | undefined)?.name || '-') },
    { key: 'plant', label: 'Plant', render: (row) => String((row.plant as { name?: string } | undefined)?.name || '-') },
    { key: 'line', label: 'Line', render: (row) => String((row.line as { name?: string } | undefined)?.name || '-') },
    { key: 'machineSpec', label: 'Standard Spec', render: (row) => String((row.machineSpec as { name?: string } | undefined)?.name || '-') },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Machine Name', type: 'text', required: true },
    { name: 'code', label: 'Machine Code', type: 'text', required: true },
    { name: 'machineTypeId', label: 'Machine Type', type: 'select', required: true },
    { name: 'plantId', label: 'Plant', type: 'select', required: true },
    { name: 'lineId', label: 'Line', type: 'select', required: true },
    { name: 'serialNumber', label: 'Serial Number', type: 'text' },
    { name: 'modelNumber', label: 'Model Number', type: 'text' },
    { name: 'operator', label: 'Operator', type: 'text' },
    { name: 'capacity', label: 'Capacity', type: 'number' },
    { name: 'machineSpecId', label: 'Standard Specification', type: 'select' },
    {
      name: 'specifications',
      label: 'Custom Specifications / Notes',
      type: 'textarea',
      maxLength: 2000,
      helperText: 'Add any custom override specifications not covered by the standard spec above.',
    },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
  selectSources: {
    plantId: { endpoint: '/organization/plants?limit=100', labelKey: 'name', valueKey: 'id' },
    lineId: { endpoint: '/organization/lines?limit=100', labelKey: 'name', valueKey: 'id', dependsOn: 'plantId', filterKey: 'plantId' },
    machineTypeId: { endpoint: '/organization/machine-types?limit=100', labelKey: 'name', valueKey: 'id' },
    machineSpecId: { endpoint: '/organization/machine-specifications?limit=100', labelKey: 'name', valueKey: 'id' },
  },
};

export const machineCategoriesConfig: CrudConfig = {
  title: 'Machine Categories',
  endpoint: '/organization/machine-categories',
  description: 'Manage distinct categories for structuring machine types.',
  searchPlaceholder: 'Search categories by name or code',
  columns: [
    { key: 'name', label: 'Category Name' },
    { key: 'code', label: 'Code' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Category Name', type: 'text', required: true },
    { name: 'code', label: 'Category Code', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};

export const machineTypesConfig: CrudConfig = {
  title: 'Machine Types',
  endpoint: '/organization/machine-types',
  description: 'Manage machine types and categories.',
  searchPlaceholder: 'Search machine types',

  columns: [
    { key: 'name', label: 'Type Name' },
    { key: 'code', label: 'Code' },
    { key: 'category', label: 'Category', render: (row) => String((row.category as { name?: string } | undefined)?.name || '-') },
    { key: 'status', label: 'Status' },
  ],

  fields: [
    {
      name: 'name',
      label: 'Type Name',
      type: 'text',
      required: true,
    },

    {
      name: 'code',
      label: 'Type Code',
      type: 'text',
      required: true,
    },

    {
      name: 'categoryId',
      label: 'Category',
      type: 'select',
      required: true,
    },

    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
    },

    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Inactive', value: 'Inactive' },
      ],
    },
  ],
  selectSources: {
    categoryId: { endpoint: '/organization/machine-categories?limit=100', labelKey: 'name', valueKey: 'id' },
  },
};

export const machineSpecificationTypesConfig: CrudConfig = {
  title: 'Specification Types',
  endpoint: '/organization/machine-specification-types',
  description: 'Manage distinct types for grouping standard machine specifications.',
  searchPlaceholder: 'Search specification types by name or code',
  columns: [
    { key: 'name', label: 'Type Name' },
    { key: 'code', label: 'Code' },
    { key: 'status', label: 'Status' },
  ],
  fields: [
    { name: 'name', label: 'Type Name', type: 'text', required: true },
    { name: 'code', label: 'Type Code', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea' },
    { name: 'status', label: 'Status', type: 'select', required: true, options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }] },
  ],
};

export const machineSpecificationsConfig: CrudConfig & { selectSources: Record<string, { endpoint: string; labelKey: string; valueKey: string }> } = {
  title: 'Machine Specifications',
  endpoint: '/organization/machine-specifications',
  description: 'Manage standard technical parameters and specifications for machines.',
  searchPlaceholder: 'Search specifications by name or code',

  columns: [
    { key: 'name', label: 'Name' },
    { key: 'code', label: 'Code' },
    { key: 'specificationType', label: 'Type', render: (row) => String((row.specificationType as { name?: string } | undefined)?.name || '-') },
    { key: 'uom', label: 'UOM', render: (row) => String(row.uom || '-') },
    { key: 'status', label: 'Status' },
  ],

  fields: [
    { name: 'name', label: 'Specification Name', type: 'text', required: true },
    { name: 'code', label: 'Code', type: 'text', required: true },
    {
      name: 'typeId',
      label: 'Specification Type',
      type: 'select',
      required: true,
    },
    { 
      name: 'uom', 
      label: 'Unit of Measure (UOM)', 
      type: 'text', 
      helperText: 'e.g., kW, mm, rpm, °C (Leave blank if not applicable)' 
    },
    { name: 'description', label: 'Description', type: 'textarea' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [{ label: 'Active', value: 'Active' }, { label: 'Inactive', value: 'Inactive' }],
    },
  ],
  selectSources: {
    typeId: { endpoint: '/organization/machine-specification-types?limit=100', labelKey: 'name', valueKey: 'id' },
  },
};