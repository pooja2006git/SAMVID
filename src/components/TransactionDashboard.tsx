import { useState, useMemo } from 'react';
import { Search, Filter, Clock, ChevronDown, TrendingUp, BarChart3 } from 'lucide-react';
import { mockTransactions, categories, TransactionCategory, TransactionType } from '../lib/mockTransactions';
import UserProfileHeader from './UserProfileHeader';

type TimeFilter = 'all' | 'day' | 'week' | 'month';

interface TransactionDashboardProps {
  onLogout: () => void;
}

export default function TransactionDashboard({ onLogout }: TransactionDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<TransactionCategory | 'All'>('All');
  const [selectedType, setSelectedType] = useState<TransactionType | 'All'>('All');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showVisualize, setShowVisualize] = useState(false);

  const totalBalance = useMemo(() => {
    return mockTransactions
      .filter(t => t.status === 'Completed')
      .reduce((sum, t) => sum + (t.isIncoming ? t.amount : -t.amount), 0);
  }, []);

  // Financial metrics for visualization
  const financialMetrics = useMemo(() => {
    const completed = mockTransactions.filter(t => t.status === 'Completed');
    const totalInflow = completed
      .filter(t => t.isIncoming)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalOutflow = completed
      .filter(t => !t.isIncoming)
      .reduce((sum, t) => sum + t.amount, 0);
    const netBalance = totalInflow - totalOutflow;
    
    return { totalInflow, totalOutflow, netBalance };
  }, []);

  // Category-wise distribution
  const categoryDistribution = useMemo(() => {
    const completed = mockTransactions.filter(t => t.status === 'Completed' && !t.isIncoming);
    const categoryMap = new Map<string, number>();
    
    completed.forEach(t => {
      const current = categoryMap.get(t.category) || 0;
      categoryMap.set(t.category, current + t.amount);
    });
    
    const totalOutflow = financialMetrics.totalOutflow;
    return Array.from(categoryMap.entries())
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: totalOutflow > 0 ? (amount / totalOutflow) * 100 : 0
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [financialMetrics.totalOutflow]);

  // Transaction status overview
  const statusOverview = useMemo(() => {
    const statusMap = new Map<string, number>();
    mockTransactions.forEach(t => {
      const current = statusMap.get(t.status) || 0;
      statusMap.set(t.status, current + 1);
    });
    
    const total = mockTransactions.length;
    return Array.from(statusMap.entries()).map(([status, count]) => ({
      status,
      count,
      percentage: (count / total) * 100
    }));
  }, []);

  const filteredTransactions = useMemo(() => {
    let filtered = mockTransactions;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(t => t.title.toLowerCase().includes(query));
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(t => t.category === selectedCategory);
    }

    if (selectedType !== 'All') {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    if (timeFilter !== 'all') {
      const now = new Date();
      const filterDate = new Date();

      if (timeFilter === 'day') {
        filterDate.setDate(now.getDate() - 1);
      } else if (timeFilter === 'week') {
        filterDate.setDate(now.getDate() - 7);
      } else if (timeFilter === 'month') {
        filterDate.setMonth(now.getMonth() - 1);
      }

      filtered = filtered.filter(t => new Date(t.date) >= filterDate);
    }

    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [searchQuery, selectedCategory, selectedType, timeFilter]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <UserProfileHeader onLogout={onLogout} />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-6">
          <h1 className="text-4xl font-bold text-gray-900">Hello, Pooja</h1>
          <div className="flex-1 flex justify-center">
            <div className="bg-white rounded-xl shadow-md border border-gray-200 px-6 py-4 min-w-[200px]">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Total Balance</p>
              <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalBalance < 0 ? '-' : ''}₹{Math.abs(totalBalance).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-[280px]" />
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition text-sm font-medium"
              >
                <span className="truncate">{selectedCategory}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showCategoryDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setShowCategoryDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm font-medium"
                  >
                    All
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Transaction Type Filter */}
            <div className="relative">
              <button
                onClick={() => setShowTypeDropdown(!showTypeDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition text-sm font-medium"
              >
                <span className="truncate">{selectedType}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              {showTypeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {['All', 'UPI', 'ATM', 'CARD'].map(type => (
                    <button
                      key={type}
                      onClick={() => {
                        setSelectedType(type as TransactionType | 'All');
                        setShowTypeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Time Filter */}
            <div className="relative">
              <button
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg flex items-center justify-between hover:bg-gray-50 transition text-sm font-medium"
              >
                <Clock className="w-4 h-4" />
                <ChevronDown className="w-4 h-4" />
              </button>
              {showTimeDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {['all', 'day', 'week', 'month'].map(time => (
                    <button
                      key={time}
                      onClick={() => {
                        setTimeFilter(time as TimeFilter);
                        setShowTimeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 text-sm capitalize"
                    >
                      {time === 'all' ? 'All Time' : time.charAt(0).toUpperCase() + time.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Active Filters Display */}
          {(selectedCategory !== 'All' || selectedType !== 'All' || timeFilter !== 'all') && (
            <div className="flex flex-wrap gap-2 text-sm">
              {selectedCategory !== 'All' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedType !== 'All' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                  {selectedType}
                  <button
                    onClick={() => setSelectedType('All')}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
              {timeFilter !== 'all' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full flex items-center gap-2">
                  {timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}
                  <button
                    onClick={() => setTimeFilter('all')}
                    className="text-blue-700 hover:text-blue-900"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Transactions</h2>
            <div className="flex gap-3">
              <button
                onClick={() => setShowVisualize(false)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                  !showVisualize 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Income
                </div>
              </button>
              <button
                onClick={() => setShowVisualize(!showVisualize)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                  showVisualize 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4" />
                  Visualize
                </div>
              </button>
            </div>
          </div>

          {showVisualize ? (
            <div className="space-y-4">
              {/* Section 1: High-Level Financial Snapshot */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Snapshot</h3>
                <div className="grid grid-cols-3 gap-4">
                  {/* Total Inflow */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-600 mb-1">Total Inflow</p>
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      ₹{financialMetrics.totalInflow.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {financialMetrics.totalInflow + financialMetrics.totalOutflow > 0 
                          ? Math.round((financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>

                  {/* Total Outflow */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-600 mb-1">Total Outflow</p>
                    <p className="text-2xl font-bold text-red-600 mb-2">
                      ₹{financialMetrics.totalOutflow.toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {financialMetrics.totalInflow + financialMetrics.totalOutflow > 0 
                          ? Math.round((financialMetrics.totalOutflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>

                  {/* Net Balance */}
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <p className="text-xs font-medium text-gray-600 mb-1">Net Balance</p>
                    <p className={`text-2xl font-bold mb-2 ${
                      financialMetrics.netBalance >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {financialMetrics.netBalance >= 0 ? '+' : ''}₹{Math.abs(financialMetrics.netBalance).toLocaleString()}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            financialMetrics.netBalance >= 0 ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: '100%' }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">
                        {financialMetrics.totalInflow > 0 
                          ? Math.round((financialMetrics.netBalance / financialMetrics.totalInflow) * 100)
                          : 0}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Circular Ring Visualization */}
                <div className="mt-4 flex justify-center">
                  <div className="relative w-40 h-40">
                    <svg className="transform -rotate-90 w-40 h-40">
                      <circle
                        cx="80"
                        cy="80"
                        r="65"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="16"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="65"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="16"
                        strokeDasharray={`${(financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 408.4} 408.4`}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        r="65"
                        fill="none"
                        stroke="#ef4444"
                        strokeWidth="16"
                        strokeDasharray={`${(financialMetrics.totalOutflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 408.4} 408.4`}
                        strokeDashoffset={`-${(financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 408.4}`}
                        className="transition-all duration-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-xs text-gray-500">Net</p>
                        <p className={`text-xl font-bold ${
                          financialMetrics.netBalance >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ₹{Math.abs(financialMetrics.netBalance).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Inflow vs Outflow Comparison */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction Flow Summary</h3>
                <div className="grid grid-cols-2 gap-6">
                  {/* Donut Chart */}
                  <div className="flex justify-center">
                    <div className="relative w-48 h-48">
                      <svg className="transform -rotate-90 w-48 h-48">
                        <circle
                          cx="96"
                          cy="96"
                          r="75"
                          fill="none"
                          stroke="#e5e7eb"
                          strokeWidth="24"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="75"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="24"
                          strokeDasharray={`${(financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 471.24} 471.24`}
                          className="transition-all duration-500"
                        />
                        <circle
                          cx="96"
                          cy="96"
                          r="75"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="24"
                          strokeDasharray={`${(financialMetrics.totalOutflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 471.24} 471.24`}
                          strokeDashoffset={`-${(financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 471.24}`}
                          className="transition-all duration-500"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <p className="text-xs text-gray-500 mb-1">Total</p>
                          <p className="text-xl font-bold text-gray-900">
                            ₹{(financialMetrics.totalInflow + financialMetrics.totalOutflow).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bar Chart */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Inflow</span>
                        <span className="text-sm font-bold text-green-600">
                          ₹{financialMetrics.totalInflow.toLocaleString()} ({Math.round((financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${(financialMetrics.totalInflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Outflow</span>
                        <span className="text-sm font-bold text-red-600">
                          ₹{financialMetrics.totalOutflow.toLocaleString()} ({Math.round((financialMetrics.totalOutflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100)}%)
                        </span>
                      </div>
                      <div className="w-full h-8 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${(financialMetrics.totalOutflow / (financialMetrics.totalInflow + financialMetrics.totalOutflow)) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Category-wise Transaction Distribution */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Category-wise Transaction Distribution</h3>
                <div className="grid grid-cols-4 gap-3">
                  {categoryDistribution.map((item) => (
                    <div key={item.category} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-gray-900">{item.category}</span>
                        <span className="text-xs font-bold text-gray-700">
                          ₹{item.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{item.percentage.toFixed(1)}%</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 italic mt-3 text-center">
                  Category view is shown only for transaction verification and organization.
                </p>
              </div>

              {/* Section 4: Transaction Status Overview */}
              <div className="bg-white rounded-xl p-4 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Transaction Status Overview</h3>
                <div className="space-y-3">
                  {statusOverview.map((item) => (
                    <div key={item.status}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-medium text-gray-700 capitalize">{item.status}</span>
                        <span className="text-xs font-bold text-gray-900">
                          {item.count} ({item.percentage.toFixed(1)}%)
                        </span>
                      </div>
                      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            item.status === 'Completed' ? 'bg-green-500' :
                            item.status === 'Failed' ? 'bg-red-500' :
                            'bg-yellow-500'
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (

            filteredTransactions.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredTransactions.map(transaction => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-lg font-bold text-blue-600">
                          {transaction.title.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">{transaction.title}</p>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-600">
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {transaction.category}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {transaction.type}
                          </span>
                          <span>
                            {transaction.date.toLocaleDateString()} {transaction.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-lg font-bold ${transaction.isIncoming ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.isIncoming ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                    </p>
                    <p className={`text-xs font-medium mt-1 ${
                      transaction.status === 'Failed' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
