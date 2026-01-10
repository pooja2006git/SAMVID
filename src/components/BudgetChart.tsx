interface BudgetChartProps {
  spent: number;
  total: number;
}

export default function BudgetChart({ spent, total }: BudgetChartProps) {
  const percentage = (spent / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#E5E7EB"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-gray-900">{Math.round(percentage)}%</span>
          <span className="text-xs text-gray-600">Used</span>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className="text-lg font-bold text-gray-900">Plan Your Budget</p>
        <p className="text-sm text-gray-600 mt-1">Understand your monthly spending</p>
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Spent</span>
            <span className="font-semibold text-gray-900">₹{spent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Budget</span>
            <span className="font-semibold text-gray-900">₹{total.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Remaining</span>
            <span className="font-semibold text-green-600">₹{(total - spent).toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
