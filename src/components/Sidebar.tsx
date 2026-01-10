import { BarChart3, Landmark, MapPin, AlertCircle, Settings } from 'lucide-react';

interface SidebarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export default function Sidebar({ activeMenu, onMenuChange }: SidebarProps) {
  const menuItems = [
    { id: 'transactions', label: 'Transactions', icon: BarChart3 },
    { id: 'loan', label: 'Loan Advisor', icon: Landmark },
    { id: 'branch', label: 'Branch Visit', icon: MapPin },
    { id: 'disputes', label: 'Card Dispute Assistant', icon: AlertCircle },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="w-[30%] bg-white h-screen border-r border-gray-200 flex flex-col p-8 fixed left-0 top-0">
      <h1 className="text-3xl font-bold text-[#4A7BA7] mb-12 tracking-wide">SAMVID</h1>

      <nav className="space-y-4 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onMenuChange(item.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg font-semibold text-lg transition-all ${
                isActive
                  ? 'bg-[#5A8FC7] text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="text-xs text-gray-500 text-center">
        Financial Awareness
      </div>
    </div>
  );
}
