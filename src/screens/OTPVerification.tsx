import { useState } from 'react';
import EyeLogo from '../components/eyelogo';

interface OTPVerificationProps {
  onVerify: () => void;
}

export default function OTPVerification({ onVerify }: OTPVerificationProps) {
  const [otp, setOtp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock OTP verification - accept any value
    if (otp.trim().length > 0) {
      onVerify();
    }
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

        <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-600 mb-8 text-center">
          Enter the OTP sent to your mobile number
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              maxLength={6}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200 text-center text-2xl tracking-widest font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F6FA3] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-[#2760] transition-all duration-200 active:scale-[0.98]"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

