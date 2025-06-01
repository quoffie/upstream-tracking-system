'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  CreditCardIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  BuildingLibraryIcon
} from '@heroicons/react/24/outline';

interface Transaction {
  id: string;
  reference: string;
  company: string;
  amount: number;
  currency: string;
  paymentMethod: 'bank_transfer' | 'mobile_money' | 'credit_card' | 'cash';
  status: 'completed' | 'pending' | 'failed' | 'refunded';
  type: 'permit_fee' | 'registration' | 'penalty' | 'renewal';
  date: string;
  description: string;
  processedBy: string;
}

export default function TransactionHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [methodFilter, setMethodFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock data
  const transactions: Transaction[] = [
    {
      id: 'TXN-2024-001',
      reference: 'REF-001-2024',
      company: 'Ghana Oil Company Ltd',
      amount: 25000,
      currency: 'GHS',
      paymentMethod: 'bank_transfer',
      status: 'completed',
      type: 'permit_fee',
      date: '2024-01-15T10:30:00Z',
      description: 'Exploration Permit Fee - Block A',
      processedBy: 'John Doe'
    },
    {
      id: 'TXN-2024-002',
      reference: 'REF-002-2024',
      company: 'Tullow Ghana Limited',
      amount: 15000,
      currency: 'GHS',
      paymentMethod: 'mobile_money',
      status: 'completed',
      type: 'registration',
      date: '2024-01-14T14:20:00Z',
      description: 'Company Registration Fee',
      processedBy: 'Jane Smith'
    },
    {
      id: 'TXN-2024-003',
      reference: 'REF-003-2024',
      company: 'Eni Ghana Exploration',
      amount: 5000,
      currency: 'GHS',
      paymentMethod: 'credit_card',
      status: 'pending',
      type: 'penalty',
      date: '2024-01-13T09:15:00Z',
      description: 'Late Submission Penalty',
      processedBy: 'Mike Johnson'
    },
    {
      id: 'TXN-2024-004',
      reference: 'REF-004-2024',
      company: 'Kosmos Energy Ghana',
      amount: 12000,
      currency: 'GHS',
      paymentMethod: 'bank_transfer',
      status: 'failed',
      type: 'renewal',
      date: '2024-01-12T16:45:00Z',
      description: 'Permit Renewal Fee - Block B',
      processedBy: 'Sarah Wilson'
    },
    {
      id: 'TXN-2024-005',
      reference: 'REF-005-2024',
      company: 'Springfield E&P Limited',
      amount: 8000,
      currency: 'GHS',
      paymentMethod: 'cash',
      status: 'completed',
      type: 'permit_fee',
      date: '2024-01-11T11:30:00Z',
      description: 'Personnel Permit Fee',
      processedBy: 'David Brown'
    },
    {
      id: 'TXN-2024-006',
      reference: 'REF-006-2024',
      company: 'Hess Ghana Limited',
      amount: 18000,
      currency: 'GHS',
      paymentMethod: 'mobile_money',
      status: 'refunded',
      type: 'registration',
      date: '2024-01-10T13:20:00Z',
      description: 'Duplicate Registration Fee - Refunded',
      processedBy: 'Lisa Davis'
    }
  ];

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800',
      refunded: 'bg-blue-100 text-blue-800'
    };
    return statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800';
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <BuildingLibraryIcon className="h-5 w-5" />;
      case 'mobile_money':
        return <DevicePhoneMobileIcon className="h-5 w-5" />;
      case 'credit_card':
        return <CreditCardIcon className="h-5 w-5" />;
      case 'cash':
        return <BanknotesIcon className="h-5 w-5" />;
      default:
        return <CreditCardIcon className="h-5 w-5" />;
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels = {
      bank_transfer: 'Bank Transfer',
      mobile_money: 'Mobile Money',
      credit_card: 'Credit Card',
      cash: 'Cash'
    };
    return labels[method as keyof typeof labels] || method;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      permit_fee: 'Permit Fee',
      registration: 'Registration',
      penalty: 'Penalty',
      renewal: 'Renewal'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ['Reference', 'Company', 'Amount', 'Method', 'Status', 'Type', 'Date', 'Description'].join(','),
      ...filteredTransactions.map(t => [
        t.reference,
        t.company,
        `${t.currency} ${t.amount}`,
        getPaymentMethodLabel(t.paymentMethod),
        t.status,
        getTypeLabel(t.type),
        formatDate(t.date),
        t.description
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transaction-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction History</h1>
          <p className="text-gray-600 mt-1">View and manage all payment transactions</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          {/* Method Filter */}
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Methods</option>
            <option value="bank_transfer">Bank Transfer</option>
            <option value="mobile_money">Mobile Money</option>
            <option value="credit_card">Credit Card</option>
            <option value="cash">Cash</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="permit_fee">Permit Fee</option>
            <option value="registration">Registration</option>
            <option value="penalty">Penalty</option>
            <option value="renewal">Renewal</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setStatusFilter('all');
              setMethodFilter('all');
              setTypeFilter('all');
            }}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Clear
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reference
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.reference}</div>
                    <div className="text-sm text-gray-500">{transaction.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{transaction.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2 text-gray-400">
                        {getPaymentMethodIcon(transaction.paymentMethod)}
                      </div>
                      <span className="text-sm text-gray-900">
                        {getPaymentMethodLabel(transaction.paymentMethod)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadge(transaction.status)
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">
                      {getTypeLabel(transaction.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatDate(transaction.date)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(transaction)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <EyeIcon className="h-4 w-4 mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No transactions found</div>
            <div className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</div>
          </div>
        )}
      </div>

      {/* Transaction Details Modal */}
      {showModal && selectedTransaction && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Transaction Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reference</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.reference}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Transaction ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedTransaction.id}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTransaction.company}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                    <div className="mt-1 flex items-center">
                      <div className="mr-2 text-gray-400">
                        {getPaymentMethodIcon(selectedTransaction.paymentMethod)}
                      </div>
                      <span className="text-sm text-gray-900">
                        {getPaymentMethodLabel(selectedTransaction.paymentMethod)}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getStatusBadge(selectedTransaction.status)
                    }`}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{getTypeLabel(selectedTransaction.type)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                  <p className="mt-1 text-sm text-gray-900">{formatDate(selectedTransaction.date)}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTransaction.description}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Processed By</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedTransaction.processedBy}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}