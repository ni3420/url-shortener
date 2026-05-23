import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/RedirectPage";
import Layout from "./pages/layout";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";

const App = () => {
  return (  <>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/sign-up" element={<SignUpPage/>}/>
    <Route path="/sign-in" element={<SignInPage/>}/>
    <Route path="/:id" element={<Redirect/>}/>
  </Routes>

  </>);
}
 
export default App;