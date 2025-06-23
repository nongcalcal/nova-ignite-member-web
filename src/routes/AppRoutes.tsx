import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routes, { RouteType } from "./route";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => (
  <Suspense
    fallback={
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </div>
    }
  >
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            route.route_type === RouteType.PRIVATE ? (
              <ProtectedRoute>
                <route.component />
              </ProtectedRoute>
            ) : (
              <route.component />
            )
          }
        />
      ))}
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
