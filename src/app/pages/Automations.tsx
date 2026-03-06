import { Zap, Play, Pause, Settings } from "lucide-react";

const automations = [
  {
    id: 1,
    name: "Low Stock Alert",
    description: "Send notification when inventory falls below threshold",
    trigger: "Stock Level < 10",
    action: "Send Email + Slack Notification",
    status: "Active",
    lastRun: "2026-03-06 10:30 AM",
    runCount: 24,
  },
  {
    id: 2,
    name: "Customer Followup Reminder",
    description: "Remind team to follow up with new customers after 3 days",
    trigger: "New Customer + 3 Days",
    action: "Create Task + Send Reminder",
    status: "Active",
    lastRun: "2026-03-06 09:15 AM",
    runCount: 156,
  },
  {
    id: 3,
    name: "Order Notification",
    description: "Notify warehouse when new order is placed",
    trigger: "New Order Created",
    action: "Send Email to Warehouse",
    status: "Active",
    lastRun: "2026-03-06 11:45 AM",
    runCount: 342,
  },
  {
    id: 4,
    name: "Abandoned Cart Recovery",
    description: "Send reminder email for abandoned carts after 24 hours",
    trigger: "Cart Abandoned + 24 Hours",
    action: "Send Recovery Email",
    status: "Paused",
    lastRun: "2026-03-05 03:00 PM",
    runCount: 89,
  },
];

export function Automations() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Automations</h2>
            <p className="text-sm text-gray-500 mt-1">Automate your business workflows</p>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors">
            <Zap className="w-4 h-4" />
            Create Automation
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Automations", value: "12", color: "from-blue-500 to-blue-600" },
          { label: "Active", value: "9", color: "from-green-500 to-green-600" },
          { label: "Total Runs", value: "1,247", color: "from-purple-500 to-purple-600" },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Automation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {automations.map((automation) => (
          <div
            key={automation.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  automation.status === "Active"
                    ? "bg-green-100"
                    : "bg-gray-100"
                }`}>
                  <Zap className={`w-5 h-5 ${
                    automation.status === "Active"
                      ? "text-green-600"
                      : "text-gray-600"
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{automation.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{automation.description}</p>
                </div>
              </div>
              <span
                className={`px-3 py-1 text-xs font-medium rounded-full ${
                  automation.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {automation.status}
              </span>
            </div>

            {/* Workflow */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">TRIGGER</p>
                  <p className="text-sm font-medium text-gray-900">{automation.trigger}</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">ACTION</p>
                  <p className="text-sm font-medium text-gray-900">{automation.action}</p>
                </div>
              </div>
            </div>

            {/* Stats and Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span>Last run: {automation.lastRun}</span>
                <span>•</span>
                <span>{automation.runCount} runs</span>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  {automation.status === "Active" ? (
                    <Pause className="w-4 h-4 text-gray-600" />
                  ) : (
                    <Play className="w-4 h-4 text-gray-600" />
                  )}
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
