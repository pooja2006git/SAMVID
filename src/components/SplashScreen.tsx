import { useEffect } from 'react';
import EyeLogo from './EyeLogo';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-[#4A7BA7] flex flex-col items-center justify-center">
      <div className="relative mb-8">
        <EyeLogo size={140} color="white" showAnimation={true} />
      </div>

      <h1 className="text-white text-5xl font-light tracking-[0.3em] uppercase">
        SAMVID
      </h1>
    </div>
  );
}
