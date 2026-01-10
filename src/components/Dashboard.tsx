import { useState } from 'react';
import Sidebar from './Sidebar';
import TransactionDashboard from './TransactionDashboard';
import FindRightLoan from './FindRightLoan';
import CardDisputeAssistant from './CardDisputeAssistant';
import ReachYourBankBranch from './ReachYourBankBranch';

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const [activeMenu, setActiveMenu] = useState('transactions');

  if (activeMenu === 'transactions') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <div className="w-[70%] ml-[30%] overflow-auto">
          <TransactionDashboard onLogout={onLogout} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

      <div className="w-[70%] ml-[30%] flex flex-col">
        <div className="flex-1 overflow-auto">
          {activeMenu === 'loan' && (
            <FindRightLoan onLogout={onLogout} />
          )}

          {activeMenu === 'branch' && (
            <ReachYourBankBranch onLogout={onLogout} />
          )}

          {activeMenu === 'disputes' && (
            <CardDisputeAssistant onLogout={onLogout} />
          )}

          {activeMenu === 'settings' && (
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Settings</h3>
              <p className="text-gray-500">Customize your preferences</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
