import { useEffect } from 'react';
import EyeLogo from '../components/eyelogo';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#2F6FA3] flex flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <EyeLogo size={140} color="white" showAnimation={true} />
        <h1 className="text-white text-3xl font-semibold tracking-[0.3em] uppercase">
          SAMVID
        </h1>
      </div>
    </div>
  );
}
