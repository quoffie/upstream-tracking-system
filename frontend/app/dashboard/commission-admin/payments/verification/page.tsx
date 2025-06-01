'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getCommissionAdminMenuItems } from '../../../../../src/app/components/layouts/DashboardMenus';
import ModernSidebar from '../../../../../src/app/components/layouts/ModernSidebar';
import { 
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarIcon,
  FunnelIcon,
  EyeIcon,
  BanknotesIcon,
  CreditCardIcon,
  BuildingLibraryIcon,
  ReceiptPercentIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface PaymentVerification {
  id: string;
  applicationId: string;
  applicantName: string;
  paymentType: 'permit_fee' | 'registration_fee' | 'renewal_fee' | 'penalty' | 'processing_fee';
  amount: number;
  currency: string;
  paymentMethod: 'bank_transfer' | 'mobile_money' | 'credit_card' | 'cash' | 'cheque';
  transactionRef: string;
  bankRef?: string;
  paymentDate: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'rejected' | 'requires_review';
  verifiedBy?: string;
  verificationDate?: string;
  rejectionReason?: string;
  supportingDocs: string[];
  bankName?: string;
  accountNumber?: string;
  phoneNumber?: string;
  receiptNumber?: string;
  notes?: string;
}

const PaymentVerificationPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [payments, setPayments] = useState<PaymentVerification[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<PaymentVerification[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterMethod, setFilterMethod] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<PaymentVerification | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [verificationAction, setVerificationAction] = useState<'verify' | 'reject' | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');

  useEffect(() => {
    // Mock data for payment verifications
    const mockPayments: PaymentVerification[] = [
      {
        id: 'PV-001',
        applicationId: 'APP-2024-001',
        applicantName: 'Ghana Oil Company Ltd',
        paymentType: 'permit_fee',
        amount: 15000,
        currency: 'GHS',
        paymentMethod: 'bank_transfer',
        transactionRef: 'TXN-20240115-001',
        bankRef: 'BNK-REF-789456',
        paymentDate: '2024-01-15T10:30:00Z',
        submittedDate: '2024-01-15T14:20:00Z',
        status: 'pending',
        supportingDocs: ['bank_statement.pdf', 'payment_receipt.pdf'],
        bankName: 'Ghana Commercial Bank',
        accountNumber: '****1234',
        receiptNumber: 'RCP-001-2024'
      },
      {
        id: 'PV-002',
        applicationId: 'APP-2024-002',
        applicantName: 'Tullow Ghana Limited',
        paymentType: 'registration_fee',
        amount: 25000,
        currency: 'GHS',
        paymentMethod: 'mobile_money',
        transactionRef: 'MTN-20240115-002',
        paymentDate: '2024-01-15T09:15:00Z',
        submittedDate: '2024-01-15T11:45:00Z',
        status: 'verified',
        verifiedBy: 'Finance Officer',
        verificationDate: '2024-01-15T16:30:00Z',
        supportingDocs: ['momo_receipt.pdf'],
        phoneNumber: '0244***789',
        receiptNumber: 'RCP-002-2024'
      },
      {
        id: 'PV-003',
        applicationId: 'APP-2024-003',
        applicantName: 'Kosmos Energy Ghana',
        paymentType: 'renewal_fee',
        amount: 8500,
        currency: 'GHS',
        paymentMethod: 'credit_card',
        transactionRef: 'CC-20240114-003',
        paymentDate: '2024-01-14T16:45:00Z',
        submittedDate: '2024-01-15T08:20:00Z',
        status: 'rejected',
        verifiedBy: 'Senior Finance Officer',
        verificationDate: '2024-01-15T12:15:00Z',
        rejectionReason: 'Credit card payment declined by bank, insufficient funds',
        supportingDocs: ['card_statement.pdf'],
        receiptNumber: 'RCP-003-2024'
      },
      {
        id: 'PV-004',
        applicationId: 'APP-2024-004',
        applicantName: 'Eni Ghana Exploration',
        paymentType: 'processing_fee',
        amount: 3200,
        currency: 'GHS',
        paymentMethod: 'bank_transfer',
        transactionRef: 'TXN-20240114-004',
        bankRef: 'BNK-REF-456789',
        paymentDate: '2024-01-14T14:20:00Z',
        submittedDate: '2024-01-14T17:30:00Z',
        status: 'requires_review',
        supportingDocs: ['bank_receipt.pdf', 'transfer_slip.pdf'],
        bankName: 'Ecobank Ghana',
        accountNumber: '****5678',
        receiptNumber: 'RCP-004-2024',
        notes: 'Amount discrepancy - paid GHS 3200 instead of GHS 3500'
      },
      {
        id: 'PV-005',
        applicationId: 'APP-2024-005',
        applicantName: 'Springfield Exploration',
        paymentType: 'penalty',
        amount: 12000,
        currency: 'GHS',
        paymentMethod: 'cheque',
        transactionRef: 'CHQ-20240113-005',
        paymentDate: '2024-01-13T11:00:00Z',
        submittedDate: '2024-01-14T09:15:00Z',
        status: 'pending',
        supportingDocs: ['cheque_copy.pdf', 'deposit_slip.pdf'],
        bankName: 'Standard Chartered Bank',
        receiptNumber: 'RCP-005-2024'
      },
      {
        id: 'PV-006',
        applicationId: 'APP-2024-006',
        applicantName: 'Hess Corporation Ghana',
        paymentType: 'permit_fee',
        amount: 18500,
        currency: 'GHS',
        paymentMethod: 'bank_transfer',
        transactionRef: 'TXN-20240113-006',
        bankRef: 'BNK-REF-123789',
        paymentDate: '2024-01-13T15:30:00Z',
        submittedDate: '2024-01-13T18:45:00Z',
        status: 'verified',
        verifiedBy: 'Finance Manager',
        verificationDate: '2024-01-14T10:20:00Z',
        supportingDocs: ['bank_confirmation.pdf', 'payment_advice.pdf'],
        bankName: 'Absa Bank Ghana',
        accountNumber: '****9012',
        receiptNumber: 'RCP-006-2024'
      },
      {
        id: 'PV-007',
        applicationId: 'APP-2024-007',
        applicantName: 'Perenco Oil & Gas Ghana',
        paymentType: 'registration_fee',
        amount: 22000,
        currency: 'GHS',
        paymentMethod: 'mobile_money',
        transactionRef: 'TIGO-20240112-007',
        paymentDate: '2024-01-12T13:20:00Z',
        submittedDate: '2024-01-13T07:30:00Z',
        status: 'requires_review',
        supportingDocs: ['momo_receipt.pdf'],
        phoneNumber: '0277***456',
        receiptNumber: 'RCP-007-2024',
        notes: 'Mobile money transaction shows different amount than declared'
      }
    ];

    setTimeout(() => {
      setPayments(mockPayments);
      setFilteredPayments(mockPayments);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = payments;
    
    if (filterStatus !== 'all') {
      result = result.filter(payment => payment.status === filterStatus);
    }
    
    if (filterType !== 'all') {
      result = result.filter(payment => payment.paymentType === filterType);
    }
    
    if (filterMethod !== 'all') {
      result = result.filter(payment => payment.paymentMethod === filterMethod);
    }
    
    if (searchTerm) {
      result = result.filter(payment => 
        payment.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.transactionRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredPayments(result);
  }, [payments, filterStatus, filterType, filterMethod, searchTerm]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Verified
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircleIcon className="h-3 w-3 mr-1" />
            Rejected
          </span>
        );
      case 'requires_review':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <ExclamationTriangleIcon className="h-3 w-3 mr-1" />
            Requires Review
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <ClockIcon className="h-3 w-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer':
        return <BuildingLibraryIcon className="h-5 w-5 text-blue-600" />;
      case 'mobile_money':
        return <CurrencyDollarIcon className="h-5 w-5 text-green-600" />;
      case 'credit_card':
        return <CreditCardIcon className="h-5 w-5 text-purple-600" />;
      case 'cheque':
        return <ReceiptPercentIcon className="h-5 w-5 text-orange-600" />;
      default:
        return <BanknotesIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency
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

  const handleVerifyPayment = (payment: PaymentVerification) => {
    setSelectedPayment(payment);
    setVerificationAction('verify');
    setShowModal(true);
  };

  const handleRejectPayment = (payment: PaymentVerification) => {
    setSelectedPayment(payment);
    setVerificationAction('reject');
    setShowModal(true);
  };

  const handleViewDetails = (payment: PaymentVerification) => {
    setSelectedPayment(payment);
    setVerificationAction(null);
    setShowModal(true);
  };

  const handleSubmitVerification = () => {
    if (!selectedPayment || !verificationAction) return;

    const updatedPayments = payments.map(payment => {
      if (payment.id === selectedPayment.id) {
        return {
          ...payment,
          status: verificationAction === 'verify' ? 'verified' as const : 'rejected' as const,
          verifiedBy: 'Current User',
          verificationDate: new Date().toISOString(),
          rejectionReason: verificationAction === 'reject' ? rejectionReason : undefined,
          notes: verificationNotes || payment.notes
        };
      }
      return payment;
    });

    setPayments(updatedPayments);
    setShowModal(false);
    setSelectedPayment(null);
    setVerificationAction(null);
    setRejectionReason('');
    setVerificationNotes('');
  };

  if (isLoading) {
    return (
      <div className="flex h-screen bg-gray-50">
        <ModernSidebar 
          sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/payments/verification')}
          userRole="Commission Admin"
        />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <ModernSidebar 
        sidebarItems={getCommissionAdminMenuItems('/dashboard/commission-admin/payments/verification')}
        userRole="Commission Admin"
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Verification</h1>
            <p className="text-gray-600">Review and verify payment submissions from applicants</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {payments.filter(p => p.status === 'pending').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ExclamationTriangleIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Requires Review</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {payments.filter(p => p.status === 'requires_review').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Verified</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {payments.filter(p => p.status === 'verified').length}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <CurrencyDollarIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(payments.reduce((sum, p) => sum + p.amount, 0))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-1">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search payments..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FunnelIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="requires_review">Requires Review</option>
                  <option value="verified">Verified</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="all">All Payment Types</option>
                  <option value="permit_fee">Permit Fee</option>
                  <option value="registration_fee">Registration Fee</option>
                  <option value="renewal_fee">Renewal Fee</option>
                  <option value="penalty">Penalty</option>
                  <option value="processing_fee">Processing Fee</option>
                </select>
              </div>
              <div>
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                >
                  <option value="all">All Payment Methods</option>
                  <option value="bank_transfer">Bank Transfer</option>
                  <option value="mobile_money">Mobile Money</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="cheque">Cheque</option>
                  <option value="cash">Cash</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payments List */}
          <div className="space-y-4">
            {filteredPayments.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <p className="text-gray-500">No payments match your filters</p>
              </div>
            ) : (
              filteredPayments.map((payment) => (
                <div key={payment.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getPaymentMethodIcon(payment.paymentMethod)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-lg font-medium text-gray-900">{payment.applicantName}</h3>
                            {getStatusBadge(payment.status)}
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {payment.applicationId}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mb-3">
                            <div>
                              <div className="flex items-center mb-2">
                                <CurrencyDollarIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Amount: {formatCurrency(payment.amount, payment.currency)}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Type: {payment.paymentType.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Method: {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex items-center mb-2">
                                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Payment Date: {formatDate(payment.paymentDate)}
                                </span>
                              </div>
                              <div className="flex items-center mb-2">
                                <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Submitted: {formatDate(payment.submittedDate)}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-gray-600">
                                  Ref: {payment.transactionRef}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {payment.notes && (
                            <div className="mb-3">
                              <p className="text-sm text-orange-600">
                                <span className="font-medium">Note:</span> {payment.notes}
                              </p>
                            </div>
                          )}
                          
                          {payment.rejectionReason && (
                            <div className="mb-3">
                              <p className="text-sm text-red-600">
                                <span className="font-medium">Rejection Reason:</span> {payment.rejectionReason}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-1">
                            {payment.supportingDocs.map((doc, index) => (
                              <span key={index} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                <DocumentTextIcon className="h-3 w-3 mr-1" />
                                {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-end">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleViewDetails(payment)}
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View Details
                        </button>
                        {payment.status === 'pending' || payment.status === 'requires_review' ? (
                          <>
                            <button 
                              onClick={() => handleRejectPayment(payment)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                            >
                              <XCircleIcon className="h-4 w-4 mr-1" />
                              Reject
                            </button>
                            <button 
                              onClick={() => handleVerifyPayment(payment)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                            >
                              <CheckCircleIcon className="h-4 w-4 mr-1" />
                              Verify
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Verification Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {verificationAction ? 
                    `${verificationAction === 'verify' ? 'Verify' : 'Reject'} Payment - ${selectedPayment.id}` :
                    `Payment Details - ${selectedPayment.id}`
                  }
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p><span className="font-medium">Applicant:</span> {selectedPayment.applicantName}</p>
                    <p><span className="font-medium">Application ID:</span> {selectedPayment.applicationId}</p>
                    <p><span className="font-medium">Amount:</span> {formatCurrency(selectedPayment.amount, selectedPayment.currency)}</p>
                    <p><span className="font-medium">Payment Type:</span> {selectedPayment.paymentType.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Payment Method:</span> {selectedPayment.paymentMethod.replace('_', ' ')}</p>
                    <p><span className="font-medium">Transaction Ref:</span> {selectedPayment.transactionRef}</p>
                    <p><span className="font-medium">Payment Date:</span> {formatDate(selectedPayment.paymentDate)}</p>
                    <p><span className="font-medium">Submitted:</span> {formatDate(selectedPayment.submittedDate)}</p>
                  </div>
                </div>
                
                {verificationAction === 'reject' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rejection Reason *
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={3}
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      placeholder="Please provide a reason for rejection..."
                    />
                  </div>
                )}
                
                {verificationAction && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes
                    </label>
                    <textarea
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={2}
                      value={verificationNotes}
                      onChange={(e) => setVerificationNotes(e.target.value)}
                      placeholder="Optional notes..."
                    />
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                {verificationAction && (
                  <button
                    onClick={handleSubmitVerification}
                    disabled={verificationAction === 'reject' && !rejectionReason.trim()}
                    className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      verificationAction === 'verify'
                        ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                        : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {verificationAction === 'verify' ? 'Verify Payment' : 'Reject Payment'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentVerificationPage;