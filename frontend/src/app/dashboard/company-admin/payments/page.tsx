'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
import {
  CurrencyDollarIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EllipsisVerticalIcon,
  PencilIcon,
  EyeIcon,
  DocumentArrowDownIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  CalendarIcon,
  BanknotesIcon,
  CreditCardIcon,
  ReceiptPercentIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface Payment {
  id: string;
  paymentType: 'royalty' | 'surface-rental' | 'signature-bonus' | 'petroleum-income-tax' | 'additional-oil-entitlement' | 'carried-interest' | 'annual-training-fee' | 'other';
  description: string;
  amount: number;
  currency: 'USD' | 'GHS';
  dueDate: string;
  paymentDate?: string;
  status: 'pending' | 'paid' | 'overdue' | 'partial' | 'cancelled';
  invoiceNumber: string;
  referenceNumber?: string;
  paymentMethod?: 'bank-transfer' | 'check' | 'online' | 'cash';
  relatedPermit?: string;
  relatedProject?: string;
  fiscalYear: string;
  quarter: string;
  paidAmount?: number;
  outstandingAmount?: number;
  penaltyAmount?: number;
  interestAmount?: number;
  paymentHistory: {
    date: string;
    amount: number;
    method: string;
    reference: string;
  }[];
  documents: {
    type: string;
    name: string;
    uploadDate: string;
  }[];
}

export default function PaymentsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentTypeFilter, setPaymentTypeFilter] = useState('all');
  const [fiscalYearFilter, setFiscalYearFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  // Mock data
  const payments: Payment[] = [
    {
      id: '1',
      paymentType: 'royalty',
      description: 'Royalty Payment - Q4 2023 Oil Production',
      amount: 2500000,
      currency: 'USD',
      dueDate: '2024-01-31',
      paymentDate: '2024-01-28',
      status: 'paid',
      invoiceNumber: 'INV-2024-001',
      referenceNumber: 'REF-ROY-Q4-2023',
      paymentMethod: 'bank-transfer',
      relatedPermit: 'PL-001-2020',
      relatedProject: 'Offshore Block A',
      fiscalYear: '2023',
      quarter: 'Q4',
      paidAmount: 2500000,
      paymentHistory: [
        {
          date: '2024-01-28',
          amount: 2500000,
          method: 'Bank Transfer',
          reference: 'TXN-20240128-001'
        }
      ],
      documents: [
        {
          type: 'Invoice',
          name: 'royalty-invoice-q4-2023.pdf',
          uploadDate: '2024-01-15'
        },
        {
          type: 'Payment Receipt',
          name: 'payment-receipt-001.pdf',
          uploadDate: '2024-01-28'
        }
      ]
    },
    {
      id: '2',
      paymentType: 'surface-rental',
      description: 'Surface Rental - Annual Payment 2024',
      amount: 150000,
      currency: 'USD',
      dueDate: '2024-03-31',
      status: 'pending',
      invoiceNumber: 'INV-2024-002',
      relatedPermit: 'PL-001-2020',
      relatedProject: 'Offshore Block A',
      fiscalYear: '2024',
      quarter: 'Q1',
      outstandingAmount: 150000,
      paymentHistory: [],
      documents: [
        {
          type: 'Invoice',
          name: 'surface-rental-invoice-2024.pdf',
          uploadDate: '2024-02-01'
        }
      ]
    },
    {
      id: '3',
      paymentType: 'petroleum-income-tax',
      description: 'Petroleum Income Tax - Q1 2024',
      amount: 1800000,
      currency: 'USD',
      dueDate: '2024-02-15',
      status: 'overdue',
      invoiceNumber: 'INV-2024-003',
      relatedProject: 'Volta Basin Exploration',
      fiscalYear: '2024',
      quarter: 'Q1',
      outstandingAmount: 1800000,
      penaltyAmount: 90000,
      interestAmount: 45000,
      paymentHistory: [],
      documents: [
        {
          type: 'Tax Assessment',
          name: 'pit-assessment-q1-2024.pdf',
          uploadDate: '2024-01-20'
        }
      ]
    },
    {
      id: '4',
      paymentType: 'signature-bonus',
      description: 'Signature Bonus - Block B Acquisition',
      amount: 5000000,
      currency: 'USD',
      dueDate: '2024-04-30',
      paymentDate: '2024-03-15',
      status: 'paid',
      invoiceNumber: 'INV-2024-004',
      referenceNumber: 'REF-SIG-BLOCK-B',
      paymentMethod: 'bank-transfer',
      relatedPermit: 'PL-002-2024',
      relatedProject: 'Block B Development',
      fiscalYear: '2024',
      quarter: 'Q1',
      paidAmount: 5000000,
      paymentHistory: [
        {
          date: '2024-03-15',
          amount: 5000000,
          method: 'Bank Transfer',
          reference: 'TXN-20240315-002'
        }
      ],
      documents: [
        {
          type: 'Contract',
          name: 'block-b-agreement.pdf',
          uploadDate: '2024-02-10'
        },
        {
          type: 'Payment Receipt',
          name: 'signature-bonus-receipt.pdf',
          uploadDate: '2024-03-15'
        }
      ]
    },
    {
      id: '5',
      paymentType: 'annual-training-fee',
      description: 'Annual Training Fee - 2024',
      amount: 75000,
      currency: 'USD',
      dueDate: '2024-06-30',
      paymentDate: '2024-05-20',
      status: 'partial',
      invoiceNumber: 'INV-2024-005',
      referenceNumber: 'REF-TRAIN-2024',
      paymentMethod: 'bank-transfer',
      relatedProject: 'Training & Development Program',
      fiscalYear: '2024',
      quarter: 'Q2',
      paidAmount: 50000,
      outstandingAmount: 25000,
      paymentHistory: [
        {
          date: '2024-05-20',
          amount: 50000,
          method: 'Bank Transfer',
          reference: 'TXN-20240520-003'
        }
      ],
      documents: [
        {
          type: 'Training Plan',
          name: 'training-plan-2024.pdf',
          uploadDate: '2024-04-01'
        },
        {
          type: 'Partial Payment Receipt',
          name: 'partial-payment-receipt.pdf',
          uploadDate: '2024-05-20'
        }
      ]
    },
    {
      id: '6',
      paymentType: 'carried-interest',
      description: 'Carried Interest Payment - GNPC Share',
      amount: 3200000,
      currency: 'USD',
      dueDate: '2024-07-15',
      status: 'pending',
      invoiceNumber: 'INV-2024-006',
      relatedProject: 'Jubilee Field Development',
      fiscalYear: '2024',
      quarter: 'Q2',
      outstandingAmount: 3200000,
      paymentHistory: [],
      documents: [
        {
          type: 'Carried Interest Agreement',
          name: 'carried-interest-agreement.pdf',
          uploadDate: '2024-06-01'
        }
      ]
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: ClockIcon, label: 'Pending' },
      paid: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon, label: 'Paid' },
      overdue: { color: 'bg-red-100 text-red-800', icon: ExclamationTriangleIcon, label: 'Overdue' },
      partial: { color: 'bg-blue-100 text-blue-800', icon: ReceiptPercentIcon, label: 'Partial' },
      cancelled: { color: 'bg-gray-100 text-gray-800', icon: XCircleIcon, label: 'Cancelled' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </span>
    );
  };

  const getPaymentTypeBadge = (type: string) => {
    const typeConfig = {
      royalty: { color: 'bg-purple-100 text-purple-800', label: 'Royalty' },
      'surface-rental': { color: 'bg-blue-100 text-blue-800', label: 'Surface Rental' },
      'signature-bonus': { color: 'bg-green-100 text-green-800', label: 'Signature Bonus' },
      'petroleum-income-tax': { color: 'bg-red-100 text-red-800', label: 'Petroleum Income Tax' },
      'additional-oil-entitlement': { color: 'bg-orange-100 text-orange-800', label: 'Additional Oil Entitlement' },
      'carried-interest': { color: 'bg-indigo-100 text-indigo-800', label: 'Carried Interest' },
      'annual-training-fee': { color: 'bg-teal-100 text-teal-800', label: 'Annual Training Fee' },
      other: { color: 'bg-gray-100 text-gray-800', label: 'Other' }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig];
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatCurrency = (amount: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
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
      day: 'numeric'
    });
  };

  const isOverdue = (dueDate: string, status: string) => {
    return status !== 'paid' && new Date(dueDate) < new Date();
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = 
      payment.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.relatedProject?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesPaymentType = paymentTypeFilter === 'all' || payment.paymentType === paymentTypeFilter;
    const matchesFiscalYear = fiscalYearFilter === 'all' || payment.fiscalYear === fiscalYearFilter;
    
    return matchesSearch && matchesStatus && matchesPaymentType && matchesFiscalYear;
  });

  // Calculate statistics
  const stats = {
    total: payments.length,
    paid: payments.filter(p => p.status === 'paid').length,
    pending: payments.filter(p => p.status === 'pending').length,
    overdue: payments.filter(p => p.status === 'overdue').length,
    partial: payments.filter(p => p.status === 'partial').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    paidAmount: payments.reduce((sum, p) => sum + (p.paidAmount || 0), 0),
    outstandingAmount: payments.reduce((sum, p) => sum + (p.outstandingAmount || 0), 0),
    penaltyAmount: payments.reduce((sum, p) => sum + (p.penaltyAmount || 0), 0)
  };

  const handleSelectPayment = (id: string) => {
    setSelectedPayments(prev => 
      prev.includes(id) 
        ? prev.filter(p => p !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedPayments(
      selectedPayments.length === filteredPayments.length 
        ? [] 
        : filteredPayments.map(p => p.id)
    );
  };

  return (
    <DashboardLayout
      title="Payments"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Payment Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Track and manage all petroleum sector payments and obligations
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard/company-admin/payments/make-payment')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Make Payment
          </button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Payments</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Paid</p>
                <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalAmount)}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.outstandingAmount)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="text-xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Overdue</p>
                <p className="text-xl font-bold text-red-600">{stats.overdue}</p>
              </div>
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Paid Amount</p>
                <p className="text-xl font-bold text-green-600">{formatCurrency(stats.paidAmount)}</p>
              </div>
              <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Penalties</p>
                <p className="text-xl font-bold text-red-600">{formatCurrency(stats.penaltyAmount)}</p>
              </div>
              <ArrowTrendingDownIcon className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search payments by description, invoice, reference, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                  <option value="partial">Partial</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  value={paymentTypeFilter}
                  onChange={(e) => setPaymentTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Types</option>
                  <option value="royalty">Royalty</option>
                  <option value="surface-rental">Surface Rental</option>
                  <option value="signature-bonus">Signature Bonus</option>
                  <option value="petroleum-income-tax">Petroleum Income Tax</option>
                  <option value="additional-oil-entitlement">Additional Oil Entitlement</option>
                  <option value="carried-interest">Carried Interest</option>
                  <option value="annual-training-fee">Annual Training Fee</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fiscal Year
                </label>
                <select
                  value={fiscalYearFilter}
                  onChange={(e) => setFiscalYearFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Years</option>
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setStatusFilter('all');
                    setPaymentTypeFilter('all');
                    setFiscalYearFilter('all');
                    setSearchTerm('');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payments Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">
                Payments ({filteredPayments.length})
              </h3>
              {selectedPayments.length > 0 && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {selectedPayments.length} selected
                  </span>
                  <button className="text-sm text-blue-600 hover:text-blue-800">
                    Bulk Actions
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPayments.length === filteredPayments.length && filteredPayments.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount & Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project & Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedPayments.includes(payment.id)}
                        onChange={() => handleSelectPayment(payment.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {payment.description}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          Invoice: {payment.invoiceNumber}
                        </div>
                        {payment.referenceNumber && (
                          <div className="text-xs text-gray-500 mt-1">
                            Ref: {payment.referenceNumber}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-2">
                        {getPaymentTypeBadge(payment.paymentType)}
                        {getStatusBadge(payment.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-900">
                          {formatCurrency(payment.amount, payment.currency)}
                        </div>
                        {payment.paidAmount && payment.paidAmount > 0 && (
                          <div className="text-sm text-green-600">
                            Paid: {formatCurrency(payment.paidAmount, payment.currency)}
                          </div>
                        )}
                        {payment.outstandingAmount && payment.outstandingAmount > 0 && (
                          <div className="text-sm text-red-600">
                            Outstanding: {formatCurrency(payment.outstandingAmount, payment.currency)}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          Due: {formatDate(payment.dueDate)}
                          {isOverdue(payment.dueDate, payment.status) && (
                            <span className="ml-1 text-red-600">(Overdue)</span>
                          )}
                        </div>
                        {payment.paymentDate && (
                          <div className="text-xs text-green-600">
                            Paid: {formatDate(payment.paymentDate)}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {payment.relatedProject && (
                          <div className="text-sm text-gray-900">
                            {payment.relatedProject}
                          </div>
                        )}
                        {payment.relatedPermit && (
                          <div className="text-xs text-gray-500">
                            Permit: {payment.relatedPermit}
                          </div>
                        )}
                        <div className="text-xs text-gray-500">
                          FY {payment.fiscalYear} - {payment.quarter}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => router.push(`/dashboard/company-admin/payments/${payment.id}`)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        {payment.status !== 'paid' && (
                          <button
                            onClick={() => router.push(`/dashboard/company-admin/payments/${payment.id}/pay`)}
                            className="text-green-600 hover:text-green-900"
                            title="Make Payment"
                          >
                            <CreditCardIcon className="h-4 w-4" />
                          </button>
                        )}
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Download Invoice"
                        >
                          <DocumentArrowDownIcon className="h-4 w-4" />
                        </button>
                        <div className="relative">
                          <button
                            className="text-gray-400 hover:text-gray-600"
                            title="More Actions"
                          >
                            <EllipsisVerticalIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredPayments.length === 0 && (
            <div className="text-center py-12">
              <CurrencyDollarIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No payments found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {searchTerm || statusFilter !== 'all' || paymentTypeFilter !== 'all' || fiscalYearFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria.'
                  : 'No payment records available.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}