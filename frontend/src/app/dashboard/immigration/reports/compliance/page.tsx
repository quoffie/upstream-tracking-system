'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ChartBarIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  BuildingOfficeIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface ComplianceStats {
  id: string;
  company: string;
  totalVisas: number;
  validVisas: number;
  expiredVisas: number;
  expiringSoon: number;
  complianceRate: number;
  lastAuditDate: string;
  nextAuditDate: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  violations: number;
  pendingRenewals: number;
  status: 'Compliant' | 'Non-Compliant' | 'Under Review' | 'Action Required';
}

interface VisaTypeStats {
  type: string;
  total: number;
  valid: number;
  expired: number;
  expiringSoon: number;
  complianceRate: number;
}

interface MonthlyTrend {
  month: string;
  totalVisas: number;
  complianceRate: number;
  violations: number;
  renewals: number;
}

const mockComplianceStats: ComplianceStats[] = [
  {
    id: 'CS-001',
    company: 'Tullow Oil Ghana',
    totalVisas: 156,
    validVisas: 142,
    expiredVisas: 8,
    expiringSoon: 6,
    complianceRate: 91.0,
    lastAuditDate: '2023-12-15',
    nextAuditDate: '2024-06-15',
    riskLevel: 'Low',
    violations: 2,
    pendingRenewals: 14,
    status: 'Compliant'
  },
  {
    id: 'CS-002',
    company: 'ExxonMobil Ghana',
    totalVisas: 203,
    validVisas: 178,
    expiredVisas: 15,
    expiringSoon: 10,
    complianceRate: 87.7,
    lastAuditDate: '2023-11-20',
    nextAuditDate: '2024-05-20',
    riskLevel: 'Medium',
    violations: 5,
    pendingRenewals: 25,
    status: 'Under Review'
  },
  {
    id: 'CS-003',
    company: 'CNOOC Ghana',
    totalVisas: 89,
    validVisas: 72,
    expiredVisas: 12,
    expiringSoon: 5,
    complianceRate: 80.9,
    lastAuditDate: '2023-10-10',
    nextAuditDate: '2024-04-10',
    riskLevel: 'High',
    violations: 8,
    pendingRenewals: 17,
    status: 'Action Required'
  },
  {
    id: 'CS-004',
    company: 'Repsol Ghana',
    totalVisas: 67,
    validVisas: 45,
    expiredVisas: 18,
    expiringSoon: 4,
    complianceRate: 67.2,
    lastAuditDate: '2023-09-05',
    nextAuditDate: '2024-03-05',
    riskLevel: 'Critical',
    violations: 15,
    pendingRenewals: 22,
    status: 'Non-Compliant'
  },
  {
    id: 'CS-005',
    company: 'Equinor Ghana',
    totalVisas: 134,
    validVisas: 125,
    expiredVisas: 4,
    expiringSoon: 5,
    complianceRate: 93.3,
    lastAuditDate: '2024-01-08',
    nextAuditDate: '2024-07-08',
    riskLevel: 'Low',
    violations: 1,
    pendingRenewals: 9,
    status: 'Compliant'
  }
];

const mockVisaTypeStats: VisaTypeStats[] = [
  {
    type: 'Business Visa',
    total: 245,
    valid: 218,
    expired: 20,
    expiringSoon: 7,
    complianceRate: 89.0
  },
  {
    type: 'Multiple Entry',
    total: 298,
    valid: 267,
    expired: 22,
    expiringSoon: 9,
    complianceRate: 89.6
  },
  {
    type: 'Transit Visa',
    total: 45,
    valid: 38,
    expired: 5,
    expiringSoon: 2,
    complianceRate: 84.4
  },
  {
    type: 'Tourist Visa',
    total: 61,
    valid: 39,
    expired: 10,
    expiringSoon: 12,
    complianceRate: 63.9
  }
];

const mockMonthlyTrends: MonthlyTrend[] = [
  { month: 'Jul 2023', totalVisas: 580, complianceRate: 85.2, violations: 28, renewals: 45 },
  { month: 'Aug 2023', totalVisas: 595, complianceRate: 86.1, violations: 25, renewals: 52 },
  { month: 'Sep 2023', totalVisas: 612, complianceRate: 84.8, violations: 31, renewals: 48 },
  { month: 'Oct 2023', totalVisas: 628, complianceRate: 87.3, violations: 22, renewals: 56 },
  { month: 'Nov 2023', totalVisas: 641, complianceRate: 88.7, violations: 19, renewals: 61 },
  { month: 'Dec 2023', totalVisas: 649, complianceRate: 89.4, violations: 16, renewals: 58 },
  { month: 'Jan 2024', totalVisas: 649, complianceRate: 87.6, violations: 31, renewals: 87 }
];

const getRiskLevelColor = (level: string) => {
  switch (level) {
    case 'Low':
      return 'bg-green-100 text-green-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Critical':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Compliant':
      return 'bg-green-100 text-green-800';
    case 'Non-Compliant':
      return 'bg-red-100 text-red-800';
    case 'Under Review':
      return 'bg-blue-100 text-blue-800';
    case 'Action Required':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Compliant':
      return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'Non-Compliant':
      return <XCircleIcon className="h-5 w-5 text-red-600" />;
    case 'Under Review':
      return <ClockIcon className="h-5 w-5 text-blue-600" />;
    case 'Action Required':
      return <ExclamationTriangleIcon className="h-5 w-5 text-orange-600" />;
    default:
      return <ClockIcon className="h-5 w-5 text-gray-500" />;
  }
};

export default function VisaComplianceStatsPage() {
  const [complianceStats, setComplianceStats] = useState<ComplianceStats[]>(mockComplianceStats);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [riskLevelFilter, setRiskLevelFilter] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('Last 6 Months');
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredStats = complianceStats.filter(stat => {
    const matchesSearch = stat.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || stat.status === statusFilter;
    const matchesRiskLevel = riskLevelFilter === 'All' || stat.riskLevel === riskLevelFilter;
    return matchesSearch && matchesStatus && matchesRiskLevel;
  });

  // Calculate overall statistics
  const totalVisas = complianceStats.reduce((sum, stat) => sum + stat.totalVisas, 0);
  const totalValid = complianceStats.reduce((sum, stat) => sum + stat.validVisas, 0);
  const totalExpired = complianceStats.reduce((sum, stat) => sum + stat.expiredVisas, 0);
  const totalExpiringSoon = complianceStats.reduce((sum, stat) => sum + stat.expiringSoon, 0);
  const totalViolations = complianceStats.reduce((sum, stat) => sum + stat.violations, 0);
  const overallComplianceRate = totalVisas > 0 ? (totalValid / totalVisas) * 100 : 0;

  const compliantCompanies = complianceStats.filter(s => s.status === 'Compliant').length;
  const nonCompliantCompanies = complianceStats.filter(s => s.status === 'Non-Compliant').length;
  const criticalRiskCompanies = complianceStats.filter(s => s.riskLevel === 'Critical').length;

  const handleExportReport = () => {
    // Handle export report logic here
    console.log('Exporting compliance report...');
  };

  const handleGenerateAuditReport = () => {
    // Handle generate audit report logic here
    console.log('Generating audit report...');
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Visa Compliance Statistics</h1>
            <p className="text-gray-600">Monitor visa compliance rates and identify risk areas</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleGenerateAuditReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <ChartBarIcon className="h-5 w-5" />
              Generate Audit Report
            </button>
            <button 
              onClick={handleExportReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Overall Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Visas</p>
                <p className="text-2xl font-bold text-gray-900">{totalVisas}</p>
              </div>
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Overall Compliance</p>
                <p className="text-2xl font-bold text-green-600">{overallComplianceRate.toFixed(1)}%</p>
              </div>
              <CheckCircleIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Compliant Companies</p>
                <p className="text-2xl font-bold text-green-600">{compliantCompanies}</p>
              </div>
              <BuildingOfficeIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Violations</p>
                <p className="text-2xl font-bold text-red-600">{totalViolations}</p>
              </div>
              <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Risk</p>
                <p className="text-2xl font-bold text-red-600">{criticalRiskCompanies}</p>
              </div>
              <XCircleIcon className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Visa Type Statistics */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Compliance by Visa Type</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mockVisaTypeStats.map((visaType) => (
                <div key={visaType.type} className="border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">{visaType.type}</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">{visaType.total}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid:</span>
                      <span className="font-medium text-green-600">{visaType.valid}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expired:</span>
                      <span className="font-medium text-red-600">{visaType.expired}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expiring Soon:</span>
                      <span className="font-medium text-yellow-600">{visaType.expiringSoon}</span>
                    </div>
                    <div className="pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Compliance Rate:</span>
                        <span className={`font-bold ${visaType.complianceRate >= 90 ? 'text-green-600' : visaType.complianceRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {visaType.complianceRate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Compliance Trends</h2>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Last 3 Months">Last 3 Months</option>
                <option value="Last 6 Months">Last 6 Months</option>
                <option value="Last 12 Months">Last 12 Months</option>
              </select>
            </div>
          </div>
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Month</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Total Visas</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Compliance Rate</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Violations</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Renewals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mockMonthlyTrends.map((trend, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium text-gray-900">{trend.month}</td>
                      <td className="py-3 px-4 text-gray-600">{trend.totalVisas}</td>
                      <td className="py-3 px-4">
                        <span className={`font-semibold ${trend.complianceRate >= 90 ? 'text-green-600' : trend.complianceRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {trend.complianceRate.toFixed(1)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`font-medium ${trend.violations <= 20 ? 'text-green-600' : trend.violations <= 30 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {trend.violations}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">{trend.renewals}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by company name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Status</option>
                <option value="Compliant">Compliant</option>
                <option value="Non-Compliant">Non-Compliant</option>
                <option value="Under Review">Under Review</option>
                <option value="Action Required">Action Required</option>
              </select>
              <select
                value={riskLevelFilter}
                onChange={(e) => setRiskLevelFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Risk Levels</option>
                <option value="Low">Low Risk</option>
                <option value="Medium">Medium Risk</option>
                <option value="High">High Risk</option>
                <option value="Critical">Critical Risk</option>
              </select>
            </div>
          </div>
        </div>

        {/* Company Compliance List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Company Compliance Details</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredStats.map((stat) => (
              <div key={stat.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(stat.status)}
                    <h3 className="text-lg font-semibold text-gray-900">{stat.company}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(stat.status)}`}>
                      {stat.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(stat.riskLevel)}`}>
                      {stat.riskLevel} Risk
                    </span>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${stat.complianceRate >= 90 ? 'text-green-600' : stat.complianceRate >= 80 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {stat.complianceRate.toFixed(1)}%
                    </p>
                    <p className="text-sm text-gray-600">Compliance Rate</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-4">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <p className="text-blue-600 font-medium">Total Visas</p>
                    <p className="text-2xl font-bold text-blue-900">{stat.totalVisas}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-green-600 font-medium">Valid</p>
                    <p className="text-2xl font-bold text-green-900">{stat.validVisas}</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-lg">
                    <p className="text-red-600 font-medium">Expired</p>
                    <p className="text-2xl font-bold text-red-900">{stat.expiredVisas}</p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <p className="text-yellow-600 font-medium">Expiring Soon</p>
                    <p className="text-2xl font-bold text-yellow-900">{stat.expiringSoon}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <span className="font-medium">Violations:</span> 
                    <span className={stat.violations > 10 ? 'text-red-600 font-semibold' : stat.violations > 5 ? 'text-yellow-600 font-semibold' : 'text-green-600'}>
                      {stat.violations}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="h-4 w-4" />
                    <span className="font-medium">Pending Renewals:</span> {stat.pendingRenewals}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="font-medium">Last Audit:</span> {new Date(stat.lastAuditDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDaysIcon className="h-4 w-4" />
                    <span className="font-medium">Next Audit:</span> {new Date(stat.nextAuditDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}