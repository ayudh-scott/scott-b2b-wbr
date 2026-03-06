import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  Package,
  AlertTriangle,
  Percent,
  DollarSign,
} from "lucide-react";
import { KPICard } from "../components/KPICard";
import { SalesTrendChart } from "../components/SalesTrendChart";
import { RevenueOrdersChart } from "../components/RevenueOrdersChart";
import { InventoryDistributionChart } from "../components/InventoryDistributionChart";
import { TopProductsChart } from "../components/TopProductsChart";
import { RecentOrdersTable } from "../components/RecentOrdersTable";

export function Dashboard() {
  const kpiData = [
    {
      title: "Total Sales",
      value: "$124,593",
      change: 12.5,
      trend: "up" as const,
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Orders Today",
      value: "156",
      change: 8.2,
      trend: "up" as const,
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Inventory Value",
      value: "$456,789",
      change: 3.1,
      trend: "up" as const,
      icon: Package,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Low Stock Products",
      value: "23",
      change: -15.3,
      trend: "down" as const,
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
    },
    {
      title: "Conversion Rate",
      value: "3.42%",
      change: 5.8,
      trend: "up" as const,
      icon: Percent,
      color: "from-indigo-500 to-indigo-600",
    },
    {
      title: "Revenue Growth",
      value: "+18.2%",
      change: 2.4,
      trend: "up" as const,
      icon: TrendingUp,
      color: "from-teal-500 to-teal-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrendChart />
        <RevenueOrdersChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InventoryDistributionChart />
        <TopProductsChart />
      </div>

      {/* Recent Orders Table */}
      <RecentOrdersTable />
    </div>
  );
}
