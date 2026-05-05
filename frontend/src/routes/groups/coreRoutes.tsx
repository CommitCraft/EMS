import {
  DashboardPage,
  ErrorLogsPage,
  ReportsPage,
} from '../pageRegistry';
import { ROUTE_PATHS } from '../routePaths';
import type { PermissionRouteGroup } from '../routeTypes';

export const coreRouteGroups: PermissionRouteGroup[] = [
  {
    requiredPermissions: ['VIEW_DASHBOARD'],
    routes: [{ path: ROUTE_PATHS.dashboard, element: <DashboardPage /> }],
  },
  {
    requiredPermissions: ['VIEW_REPORTS'],
    routes: [{ path: ROUTE_PATHS.reports, element: <ReportsPage /> }],
  },
  {
    requiredPermissions: ['VIEW_ERROR_LOGS'],
    routes: [{ path: ROUTE_PATHS.logs, element: <ErrorLogsPage /> }],
  },
];
