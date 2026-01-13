import { useState } from 'react';
import Sidebar from './Sidebar';
import TransactionDashboard from './TransactionDashboard';
import FindRightLoan from './FindRightLoan';
import CardDisputeAssistant from './CardDisputeAssistant';
import ReachYourBankBranch from './ReachYourBankBranch';
import UserProfileHeader from './UserProfileHeader';

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState('transactions');

  if (activeMenu === 'transactions') {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
        <div className="w-[70%] ml-[30%] overflow-auto">
          <TransactionDashboard />
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
            <FindRightLoan />
          )}

          {activeMenu === 'branch' && (
            <ReachYourBankBranch />
          )}

          {activeMenu === 'disputes' && (
            <CardDisputeAssistant />
          )}

          {activeMenu === 'settings' && (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
              <UserProfileHeader />
              <div className="max-w-6xl mx-auto px-8 py-8">
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Settings</h3>
                  <p className="text-gray-500">Customize your preferences</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
