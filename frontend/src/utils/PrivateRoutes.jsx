import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoutes() {
  let auth = { token: false };
  return auth.token ? <Outlet /> : <Navigate to={"/login"} />;
}
