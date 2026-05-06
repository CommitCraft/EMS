import {
  accessControlRouteGroups,
  coreRouteGroups,
  organizationRouteGroups,
  settingsRouteGroups,
} from './groups';
import type { PermissionRouteGroup } from './routeTypes';

export const permissionRouteGroups: PermissionRouteGroup[] = [
  ...coreRouteGroups,
  ...accessControlRouteGroups,
  ...organizationRouteGroups,
  // document and training removed
  ...settingsRouteGroups,
];
