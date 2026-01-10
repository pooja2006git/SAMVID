import { useState } from 'react';
import { MapPin, Clock, Phone, Navigation, Building } from 'lucide-react';
import { demoAuth } from '../lib/demoAuth';
import ProfileDropdown from './ProfileDropdown';

interface ReachYourBankBranchProps {
  onLogout: () => void;
}

interface BranchInfo {
  id: string;
  bankName: string;
  branchName: string;
  area: string;
  hours: string;
  contact: string;
}

const chennaiBranches: BranchInfo[] = [
  {
    id: 'sbi-anna-nagar',
    bankName: 'SBI',
    branchName: 'SBI Anna Nagar Branch',
    area: 'Anna Nagar',
    hours: '10:00 AM – 4:00 PM',
    contact: '044-1234 5678',
  },
  {
    id: 'hdfc-tnagar',
    bankName: 'HDFC',
    branchName: 'HDFC T Nagar Branch',
    area: 'T Nagar',
    hours: '9:30 AM – 4:30 PM',
    contact: '044-2345 6789',
  },
  {
    id: 'icici-velachery',
    bankName: 'ICICI',
    branchName: 'ICICI Velachery Branch',
    area: 'Velachery',
    hours: '9:30 AM – 4:00 PM',
    contact: '044-3456 7890',
  },
  {
    id: 'axis-tambaram',
    bankName: 'Axis',
    branchName: 'Axis Tambaram Branch',
    area: 'Tambaram',
    hours: '10:00 AM – 4:00 PM',
    contact: '044-4567 8901',
  },
  {
    id: 'canara-annanagar',
    bankName: 'Canara',
    branchName: 'Canara Bank Anna Nagar Branch',
    area: 'Anna Nagar',
    hours: '10:00 AM – 3:30 PM',
    contact: '044-5678 9012',
  },
];

export default function ReachYourBankBranch({ onLogout }: ReachYourBankBranchProps) {
  const user = demoAuth.getCurrentUser();

  const [selectedCity, setSelectedCity] = useState<'Chennai' | ''>('Chennai');
  const [selectedArea, setSelectedArea] = useState('');

  const areas = ['Anna Nagar', 'T Nagar', 'Velachery', 'Tambaram'];

  const filteredBranches =
    selectedCity === 'Chennai' && selectedArea
      ? chennaiBranches.filter((branch) => branch.area === selectedArea)
      : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Reach Your Bank Branch</h1>
            <p className="text-gray-600 text-lg">
              Find nearby bank branches and visit details easily
            </p>
          </div>
          <div className="flex items-center gap-4">
            <ProfileDropdown
              userName={user?.fullName || 'User'}
              userEmail={user?.email || ''}
              onLogout={onLogout}
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Step 1: Select City */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[#5A8FC7] font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Select City</h2>
          </div>

          <p className="text-gray-600 mb-4">
            Start by choosing the city where you want to visit a bank branch.
          </p>

          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => {
                const value = e.target.value as 'Chennai' | '';
                setSelectedCity(value);
                setSelectedArea('');
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
            >
              <option value="Chennai">Chennai</option>
              <option value="" disabled>
                Bangalore (coming soon)
              </option>
              <option value="" disabled>
                Hyderabad (coming soon)
              </option>
            </select>
          </div>
        </div>

        {/* Step 2: Select Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[#5A8FC7] font-bold text-sm">2</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Select Area</h2>
          </div>

          <p className="text-gray-600 mb-4">
            Choose your nearby area in Chennai to see available branches.
          </p>

          <div className="max-w-md">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Area
            </label>
            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              disabled={!selectedCity}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white disabled:bg-gray-100 disabled:text-gray-400"
            >
              <option value="">Select Area</option>
              {areas.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 3: Branch Results */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[#5A8FC7] font-bold text-sm">3</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Branch Results</h2>
          </div>

          {!selectedArea && (
            <p className="text-gray-600">
              Select an area to view nearby bank branches in Chennai.
            </p>
          )}

          {selectedArea && filteredBranches.length === 0 && (
            <p className="text-gray-600">
              No branches found for this area in demo data. Please try another area.
            </p>
          )}

          {filteredBranches.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {filteredBranches.map((branch) => (
                <div
                  key={branch.id}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                        <Building className="w-5 h-5 text-[#5A8FC7]" />
                      </div>
                      <div>
                        <p className="text-xs uppercase tracking-wide text-gray-500">
                          {branch.bankName}
                        </p>
                        <h3 className="text-lg font-bold text-gray-900">
                          {branch.branchName}
                        </h3>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#5A8FC7]" />
                      <span>{branch.area}, Chennai</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#5A8FC7]" />
                      <span>Working hours: {branch.hours}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#5A8FC7]" />
                      <span>Contact: {branch.contact}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#5A8FC7] text-white rounded-lg font-semibold hover:bg-[#4A7BA7] transition-all shadow-sm hover:shadow-md"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>View Directions</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            Branch details are indicative and sourced from publicly available information.
          </p>
        </div>
      </div>
    </div>
  );
}


