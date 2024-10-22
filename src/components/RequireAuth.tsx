import { authCheck } from "@/store/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import {  useRecoilValueLoadable } from "recoil";


interface RequireAuthProps {
  allowedRoles: string[];
}


const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const isAuthenticated = useRecoilValueLoadable(authCheck);
  const location = useLocation(); // Capture the current location
  if(isAuthenticated.state === 'hasValue'){
  const hasRequiredRole = isAuthenticated ? allowedRoles.includes(isAuthenticated.contents?.role || '') : false;

  if (hasRequiredRole) {
    return <Outlet />;
  } else if (isAuthenticated.contents) {
    console.log(isAuthenticated)
    return <Navigate to="/unauthorized" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }
}
};


export default RequireAuth;
