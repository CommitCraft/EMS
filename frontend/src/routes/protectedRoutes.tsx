import {
  accessControlRouteGroups,
  coreRouteGroups,
  settingsRouteGroups,
} from './groups';
import type { PermissionRouteGroup } from './routeTypes';

export const permissionRouteGroups: PermissionRouteGroup[] = [
  ...coreRouteGroups,
  ...accessControlRouteGroups,
  // document and training removed
  ...settingsRouteGroups,
];
