import {
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Filter,
  Loader2,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { ProductMaster } from "./Products";

const LOW_STOCK_THRESHOLD = 10;

type InventoryRow = {
  sku: string;
  stock: number;
  inventory_date: string;
  product_name: string | null;
  category: string | null;
  brand: string | null;
  status: "In Stock" | "Low Stock" | "Out of Stock";
};

function getStatus(stock: number): "In Stock" | "Low Stock" | "Out of Stock" {
  if (stock === 0) return "Out of Stock";
  if (stock < LOW_STOCK_THRESHOLD) return "Low Stock";
  return "In Stock";
}

function getStatusIcon(status: string) {
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
}

function getStatusColor(status: string) {
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
}

export function Inventory() {
  const [filter, setFilter] = useState<"all" | "instock" | "lowstock" | "outofstock">("all");
  const [inventory, setInventory] = useState<InventoryRow[]>([]);
  const [latestDate, setLatestDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      const { data: dateRow, error: dateErr } = await supabase
        .from("inventory_history")
        .select("inventory_date")
        .order("inventory_date", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (cancelled) return;
      if (dateErr) {
        setError(dateErr.message);
        setLoading(false);
        setInventory([]);
        return;
      }
      if (!dateRow?.inventory_date) {
        setInventory([]);
        setLatestDate(null);
        setLoading(false);
        return;
      }

      const inventoryDate = dateRow.inventory_date as string;
      setLatestDate(inventoryDate);

      const { data: invData, error: invErr } = await supabase
        .from("inventory_history")
        .select("sku, stock, inventory_date")
        .eq("inventory_date", inventoryDate)
        .order("sku", { ascending: true });

      if (cancelled) return;
      if (invErr) {
        setError(invErr.message);
        setInventory([]);
        setLoading(false);
        return;
      }

      const skus = (invData ?? []).map((r) => r.sku).filter(Boolean);
      if (skus.length === 0) {
        setInventory([]);
        setLoading(false);
        return;
      }

      const { data: products, error: prodErr } = await supabase
        .from("product_master")
        .select("sku, product_name, category, brand")
        .in("sku", skus);

      if (cancelled) return;
      const productMap = new Map<string, ProductMaster>();
      if (!prodErr && products) {
        for (const p of products as ProductMaster[]) {
          productMap.set(p.sku, p);
        }
      }

      const rows: InventoryRow[] = (invData ?? []).map((r) => {
        const sku = r.sku as string;
        const stock = Number(r.stock) ?? 0;
        const product = productMap.get(sku);
        return {
          sku,
          stock,
          inventory_date: r.inventory_date as string,
          product_name: product?.product_name ?? null,
          category: product?.category ?? null,
          brand: product?.brand ?? null,
          status: getStatus(stock),
        };
      });

      setInventory(rows);
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredRows = useMemo(() => {
    if (filter === "all") return inventory;
    if (filter === "instock") return inventory.filter((r) => r.status === "In Stock");
    if (filter === "lowstock") return inventory.filter((r) => r.status === "Low Stock");
    if (filter === "outofstock") return inventory.filter((r) => r.status === "Out of Stock");
    return inventory;
  }, [inventory, filter]);

  const stats = useMemo(() => {
    const total = inventory.length;
    const inStock = inventory.filter((r) => r.status === "In Stock").length;
    const lowStock = inventory.filter((r) => r.status === "Low Stock").length;
    const outOfStock = inventory.filter((r) => r.status === "Out of Stock").length;
    return [
      { label: "Total Products", value: total.toLocaleString(), icon: Package, color: "from-blue-500 to-blue-600" },
      { label: "In Stock", value: inStock.toLocaleString(), icon: CheckCircle, color: "from-green-500 to-green-600" },
      { label: "Low Stock", value: lowStock.toLocaleString(), icon: AlertTriangle, color: "from-orange-500 to-orange-600" },
      { label: "Out of Stock", value: outOfStock.toLocaleString(), icon: XCircle, color: "from-red-500 to-red-600" },
    ];
  }, [inventory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">Failed to load inventory</p>
        <p className="text-sm mt-1">{error}</p>
      </div>
    );
  }

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
              <p className="text-sm text-gray-500 mt-1">
                {latestDate
                  ? `Snapshot as of ${latestDate} · Data from inventory_history with product details from product_master`
                  : "No inventory snapshot yet. Run the sync-inventory workflow to load data."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-4 h-4" />
                <span className="text-sm">Import</span>
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-600">Status</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              {(["all", "instock", "lowstock", "outofstock"] as const).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                    filter === status ? "bg-black text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                  Product name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Brand
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Snapshot date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    {inventory.length === 0
                      ? "No inventory data. Sync inventory from the external API (GitHub Action or Edge Function) to see data here."
                      : "No items match the selected status filter."}
                  </td>
                </tr>
              ) : (
                filteredRows.map((row) => (
                  <tr key={row.sku} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.sku}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {row.product_name ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.category ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.brand ?? "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {row.stock}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(row.status)}
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            row.status
                          )}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {row.inventory_date}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
