import { useState } from 'react';
import { Shield, Lock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import EyeLogo from './EyeLogo';

interface CreateAccountScreenProps {
  onAccountCreated: () => void;
}

export default function CreateAccountScreen({ onAccountCreated }: CreateAccountScreenProps) {
  const [fullName, setFullName] = useState('');
  const [bankName, setBankName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            full_name: fullName,
            bank_name: bankName,
          });

        if (profileError) throw profileError;

        onAccountCreated();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative overflow-hidden">
      <Shield className="absolute top-20 right-8 w-8 h-8 text-[#5A8FC7] opacity-20 animate-[fadeIn_1.2s_ease-in]" />
      <Lock className="absolute bottom-40 right-16 w-6 h-6 text-[#5A8FC7] opacity-15 animate-[bounce_2.5s_ease-in-out_0.5s]" />
      <Lock className="absolute top-1/3 left-8 w-7 h-7 text-[#5A8FC7] opacity-20 animate-[slideIn_1s_ease-out_0.3s]" />

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-10">
            <EyeLogo size={90} color="#4A7BA7" showAnimation={false} />
            <h1 className="text-2xl font-light text-[#4A7BA7] tracking-wide uppercase mb-2 mt-6">
              SAMVID
            </h1>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Create your SAMVID account
            </h2>

            <form onSubmit={handleCreateAccount} className="space-y-5">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-800 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="bankName" className="block text-sm font-semibold text-gray-800 mb-2">
                  Bank Name
                </label>
                <input
                  id="bankName"
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Enter your bank name"
                />
                <p className="mt-1 text-xs text-gray-600 font-medium">
                  Used only for demo and testing purposes
                </p>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
                  Mail ID
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
                  Create Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-800 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] focus:border-transparent transition-all bg-gray-50"
                  placeholder="Confirm your password"
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center font-medium">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#5A8FC7] hover:bg-[#4A7BA7] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg mt-6"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
