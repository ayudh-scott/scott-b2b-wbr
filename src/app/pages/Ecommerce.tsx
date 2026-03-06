import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ShoppingCart, DollarSign, TrendingUp, Package } from "lucide-react";

const channelData = [
  { month: "Jan", amazon: 42000, shopify: 28000, website: 15000 },
  { month: "Feb", amazon: 51000, shopify: 32000, website: 18000 },
  { month: "Mar", amazon: 48000, shopify: 35000, website: 21000 },
  { month: "Apr", amazon: 62000, shopify: 38000, website: 24000 },
  { month: "May", amazon: 71000, shopify: 42000, website: 28000 },
  { month: "Jun", amazon: 68000, shopify: 45000, website: 32000 },
];

export function Ecommerce() {
  const channels = [
    {
      name: "Amazon",
      orders: 1547,
      revenue: 342593,
      conversion: 3.8,
      color: "from-orange-500 to-orange-600",
    },
    {
      name: "Shopify",
      orders: 982,
      revenue: 220145,
      conversion: 4.2,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Website",
      orders: 456,
      revenue: 138976,
      conversion: 2.9,
      color: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${channel.color} mb-4`}>
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">{channel.name}</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Orders</span>
                <span className="text-sm font-semibold text-gray-900">{channel.orders.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Revenue</span>
                <span className="text-sm font-semibold text-gray-900">${channel.revenue.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Conversion</span>
                <span className="text-sm font-semibold text-green-600">{channel.conversion}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Channel Comparison Chart */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Channel Performance</h3>
          <p className="text-sm text-gray-500 mt-1">Revenue comparison across marketplaces</p>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={channelData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9ca3af"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
                formatter={(value: number) => `$${value.toLocaleString()}`}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="amazon" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Amazon" />
              <Bar dataKey="shopify" fill="#10b981" radius={[8, 8, 0, 0]} name="Shopify" />
              <Bar dataKey="website" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Website" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Orders", value: "2,985", icon: ShoppingCart },
          { label: "Total Revenue", value: "$701,714", icon: DollarSign },
          { label: "Avg Conversion", value: "3.6%", icon: TrendingUp },
        ].map((metric, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
