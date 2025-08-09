'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  BanknotesIcon,
  ChartBarIcon,
  CalendarIcon,
  ArrowDownTrayIcon
} from '@heroicons/react/24/outline';

interface FinancialMetrics {
  totalRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
  completedTransactions: number;
  revenueGrowth: number;
  averageTransactionValue: number;
}

interface RevenueData {
  month: string;
  revenue: number;
  transactions: number;
}

export default function FinancialOverviewPage() {
  const router = useRouter();
  const [metrics, setMetrics] = useState<FinancialMetrics>({
    totalRevenue: 2450000,
    monthlyRevenue: 185000,
    pendingPayments: 45000,
    completedTransactions: 1247,
    revenueGrowth: 12.5,
    averageTransactionValue: 1965
  });

  const [revenueData] = useState<RevenueData[]>([
    { month: 'Jan', revenue: 165000, transactions: 89 },
    { month: 'Feb', revenue: 178000, transactions: 95 },
    { month: 'Mar', revenue: 185000, transactions: 102 },
    { month: 'Apr', revenue: 192000, transactions: 108 },
    { month: 'May', revenue: 185000, transactions: 98 }
  ]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleExportReport = () => {
    // Simulate report export
    alert('Financial report exported successfully!');
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
              <h1 className="text-3xl font-bold text-gray-900">Financial Overview</h1>
              <p className="text-gray-600 mt-2">Monitor revenue, payments, and financial performance</p>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleExportReport}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/financial-management')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Manage Finances
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CurrencyDollarIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(metrics.totalRevenue)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BanknotesIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(metrics.monthlyRevenue)}</p>
                <div className="flex items-center mt-1">
                  <ArrowTrendingUpIcon className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{metrics.revenueGrowth}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ChartBarIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Payments</p>
                <p className="text-2xl font-semibold text-gray-900">{formatCurrency(metrics.pendingPayments)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CalendarIcon className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Completed Transactions</p>
                <p className="text-2xl font-semibold text-gray-900">{metrics.completedTransactions.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Monthly Revenue Trend</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {revenueData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-gray-900 w-8">{data.month}</span>
                    <div className="flex-1">
                      <div className="bg-gray-200 rounded-full h-2 w-48">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(data.revenue / 200000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{formatCurrency(data.revenue)}</p>
                    <p className="text-xs text-gray-500">{data.transactions} transactions</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/payments')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <BanknotesIcon className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-medium text-gray-900">View Payments</h4>
                <p className="text-sm text-gray-500">Review payment transactions</p>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/reports')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <ChartBarIcon className="h-6 w-6 text-green-600 mb-2" />
                <h4 className="font-medium text-gray-900">Generate Reports</h4>
                <p className="text-sm text-gray-500">Create financial reports</p>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/analytics')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left"
              >
                <ArrowTrendingUpIcon className="h-6 w-6 text-purple-600 mb-2" />
                <h4 className="font-medium text-gray-900">View Analytics</h4>
                <p className="text-sm text-gray-500">Detailed financial analytics</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}