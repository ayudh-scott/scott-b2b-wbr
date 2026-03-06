import { useCallback, useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import { Input } from "@/app/components/ui/input";
import { Loader2, Search, X } from "lucide-react";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const SEARCH_DEBOUNCE_MS = 400;

export type ProductMaster = {
  sku: string;
  size: string | null;
  class_name: string | null;
  color: string | null;
  product_name: string | null;
  category: string | null;
  parent_category: string | null;
  brand: string | null;
  parent_brand: string | null;
  hbt: string | null;
  created_at?: string;
  updated_at?: string;
};

type Filters = {
  category: string;
  brand: string;
  size: string;
  parent_category: string;
};

const emptyFilters: Filters = {
  category: "",
  brand: "",
  size: "",
  parent_category: "",
};

function buildSearchOr(searchTerm: string): string {
  const t = searchTerm.trim();
  if (!t) return "";
  const term = `%${t.replace(/%/g, "\\%")}%`;
  return [
    `sku.ilike.${term}`,
    `product_name.ilike.${term}`,
    `brand.ilike.${term}`,
    `category.ilike.${term}`,
    `color.ilike.${term}`,
    `class_name.ilike.${term}`,
    `parent_category.ilike.${term}`,
    `parent_brand.ilike.${term}`,
    `hbt.ilike.${term}`,
  ].join(",");
}

export function Products() {
  const [products, setProducts] = useState<ProductMaster[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const prevSearchRef = useRef({ searchTerm: "", filters: emptyFilters });

  // Debounced search
  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(searchInput.trim()), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [searchInput]);

  // Server-side fetch: pagination + search + filters (use page 1 when search/filters change)
  const fetchPage = useCallback(async () => {
    setLoading(true);
    setError(null);
    const searchOrFiltersChanged =
      prevSearchRef.current.searchTerm !== searchTerm ||
      JSON.stringify(prevSearchRef.current.filters) !== JSON.stringify(filters);
    if (searchOrFiltersChanged) {
      prevSearchRef.current = { searchTerm, filters };
      setCurrentPage(1);
    }
    const pageToFetch = searchOrFiltersChanged ? 1 : currentPage;
    const from = (pageToFetch - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from("product_master")
      .select("*", { count: "exact", head: false })
      .order("sku", { ascending: true })
      .range(from, to);

    const orClause = buildSearchOr(searchTerm);
    if (orClause) {
      query = query.or(orClause);
    }
    if (filters.category.trim()) {
      query = query.ilike("category", `%${filters.category.trim()}%`);
    }
    if (filters.brand.trim()) {
      query = query.ilike("brand", `%${filters.brand.trim()}%`);
    }
    if (filters.size.trim()) {
      query = query.ilike("size", `%${filters.size.trim()}%`);
    }
    if (filters.parent_category.trim()) {
      query = query.ilike("parent_category", `%${filters.parent_category.trim()}%`);
    }

    const { data, error: err, count } = await query;

    setLoading(false);
    if (err) {
      setError(err.message);
      setProducts([]);
      setTotalCount(0);
      return;
    }
    setProducts((data as ProductMaster[]) ?? []);
    setTotalCount(count ?? 0);
  }, [currentPage, pageSize, searchTerm, filters]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const startRow = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRow = Math.min(currentPage * pageSize, totalCount);

  const handlePageSizeChange = (value: string) => {
    setPageSize(Number(value) as (typeof PAGE_SIZE_OPTIONS)[number]);
    setCurrentPage(1);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const updateFilter = (key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setSearchInput("");
    setSearchTerm("");
    setFilters(emptyFilters);
    setCurrentPage(1);
  };

  const hasActiveSearchOrFilter =
    searchTerm !== "" ||
    filters.category !== "" ||
    filters.brand !== "" ||
    filters.size !== "" ||
    filters.parent_category !== "";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Products</h2>
        <p className="text-sm text-gray-500">
          {loading ? "…" : `${totalCount} product${totalCount !== 1 ? "s" : ""} total`}
        </p>
      </div>

      {/* Search and filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search SKU, name, brand, category…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="pl-9"
            />
          </div>
          <Input
            placeholder="Filter by category"
            value={filters.category}
            onChange={(e) => updateFilter("category", e.target.value)}
            className="max-w-[180px]"
          />
          <Input
            placeholder="Filter by brand"
            value={filters.brand}
            onChange={(e) => updateFilter("brand", e.target.value)}
            className="max-w-[180px]"
          />
          <Input
            placeholder="Filter by size"
            value={filters.size}
            onChange={(e) => updateFilter("size", e.target.value)}
            className="max-w-[120px]"
          />
          <Input
            placeholder="Filter by parent category"
            value={filters.parent_category}
            onChange={(e) => updateFilter("parent_category", e.target.value)}
            className="max-w-[180px]"
          />
          {hasActiveSearchOrFilter && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-4 py-3 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Rows per page</span>
            <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <SelectItem key={size} value={String(size)}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-600">
            Showing {totalCount === 0 ? 0 : startRow}–{endRow} of {totalCount}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[280px]">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        ) : error ? (
          <div className="p-4 text-red-600">
            <p className="font-medium">Failed to load products</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">SKU</TableHead>
                    <TableHead className="font-semibold">Size</TableHead>
                    <TableHead className="font-semibold">Class name</TableHead>
                    <TableHead className="font-semibold">Color</TableHead>
                    <TableHead className="font-semibold">Product name</TableHead>
                    <TableHead className="font-semibold">Category</TableHead>
                    <TableHead className="font-semibold">Parent category</TableHead>
                    <TableHead className="font-semibold">Brand</TableHead>
                    <TableHead className="font-semibold">Parent brand</TableHead>
                    <TableHead className="font-semibold">HBT</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={10}
                        className="text-center py-12 text-gray-500"
                      >
                        {hasActiveSearchOrFilter
                          ? "No products match your search or filters."
                          : "No products in product_master yet."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((row) => (
                      <TableRow key={row.sku}>
                        <TableCell className="font-medium">{row.sku}</TableCell>
                        <TableCell>{row.size ?? "—"}</TableCell>
                        <TableCell>{row.class_name ?? "—"}</TableCell>
                        <TableCell
                          className="max-w-[180px] truncate"
                          title={row.color ?? undefined}
                        >
                          {row.color ?? "—"}
                        </TableCell>
                        <TableCell
                          className="max-w-[200px] truncate"
                          title={row.product_name ?? undefined}
                        >
                          {row.product_name ?? "—"}
                        </TableCell>
                        <TableCell>{row.category ?? "—"}</TableCell>
                        <TableCell>{row.parent_category ?? "—"}</TableCell>
                        <TableCell
                          className="max-w-[140px] truncate"
                          title={row.brand ?? undefined}
                        >
                          {row.brand ?? "—"}
                        </TableCell>
                        <TableCell>{row.parent_brand ?? "—"}</TableCell>
                        <TableCell>{row.hbt ?? "—"}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-between gap-4 px-4 py-3 border-t border-gray-200">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(currentPage - 1);
                        }}
                        aria-disabled={currentPage <= 1}
                        className={
                          currentPage <= 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((p) => {
                        if (totalPages <= 7) return true;
                        return (
                          p === 1 ||
                          p === totalPages ||
                          Math.abs(p - currentPage) <= 1
                        );
                      })
                      .map((p, i, arr) => (
                        <PaginationItem key={p}>
                          {i > 0 && arr[i - 1] !== p - 1 && (
                            <span className="px-2 text-gray-400">…</span>
                          )}
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              goToPage(p);
                            }}
                            isActive={currentPage === p}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          goToPage(currentPage + 1);
                        }}
                        aria-disabled={currentPage >= totalPages}
                        className={
                          currentPage >= totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
