import { DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const revenueData = [
  { month: "Jan", amazon: 42000, shopify: 28000, website: 15000 },
  { month: "Feb", amazon: 51000, shopify: 32000, website: 18000 },
  { month: "Mar", amazon: 48000, shopify: 35000, website: 21000 },
  { month: "Apr", amazon: 62000, shopify: 38000, website: 24000 },
  { month: "May", amazon: 71000, shopify: 42000, website: 28000 },
  { month: "Jun", amazon: 68000, shopify: 45000, website: 32000 },
];

export function Sales() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$342,593",
      change: "+12.5%",
      icon: DollarSign,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "Total Orders",
      value: "2,547",
      change: "+8.2%",
      icon: ShoppingCart,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Avg Order Value",
      value: "$134.50",
      change: "+3.8%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Products Sold",
      value: "4,892",
      change: "+15.3%",
      icon: Package,
      color: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue by Channel */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Revenue by Channel</h3>
          <p className="text-sm text-gray-500 mt-1">Compare sales across different channels</p>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorAmazon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorShopify" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorWebsite" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
              <Area
                type="monotone"
                dataKey="amazon"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorAmazon)"
                strokeWidth={2}
                name="Amazon"
              />
              <Area
                type="monotone"
                dataKey="shopify"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorShopify)"
                strokeWidth={2}
                name="Shopify"
              />
              <Area
                type="monotone"
                dataKey="website"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorWebsite)"
                strokeWidth={2}
                name="Website"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Selling SKUs */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Top Selling SKUs</h3>
          <p className="text-sm text-gray-500 mt-1">Best performing products this month</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Units Sold
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Growth
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { rank: 1, name: "iPhone 15 Pro", units: 1250, revenue: 1249875, growth: 12.5 },
                { rank: 2, name: "MacBook Pro 16\"", units: 780, revenue: 1949922, growth: 8.3 },
                { rank: 3, name: "AirPods Pro", units: 2340, revenue: 584916, growth: 15.7 },
                { rank: 4, name: "iPad Air", units: 890, revenue: 533911, growth: 6.2 },
                { rank: 5, name: "Apple Watch Series 9", units: 1120, revenue: 447888, growth: 10.1 },
              ].map((item) => (
                <tr key={item.rank} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-sm">
                      {item.rank}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.units.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${item.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      +{item.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
