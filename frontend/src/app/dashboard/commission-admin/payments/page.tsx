'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';

interface PaymentTransaction {
  id: string;
  applicationId: string;
  company: string;
  type: string;
  amount: number;
  currency: string;
  status: 'Completed' | 'Pending' | 'Failed' | 'Refunded' | 'Processing';
  paymentMethod: string;
  transactionDate: string;
  dueDate?: string;
  reference: string;
  description: string;
  fees?: {
    processingFee: number;
    serviceFee: number;
    total: number;
  };
}

interface PaymentSummary {
  totalRevenue: number;
  pendingPayments: number;
  completedTransactions: number;
  failedTransactions: number;
  refundedAmount: number;
  monthlyGrowth: number;
}

export default function PaymentsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);
  const [summary, setSummary] = useState<PaymentSummary | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState<PaymentTransaction | null>(null);

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock data for payments
    const mockTransactions: PaymentTransaction[] = [
      {
        id: 'TXN-001',
        applicationId: 'APP-2024-001',
        company: 'Kosmos Energy Ghana Limited',
        type: 'Company Registration Fee',
        amount: 2500000,
        currency: 'GHS',
        status: 'Completed',
        paymentMethod: 'Bank Transfer',
        transactionDate: '2024-01-15T10:30:00Z',
        reference: 'CHV-REG-2024-001',
        description: 'Registration fee for upstream oil and gas operations',
        fees: {
          processingFee: 25000,
          serviceFee: 50000,
          total: 75000
        }
      },
      {
        id: 'TXN-002',
        applicationId: 'APP-2024-002',
        company: 'Tullow Ghana Limited',
        type: 'Regular Permit Fee',
        amount: 1800000,
        currency: 'GHS',
        status: 'Pending',
        paymentMethod: 'Online Payment',
        transactionDate: '2024-01-18T14:20:00Z',
        dueDate: '2024-02-18',
        reference: 'SHL-PRM-2024-002',
        description: 'Permit fee for drilling operations',
        fees: {
          processingFee: 18000,
          serviceFee: 36000,
          total: 54000
        }
      },
      {
        id: 'TXN-003',
        applicationId: 'APP-2024-003',
        company: 'Eni Ghana Exploration',
        type: 'JV Application Fee',
        amount: 5000000,
        currency: 'GHS',
        status: 'Processing',
        paymentMethod: 'Wire Transfer',
        transactionDate: '2024-01-20T09:15:00Z',
        reference: 'TOT-JV-2024-003',
        description: 'Joint venture application processing fee',
        fees: {
          processingFee: 50000,
          serviceFee: 100000,
          total: 150000
        }
      },
      {
        id: 'TXN-004',
        applicationId: 'APP-2024-004',
        company: 'Hess Ghana Limited',
        type: 'Renewal Fee',
        amount: 3200000,
        currency: 'GHS',
        status: 'Failed',
        paymentMethod: 'Credit Card',
        transactionDate: '2024-01-22T16:45:00Z',
        reference: 'EXX-RNW-2024-004',
        description: 'License renewal fee payment failed - insufficient funds'
      },
      {
        id: 'TXN-005',
        applicationId: 'APP-2024-005',
        company: 'GNPC Exploration Limited',
        type: 'Inspection Fee',
        amount: 750000,
        currency: 'GHS',
        status: 'Refunded',
        paymentMethod: 'Bank Transfer',
        transactionDate: '2024-01-25T11:30:00Z',
        reference: 'AGP-INS-2024-005',
        description: 'Inspection fee refunded due to application withdrawal'
      }
    ];

    const mockSummary: PaymentSummary = {
      totalRevenue: 13250000,
      pendingPayments: 1800000,
      completedTransactions: 2,
      failedTransactions: 1,
      refundedAmount: 750000,
      monthlyGrowth: 15.5
    };

    setTransactions(mockTransactions);
    setSummary(mockSummary);
  }, []);

  const filteredTransactions = transactions.filter(transaction => {
    const matchesStatus = statusFilter === 'all' || transaction.status.toLowerCase() === statusFilter;
    const matchesSearch = searchTerm === '' || 
      transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Date range filter
    const transactionDate = new Date(transaction.transactionDate);
    const now = new Date();
    const daysAgo = parseInt(dateRange);
    const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
    const matchesDate = transactionDate >= cutoffDate;

    return matchesStatus && matchesSearch && matchesDate;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Refunded': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              <span className="mr-3">💳</span>
              Payments & Transactions
            </h1>
            <p className="text-gray-600 mt-2">Monitor payment transactions, revenue, and financial analytics</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => router.push('/dashboard/commission-admin/payments/reconciliation')}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Reconciliation
            </button>
            <button 
              onClick={() => router.push('/dashboard/commission-admin/payments/reports')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Financial Reports
            </button>
          </div>
        </div>
      </div>

      {/* Financial Summary */}
      {summary && (
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(summary.totalRevenue)}</div>
              <div className="text-sm opacity-90">Total Revenue</div>
              <div className="text-xs mt-1 opacity-75">+{summary.monthlyGrowth}% this month</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(summary.pendingPayments)}</div>
              <div className="text-sm opacity-90">Pending Payments</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{summary.completedTransactions}</div>
              <div className="text-sm opacity-90">Completed</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{summary.failedTransactions}</div>
              <div className="text-sm opacity-90">Failed</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatCurrency(summary.refundedAmount)}</div>
              <div className="text-sm opacity-90">Refunded</div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-lg text-white p-6">
            <div className="text-center">
              <div className="text-2xl font-bold">{transactions.length}</div>
              <div className="text-sm opacity-90">Total Transactions</div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by company, application ID, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select 
              value={statusFilter} 
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
              <option value="365">Last year</option>
            </select>
          </div>
          <div className="flex items-end">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Recent Transactions ({filteredTransactions.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    {transaction.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{transaction.company}</div>
                      <div className="text-xs text-gray-500">{transaction.applicationId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.amount, transaction.currency)}
                    </div>
                    {transaction.fees && (
                      <div className="text-xs text-gray-500">
                        +{formatCurrency(transaction.fees.total)} fees
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.paymentMethod}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.transactionDate)}
                    {transaction.dueDate && transaction.status === 'Pending' && (
                      <div className="text-xs text-red-600">
                        Due: {new Date(transaction.dueDate).toLocaleDateString()}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => setSelectedTransaction(transaction)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      {transaction.status === 'Failed' && (
                        <button className="text-green-600 hover:text-green-900">Retry</button>
                      )}
                      {transaction.status === 'Completed' && (
                        <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Transaction Details - {selectedTransaction.id}
                </h2>
                <button 
                  onClick={() => setSelectedTransaction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Company</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.company}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Application ID</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.applicationId}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Amount</label>
                  <p className="text-sm text-gray-900">
                    {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedTransaction.status)}`}>
                    {selectedTransaction.status}
                  </span>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Payment Method</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Reference</label>
                  <p className="text-sm text-gray-900">{selectedTransaction.reference}</p>
                </div>
              </div>
              
              {selectedTransaction.fees && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Fee Breakdown</label>
                  <div className="mt-2 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                      <span>Processing Fee:</span>
                      <span>{formatCurrency(selectedTransaction.fees.processingFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Service Fee:</span>
                      <span>{formatCurrency(selectedTransaction.fees.serviceFee)}</span>
                    </div>
                    <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between text-sm font-medium">
                      <span>Total Fees:</span>
                      <span>{formatCurrency(selectedTransaction.fees.total)}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="text-sm text-gray-900">{selectedTransaction.description}</p>
              </div>
              
              <div className="flex space-x-4">
                <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  Download Receipt
                </button>
                <button className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                  View Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Payment Reconciliation</h3>
          <p className="text-sm opacity-90 mb-4">Reconcile payments with bank statements</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/payments/reconciliation')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Start Reconciliation
          </button>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Financial Reports</h3>
          <p className="text-sm opacity-90 mb-4">Generate detailed financial reports</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/payments/reports')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Reports
          </button>
        </div>
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Revenue Analytics</h3>
          <p className="text-sm opacity-90 mb-4">Analyze revenue trends and patterns</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/payments/analytics')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            View Analytics
          </button>
        </div>
        <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-xl shadow-lg text-white p-6">
          <h3 className="text-lg font-semibold mb-2">Payment Settings</h3>
          <p className="text-sm opacity-90 mb-4">Configure payment methods and fees</p>
          <button 
            onClick={() => router.push('/dashboard/commission-admin/payments/settings')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Manage Settings
          </button>
        </div>
      </div>
    </div>
  );
}