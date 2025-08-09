'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CurrencyDollarIcon,
  BanknotesIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface FinancialTransaction {
  id: string;
  type: 'revenue' | 'fee' | 'penalty' | 'refund' | 'tax';
  amount: number;
  currency: string;
  company: string;
  description: string;
  status: 'completed' | 'pending' | 'failed' | 'processing';
  date: string;
  reference: string;
  category: string;
}

interface FinancialSummary {
  totalRevenue: number;
  totalFees: number;
  totalPenalties: number;
  pendingPayments: number;
  monthlyGrowth: number;
  yearlyGrowth: number;
}

export default function FinancialManagementPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('30');

  const [transactions, setTransactions] = useState<FinancialTransaction[]>([
    {
      id: '1',
      type: 'revenue',
      amount: 2500000,
      currency: 'NGN',
      company: 'Shell Petroleum Development Company',
      description: 'Quarterly license fee payment',
      status: 'completed',
      date: '2024-01-15T10:30:00Z',
      reference: 'REV-2024-001',
      category: 'License Fees'
    },
    {
      id: '2',
      type: 'fee',
      amount: 750000,
      currency: 'NGN',
      company: 'Chevron Nigeria Limited',
      description: 'Environmental compliance assessment fee',
      status: 'pending',
      date: '2024-01-14T14:20:00Z',
      reference: 'FEE-2024-045',
      category: 'Compliance Fees'
    },
    {
      id: '3',
      type: 'penalty',
      amount: 1200000,
      currency: 'NGN',
      company: 'TotalEnergies EP Nigeria',
      description: 'Late permit renewal penalty',
      status: 'processing',
      date: '2024-01-13T16:45:00Z',
      reference: 'PEN-2024-012',
      category: 'Penalties'
    },
    {
      id: '4',
      type: 'revenue',
      amount: 3200000,
      currency: 'NGN',
      company: 'ExxonMobil Nigeria',
      description: 'Annual operating permit fee',
      status: 'completed',
      date: '2024-01-12T11:15:00Z',
      reference: 'REV-2024-002',
      category: 'Permit Fees'
    },
    {
      id: '5',
      type: 'tax',
      amount: 890000,
      currency: 'NGN',
      company: 'Nigerian Agip Oil Company',
      description: 'Petroleum profit tax adjustment',
      status: 'completed',
      date: '2024-01-11T09:30:00Z',
      reference: 'TAX-2024-008',
      category: 'Tax Collections'
    },
    {
      id: '6',
      type: 'refund',
      amount: 450000,
      currency: 'NGN',
      company: 'Seplat Energy Plc',
      description: 'Overpayment refund for Q3 2023',
      status: 'pending',
      date: '2024-01-10T15:20:00Z',
      reference: 'REF-2024-003',
      category: 'Refunds'
    },
    {
      id: '7',
      type: 'fee',
      amount: 1800000,
      currency: 'NGN',
      company: 'Aiteo Eastern E&P Company',
      description: 'Joint venture formation fee',
      status: 'failed',
      date: '2024-01-09T13:10:00Z',
      reference: 'FEE-2024-046',
      category: 'JV Fees'
    },
    {
      id: '8',
      type: 'revenue',
      amount: 2100000,
      currency: 'NGN',
      company: 'Oando Energy Resources',
      description: 'Local content compliance fee',
      status: 'completed',
      date: '2024-01-08T10:00:00Z',
      reference: 'REV-2024-003',
      category: 'Local Content Fees'
    }
  ]);

  const financialSummary: FinancialSummary = {
    totalRevenue: 12450000,
    totalFees: 8750000,
    totalPenalties: 2340000,
    pendingPayments: 1950000,
    monthlyGrowth: 12.5,
    yearlyGrowth: 18.3
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'revenue': return 'bg-green-100 text-green-800';
      case 'fee': return 'bg-blue-100 text-blue-800';
      case 'penalty': return 'bg-red-100 text-red-800';
      case 'refund': return 'bg-yellow-100 text-yellow-800';
      case 'tax': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'revenue': return ArrowTrendingUpIcon;
      case 'fee': return CreditCardIcon;
      case 'penalty': return ExclamationTriangleIcon;
      case 'refund': return ArrowTrendingDownIcon;
      case 'tax': return DocumentTextIcon;
      default: return CurrencyDollarIcon;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'NGN') => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredTransactions = transactions
    .filter(transaction => {
      const matchesSearch = transaction.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'all' || transaction.type === filterType;
      const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const handleViewTransaction = (transactionId: string) => {
    router.push(`/dashboard/commission-admin/financial-management/transaction/${transactionId}`);
  };

  const handleProcessPayment = (transactionId: string) => {
    setTransactions(prev => prev.map(transaction => 
      transaction.id === transactionId 
        ? { ...transaction, status: 'processing' as any }
        : transaction
    ));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Management</h1>
              <p className="text-gray-600 mt-2">Monitor and manage all financial transactions and revenue streams</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/reports')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ChartBarIcon className="h-4 w-4 mr-2" />
                Financial Reports
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/new-transaction')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                New Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <ArrowTrendingUpIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(financialSummary.totalRevenue)}
                </p>
                <p className="text-sm text-green-600">+{financialSummary.monthlyGrowth}% this month</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <CreditCardIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Fees</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(financialSummary.totalFees)}
                </p>
                <p className="text-sm text-blue-600">Various fee categories</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Penalties</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(financialSummary.totalPenalties)}
                </p>
                <p className="text-sm text-red-600">Compliance violations</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {formatCurrency(financialSummary.pendingPayments)}
                </p>
                <p className="text-sm text-yellow-600">Awaiting processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="revenue">Revenue</option>
                <option value="fee">Fees</option>
                <option value="penalty">Penalties</option>
                <option value="refund">Refunds</option>
                <option value="tax">Tax</option>
              </select>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="failed">Failed</option>
              </select>
              
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="365">Last year</option>
              </select>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/export')}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Export Data
              </button>
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Transactions</h2>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => {
                const TypeIcon = getTypeIcon(transaction.type);
                
                return (
                  <div key={transaction.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className={`p-3 rounded-full ${
                          transaction.type === 'revenue' ? 'bg-green-100' :
                          transaction.type === 'fee' ? 'bg-blue-100' :
                          transaction.type === 'penalty' ? 'bg-red-100' :
                          transaction.type === 'refund' ? 'bg-yellow-100' :
                          transaction.type === 'tax' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <TypeIcon className={`h-6 w-6 ${
                            transaction.type === 'revenue' ? 'text-green-600' :
                            transaction.type === 'fee' ? 'text-blue-600' :
                            transaction.type === 'penalty' ? 'text-red-600' :
                            transaction.type === 'refund' ? 'text-yellow-600' :
                            transaction.type === 'tax' ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getTypeColor(transaction.type)
                            }`}>
                              {transaction.type.toUpperCase()}
                            </span>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(transaction.status)
                            }`}>
                              {transaction.status.toUpperCase()}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                            <div className="flex items-center">
                              <BuildingOfficeIcon className="h-4 w-4 mr-2" />
                              <span>{transaction.company}</span>
                            </div>
                            <div className="flex items-center">
                              <CurrencyDollarIcon className="h-4 w-4 mr-2" />
                              <span className="font-medium">{formatCurrency(transaction.amount, transaction.currency)}</span>
                            </div>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2" />
                              <span>{formatDate(transaction.date)}</span>
                            </div>
                            <div className="flex items-center">
                              <DocumentTextIcon className="h-4 w-4 mr-2" />
                              <span>{transaction.reference}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleViewTransaction(transaction.id)}
                          className="p-2 text-gray-400 hover:text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        
                        {transaction.status === 'pending' && (
                          <button
                            onClick={() => handleProcessPayment(transaction.id)}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded hover:bg-blue-50"
                          >
                            Process
                          </button>
                        )}
                        
                        {transaction.status === 'failed' && (
                          <button
                            onClick={() => handleProcessPayment(transaction.id)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-800 border border-red-300 rounded hover:bg-red-50"
                          >
                            Retry
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredTransactions.length === 0 && (
              <div className="text-center py-12">
                <CurrencyDollarIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                <p className="text-gray-500">No transactions match your current filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/bulk-payment')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BanknotesIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Bulk Payment</p>
                  <p className="text-sm text-gray-500">Process multiple payments</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/reconciliation')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CheckCircleIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Reconciliation</p>
                  <p className="text-sm text-gray-500">Match transactions</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/audit-trail')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="h-8 w-8 text-purple-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Audit Trail</p>
                  <p className="text-sm text-gray-500">View transaction history</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management/settings')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CurrencyDollarIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Fee Settings</p>
                  <p className="text-sm text-gray-500">Configure fee structures</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}