import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = ({isAuthenticated,children}) => {
  if(isAuthenticated=== null){
    return <Navigate to="/admin/login" replace />
  }
 
  return children ? children : <Outlet/>
}

export default ProtectedRoute
