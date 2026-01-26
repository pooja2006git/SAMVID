import { useState } from 'react';
import { Lock } from 'lucide-react';
import EyeLogo from '../components/eyelogo';

interface LoginProps {
  onCreateAccount: () => void;
  onLogin: () => void;
}

export default function Login({ onCreateAccount, onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo only - directly navigate to biometric authentication
    onLogin();
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

        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Welcome back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Email ID"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Lock className="w-4 h-4 text-gray-400 animate-pulse" />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#2F6FA3] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-[#2760] transition-all duration-200 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          New user?{' '}
          <button
            onClick={onCreateAccount}
            className="text-[#2F6FA3] font-medium hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
