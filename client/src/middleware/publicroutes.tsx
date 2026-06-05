import { Navigate, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const PublicRoutesOnly = () => {
  const { data: response, isLoading } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      const res = await api.get("/auth/current");
      return res.data;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-base-100 dark:bg-zinc-950">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (response?.success) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoutesOnly;