'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  ApprovalIcon,
  ApplicationIcon,
  WorkflowIcon,
  PaymentIcon,
  NotificationIcon,
  AuditIcon,
  ProfileIcon
} from '../../../components/icons/DashboardIcons';

export default function PaymentsTransactionsPage() {
  const [activeTab, setActiveTab] = useState('payments');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('30');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/admin', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Approvals Queue', href: '/dashboard/admin/approvals', icon: ApprovalIcon, current: activeTab === 'approvals' },
    { name: 'Applications Tracker', href: '/dashboard/admin/applications', icon: ApplicationIcon, current: activeTab === 'applications' },
    { name: 'Workflow Status Viewer', href: '/dashboard/admin/workflow', icon: WorkflowIcon, current: activeTab === 'workflow' },
    { name: 'Payments & Transactions', href: '/dashboard/admin/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Notifications & Escalations', href: '/dashboard/admin/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Audit Logs', href: '/dashboard/admin/audit', icon: AuditIcon, current: activeTab === 'audit' },
    { name: 'Profile/Settings', href: '/dashboard/admin/profile', icon: ProfileIcon, current: activeTab === 'profile' },
  ];

  // Mock data for payments and transactions
  const transactions = [
    {
      id: 'TXN-2023-0125',
      applicationId: 'APP-2023-0050',
      company: 'Tullow Ghana Ltd',
      type: 'Regular Permit Fee',
      amount: 2500.00,
      currency: 'GHS',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      date: '2023-05-30',
      reference: 'REF-TUL-2023-0050',
      verifiedBy: 'Finance Officer',
      verificationDate: '2023-05-30'
    },
    {
      id: 'TXN-2023-0124',
      applicationId: 'APP-2023-0049',
      company: 'Eni Ghana',
      type: 'Company Registration Fee',
      amount: 5000.00,
      currency: 'GHS',
      paymentMethod: 'Online Payment',
      status: 'Pending Verification',
      date: '2023-05-29',
      reference: 'REF-ENI-2023-0049',
      verifiedBy: null,
      verificationDate: null
    },
    {
      id: 'TXN-2023-0123',
      applicationId: 'APP-2023-0048',
      company: 'Kosmos Energy',
      type: 'Rotator Permit Fee',
      amount: 1500.00,
      currency: 'GHS',
      paymentMethod: 'Bank Transfer',
      status: 'Failed',
      date: '2023-05-28',
      reference: 'REF-KOS-2023-0048',
      verifiedBy: null,
      verificationDate: null
    },
    {
      id: 'TXN-2023-0122',
      applicationId: 'APP-2023-0047',
      company: 'Baker Hughes Ghana',
      type: 'JV Compliance Fee',
      amount: 3000.00,
      currency: 'GHS',
      paymentMethod: 'Cheque',
      status: 'Completed',
      date: '2023-05-27',
      reference: 'REF-BHG-2023-0047',
      verifiedBy: 'Finance Officer',
      verificationDate: '2023-05-28'
    },
    {
      id: 'TXN-2023-0121',
      applicationId: 'APP-2023-0046',
      company: 'Schlumberger Ghana',
      type: 'Local Content Fee',
      amount: 2000.00,
      currency: 'GHS',
      paymentMethod: 'Online Payment',
      status: 'Refunded',
      date: '2023-05-26',
      reference: 'REF-SCH-2023-0046',
      verifiedBy: 'Finance Officer',
      verificationDate: '2023-05-27'
    },
    {
      id: 'TXN-2023-0120',
      applicationId: 'APP-2023-0045',
      company: 'Total Ghana',
      type: 'Regular Permit Fee',
      amount: 2500.00,
      currency: 'GHS',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      date: '2023-05-25',
      reference: 'REF-TOT-2023-0045',
      verifiedBy: 'Finance Officer',
      verificationDate: '2023-05-25'
    }
  ];

  const filteredTransactions = transactions.filter(txn => {
    const matchesSearch = txn.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         txn.applicationId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
    const daysCutoff = parseInt(selectedTimeframe);
    const txnDate = new Date(txn.date);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysCutoff);
    const matchesTimeframe = selectedTimeframe === 'all' || txnDate >= cutoffDate;
    return matchesSearch && matchesStatus && matchesTimeframe;
  });

  const handleVerifyPayment = (id: string) => {
    alert(`Verifying payment ${id}`);
  };

  const handleRefundPayment = (id: string) => {
    const reason = prompt('Please provide a reason for refund:');
    if (reason) {
      alert(`Processing refund for payment ${id} with reason: ${reason}`);
    }
  };

  const handleViewReceipt = (id: string) => {
    alert(`Viewing receipt for transaction ${id}`);
  };

  const handleExportTransactions = () => {
    alert('Exporting transaction data...');
  };

  const handleGenerateReport = () => {
    alert('Generating financial report...');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100';
      case 'Pending Verification': return 'text-yellow-600 bg-yellow-100';
      case 'Failed': return 'text-red-600 bg-red-100';
      case 'Refunded': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPaymentMethodColor = (method: string) => {
    switch (method) {
      case 'Bank Transfer': return 'text-blue-600 bg-blue-100';
      case 'Online Payment': return 'text-green-600 bg-green-100';
      case 'Cheque': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const totalAmount = filteredTransactions.reduce((sum, txn) => {
    return txn.status === 'Completed' ? sum + txn.amount : sum;
  }, 0);

  const pendingAmount = filteredTransactions.reduce((sum, txn) => {
    return txn.status === 'Pending Verification' ? sum + txn.amount : sum;
  }, 0);

  const refundedAmount = filteredTransactions.reduce((sum, txn) => {
    return txn.status === 'Refunded' ? sum + txn.amount : sum;
  }, 0);

  return (
    <DashboardLayout
      title="Commission Admin Dashboard"
      userRole="Commission Admin"
      userName="Admin Panel"
      userInitials="CA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payments & Transactions</h2>
              <p className="text-sm text-gray-500">Monitor and manage all payment transactions</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={handleGenerateReport}
                className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700"
              >
                Generate Report
              </button>
              <button 
                onClick={handleExportTransactions}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
              >
                Export Data
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <input
                type="text"
                placeholder="Search by company, transaction ID, or application ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Pending Verification">Pending Verification</option>
                <option value="Failed">Failed</option>
                <option value="Refunded">Refunded</option>
              </select>
            </div>
            <div>
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Time</option>
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
              </select>
            </div>
          </div>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-900">Total Revenue</h3>
              <p className="text-2xl font-bold text-green-600">GHS {totalAmount.toLocaleString()}</p>
              <p className="text-xs text-green-600">{filteredTransactions.filter(t => t.status === 'Completed').length} transactions</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-yellow-900">Pending Verification</h3>
              <p className="text-2xl font-bold text-yellow-600">GHS {pendingAmount.toLocaleString()}</p>
              <p className="text-xs text-yellow-600">{filteredTransactions.filter(t => t.status === 'Pending Verification').length} transactions</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900">Refunded</h3>
              <p className="text-2xl font-bold text-blue-600">GHS {refundedAmount.toLocaleString()}</p>
              <p className="text-xs text-blue-600">{filteredTransactions.filter(t => t.status === 'Refunded').length} transactions</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-900">Failed Payments</h3>
              <p className="text-2xl font-bold text-red-600">{filteredTransactions.filter(t => t.status === 'Failed').length}</p>
              <p className="text-xs text-red-600">Requires attention</p>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verified By
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 hover:text-blue-900">
                      <button onClick={() => alert(`Viewing application ${transaction.applicationId}`)}>
                        {transaction.applicationId}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {transaction.currency} {transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentMethodColor(transaction.paymentMethod)}`}>
                        {transaction.paymentMethod}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.verifiedBy || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => handleViewReceipt(transaction.id)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Receipt
                      </button>
                      {transaction.status === 'Pending Verification' && (
                        <button
                          onClick={() => handleVerifyPayment(transaction.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Verify
                        </button>
                      )}
                      {(transaction.status === 'Completed' || transaction.status === 'Failed') && (
                        <button
                          onClick={() => handleRefundPayment(transaction.id)}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Refund
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No transactions found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Payment Methods Summary */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Bank Transfer</h4>
              <p className="text-2xl font-bold text-blue-600">
                {filteredTransactions.filter(t => t.paymentMethod === 'Bank Transfer').length}
              </p>
              <p className="text-sm text-gray-500">transactions</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Online Payment</h4>
              <p className="text-2xl font-bold text-green-600">
                {filteredTransactions.filter(t => t.paymentMethod === 'Online Payment').length}
              </p>
              <p className="text-sm text-gray-500">transactions</p>
            </div>
            <div className="border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Cheque</h4>
              <p className="text-2xl font-bold text-purple-600">
                {filteredTransactions.filter(t => t.paymentMethod === 'Cheque').length}
              </p>
              <p className="text-sm text-gray-500">transactions</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}