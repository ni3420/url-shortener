import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "sonner";

import DashboardLayout from "../pages/dashboard/layout";
import AuthRoutesProtect from "@/middleware/authprotect";
import PublicRoutesOnly from "@/middleware/publicroutes";
import Not_Found from "@/components/Not-Found";

const Home = lazy(() => import("@/features/dashboard/components/Home"));
const LinkDashboard = lazy(() => import("@/features/dashboard/components/LinkDashBoard"));
const AnalyticsPage = lazy(() => import("@/features/dashboard/components/analytics"));
const MainPage = lazy(() => import("@/features/Campaigns/components/Mainpage"));
const CampaignLinkList = lazy(() => import("@/features/Campaigns/components/CampaignAllLinks"));
const CampaignInfo = lazy(() => import("@/features/Campaigns/components/CampaignInfo"));
const SignInPage = lazy(() => import("@/pages/auth/signin"));
const SignUpPage = lazy(() => import("@/pages/auth/signup"));

const PageLoader = () => (
  <div className="w-full h-[60vh] flex items-center justify-center bg-transparent">
    <span className="loading loading-spinner loading-lg text-indigo-500"></span>
  </div>
);

const Router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Toaster />
        <AuthRoutesProtect />
      </>
    ),
    children: [
      {
        path: "",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <Navigate to="home" replace />
          },
          {
            path: "home",
            element: (
              <Suspense fallback={<PageLoader />}>
                <Home />
              </Suspense>
            )
          },
          {
            path: "links",
            element: (
              <Suspense fallback={<PageLoader />}>
                <LinkDashboard />
              </Suspense>
            )
          },
          {
            path: "analytics",
            element: (
              <Suspense fallback={<PageLoader />}>
                <AnalyticsPage />
              </Suspense>
            )
          },
          {
            path: "campaigns",
            element: (
              <Suspense fallback={<PageLoader />}>
                <MainPage />
              </Suspense>
            )
          },
          {
            path: "dashboard/campaign/:campaignId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CampaignInfo />
              </Suspense>
            )
          },
          {
            path: "dashboard/analytics/:linkId",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CampaignLinkList />
              </Suspense>
            )
          }
        ]
      }
    ]
  },
  {
    element: (
      <>
        <Toaster />
        <PublicRoutesOnly />
      </>
    ),
    children: [
      {
        path: "/login",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignInPage />
          </Suspense>
        )
      },
      {
        path: "/register",
        element: (
          <Suspense fallback={<PageLoader />}>
            <SignUpPage />
          </Suspense>
        )
      }
    ]
  },
  {
    path: "*",
    element: <Not_Found/>
  }
]);

export default Router;