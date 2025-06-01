'use client';

import { useState } from 'react';
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ArrowTrendingUpIcon,
  CalendarIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface MetricCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease';
  icon: React.ComponentType<any>;
}

interface ChartData {
  name: string;
  value: number;
  amount?: number;
  transactions?: number;
  growth?: number;
}

interface PaymentMethodData {
  method: string;
  amount: number;
  percentage: number;
  transactions: number;
  avgAmount: number;
}

interface TopCompany {
  name: string;
  amount: number;
  transactions: number;
  lastPayment: string;
}

export default function FinancialAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data
  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: 'GH₵2,450,000',
      change: '+12.5%',
      changeType: 'increase',
      icon: CurrencyDollarIcon
    },
    {
      title: 'Total Transactions',
      value: '1,234',
      change: '+8.2%',
      changeType: 'increase',
      icon: ChartBarIcon
    },
    {
      title: 'Average Transaction',
      value: 'GH₵1,986',
      change: '-2.1%',
      changeType: 'decrease',
      icon: ArrowTrendingUpIcon
    },
    {
      title: 'Monthly Growth',
      value: '15.3%',
      change: '+3.2%',
      changeType: 'increase',
      icon: CalendarIcon
    }
  ];

  const monthlyRevenueData: ChartData[] = [
    { name: 'Jan', value: 180000 },
    { name: 'Feb', value: 220000 },
    { name: 'Mar', value: 195000 },
    { name: 'Apr', value: 280000 },
    { name: 'May', value: 310000 },
    { name: 'Jun', value: 265000 },
    { name: 'Jul', value: 340000 },
    { name: 'Aug', value: 385000 },
    { name: 'Sep', value: 420000 },
    { name: 'Oct', value: 390000 },
    { name: 'Nov', value: 450000 },
    { name: 'Dec', value: 485000 }
  ];

  const paymentMethodsData: ChartData[] = [
    { name: 'Bank Transfer', value: 45, amount: 1102500 },
    { name: 'Mobile Money', value: 30, amount: 735000 },
    { name: 'Credit Card', value: 15, amount: 367500 },
    { name: 'Cash', value: 10, amount: 245000 }
  ];

  const dailyTransactionsData: ChartData[] = [        
    { name: 'Mon', value: 45, transactions: 45, amount: 89000 }, 
    { name: 'Tue', value: 52, transactions: 52, amount: 103000 },
    { name: 'Wed', value: 38, transactions: 38, amount: 75000 }, 
    { name: 'Thu', value: 61, transactions: 61, amount: 121000 },
    { name: 'Fri', value: 55, transactions: 55, amount: 109000 },
    { name: 'Sat', value: 42, transactions: 42, amount: 83000 },
    { name: 'Sun', value: 35, transactions: 35, amount: 69000 }
  ];

  const paymentTypeDistribution: ChartData[] = [
    { name: 'Permit Fees', value: 40, amount: 980000 },
    { name: 'Registration', value: 25, amount: 612500 },
    { name: 'Penalties', value: 20, amount: 490000 },
    { name: 'Renewals', value: 15, amount: 367500 }
  ];

  const monthlyGrowthData: ChartData[] = [
    { name: 'Jan', value: 5.2, growth: 5.2 },
    { name: 'Feb', value: 8.1, growth: 8.1 },
    { name: 'Mar', value: -2.3, growth: -2.3 },
    { name: 'Apr', value: 12.7, growth: 12.7 },
    { name: 'May', value: 15.4, growth: 15.4 },
    { name: 'Jun', value: -8.9, growth: -8.9 },
    { name: 'Jul', value: 18.2, growth: 18.2 },
    { name: 'Aug', value: 13.6, growth: 13.6 },
    { name: 'Sep', value: 9.1, growth: 9.1 },
    { name: 'Oct', value: -7.2, growth: -7.2 },
    { name: 'Nov', value: 15.4, growth: 15.4 },
    { name: 'Dec', value: 7.8, growth: 7.8 }
  ];

  const paymentMethodDetails: PaymentMethodData[] = [
    {
      method: 'Bank Transfer',
      amount: 1102500,
      percentage: 45,
      transactions: 556,
      avgAmount: 1983
    },
    {
      method: 'Mobile Money',
      amount: 735000,
      percentage: 30,
      transactions: 370,
      avgAmount: 1986
    },
    {
      method: 'Credit Card',
      amount: 367500,
      percentage: 15,
      transactions: 185,
      avgAmount: 1986
    },
    {
      method: 'Cash',
      amount: 245000,
      percentage: 10,
      transactions: 123,
      avgAmount: 1992
    }
  ];

  const topPayingCompanies: TopCompany[] = [
    {
      name: 'Ghana Oil Company Ltd',
      amount: 125000,
      transactions: 15,
      lastPayment: '2024-01-15'
    },
    {
      name: 'Tullow Ghana Limited',
      amount: 98000,
      transactions: 12,
      lastPayment: '2024-01-14'
    },
    {
      name: 'Eni Ghana Exploration',
      amount: 87500,
      transactions: 10,
      lastPayment: '2024-01-13'
    },
    {
      name: 'Kosmos Energy Ghana',
      amount: 76000,
      transactions: 9,
      lastPayment: '2024-01-12'
    },
    {
      name: 'Springfield E&P Limited',
      amount: 65000,
      transactions: 8,
      lastPayment: '2024-01-11'
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Financial Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive payment and revenue analysis</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{metric.value}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {metric.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue Trend */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `GH₵${(value / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(value: number) => [formatCurrency(value), 'Revenue']} />
              <Area type="monotone" dataKey="value" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethodsData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {paymentMethodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Transactions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Transactions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyTransactionsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="transactions" fill="#3B82F6" name="Transactions" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Type Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={paymentTypeDistribution} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" tickFormatter={(value) => `${value}%`} />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value: number) => [`${value}%`, 'Percentage']} />
              <Bar dataKey="value" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Growth Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Growth Analysis</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={monthlyGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `${value}%`} />
            <Tooltip formatter={(value: number) => [`${value}%`, 'Growth']} />
            <Line type="monotone" dataKey="growth" stroke="#F59E0B" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Payment Method Details & Top Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Method Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Details</h3>
          <div className="space-y-4">
            {paymentMethodDetails.map((method, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{method.method}</h4>
                  <p className="text-sm text-gray-600">{method.transactions} transactions</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(method.amount)}</p>
                  <p className="text-sm text-gray-600">{method.percentage}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Paying Companies */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Paying Companies</h3>
          <div className="space-y-4">
            {topPayingCompanies.map((company, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{company.name}</h4>
                  <p className="text-sm text-gray-600">
                    {company.transactions} transactions • Last: {formatDate(company.lastPayment)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{formatCurrency(company.amount)}</p>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}