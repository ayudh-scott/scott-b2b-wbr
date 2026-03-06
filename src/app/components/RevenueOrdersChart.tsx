import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", revenue: 42000, orders: 420 },
  { month: "Feb", revenue: 51000, orders: 510 },
  { month: "Mar", revenue: 48000, orders: 480 },
  { month: "Apr", revenue: 62000, orders: 620 },
  { month: "May", revenue: 71000, orders: 710 },
  { month: "Jun", revenue: 68000, orders: 680 },
];

export function RevenueOrdersChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Revenue vs Orders</h3>
        <p className="text-sm text-gray-500 mt-1">Last 6 months comparison</p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="month"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              yAxisId="left"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#9ca3af"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
            />
            <Legend wrapperStyle={{ fontSize: "12px" }} />
            <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Revenue ($)" />
            <Bar yAxisId="right" dataKey="orders" fill="#10b981" radius={[8, 8, 0, 0]} name="Orders" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
