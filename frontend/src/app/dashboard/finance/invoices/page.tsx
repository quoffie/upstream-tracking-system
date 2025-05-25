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

export default function InvoicesReceiptsPage() {
  const [activeTab, setActiveTab] = useState('invoices');
  const [currentView, setCurrentView] = useState('invoices'); // 'invoices' or 'receipts'

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

  // Mock data for invoices
  const invoices = [
    { id: 'INV-2023-0045', company: 'Tullow Ghana Ltd', type: 'Permit Fee', amount: '₵5,000', date: 'May 28, 2023', status: 'Sent', dueDate: 'Jun 11, 2023' },
    { id: 'INV-2023-0044', company: 'Eni Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 28, 2023', status: 'Sent', dueDate: 'Jun 11, 2023' },
    { id: 'INV-2023-0043', company: 'Kosmos Energy', type: 'Renewal Fee', amount: '₵3,500', date: 'May 27, 2023', status: 'Paid', dueDate: 'Jun 10, 2023' },
    { id: 'INV-2023-0042', company: 'Baker Hughes Ghana', type: 'Permit Fee', amount: '₵5,000', date: 'May 27, 2023', status: 'Overdue', dueDate: 'Jun 10, 2023' },
    { id: 'INV-2023-0041', company: 'Schlumberger Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 26, 2023', status: 'Paid', dueDate: 'Jun 09, 2023' },
  ];

  // Mock data for receipts
  const receipts = [
    { id: 'REC-2023-0043', company: 'Kosmos Energy', type: 'Renewal Fee', amount: '₵3,500', date: 'May 27, 2023', invoiceId: 'INV-2023-0043' },
    { id: 'REC-2023-0041', company: 'Schlumberger Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 26, 2023', invoiceId: 'INV-2023-0041' },
    { id: 'REC-2023-0039', company: 'TechnipFMC Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 25, 2023', invoiceId: 'INV-2023-0039' },
    { id: 'REC-2023-0038', company: 'Tullow Ghana Ltd', type: 'Permit Fee', amount: '₵5,000', date: 'May 24, 2023', invoiceId: 'INV-2023-0038' },
    { id: 'REC-2023-0037', company: 'Eni Ghana', type: 'Application Fee', amount: '₵2,500', date: 'May 24, 2023', invoiceId: 'INV-2023-0037' },
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Invoices & Receipts</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentView('invoices')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentView === 'invoices' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Invoices
              </button>
              <button 
                onClick={() => setCurrentView('receipts')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentView === 'receipts' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Receipts
              </button>
            </div>
          </div>
          
          {currentView === 'invoices' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Manage Invoices</h3>
                  <p className="text-sm text-gray-500">Create, send, and track invoices</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Filter
                  </button>
                  <a href="/dashboard/finance/invoices/generate" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                    Generate Invoice
                  </a>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Issue Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Due Date
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
                    {invoices.map((invoice) => (
                      <tr key={invoice.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{invoice.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{invoice.dueDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : invoice.status === 'Overdue' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-purple-600 hover:text-purple-900 mr-3">Download</button>
                          <button className="text-green-600 hover:text-green-900">Send</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {currentView === 'receipts' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Manage Receipts</h3>
                  <p className="text-sm text-gray-500">View and download payment receipts</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700">
                    Batch Download
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Receipt ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Company
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Payment Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {receipts.map((receipt) => (
                      <tr key={receipt.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{receipt.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.company}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receipt.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <a href={`#${receipt.invoiceId}`} className="text-blue-600 hover:text-blue-900">{receipt.invoiceId}</a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                          <button className="text-purple-600 hover:text-purple-900 mr-3">Download</button>
                          <button className="text-green-600 hover:text-green-900">Send</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        {/* Generate Invoice Form */}
        {currentView === 'invoices' && (
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Invoice Generation</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                  <select id="company" name="company" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Select a company</option>
                    <option>Tullow Ghana Ltd</option>
                    <option>Eni Ghana</option>
                    <option>Kosmos Energy</option>
                    <option>Baker Hughes Ghana</option>
                    <option>Schlumberger Ghana</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="feeType" className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                  <select id="feeType" name="feeType" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                    <option>Select fee type</option>
                    <option>Application Fee</option>
                    <option>Permit Fee</option>
                    <option>Renewal Fee</option>
                    <option>Late Payment Fee</option>
                    <option>Other Fee</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₵)</label>
                  <input type="text" id="amount" name="amount" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input type="date" id="dueDate" name="dueDate" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="description" name="description" rows={3} className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Invoice description..."></textarea>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button type="button" className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}