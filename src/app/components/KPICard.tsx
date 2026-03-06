import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  trend: "up" | "down";
  icon: LucideIcon;
  color: string;
}

export function KPICard({ title, value, change, trend, icon: Icon, color }: KPICardProps) {
  // Generate mini chart data
  const miniChartData = Array.from({ length: 7 }, (_, i) => ({
    value: Math.random() * 100 + 50,
  }));

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
        <div
          className={`flex items-center gap-1 text-xs font-medium ${
            trend === "up" ? "text-green-600" : "text-red-600"
          }`}
        >
          {trend === "up" ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {Math.abs(change)}%
        </div>
      </div>

      <div className="space-y-1 mb-3">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        <p className="text-xs text-gray-500">{title}</p>
      </div>

      {/* Mini Chart */}
      <div className="h-8 -mx-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={miniChartData}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={trend === "up" ? "#10b981" : "#ef4444"}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
