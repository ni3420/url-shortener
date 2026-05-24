import type React from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/Sidebar";

interface DashBoardLayoutProps{
    children:React.ReactNode
}
const DashBoardLayout = ({children}:DashBoardLayoutProps) => {
    return ( <>
    <div className="flex ">
        {children}

    </div>
    </> );
}
 
export default DashBoardLayout;