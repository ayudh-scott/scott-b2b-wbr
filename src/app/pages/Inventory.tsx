import { Package, AlertTriangle, CheckCircle, XCircle, Download, Upload, Filter } from "lucide-react";
import { useState } from "react";

const inventoryData = [
  {
    sku: "SKU-001",
    name: "iPhone 15 Pro",
    category: "Electronics",
    brand: "Apple",
    currentStock: 245,
    reservedStock: 45,
    availableStock: 200,
    status: "In Stock",
    lastUpdated: "2026-03-06",
  },
  {
    sku: "SKU-002",
    name: "MacBook Pro 16\"",
    category: "Electronics",
    brand: "Apple",
    currentStock: 85,
    reservedStock: 25,
    availableStock: 60,
    status: "In Stock",
    lastUpdated: "2026-03-06",
  },
  {
    sku: "SKU-003",
    name: "AirPods Pro",
    category: "Electronics",
    brand: "Apple",
    currentStock: 12,
    reservedStock: 8,
    availableStock: 4,
    status: "Low Stock",
    lastUpdated: "2026-03-05",
  },
  {
    sku: "SKU-004",
    name: "iPad Air",
    category: "Electronics",
    brand: "Apple",
    currentStock: 0,
    reservedStock: 0,
    availableStock: 0,
    status: "Out of Stock",
    lastUpdated: "2026-03-04",
  },
  {
    sku: "SKU-005",
    name: "Apple Watch Series 9",
    category: "Electronics",
    brand: "Apple",
    currentStock: 156,
    reservedStock: 36,
    availableStock: 120,
    status: "In Stock",
    lastUpdated: "2026-03-06",
  },
];

export function Inventory() {
  const [filter, setFilter] = useState("all");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "Low Stock":
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case "Out of Stock":
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-700";
      case "Low Stock":
        return "bg-orange-100 text-orange-700";
      case "Out of Stock":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const stats = [
    {
      label: "Total Products",
      value: "1,245",
      icon: Package,
      color: "from-blue-500 to-blue-600",
    },
    {
      label: "In Stock",
      value: "1,089",
      icon: CheckCircle,
      color: "from-green-500 to-green-600",
    },
    {
      label: "Low Stock",
      value: "89",
      icon: AlertTriangle,
      color: "from-orange-500 to-orange-600",
    },
    {
      label: "Out of Stock",
      value: "67",
      icon: XCircle,
      color: "from-red-500 to-red-600",
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
              </div>
              <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Inventory Management</h3>
              <p className="text-sm text-gray-500 mt-1">Track and manage your inventory</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Import</span>
              </button>
              <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Category</span>
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Brand</span>
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Warehouse</span>
            </button>
            <div className="flex items-center gap-2 ml-auto">
              {["all", "instock", "lowstock", "outofstock"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filter === status
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {status === "all"
                    ? "All"
                    : status === "instock"
                    ? "In Stock"
                    : status === "lowstock"
                    ? "Low Stock"
                    : "Out of Stock"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reserved
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Available
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventoryData.map((item) => (
                <tr key={item.sku} className="hover:bg-gray-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.sku}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.brand}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.currentStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.reservedStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.availableStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.lastUpdated}
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
