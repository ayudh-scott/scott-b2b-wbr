import { FileText, Download, Calendar } from "lucide-react";

const reports = [
  {
    name: "Monthly Sales Report",
    description: "Comprehensive sales analysis for the month",
    lastGenerated: "2026-03-01",
    format: "PDF",
    size: "2.4 MB",
  },
  {
    name: "Inventory Status Report",
    description: "Current stock levels and valuation",
    lastGenerated: "2026-03-06",
    format: "Excel",
    size: "1.8 MB",
  },
  {
    name: "Customer Analytics",
    description: "Customer behavior and lifetime value analysis",
    lastGenerated: "2026-03-05",
    format: "PDF",
    size: "3.1 MB",
  },
  {
    name: "Financial Summary",
    description: "Revenue, expenses, and profit margins",
    lastGenerated: "2026-03-01",
    format: "Excel",
    size: "2.7 MB",
  },
];

export function Reports() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
            <p className="text-sm text-gray-500 mt-1">Generate and download business reports</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reports.map((report, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{report.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{report.description}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{report.lastGenerated}</span>
                  </div>
                  <span>•</span>
                  <span>{report.format}</span>
                  <span>•</span>
                  <span>{report.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="flex-1 px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
