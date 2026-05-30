import {createBrowserRouter} from "react-router-dom"
import DashboardLayout from "../pages/dashboard/layout";


const Router = createBrowserRouter([
    {
        path:"/",
        element:<DashboardLayout/>
    }
    
])
export default Router;