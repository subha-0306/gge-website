import { Navigate, Outlet } from "react-router-dom";

export default function AdminGuard() {
  const token = localStorage.getItem("gge_token");
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
