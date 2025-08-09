'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../app/components/layouts/DashboardMenus';
import { CurrencyDollarIcon, ClockIcon, CalculatorIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function FinancialsPage() {
  const pathname = usePathname();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [activeTab, setActiveTab] = useState('overview');

  const paymentHistory = [
    {
      id: 1,
      date: '2024-06-15',
      description: 'Annual Permit Renewal',
      amount: 25000,
      status: 'Paid',
      reference: 'PAY-2024-001'
    },
    {
      id: 2,
      date: '2024-05-20',
      description: 'Personnel Registration Fee',
      amount: 5000,
      status: 'Paid',
      reference: 'PAY-2024-002'
    },
    {
      id: 3,
      date: '2024-08-01',
      description: 'Quarterly Compliance Fee',
      amount: 15000,
      status: 'Pending',
      reference: 'PAY-2024-003'
    }
  ];

  const renewalDates = [
    {
      permit: 'Offshore Drilling Permit',
      expiryDate: '2024-12-31',
      fee: 25000,
      status: 'Due Soon'
    },
    {
      permit: 'Environmental Compliance',
      expiryDate: '2024-09-15',
      fee: 10000,
      status: 'Overdue'
    },
    {
      permit: 'Safety Certificate',
      expiryDate: '2025-03-20',
      fee: 8000,
      status: 'Current'
    }
  ];

  const monthlyExpenses = [
    { month: 'Jan', amount: 45000 },
    { month: 'Feb', amount: 52000 },
    { month: 'Mar', amount: 48000 },
    { month: 'Apr', amount: 61000 },
    { month: 'May', amount: 55000 },
    { month: 'Jun', amount: 58000 }
  ];

  const expenseBreakdown = [
    { name: 'Permit Fees', value: 45, amount: 180000 },
    { name: 'Personnel Costs', value: 30, amount: 120000 },
    { name: 'Compliance', value: 15, amount: 60000 },
    { name: 'Other', value: 10, amount: 40000 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
      case 'Current':
        return 'text-green-600 bg-green-100';
      case 'Pending':
      case 'Due Soon':
        return 'text-yellow-600 bg-yellow-100';
      case 'Overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <DashboardLayout
      title="Financial Management"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Management</h1>
            <p className="text-gray-600">Track payments, fees, and renewal schedules</p>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700">
            <CurrencyDollarIcon className="h-5 w-5" />
            <span>Make Payment</span>
          </button>
        </div>

        {/* Financial Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Total Paid</h3>
                <p className="text-3xl font-bold text-green-600">GH₵400,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ClockIcon className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">GH₵15,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <DocumentTextIcon className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Overdue</h3>
                <p className="text-3xl font-bold text-red-600">GH₵10,000</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <CalculatorIcon className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">This Year</h3>
                <p className="text-3xl font-bold text-blue-600">GH₵425,000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'history'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Payment History
              </button>
              <button
                onClick={() => setActiveTab('renewals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'renewals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Renewal Due Dates
              </button>
              <button
                onClick={() => setActiveTab('calculator')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'calculator'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Fee Calculator
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Expenses Chart */}
                <div className="bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Expenses</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyExpenses}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`GH₵${value.toLocaleString()}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="amount" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Expense Breakdown */}
                <div className="bg-white">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Expense Breakdown</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value, name, props) => [`GH₵${props.payload.amount.toLocaleString()}`, name]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reference
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paymentHistory.map((payment) => (
                      <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{payment.description}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          GH₵{payment.amount.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(payment.status)}`}>
                            {payment.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {payment.reference}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900">View Receipt</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'renewals' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Permit Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Expiry Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Renewal Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {renewalDates.map((renewal, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{renewal.permit}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {renewal.expiryDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          GH₵{renewal.fee.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(renewal.status)}`}>
                            {renewal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-blue-600 hover:text-blue-900 mr-4">Renew</button>
                          <button className="text-gray-600 hover:text-gray-900">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'calculator' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Calculator</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Permit Type</label>
                      <select className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                        <option value="">Select permit type</option>
                        <option value="drilling">Offshore Drilling Permit</option>
                        <option value="environmental">Environmental Compliance</option>
                        <option value="safety">Safety Certificate</option>
                        <option value="personnel">Personnel Registration</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Number of Personnel</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter number of personnel"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Duration (months)</label>
                      <input
                        type="number"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter duration"
                      />
                    </div>
                    
                    <div className="bg-white rounded-lg p-4 border">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-gray-900">Estimated Total:</span>
                        <span className="text-2xl font-bold text-blue-600">GH₵0</span>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                      Calculate Fees
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}