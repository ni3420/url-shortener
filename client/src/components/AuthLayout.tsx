import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const AuthLayout = () => {
    const [loading, setLoading] = useState(true);
    const [isAuth, setAuth] = useState(false);

    useEffect(() => {
        const init = async () => {
            try {
                const res = await axios.get("/api/auth/current");
                
                if (res.data.code === 401) {
                    setAuth(false);
                } else if (res.data) {
                    setAuth(true);
                }
            } catch (error) {
                console.log(error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        init();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!isAuth) {
        return <Navigate to="/sign-in" replace />;
    }

    return <Outlet />;
};

export default AuthLayout;