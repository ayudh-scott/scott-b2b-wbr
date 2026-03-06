import { TrendingUp, TrendingDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const kpiData = [
  { name: "Revenue", current: 124593, target: 120000, trend: "up", change: 12.5 },
  { name: "Orders", current: 2547, target: 2400, trend: "up", change: 8.2 },
  { name: "Conversion Rate", current: 3.42, target: 3.0, trend: "up", change: 5.8 },
  { name: "Customer Acquisition", current: 342, target: 350, trend: "down", change: -2.3 },
  { name: "Avg Order Value", current: 134.5, target: 130, trend: "up", change: 3.5 },
  { name: "Customer Retention", current: 87.3, target: 85, trend: "up", change: 2.7 },
];

const trendData = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: Math.random() * 100 + 50,
}));

export function KPIs() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Key Performance Indicators</h2>
          <p className="text-sm text-gray-500 mt-1">Track and monitor your business metrics</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiData.map((kpi, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">{kpi.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {kpi.name.includes("Rate") || kpi.name.includes("Retention")
                    ? `${kpi.current}%`
                    : kpi.name.includes("Revenue") || kpi.name.includes("Value")
                    ? `$${kpi.current.toLocaleString()}`
                    : kpi.current.toLocaleString()}
                </p>
              </div>
              <div
                className={`flex items-center gap-1 px-2 py-1 rounded-lg ${
                  kpi.trend === "up"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {kpi.trend === "up" ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-semibold">{Math.abs(kpi.change)}%</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Target: {kpi.target.toLocaleString()}</span>
                <span>
                  {((kpi.current / kpi.target) * 100).toFixed(0)}%
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    kpi.current >= kpi.target
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-blue-500 to-blue-600"
                  }`}
                  style={{ width: `${Math.min((kpi.current / kpi.target) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Mini Trend Chart */}
            <div className="h-16 mt-4 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={kpi.trend === "up" ? "#10b981" : "#ef4444"}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
