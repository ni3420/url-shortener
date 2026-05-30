import {RouterProvider} from "react-router-dom"
import Router from "./app/router";

const App = () => {
  return ( <>
  <RouterProvider router={Router}/>
  </> );
}
 
export default App;