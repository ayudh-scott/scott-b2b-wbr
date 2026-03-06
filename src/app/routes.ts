import { createBrowserRouter } from "react-router";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./pages/Dashboard";
import { Inventory } from "./pages/Inventory";
import { Products } from "./pages/Products";
import { Sales } from "./pages/Sales";
import { Customers } from "./pages/Customers";
import { Ecommerce } from "./pages/Ecommerce";
import { KPIs } from "./pages/KPIs";
import { Followups } from "./pages/Followups";
import { Automations } from "./pages/Automations";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "inventory", Component: Inventory },
      { path: "products", Component: Products },
      { path: "sales", Component: Sales },
      { path: "customers", Component: Customers },
      { path: "ecommerce", Component: Ecommerce },
      { path: "kpis", Component: KPIs },
      { path: "followups", Component: Followups },
      { path: "automations", Component: Automations },
      { path: "reports", Component: Reports },
      { path: "settings", Component: Settings },
    ],
  },
]);
