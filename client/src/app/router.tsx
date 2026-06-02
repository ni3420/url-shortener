import {createBrowserRouter} from "react-router-dom"
import DashboardLayout from "../pages/dashboard/layout";
import Home from "@/features/dashboard/components/Home";
import LinkDashboard from "@/features/dashboard/components/LinkDashBoard";
import AnalyticsPage from "@/features/dashboard/components/analytics";

const Router = createBrowserRouter([
    {
        path:"/",
        element:<DashboardLayout/>,
        children:[{
            path:"home",
            element:<Home/>
        },{
            path:"links",
            element:<LinkDashboard/>
        },
        {
            path:"analytics",
            element:<AnalyticsPage/>
        }
    ]
    }
    
])
export default Router;