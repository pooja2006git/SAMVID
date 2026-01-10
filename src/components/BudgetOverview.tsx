export default function BudgetOverview() {
  const spent = 2800;
  const budget = 5000;
  const percentage = (spent / budget) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Your Budget for This Month</h3>
      <p className="text-gray-600 mb-8">Track and understand your spending</p>

      <div className="flex items-center gap-12">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#5A8FC7"
              strokeWidth="8"
              strokeDasharray={`${(percentage / 100) * 314} 314`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-gray-900">{percentage.toFixed(0)}%</span>
            <span className="text-xs text-gray-500">Spent</span>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Total Budget</span>
              <span className="text-sm font-bold text-gray-900">₹{budget.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#4A7BA7]" />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Amount Spent</span>
              <span className="text-sm font-bold text-gray-900">₹{spent.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#5A8FC7]"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Remaining</span>
              <span className="text-sm font-bold text-green-600">₹{(budget - spent).toLocaleString()}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-green-500"
                style={{ width: `${100 - percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
