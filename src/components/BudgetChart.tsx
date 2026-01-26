interface BudgetChartProps {
  spent: number;
  total: number;
}

export default function BudgetChart({ spent, total }: BudgetChartProps) {
  const percentage = Math.min((spent / total) * 100, 100);
  const remaining = Math.max(total - spent, 0);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Budget Planner</h2>
      
      <div className="space-y-6">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Monthly Budget</span>
            <span className="text-sm font-semibold text-gray-900">
              ₹{spent.toLocaleString()} / ₹{total.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentage >= 90
                  ? 'bg-red-500'
                  : percentage >= 70
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500">
              {percentage.toFixed(1)}% used
            </span>
            <span className="text-xs text-gray-500">
              ₹{remaining.toLocaleString()} remaining
            </span>
          </div>
        </div>

        {/* Budget Summary */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-blue-600">₹{total.toLocaleString()}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Total Spent</p>
            <p className="text-2xl font-bold text-red-600">₹{spent.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

