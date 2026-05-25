import { Route, Routes } from "react-router-dom";
import Redirect from "./pages/RedirectPage";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import DashBoardLayout from "./pages/dashboard/layout";
import DashBoardPage from "./pages/dashboard/page";

const App = () => {
  return (  <>
  <DashBoardLayout>
    <Routes>
    <Route path="/" element={<DashBoardPage/>}/>
    <Route path="/sign-up" element={<SignUpPage/>}/>
    <Route path="/sign-in" element={<SignInPage/>}/>
    <Route path="/:id" element={<Redirect/>}/>
  </Routes>
  </DashBoardLayout>
  
  </>);
}
 
export default App;