import { User, Bell, Lock, Database, Palette, Globe } from "lucide-react";

export function Settings() {
  const settingsSections = [
    {
      icon: User,
      title: "Profile Settings",
      description: "Manage your account information and preferences",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Configure email and push notification preferences",
      color: "from-green-500 to-green-600",
    },
    {
      icon: Lock,
      title: "Security",
      description: "Password, two-factor authentication, and login history",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Database,
      title: "Data & Privacy",
      description: "Export data, manage privacy settings, and data retention",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Palette,
      title: "Appearance",
      description: "Customize theme, colors, and layout preferences",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Globe,
      title: "Integrations",
      description: "Connect with external services and APIs",
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your application preferences</p>
        </div>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsSections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${section.color} mb-4`}>
              <section.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">{section.title}</h3>
            <p className="text-sm text-gray-500">{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
