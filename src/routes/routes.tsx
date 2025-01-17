/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import { DefaultDashboardPage, SignInPage } from "../pages";
import { DashboardLayout } from "../layouts";
import React, { ReactNode, useEffect } from "react";
import { PATH_AUTH, PATH_DASHBOARD } from "../constants";
import { appToken } from "../config";
import User from "../pages/dashboards/User";
import Servieces from "../pages/dashboards/Orders";
import { UserProfileDetailsPage } from "../components/dashboard/default/User/UserDetail";
import Transaction from "../pages/dashboards/Merchants";
import Report from "../pages/dashboards/Report";
import Analitika from "../pages/dashboards/Analitika";
import Merchants from "../pages/dashboards/Merchants";
import { ErrorPage } from "../pages/errors";
import { UserAccountLayout } from "../layouts/userAccount";

import MerchantEditPage from "../components/dashboard/default/Merchants/MerchantEdit";
import MerchanEquipmentPage from "../components/dashboard/default/Merchants/MerchanEquipment";
import { MerchantDriversPage } from "../components/dashboard/default/Merchants/MerchantDrivers";
import MerchantOrdersPage from "../components/dashboard/default/Merchants/MerchantsOrdersTable";
import Drivers from "../pages/dashboards/Drivers";
import { DriverDetailPage } from "../components/dashboard/default/Drivers/DriverDetail";
import DriverEditPage from "../components/dashboard/default/Drivers/DriverEditPage";
import DriverCreatePage from "../components/dashboard/default/Drivers/DriverCreatePage";
import Region from "../pages/dashboards/Region";
import District from "../pages/dashboards/District";
import Category_equipment from "../pages/dashboards/Machines";
import Specifications from "../pages/dashboards/Specifications";
import SpecificationsCreate from "../components/dashboard/default/Specifications/SpecificationsCreate";
import Pricing from "../pages/dashboards/Pricing";
import Client from "../pages/dashboards/Client";
import PricingCreatePage from "../components/dashboard/default/Pricing/PricingCreatePage";
import UserCreatePage from "../components/dashboard/default/User/UserCreatePage";

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: appToken ? (
      <Navigate to={PATH_DASHBOARD.default} />
    ) : (
      <Navigate to={PATH_AUTH.signin} />
    ),
  },
  {
    path: "/dashboards",
    element: <PageWrapper children={<DashboardLayout />} />,
    children: [
      {
        path: "default",
        element: <DefaultDashboardPage />,
      },
      {
        path: "analitika",
        element: <Analitika />,
      },
      {
        path: "orders",
        element: <Servieces />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "driver/:id/detail",
        element: <DriverDetailPage />,
      },
      {
        path: "driver/create",
        element: <DriverCreatePage />,
      },
      {
        path: "driver/:id/update",
        element: <DriverEditPage />,
      },
      {
        path: "users",
        element: <Client />,
      },
      {
        path: "user/:id",
        element: <UserProfileDetailsPage />,
      },
      {
        path: "user/create",
        element: <UserCreatePage />,
      },
      {
        path: "merchants",
        element: <Merchants />,
      },
      {
        path: "merchants/:id",
        element: <UserAccountLayout />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            path: "merchant-orders",
            element: <MerchantOrdersPage />,
          },
          {
            path: "merchant-equipment",
            element: <MerchanEquipmentPage />,
          },
          {
            path: "merchant-drivers",
            element: <MerchantDriversPage />,
          },
          {
            path: "update-merchant",
            element: <MerchantEditPage />,
          },
        ],
      },
      {
        path: "user_reviews",
        element: <Transaction />,
      },
      {
        path: "finances",
        element: <Report />,
      },
      {
        path: "work_regions",
        element: <Region />,
      },
      {
        path: "work_districts",
        element: <District />,
      },
      {
        path: "categories_of_equipment",
        element: <Category_equipment />,
      },
      {
        path: "specifications",
        element: <Specifications />,
      },
      {
        path: "specifications/create",
        element: <SpecificationsCreate />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "pricing/create",
        element: <PricingCreatePage />,
      },
      {
        path: "moderators",
        element: <User />,
      },
      {
        path: "regional_management",
        element: <Report />,
      },
    ],
  },

  {
    path: "/auth",
    children: [
      {
        path: "signin",
        element: <SignInPage />,
      },
    ],
  },
]);

export default router;
