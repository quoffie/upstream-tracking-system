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

export default function PaymentVerificationPage() {
  const [activeTab, setActiveTab] = useState('verification');

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

  // Mock data for payment verification
  const pendingVerifications = [
    { 
      id: 'TRX-2023-0540', 
      company: 'Kosmos Energy', 
      type: 'Renewal Fee', 
      amount: '₵3,500', 
      date: 'May 24, 2023', 
      receiptUrl: '#',
      applicationId: 'APP-2023-0112'
    },
    { 
      id: 'TRX-2023-0537', 
      company: 'TechnipFMC Ghana', 
      type: 'Application Fee', 
      amount: '₵2,500', 
      date: 'May 23, 2023', 
      receiptUrl: '#',
      applicationId: 'APP-2023-0109'
    },
    { 
      id: 'TRX-2023-0536', 
      company: 'Halliburton Ghana', 
      type: 'Permit Fee', 
      amount: '₵5,000', 
      date: 'May 23, 2023', 
      receiptUrl: '#',
      applicationId: 'APP-2023-0108'
    },
    { 
      id: 'TRX-2023-0535', 
      company: 'Subsea 7', 
      type: 'Application Fee', 
      amount: '₵2,500', 
      date: 'May 22, 2023', 
      receiptUrl: '#',
      applicationId: 'APP-2023-0107'
    },
    { 
      id: 'TRX-2023-0534', 
      company: 'Modec Ghana', 
      type: 'Renewal Fee', 
      amount: '₵3,500', 
      date: 'May 22, 2023', 
      receiptUrl: '#',
      applicationId: 'APP-2023-0106'
    },
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Verification</h2>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Pending Verifications</h3>
              <p className="text-sm text-gray-500">Verify payment receipts and confirm transactions</p>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Filter
              </button>
              <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                Verify Selected
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
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
                    Receipt
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingVerifications.map((verification) => (
                  <tr key={verification.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{verification.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{verification.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{verification.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{verification.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{verification.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={verification.receiptUrl} className="text-blue-600 hover:text-blue-900">View Receipt</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`#${verification.applicationId}`} className="text-blue-600 hover:text-blue-900">{verification.applicationId}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-green-600 hover:text-green-900 mr-3">Verify</button>
                      <button className="text-red-600 hover:text-red-900">Reject</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Guidelines</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verify that the payment amount matches the required fee for the application type
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirm that the payment reference number on the receipt matches the transaction ID
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Check that the company name on the receipt matches the applicant company
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Ensure the payment date is valid and within the acceptable timeframe
              </li>
              <li className="flex items-start">
                <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Verify that the receipt is authentic and from an approved payment channel
              </li>
            </ul>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Actions</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-green-600 mb-2">Approve Payment</h4>
                <p className="text-sm text-gray-500">Mark the payment as verified and allow the application to proceed in the workflow. Generate an official receipt for the applicant.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-red-600 mb-2">Reject Payment</h4>
                <p className="text-sm text-gray-500">Flag the payment as invalid or insufficient. Provide a reason for rejection and notify the applicant to submit a new payment.</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="text-md font-medium text-blue-600 mb-2">Request Additional Information</h4>
                <p className="text-sm text-gray-500">If the payment details are unclear or incomplete, request additional documentation from the applicant before making a decision.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}