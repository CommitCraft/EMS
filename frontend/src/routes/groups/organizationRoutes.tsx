import {
  DepartmentsPage,
  PlantsPage,
  LinesPage,
  ShiftsPage,
  MachinesPage,
  MachineTypesPage,
  MachineSpecificationsPage,
  SuppliersPage,
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
    requiredPermissions: ['VIEW_MACHINE_TYPES'],
    routes: [{ path: ROUTE_PATHS.machineTypes, element: <MachineTypesPage /> }],
  },
  {
    requiredPermissions: ['VIEW_MACHINE_SPECIFICATIONS'],
    routes: [{ path: ROUTE_PATHS.machineSpecifications, element: <MachineSpecificationsPage /> }],
  },
  {
    requiredPermissions: ['VIEW_MACHINES'],
    routes: [{ path: ROUTE_PATHS.machines, element: <MachinesPage /> }],
  },
  {
    requiredPermissions: ['VIEW_DEPARTMENTS'],
    routes: [{ path: ROUTE_PATHS.departments, element: <DepartmentsPage /> }],
  },
  {
    requiredPermissions: ['VIEW_SUPPLIERS'],
    routes: [{ path: ROUTE_PATHS.suppliers, element: <SuppliersPage /> }],
  },
];
