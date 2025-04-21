/* eslint-disable react-refresh/only-export-components */
import { Navigate, createBrowserRouter, useLocation } from "react-router-dom";
import { DefaultDashboardPage, SignInPage } from "../pages";
import { DashboardLayout } from "../layouts";
import React, { ReactNode, useEffect } from "react";
import { PATH_AUTH, PATH_DASHBOARD } from "../constants";
import { appToken } from "../config";
import User from "../pages/dashboards/User";
import Servieces from "../pages/dashboards/Orders";
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
import ParamsFilter from "../pages/dashboards/ParamsFilter";
import ParamsFilterCreatePage from "../components/dashboard/default/ParamsFilter/ParamsFilterCreatePage";
import SpecificactionsEdiPage from "../components/dashboard/default/Specifications/SpecificationsEditPage";
import Tax_amount from "../pages/dashboards/Tax_amount";
import UserEditPage from "../components/dashboard/default/User/UserEditPage";
import { DriverAccountLayout } from "../layouts/driverLayout";
import DriverTranzactions from "../components/dashboard/default/Drivers/DriverTranzactions";
import DriverOrders from "../components/dashboard/default/Drivers/DriverOrders";
import DriverDepozits from "../components/dashboard/default/Drivers/DriverDepozits";
import { ClientDetailsPage } from "../components/dashboard/default/Client/ClientDetail";

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
        path: "clients",
        element: <Client />,
      },
      {
        path: "client/:id",
        element: <ClientDetailsPage />,
      },
      {
        path: "user/:id",
        element: <UserEditPage />,
      },
     
      {
        path: "user/create",
        element: <UserCreatePage />,
      },
      {
        path: "drivers",
        element: <Drivers />,
      },
      {
        path: "driver/:id",
        element: <DriverAccountLayout />,
        children: [
          {
            index: true,
            path: "driver-orders",
            element: <DriverOrders />,
          },
          {
            path: "driver-depozit",
            element: <DriverDepozits />,
          },
          {
            path: "driver-tranzactions",
            element: <DriverTranzactions />,
          },
          // {
          //   path: "update-driver",
          //   element: <MerchantEditPage />,
          // },
        ],
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
        path: "specifications/:id",
        element: <SpecificactionsEdiPage />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "tax_amount",
        element: <Tax_amount />,
      },
      {
        path: "params_filter",
        element: <ParamsFilter />,
      },
      {
        path: "params_filter/create",
        element: <ParamsFilterCreatePage />,
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
