import React from "react";
import { Search, Clock, Users, BarChart } from "lucide-react";
import { useAppContext } from "../AppContext";

type TabType = "find" | "tasks" | "community" | "impact";

type Tab = {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  badge?: number;
};

const TopTabs: React.FC = () => {
  const { activeTab, setActiveTab, tasks } = useAppContext();

  const taskCount: number = tasks?.length ?? 0;

  const tabs: Tab[] = [
    { id: "find", label: "Find Help", icon: <Search size={18} /> },
    { id: "tasks", label: "My Tasks", icon: <Clock size={18} />, badge: taskCount },
    { id: "community", label: "Community", icon: <Users size={18} /> },
    { id: "impact", label: "My Impact", icon: <BarChart size={18} /> },
  ];

  return (
    <div className=" sticky top-12 z-40 border-b border-slate-200 bg-white">

      {/* Container */}
      <div className="max-w-7xl mx-auto px-2">

        {/* Mobile: scrollable tabs */}
        <div className="flex md:hidden overflow-x-auto no-scrollbar gap-2 py-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === tab.id
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>

              {tab.badge !== undefined && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Desktop / Laptop: full width spread */}
        <div className="hidden md:grid grid-cols-4 w-full">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 py-4 text-sm font-medium border-b-2 transition
              ${
                activeTab === tab.id
                  ? "border-slate-900 text-slate-900 bg-slate-50"
                  : "border-transparent text-slate-600 hover:bg-slate-50"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>

              {tab.badge !== undefined && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};

export default TopTabs;