import { Fingerprint } from 'lucide-react';
import EyeLogo from '../components/eyelogo';

interface BiometricAuthProps {
  onVerify: () => void;
}

export default function BiometricAuth({ onVerify }: BiometricAuthProps) {
  const handleVerify = () => {
    // Mock biometric verification - visual only
    onVerify();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-12">
          <EyeLogo size={100} color="#2F6FA3" showAnimation={false} />
          <h1 className="text-[#2F6FA3] text-2xl font-semibold tracking-[0.2em] uppercase mt-4">
            SAMVID
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 mb-6">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gradient-to-br from-[#2F6FA3] to-[#4A7BA7] rounded-full flex items-center justify-center mb-6 shadow-lg">
              <Fingerprint className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Authenticate using Biometrics
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Place your finger on the sensor to verify your identity
            </p>
          </div>
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-[#2F6FA3] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-[#2760] transition-all duration-200 active:scale-[0.98]"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

