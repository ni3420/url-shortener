import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Redirect from "./pages/RedirectPage";

const App = () => {
  return (  <>
  <Routes>

    <Route path="/" element={<Home/>}/>
    <Route path="/:id" element={<Redirect/>}/>
  </Routes>

  </>);
}
 
export default App;