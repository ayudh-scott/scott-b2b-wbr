import { Users, UserPlus, TrendingUp, ShoppingBag } from "lucide-react";

export function Customers() {
  const stats = [
    {
      label: "Total Customers",
      value: "12,547",
      change: "+8.2%",
      icon: Users,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "New This Month",
      value: "342",
      change: "+12.5%",
      icon: UserPlus,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Avg Lifetime Value",
      value: "$1,245",
      change: "+5.3%",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600",
    },
    {
      label: "Avg Purchase Freq",
      value: "3.2x",
      change: "+2.1%",
      icon: ShoppingBag,
      color: "from-orange-500 to-orange-600",
    },
  ];

  const customers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@example.com",
      totalOrders: 24,
      lifetimeValue: 2849.5,
      segment: "VIP",
      lastPurchase: "2026-03-05",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      totalOrders: 18,
      lifetimeValue: 1999.99,
      segment: "Loyal",
      lastPurchase: "2026-03-04",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@example.com",
      totalOrders: 12,
      lifetimeValue: 1450.0,
      segment: "Regular",
      lastPurchase: "2026-03-03",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@example.com",
      totalOrders: 8,
      lifetimeValue: 899.75,
      segment: "Regular",
      lastPurchase: "2026-03-02",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "d.wilson@example.com",
      totalOrders: 3,
      lifetimeValue: 450.0,
      segment: "New",
      lastPurchase: "2026-03-01",
    },
  ];

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case "VIP":
        return "bg-purple-100 text-purple-700";
      case "Loyal":
        return "bg-blue-100 text-blue-700";
      case "Regular":
        return "bg-green-100 text-green-700";
      case "New":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

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

      {/* Customer Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Customer List</h3>
            <p className="text-sm text-gray-500 mt-1">Manage and analyze customer data</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lifetime Value
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Segment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Purchase
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {customer.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {customer.totalOrders}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${customer.lifetimeValue.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getSegmentColor(customer.segment)}`}>
                      {customer.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {customer.lastPurchase}
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
