import { useState } from 'react';
import LogoutModal from './LogoutModal';

interface UserProfileHeaderProps {
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
}

export default function UserProfileHeader({ 
  userName = 'Pooja', 
  userEmail = 'pooja123@gmail.com',
  onLogout
}: UserProfileHeaderProps) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3 bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-3">
        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
          {userName.charAt(0).toUpperCase()}
        </div>
        
        {/* User Info */}
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-gray-900">{userName}</span>
          <span className="text-xs text-gray-600">{userEmail}</span>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm ml-2"
        >
          Logout
        </button>
      </div>

      {showLogoutModal && (
        <LogoutModal onClose={() => setShowLogoutModal(false)} onLogout={onLogout} />
      )}
    </>
  );
}

