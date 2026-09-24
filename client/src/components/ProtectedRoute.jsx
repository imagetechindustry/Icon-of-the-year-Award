import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { isAuthenticated, user, initialised } = useAuth();
  const location = useLocation();

  if (!initialised) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white">
        <span className="animate-pulse text-sm text-gray-300">Loading...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    // If this route is meant for admins, send to admin login page instead of user login.
    const loginPath = allowedRoles?.includes("admin") ? "/admin/login" : "/login";
    return <Navigate to={loginPath} replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect users with wrong role to home
    return <Navigate to="/" replace />;
  }

  return children;
}



