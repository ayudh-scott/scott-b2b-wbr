import { Outlet, useLocation, Link } from "react-router";
import { Search, Bell, Plus, User } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Inventory", path: "/inventory" },
  { label: "Products", path: "/products" },
  { label: "Sales", path: "/sales" },
  { label: "Customers", path: "/customers" },
  { label: "Ecommerce", path: "/ecommerce" },
  { label: "KPIs", path: "/kpis" },
  { label: "Followups", path: "/followups" },
  { label: "Automations", path: "/automations" },
  { label: "Reports", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

export function DashboardLayout() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">BO</span>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">BizOps</h1>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Quick Add Button */}
              <button className="bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>

              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* Profile */}
              <button className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
                <User className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Navigation Pills */}
          <nav className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  isActive(item.path)
                    ? "bg-black text-white"
                    : "bg-transparent text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
