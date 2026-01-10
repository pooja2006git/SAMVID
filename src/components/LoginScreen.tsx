import { useState } from 'react';
import { Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import EyeLogo from './EyeLogo';

interface LoginScreenProps {
  onCreateAccount: () => void;
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onCreateAccount, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      onLoginSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      <Lock className="absolute top-12 right-12 w-8 h-8 text-[#5A8FC7] opacity-20 animate-[fadeIn_1s_ease-in]" />
      <Lock className="absolute bottom-32 left-10 w-6 h-6 text-[#5A8FC7] opacity-15 animate-[bounce_2s_ease-in-out_1s]" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-12">
            <EyeLogo size={90} color="#4A7BA7" showAnimation={false} />
            <h1 className="text-2xl font-light text-[#4A7BA7] tracking-wide uppercase mb-2 mt-6">
              SAMVID
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">
              Welcome back
            </h2>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Email ID
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5A8FC7] animate-[slideIn_0.8s_ease-out]" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center font-medium">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5A8FC7] hover:bg-[#4A7BA7] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-sm text-gray-700">
                New user?{' '}
                <button
                  onClick={onCreateAccount}
                  className="text-[#5A8FC7] hover:text-[#4A7BA7] font-semibold transition-colors"
                >
                  Create an account
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
