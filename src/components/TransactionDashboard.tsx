import { useState, useMemo } from 'react';
import { Search, Filter, Clock, ChevronDown } from 'lucide-react';
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Hello, Pooja</h1>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Transactions</h2>

          {filteredTransactions.length === 0 ? (
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
          )}
        </div>
      </div>
    </div>
  );
}
