import { JSX, lazy } from "react";

export enum RouteType {
  PUBLIC = "public",
  PRIVATE = "private",
}

interface IRoutesList {
  route_type: string;
  path: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
  private?: boolean;
}

const routes: IRoutesList[] = [
  {
    route_type: RouteType.PUBLIC,
    path: "/login",
    component: lazy(() => import("../features/authentication/pages/LoginPage")),
    private: false,
  },
  {
    route_type: RouteType.PRIVATE,
    path: "/dashboard",
    component: lazy(() => import("../features/dashboard/pages/Dashboard")),
    private: true,
  },
];

export default routes;
