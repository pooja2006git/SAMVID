import { useState } from 'react';
import EyeLogo from '../components/eyelogo';

interface CreateAccountProps {
  onAccountCreated: () => void;
  onCreateAccount: (fullName: string, mobileNumber: string, email: string, password: string) => Promise<void>;
}

export default function CreateAccount({ onAccountCreated, onCreateAccount }: CreateAccountProps) {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
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

    if (mobileNumber.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }

    // Demo only - no actual account creation
    try {
      await onCreateAccount(fullName, mobileNumber, email, password);
      onAccountCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Account creation failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F7FA] to-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-10">
          <EyeLogo size={80} color="#2F6FA3" showAnimation={false} />
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Create your SAMVID account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="tel"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
          </div>

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

          <div>
            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#2F6FA3] focus:ring-2 focus:ring-[#2F6FA3]/20 outline-none transition-all duration-200"
            />
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2F6FA3] text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-[#2760] transition-all duration-200 active:scale-[0.98]"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
