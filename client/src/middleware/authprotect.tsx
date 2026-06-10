import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { conf } from "@/conf/conf";

export default function AuthRoutesProtect() {
  const location = useLocation();
  const { isSignedIn, isLoaded, getToken } = useAuth();
  const [isSynced, setIsSynced] = useState(false);
  const [syncError, setSyncError] = useState(false);

  useEffect(() => {
    const syncUserSession = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        const token = await getToken();
        await axios.get(`${conf.BaseUrl}/auth/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsSynced(true);
      } catch (error) {
        console.error("Database user profiles mapping sync failure:", error);
        setSyncError(true);
      }
    };

    syncUserSession();
  }, [isLoaded, isSignedIn, getToken]);

  if (!isLoaded || (isSignedIn && !isSynced && !syncError)) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
        <span className="animate-spin h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (syncError) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-neutral-50 dark:bg-neutral-950 gap-4 text-center px-4">
        <h1 className="text-xl font-bold text-rose-500">Account Sync Failure</h1>
        <p className="text-sm text-neutral-500 max-w-sm">
          We encountered an issue initializing your local profile workspace. Please try reconnecting.
        </p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-indigo-500/20 active:scale-[0.98] transition-all"
        >
          Retry Profile Initialization
        </button>
      </div>
    );
  }

  return <Outlet />;
}