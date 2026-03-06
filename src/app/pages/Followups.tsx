import { Calendar, User, Flag, CheckCircle, Clock } from "lucide-react";
import { useState } from "react";

const tasks = [
  {
    id: 1,
    customer: "John Smith",
    task: "Follow up on large order inquiry",
    priority: "High",
    assignedTo: "Sarah J.",
    dueDate: "2026-03-07",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Emily Chen",
    task: "Product demo scheduled",
    priority: "Medium",
    assignedTo: "Mike D.",
    dueDate: "2026-03-08",
    status: "In Progress",
  },
  {
    id: 3,
    customer: "David Wilson",
    task: "Send pricing quote",
    priority: "High",
    assignedTo: "Sarah J.",
    dueDate: "2026-03-06",
    status: "Overdue",
  },
  {
    id: 4,
    customer: "Sarah Johnson",
    task: "Customer satisfaction survey",
    priority: "Low",
    assignedTo: "Alex K.",
    dueDate: "2026-03-10",
    status: "Pending",
  },
  {
    id: 5,
    customer: "Mike Davis",
    task: "Renewal reminder",
    priority: "Medium",
    assignedTo: "Sarah J.",
    dueDate: "2026-03-09",
    status: "Completed",
  },
];

export function Followups() {
  const [view, setView] = useState<"list" | "kanban">("list");

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      case "Low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const kanbanColumns = [
    { title: "Pending", status: "Pending" },
    { title: "In Progress", status: "In Progress" },
    { title: "Completed", status: "Completed" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Followups</h2>
            <p className="text-sm text-gray-500 mt-1">Manage customer tasks and reminders</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView("list")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === "list"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                view === "kanban"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Kanban View
            </button>
          </div>
        </div>
      </div>

      {view === "list" ? (
        /* List View */
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {task.customer}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{task.task}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.assignedTo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {task.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          task.status
                        )}`}
                      >
                        {task.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Kanban View */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {kanbanColumns.map((column) => (
            <div key={column.status} className="bg-gray-50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{column.title}</h3>
                <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-full">
                  {tasks.filter((t) => t.status === column.status).length}
                </span>
              </div>
              <div className="space-y-3">
                {tasks
                  .filter((task) => task.status === column.status)
                  .map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-gray-900 text-sm">{task.task}</h4>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                      </div>
                      <div className="space-y-2 text-xs text-gray-500">
                        <div className="flex items-center gap-2">
                          <User className="w-3 h-3" />
                          <span>{task.customer}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          <span>{task.dueDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Flag className="w-3 h-3" />
                          <span>Assigned to {task.assignedTo}</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
