'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function FinancialOverviewPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [financialData, setFinancialData] = useState({
    totalRevenue: { amount: '₵12.4M', change: '+18%', trend: 'up' },
    feesCollected: { amount: '₵8.7M', change: '+12%', trend: 'up' },
    pendingPayments: { amount: '₵2.1M', transactions: 23 },
    overduePayments: { amount: '₵450K', count: 8 }
  });

  const [monthlyData, setMonthlyData] = useState([
    { month: 'Jan', revenue: 10.2, fees: 7.1, pending: 1.8 },
    { month: 'Feb', revenue: 11.5, fees: 8.0, pending: 2.1 },
    { month: 'Mar', revenue: 12.4, fees: 8.7, pending: 2.1 },
  ]);

  return (
    <EnhancedDashboardLayout
        title="Financial Overview"
      sidebarItems={getCommissionAdminMenuItems(pathname)}
      userRole="commission_admin"
      userName="John Smith"
      userInitials="JS"
      userAvatar=""
    >
      <div className="space-y-8">
        {/* Page Header */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
              <p className="text-gray-600 mt-2">Comprehensive financial metrics and revenue tracking</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Report
              </button>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                Generate Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Financial Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-green-600">GH{financialData.totalRevenue.amount}</div>
                    <div className="text-sm text-gray-600">Total Revenue (Monthly)</div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">{financialData.totalRevenue.change} from last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <BanknotesIcon className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-blue-600">GH{financialData.feesCollected.amount}</div>
                    <div className="text-sm text-gray-600">Fees Collected</div>
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <ArrowUpIcon className="h-4 w-4 text-blue-600 mr-1" />
                  <span className="text-xs text-blue-600">{financialData.feesCollected.change} from last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <ClockIcon className="h-8 w-8 text-purple-600 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-purple-600">GH{financialData.pendingPayments.amount}</div>
                    <div className="text-sm text-gray-600">Pending Payments</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-2">{financialData.pendingPayments.transactions} transactions</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-8 w-8 text-orange-600 mr-3" />
                  <div>
                    <div className="text-3xl font-bold text-orange-600">GH{financialData.overduePayments.amount}</div>
                    <div className="text-sm text-gray-600">Overdue Payments</div>
                  </div>
                </div>
                <div className="text-xs text-red-600 mt-2">{financialData.overduePayments.count} overdue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Trends Chart */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Monthly Financial Trends</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              {monthlyData.map((data, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-lg font-semibold text-gray-900">{data.month}</div>
                  <div className="mt-2 space-y-1">
                    <div className="text-sm text-green-600">Revenue: ₵{data.revenue}M</div>
                    <div className="text-sm text-blue-600">Fees: ₵{data.fees}M</div>
                    <div className="text-sm text-purple-600">Pending: ₵{data.pending}M</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Payment Status Summary */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Payment Status Summary</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-sm font-medium">Tullow Ghana - License Fee</span>
                    <span className="text-sm font-bold text-green-600">₵7.8M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">Kosmos Energy - Production Royalty</span>
                    <span className="text-sm font-bold text-blue-600">₵6.5M</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="text-sm font-medium">Eni Ghana - Environmental Fee</span>
                    <span className="text-sm font-bold text-purple-600">₵3.2M</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Overdue Items</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <span className="text-sm font-medium">Mobil - Late Payment</span>
                    <span className="text-sm font-bold text-red-600">₵180K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                    <span className="text-sm font-medium">Agip - Penalty Fee</span>
                    <span className="text-sm font-bold text-orange-600">₵120K</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="text-sm font-medium">Eni - Processing Fee</span>
                    <span className="text-sm font-bold text-yellow-600">₵150K</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </EnhancedDashboardLayout>
  );
}