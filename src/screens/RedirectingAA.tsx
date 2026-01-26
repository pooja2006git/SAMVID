import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import EyeLogo from '../components/eyelogo';

interface RedirectingAAProps {
  onComplete: () => void;
}

export default function RedirectingAA({ onComplete }: RedirectingAAProps) {
  useEffect(() => {
    // Auto-redirect after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

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
            <Loader2 className="w-16 h-16 text-[#2F6FA3] animate-spin mb-6" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
              Redirecting to Account Aggregator for consent…
            </h2>
            <p className="text-sm text-gray-600 text-center">
              Please wait while we redirect you to the secure consent flow
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

