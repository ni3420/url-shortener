import {createBrowserRouter} from "react-router-dom"
import DashboardLayout from "../pages/dashboard/layout";
import Home from "@/features/dashboard/components/Home";
import LinkDashboard from "@/features/dashboard/components/LinkDashBoard";
import AnalyticsPage from "@/features/dashboard/components/analytics";
import SignInPage from "@/pages/auth/signin";
import SignUpPage from "@/pages/auth/signup";
import MainPage from "@/features/Campaigns/components/Mainpage";
import AnalyticsCampaign from "@/features/analytics/components/analyticsCampaign";

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
        },
        {
            path:"campaigns",
            element:<MainPage/>
        },
        {
            path:"dashboard/campaign/:campaignId",
            element:<AnalyticsCampaign/>,
            
        }
    ]
    },
    {
        path:"/login",
        element:<SignInPage/>
    },
    {
        path:"/register",
        element:<SignUpPage/>
    }
    
])
export default Router;