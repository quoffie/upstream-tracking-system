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

export default function TransactionHistoryPage() {
  const [activeTab, setActiveTab] = useState('history');
  const [dateRange, setDateRange] = useState('last30');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

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

  // Mock data for transactions
  const transactions = [
    { id: 'TRX-2023-0541', company: 'Tullow Ghana Ltd', type: 'Permit Fee', amount: '₵5,000', status: 'Paid', date: 'May 31, 2023', reference: 'APP-2023-112', method: 'Bank Transfer' },
    { id: 'TRX-2023-0540', company: 'Eni Ghana', type: 'Application Fee', amount: '₵2,500', status: 'Paid', date: 'May 30, 2023', reference: 'APP-2023-111', method: 'Credit Card' },
    { id: 'TRX-2023-0539', company: 'Kosmos Energy', type: 'Renewal Fee', amount: '₵3,500', status: 'Paid', date: 'May 29, 2023', reference: 'APP-2023-110', method: 'Bank Transfer' },
    { id: 'TRX-2023-0538', company: 'Baker Hughes Ghana', type: 'Permit Fee', amount: '₵5,000', status: 'Pending', date: 'May 28, 2023', reference: 'APP-2023-109', method: 'Mobile Money' },
    { id: 'TRX-2023-0537', company: 'Schlumberger Ghana', type: 'Application Fee', amount: '₵2,500', status: 'Paid', date: 'May 27, 2023', reference: 'APP-2023-108', method: 'Bank Transfer' },
    { id: 'TRX-2023-0536', company: 'TechnipFMC Ghana', type: 'Application Fee', amount: '₵2,500', status: 'Paid', date: 'May 26, 2023', reference: 'APP-2023-107', method: 'Credit Card' },
    { id: 'TRX-2023-0535', company: 'Halliburton Ghana', type: 'Permit Fee', amount: '₵5,000', status: 'Cancelled', date: 'May 25, 2023', reference: 'APP-2023-106', method: 'Bank Transfer' },
    { id: 'TRX-2023-0534', company: 'Subsea 7', type: 'Renewal Fee', amount: '₵3,500', status: 'Paid', date: 'May 24, 2023', reference: 'APP-2023-105', method: 'Mobile Money' },
    { id: 'TRX-2023-0533', company: 'Tullow Ghana Ltd', type: 'Late Payment Fee', amount: '₵500', status: 'Paid', date: 'May 23, 2023', reference: 'APP-2023-104', method: 'Bank Transfer' },
    { id: 'TRX-2023-0532', company: 'Eni Ghana', type: 'Permit Fee', amount: '₵5,000', status: 'Refunded', date: 'May 22, 2023', reference: 'APP-2023-103', method: 'Credit Card' },
  ];

  // Filter transactions based on search query and filters
  const filteredTransactions = transactions.filter(transaction => {
    // Search query filter
    if (searchQuery && !(
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }
    
    // Status filter
    if (filterStatus !== 'all' && transaction.status.toLowerCase() !== filterStatus.toLowerCase()) {
      return false;
    }
    
    // Type filter
    if (filterType !== 'all' && transaction.type.toLowerCase() !== filterType.toLowerCase().replace(' fee', '').concat(' fee')) {
      return false;
    }
    
    return true;
  });

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
            <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                Export Data
              </button>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300">
                Print Report
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
              <select 
                id="dateRange" 
                name="dateRange" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="last7">Last 7 Days</option>
                <option value="last30">Last 30 Days</option>
                <option value="thisMonth">This Month</option>
                <option value="lastMonth">Last Month</option>
                <option value="custom">Custom Range</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                id="statusFilter" 
                name="statusFilter" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="typeFilter" className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label>
              <select 
                id="typeFilter" 
                name="typeFilter" 
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="application fee">Application Fee</option>
                <option value="permit fee">Permit Fee</option>
                <option value="renewal fee">Renewal Fee</option>
                <option value="late payment fee">Late Payment Fee</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input 
                type="text" 
                id="search" 
                name="search" 
                className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                placeholder="Search by ID, company, or reference"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {dateRange === 'custom' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input type="date" id="startDate" name="startDate" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input type="date" id="endDate" name="endDate" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
              </div>
            </div>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
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
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.company}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        transaction.status === 'Paid' ? 'bg-green-100 text-green-800' : 
                        transaction.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                        transaction.status === 'Cancelled' ? 'bg-red-100 text-red-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a href={`#${transaction.reference}`} className="text-blue-600 hover:text-blue-900">{transaction.reference}</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.method}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                      <button className="text-purple-600 hover:text-purple-900">Receipt</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">{filteredTransactions.length}</span> of <span className="font-medium">{transactions.length}</span> transactions
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Transaction Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-blue-800">Total Transactions</h4>
              <p className="text-2xl font-bold text-blue-600">10</p>
              <p className="text-sm text-blue-500">Last 30 days</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-green-800">Total Revenue</h4>
              <p className="text-2xl font-bold text-green-600">₵35,000</p>
              <p className="text-sm text-green-500">Last 30 days</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-yellow-800">Pending Payments</h4>
              <p className="text-2xl font-bold text-yellow-600">₵5,000</p>
              <p className="text-sm text-yellow-500">1 transaction</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-purple-800">Refunded Amount</h4>
              <p className="text-2xl font-bold text-purple-600">₵5,000</p>
              <p className="text-sm text-purple-500">1 transaction</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}