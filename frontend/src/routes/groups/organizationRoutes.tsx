import {
  PlantsPage,
  LinesPage,
  ShiftsPage,
  MachinesPage,
} from '../pageRegistry';
import { ROUTE_PATHS } from '../routePaths';
import type { PermissionRouteGroup } from '../routeTypes';

export const organizationRouteGroups: PermissionRouteGroup[] = [
  {
    requiredPermissions: ['VIEW_PLANTS'],
    routes: [{ path: ROUTE_PATHS.plants, element: <PlantsPage /> }],
  },
  {
    requiredPermissions: ['VIEW_LINES'],
    routes: [{ path: ROUTE_PATHS.lines, element: <LinesPage /> }],
  },
  {
    requiredPermissions: ['VIEW_SHIFTS'],
    routes: [{ path: ROUTE_PATHS.shifts, element: <ShiftsPage /> }],
  },
  {
    requiredPermissions: ['VIEW_MACHINES'],
    routes: [{ path: ROUTE_PATHS.machines, element: <MachinesPage /> }],
  },
];
