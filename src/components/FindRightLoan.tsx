import { useState } from 'react';
import { User, CheckCircle2, GraduationCap, Home, Car, Briefcase, DollarSign, Info } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';

interface LoanRecommendation {
  loanType: string;
  banks: string[];
  interestRateRange: string;
  estimatedAmount: string;
  explanation: string;
}

export default function FindRightLoan() {
  const [employmentType, setEmploymentType] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [cibilScore, setCibilScore] = useState('');
  const [loanPurpose, setLoanPurpose] = useState('');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Demo user data - no auth needed
  const user = { fullName: 'Demo User', email: 'demo@example.com' };

  const recommendations: LoanRecommendation[] = [
    {
      loanType: 'Education Loan',
      banks: ['SBI', 'HDFC', 'Axis'],
      interestRateRange: '8.5% – 11.5%',
      estimatedAmount: '₹5,00,000 – ₹20,00,000',
      explanation: 'Based on your income and credit profile, this loan suits your needs.'
    },
    {
      loanType: 'Personal Loan',
      banks: ['HDFC', 'ICICI', 'Axis'],
      interestRateRange: '10.5% – 15.5%',
      estimatedAmount: '₹1,00,000 – ₹10,00,000',
      explanation: 'Based on your income and credit profile, this loan suits your needs.'
    },
    {
      loanType: 'Home Loan',
      banks: ['SBI', 'HDFC', 'LIC Housing'],
      interestRateRange: '8.0% – 9.5%',
      estimatedAmount: '₹20,00,000 – ₹1,00,00,000',
      explanation: 'Based on your income and credit profile, this loan suits your needs.'
    }
  ];

  const loanCategories = [
    { id: 'education', label: 'Education Loans', icon: GraduationCap },
    { id: 'personal', label: 'Personal Loans', icon: DollarSign },
    { id: 'home', label: 'Home Loans', icon: Home },
    { id: 'vehicle', label: 'Vehicle Loans', icon: Car },
    { id: 'business', label: 'Business Loans', icon: Briefcase }
  ];

  const handleCheckEligibility = () => {
    if (employmentType && monthlyIncome && cibilScore && loanPurpose) {
      setShowRecommendations(true);
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    const info: Record<string, { title: string; description: string; features: string[] }> = {
      education: {
        title: 'Education Loans',
        description: 'Finance your higher education dreams with flexible repayment options.',
        features: ['Up to ₹50 lakhs', 'Low interest rates', 'Moratorium period available']
      },
      personal: {
        title: 'Personal Loans',
        description: 'Quick access to funds for your personal needs without collateral.',
        features: ['Fast approval', 'No collateral required', 'Flexible tenure']
      },
      home: {
        title: 'Home Loans',
        description: 'Make your dream home a reality with competitive interest rates.',
        features: ['Long repayment tenure', 'Tax benefits', 'Low interest rates']
      },
      vehicle: {
        title: 'Vehicle Loans',
        description: 'Drive away with your favorite vehicle with easy financing options.',
        features: ['Quick processing', 'Competitive rates', 'Flexible down payment']
      },
      business: {
        title: 'Business Loans',
        description: 'Fuel your business growth with tailored financing solutions.',
        features: ['Customized solutions', 'Quick disbursement', 'Flexible repayment']
      }
    };
    return info[categoryId] || null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Find the Right Loan</h1>
            <p className="text-gray-600 text-lg">Check loan eligibility and suitable options based on your profile</p>
          </div>
          <div className="flex items-center gap-4">
            <ProfileDropdown
              userName={user?.fullName || 'User'}
              userEmail={user?.email || ''}
            />
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Section 1: User Financial Profile */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Financial Profile</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Employment Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Type</label>
              <select
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
              >
                <option value="">Select Employment Type</option>
                <option value="student">Student</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self-employed</option>
              </select>
            </div>

            {/* Monthly Income */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Income</label>
              <select
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
              >
                <option value="">Select Income Range</option>
                <option value="0-25000">₹0 - ₹25,000</option>
                <option value="25000-50000">₹25,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="100000-200000">₹1,00,000 - ₹2,00,000</option>
                <option value="200000+">₹2,00,000+</option>
              </select>
            </div>

            {/* CIBIL Score */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">CIBIL Score</label>
              <select
                value={cibilScore}
                onChange={(e) => setCibilScore(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
              >
                <option value="">Select CIBIL Score</option>
                <option value="dont-know">Don't know</option>
                <option value="below-650">Below 650</option>
                <option value="650-750">650 – 750</option>
                <option value="750+">750+</option>
              </select>
            </div>

            {/* Loan Purpose */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Loan Purpose</label>
              <select
                value={loanPurpose}
                onChange={(e) => setLoanPurpose(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
              >
                <option value="">Select Loan Purpose</option>
                <option value="education">Education</option>
                <option value="personal">Personal</option>
                <option value="business">Business</option>
                <option value="home">Home</option>
                <option value="vehicle">Vehicle</option>
              </select>
            </div>
          </div>

          <button
            onClick={handleCheckEligibility}
            className="w-full md:w-auto px-8 py-3 bg-[#5A8FC7] text-white rounded-lg font-semibold hover:bg-[#4A7BA7] transition-all shadow-md hover:shadow-lg"
          >
            Check Eligibility
          </button>

          <p className="text-xs text-gray-500 mt-4">
            This is a guidance tool. No data is shared with banks.
          </p>
        </div>

        {/* Section 2: Recommended Loan Types */}
        {showRecommendations && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recommended for You</h2>
            
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                      <h3 className="text-xl font-bold text-gray-900">{rec.loanType}</h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Suitable Banks</p>
                      <p className="font-semibold text-gray-900">{rec.banks.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Interest Rate Range</p>
                      <p className="font-semibold text-gray-900">{rec.interestRateRange}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Estimated Loan Amount</p>
                      <p className="font-semibold text-gray-900">{rec.estimatedAmount}</p>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{rec.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Section 3: Loan Categories */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Loan Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {loanCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                  className={`p-6 rounded-lg border-2 transition-all text-center ${
                    selectedCategory === category.id
                      ? 'border-[#5A8FC7] bg-blue-50'
                      : 'border-gray-200 hover:border-[#5A8FC7] hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-8 h-8 mx-auto mb-3 ${
                    selectedCategory === category.id ? 'text-[#5A8FC7]' : 'text-gray-600'
                  }`} />
                  <p className={`font-semibold text-sm ${
                    selectedCategory === category.id ? 'text-[#5A8FC7]' : 'text-gray-900'
                  }`}>
                    {category.label}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Category Info Card */}
          {selectedCategory && getCategoryInfo(selectedCategory) && (
            <div className="mt-6 p-6 bg-blue-50 border border-[#5A8FC7] rounded-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {getCategoryInfo(selectedCategory)?.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {getCategoryInfo(selectedCategory)?.description}
              </p>
              <ul className="space-y-2">
                {getCategoryInfo(selectedCategory)?.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Section 4: Awareness & Tips */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-6">
            <Info className="w-6 h-6 text-[#5A8FC7]" />
            <h2 className="text-2xl font-bold text-gray-900">Before You Apply</h2>
          </div>
          
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5A8FC7] font-bold text-sm">1</span>
              </div>
              <p className="text-gray-700">Avoid multiple loan applications</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5A8FC7] font-bold text-sm">2</span>
              </div>
              <p className="text-gray-700">Check eligibility before applying</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5A8FC7] font-bold text-sm">3</span>
              </div>
              <p className="text-gray-700">Maintain a healthy credit score</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-[#5A8FC7] font-bold text-sm">4</span>
              </div>
              <p className="text-gray-700">Choose loans based on repayment ability</p>
            </li>
          </ul>
        </div>

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong className="text-gray-900">SAMVID does not process or apply loans.</strong> This feature is for financial awareness only.
          </p>
        </div>
      </div>
    </div>
  );
}


