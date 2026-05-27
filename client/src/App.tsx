import { Route, Routes } from "react-router-dom";
import Redirect from "./pages/RedirectPage";
import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import DashBoardLayout from "./pages/dashboard/layout";
import Home from "./pages/Home";
import AuthLayout from "./components/AuthLayout";

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            element={
              <DashBoardLayout>
                <Home />
              </DashBoardLayout>
            }
            path="/"
          />
        </Route>

        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/:id" element={<Redirect />} />
      </Routes>
    </>
  );
};

export default App;