import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

export default function PublicRoutesOnly() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <span className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}