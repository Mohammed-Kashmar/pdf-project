import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouteSuperAdmin = ({ isSuperAdmin, children }) => {
  if (isSuperAdmin === null) {
    return <Navigate to="/super_admin/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRouteSuperAdmin;
