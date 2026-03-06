import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const data = [
  { date: "Jan", sales: 4200, lastYear: 3800 },
  { date: "Feb", sales: 5100, lastYear: 4200 },
  { date: "Mar", sales: 4800, lastYear: 4500 },
  { date: "Apr", sales: 6200, lastYear: 5100 },
  { date: "May", sales: 7100, lastYear: 6000 },
  { date: "Jun", sales: 6800, lastYear: 5800 },
  { date: "Jul", sales: 7500, lastYear: 6500 },
  { date: "Aug", sales: 8200, lastYear: 7100 },
  { date: "Sep", sales: 7800, lastYear: 6900 },
  { date: "Oct", sales: 8900, lastYear: 7800 },
  { date: "Nov", sales: 9200, lastYear: 8200 },
  { date: "Dec", sales: 10500, lastYear: 9100 },
];

export function SalesTrendChart() {
  const [timeRange, setTimeRange] = useState("12M");

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales Trend</h3>
          <p className="text-sm text-gray-500 mt-1">Monthly sales performance</p>
        </div>
        <div className="flex items-center gap-2">
          {["7D", "1M", "3M", "12M"].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
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
              formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={false}
              name="This Year"
            />
            <Line
              type="monotone"
              dataKey="lastYear"
              stroke="#9ca3af"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
              name="Last Year"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
