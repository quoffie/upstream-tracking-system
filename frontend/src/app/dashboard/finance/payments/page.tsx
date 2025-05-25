'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import {
  HomeIcon,
  PaymentIcon,
  AnalyticsIcon,
  DocumentIcon,
  HistoryIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon,
  CalculatorIcon
} from '../../../components/icons/DashboardIcons';

export default function PaymentProcessingPage() {
  const [activeTab, setActiveTab] = useState('payments');

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/finance', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Payment Processing', href: '/dashboard/finance/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Payment Verification', href: '/dashboard/finance/verification', icon: DocumentIcon, current: activeTab === 'verification' },
    { name: 'Revenue Analytics', href: '/dashboard/finance/analytics', icon: AnalyticsIcon, current: activeTab === 'analytics' },
    { name: 'Invoices & Receipts', href: '/dashboard/finance/invoices', icon: DocumentIcon, current: activeTab === 'invoices' },
    { name: 'Fee Management', href: '/dashboard/finance/fees', icon: CalculatorIcon, current: activeTab === 'fees' },
    { name: 'Transaction History', href: '/dashboard/finance/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Audit Logs', href: '/dashboard/finance/audit', icon: HistoryIcon, current: activeTab === 'audit' },
    { name: 'Notifications', href: '/dashboard/finance/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Profile/Settings', href: '/dashboard/finance/profile', icon: ProfileIcon, current: activeTab === 'profile' },
    { name: 'Help/Support', href: '/dashboard/finance/support', icon: SupportIcon, current: activeTab === 'support' },
  ];

  // Mock data for payment processing
  const pendingPayments = [
    { id: 'PAY-2023-0045', company: 'Tullow Ghana Ltd', type: 'Permit Fee', amount: '₵5,000', date: 'May 28, 2023', status: 'Pending' },
    { id: 'PAY-2023-0044', company: 'Eni Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 28, 2023', status: 'Pending' },
    { id: 'PAY-2023-0043', company: 'Kosmos Energy', type: 'Renewal Fee', amount: '₵3,500', date: 'May 27, 2023', status: 'Pending' },
    { id: 'PAY-2023-0042', company: 'Baker Hughes Ghana', type: 'Permit Fee', amount: '₵5,000', date: 'May 27, 2023', status: 'Pending' },
    { id: 'PAY-2023-0041', company: 'Schlumberger Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 26, 2023', status: 'Pending' },
  ];

  return (
    <DashboardLayout
      title="Finance Officer Dashboard"
      userRole="Finance Officer"
      userName="Michael Addo"
      userInitials="MA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Processing</h2>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Pending Payments</h3>
              <p className="text-sm text-gray-500">Process and manage incoming payments</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Process Batch
              </button>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Add Manual Payment
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingPayments.map((payment) => (
                  <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{payment.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{payment.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-green-600 hover:text-green-900 mr-3">Process</button>
                      <button className="text-red-600 hover:text-red-900">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Processing Steps</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  1
                </div>
                <h4 className="text-md font-medium">Verify Payment Details</h4>
              </div>
              <p className="text-sm text-gray-500">Check payment amount, reference, and company details against the system records.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  2
                </div>
                <h4 className="text-md font-medium">Confirm Receipt</h4>
              </div>
              <p className="text-sm text-gray-500">Review uploaded payment receipt or bank confirmation to validate the transaction.</p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                  3
                </div>
                <h4 className="text-md font-medium">Process Payment</h4>
              </div>
              <p className="text-sm text-gray-500">Mark as processed, generate receipt, and update application status to proceed in workflow.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}