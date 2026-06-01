import {createBrowserRouter} from "react-router-dom"
import DashboardLayout from "../pages/dashboard/layout";
import Home from "@/features/dashboard/components/Home";
import LinkDashboard from "@/features/dashboard/components/LinkDashBoard";

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
        }]
    }
    
])
export default Router;