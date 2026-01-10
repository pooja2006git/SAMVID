import { useMemo, useState } from 'react';
import { CheckCircle2, ShieldAlert, CreditCard, AlertTriangle, FileText, Clock, User, BadgeCheck } from 'lucide-react';
import { demoAuth } from '../lib/demoAuth';
import ProfileDropdown from './ProfileDropdown';

type DisputeType =
  | 'unauthorized'
  | 'atm_cash_not_received'
  | 'duplicate_charge'
  | 'failed_but_debited'
  | 'lost_or_stolen';

interface CardDisputeAssistantProps {
  onLogout: () => void;
}

interface FormState {
  transactionDate: string;
  amount: string;
  bankName: string;
  cardType: 'Credit' | 'Debit' | '';
  description: string;
}

const disputeTypeLabels: Record<DisputeType, string> = {
  unauthorized: 'Unauthorized Transaction',
  atm_cash_not_received: 'ATM Cash Not Received',
  duplicate_charge: 'Duplicate / Incorrect Charge',
  failed_but_debited: 'Transaction Failed but Amount Debited',
  lost_or_stolen: 'Card Lost or Stolen',
};

const bankOptions = ['SBI', 'HDFC', 'ICICI', 'Axis', 'Canara', 'Other'];

export default function CardDisputeAssistant({ onLogout }: CardDisputeAssistantProps) {
  const user = demoAuth.getCurrentUser();
  const [step, setStep] = useState<'type' | 'details' | 'guidance'>('type');
  const [selectedType, setSelectedType] = useState<DisputeType | null>(null);
  const [form, setForm] = useState<FormState>({
    transactionDate: '',
    amount: '',
    bankName: '',
    cardType: '',
    description: '',
  });

  const guidance = useMemo(() => {
    if (!selectedType) return null;

    const baseChecklist = [
      'Note down transaction reference and time',
      'Keep your bank SMS/notification handy',
      'Do not share OTP or PIN with anyone',
    ];

    const data: Record<DisputeType, {
      immediate: string[];
      documents: string[];
      resolution: string;
      checklist?: string[];
    }> = {
      unauthorized: {
        immediate: ['Block card immediately from your banking app or call center', 'Change PIN and online banking password', 'Review recent transactions for other anomalies'],
        documents: ['Card statement highlighting disputed transaction', 'ID proof (PAN/Aadhaar)', 'Dispute/chargeback form (bank provided)'],
        resolution: 'Typical resolution time: 7–21 working days after filing.',
        checklist: [...baseChecklist, 'Raise chargeback within bank timelines (usually 30–60 days)'],
      },
      atm_cash_not_received: {
        immediate: ['Note ATM location, time, and reference number', 'Do not discard ATM slip (if available)', 'Wait for a few minutes to ensure auto-reversal does not occur'],
        documents: ['ATM slip or screenshot', 'Account/mini-statement showing debit', 'ID proof (PAN/Aadhaar)'],
        resolution: 'Typical resolution time: 5–10 working days after filing.',
        checklist: [...baseChecklist, 'Avoid repeated withdrawals on the same card until resolved'],
      },
      duplicate_charge: {
        immediate: ['Capture screenshots of duplicate charges', 'Check if one of the charges is pending/temporary', 'Avoid retrying the same transaction immediately'],
        documents: ['Card statement with duplicate entries highlighted', 'Merchant invoice/receipt (if available)', 'Email confirmation or SMS from merchant'],
        resolution: 'Typical resolution time: 7–14 working days after filing.',
        checklist: [...baseChecklist, 'Contact merchant to confirm if a reversal is initiated'],
      },
      failed_but_debited: {
        immediate: ['Capture failure screen or error message', 'Check if auto-reversal happens within 24–48 hours', 'Avoid multiple retries with the same card'],
        documents: ['Failure screenshot or reference', 'Card statement showing debit', 'Merchant confirmation (if any)'],
        resolution: 'Typical resolution time: 5–10 working days after filing.',
        checklist: [...baseChecklist, 'Track reversal updates in your statement over 2–3 days'],
      },
      lost_or_stolen: {
        immediate: ['Block card immediately via app/IVR', 'Disable international and contactless usage temporarily', 'File a police report if required by the bank'],
        documents: ['ID proof (PAN/Aadhaar)', 'Police FIR copy (if required)', 'Written request to re-issue card'],
        resolution: 'Card block is immediate; replacement card issuance usually 3–7 working days.',
        checklist: [...baseChecklist, 'Update auto-debit/EMI mandates with the new card once issued'],
      },
    };

    return data[selectedType];
  }, [selectedType]);

  const statusSteps = ['Reported', 'Under Review', 'Resolved'];

  const handleContinue = () => {
    if (selectedType) {
      setStep('details');
    }
  };

  const handleSubmit = () => {
    setStep('guidance');
  };

  const setField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const disputeTypeCards: Array<{ id: DisputeType; description: string }> = [
    { id: 'unauthorized', description: 'Card charged without your consent.' },
    { id: 'atm_cash_not_received', description: 'Cash not dispensed but account debited.' },
    { id: 'duplicate_charge', description: 'Same transaction charged multiple times.' },
    { id: 'failed_but_debited', description: 'Payment failed but amount was debited.' },
    { id: 'lost_or_stolen', description: 'Card misplaced or stolen; need to secure account.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Top Section */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="max-w-6xl mx-auto flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Card Dispute Assistant</h1>
            <p className="text-gray-600 text-lg">Guided help for credit and debit card issues</p>
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

      <div className="max-w-6xl mx-auto px-8 py-8 space-y-8">
        {/* Step 1: Select Dispute Type */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-[#5A8FC7] font-bold text-sm">1</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Select Dispute Type</h2>
          </div>
          <p className="text-gray-600 mb-6">Choose the issue you are facing with your card.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {disputeTypeCards.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedType(item.id)}
                className={`text-left p-4 rounded-lg border-2 transition-all ${
                  selectedType === item.id
                    ? 'border-[#5A8FC7] bg-blue-50 shadow-sm'
                    : 'border-gray-200 hover:border-[#5A8FC7] hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <ShieldAlert className="w-5 h-5 text-[#5A8FC7]" />
                  <p className="font-semibold text-gray-900">{disputeTypeLabels[item.id]}</p>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedType}
            className="mt-6 px-6 py-3 bg-[#5A8FC7] text-white rounded-lg font-semibold hover:bg-[#4A7BA7] transition-all disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>

        {/* Step 2: Dispute Details Form */}
        {step !== 'type' && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-[#5A8FC7] font-bold text-sm">2</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Dispute Details</h2>
            </div>
            <p className="text-gray-600 mb-6">Provide key details to tailor the guidance.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Transaction Date</label>
                <input
                  type="date"
                  value={form.transactionDate}
                  onChange={(e) => setField('transactionDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={form.amount}
                  onChange={(e) => setField('amount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name (optional)</label>
                <select
                  value={form.bankName}
                  onChange={(e) => setField('bankName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900 bg-white"
                >
                  <option value="">Select bank</option>
                  {bankOptions.map((bank) => (
                    <option key={bank} value={bank}>
                      {bank}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Card Type</label>
                <div className="flex gap-3">
                  {['Credit', 'Debit'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setField('cardType', type as 'Credit' | 'Debit')}
                      className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                        form.cardType === type
                          ? 'border-[#5A8FC7] bg-blue-50'
                          : 'border-gray-200 hover:border-[#5A8FC7] hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2 font-semibold text-gray-900">
                        <CreditCard className="w-4 h-4 text-[#5A8FC7]" />
                        {type}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short description (optional)</label>
                <textarea
                  rows={3}
                  placeholder="Describe the issue briefly"
                  value={form.description}
                  onChange={(e) => setField('description', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5A8FC7] text-gray-900"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              className="mt-6 px-6 py-3 bg-[#5A8FC7] text-white rounded-lg font-semibold hover:bg-[#4A7BA7] transition-all"
            >
              Submit Dispute Details
            </button>
            <p className="text-xs text-gray-500 mt-3">Information is used only for guidance.</p>
          </div>
        )}

        {/* Step 3: Guidance & Checklist */}
        {step === 'guidance' && guidance && (
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-[#5A8FC7] font-bold text-sm">3</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Guidance & Checklist</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-blue-50 border border-[#5A8FC7]/40">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-[#5A8FC7]" />
                  <p className="font-semibold text-gray-900">What to do immediately</p>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  {guidance.immediate.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-[#5A8FC7]/40">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-[#5A8FC7]" />
                  <p className="font-semibold text-gray-900">Required documents</p>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  {guidance.documents.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-lg bg-blue-50 border border-[#5A8FC7]/40">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-[#5A8FC7]" />
                  <p className="font-semibold text-gray-900">Expected resolution time</p>
                </div>
                <p className="text-sm text-gray-700">{guidance.resolution}</p>
              </div>
            </div>

            {guidance.checklist && (
              <div className="p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                  <p className="font-semibold text-gray-900">Checklist</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
                  {guidance.checklist.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Tracker */}
            <div className="p-4 rounded-lg border border-gray-200">
              <p className="font-semibold text-gray-900 mb-3">Status Tracker</p>
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                {statusSteps.map((status, idx) => (
                  <div key={status} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-50 border border-[#5A8FC7] flex items-center justify-center text-[#5A8FC7] font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-900">{status}</p>
                      <p className="text-xs text-gray-600">
                        {idx === 0 && 'You reported the issue.'}
                        {idx === 1 && 'Bank reviews your dispute.'}
                        {idx === 2 && 'Resolution/closure shared.'}
                      </p>
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div className="hidden md:block w-16 h-px bg-gray-200 mx-2" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="bg-gray-100 rounded-lg p-6 border border-gray-200">
          <p className="text-sm text-gray-600 text-center">
            <strong className="text-gray-900">SAMVID does not submit disputes to banks.</strong> This feature is for guidance only.
          </p>
        </div>
      </div>
    </div>
  );
}

