import { X } from 'lucide-react';

interface LogoutModalProps {
  onClose: () => void;
  onLogout: () => void;
}

export default function LogoutModal({ onClose, onLogout }: LogoutModalProps) {
  const handleGiveFeedback = () => {
    window.open(
      'https://docs.google.com/forms/d/e/1FAIpQLSc3RYNfijalmdhvbdyiZaHThSaNUxwLuEZyOykZOUAib9IbLQ/viewform?usp=publish-editor',
      '_blank'
    );
  };

  const handleFinalLogout = () => {
    onLogout();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            We appreciate your feedback
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Click here to give your feedback
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGiveFeedback}
              className="w-full px-6 py-3 bg-[#5A8FC7] text-white rounded-lg font-semibold hover:bg-[#4A7BA7] transition-all shadow-md hover:shadow-lg"
            >
              Give Feedback
            </button>
            <button
              onClick={handleFinalLogout}
              className="w-full px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              Final Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

