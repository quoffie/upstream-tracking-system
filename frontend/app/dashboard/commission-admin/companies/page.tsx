'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import EnhancedDashboardLayout from '../../../../src/app/components/layouts/EnhancedDashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../src/app/components/layouts/DashboardMenus';
import {
  TrophyIcon,
  BuildingOfficeIcon,
  ChartBarIcon,
  EyeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';

export default function CompaniesPage() {
  const router = useRouter();
  const pathname = usePathname();

  const [topCompanies, setTopCompanies] = useState([
    {
      name: 'Shell Nigeria',
      production: '1.2M bbl/day',
      compliance: 98,
      revenue: '$2.1M',
      rank: 1,
      location: 'Lagos, Nigeria',
      contact: '+234-1-234-5678'
    },
    {
      name: 'Chevron Nigeria',
      production: '980K bbl/day',
      compliance: 96,
      revenue: '$1.8M',
      rank: 2,
      location: 'Lagos, Nigeria',
      contact: '+234-1-234-5679'
    },
    {
      name: 'Total E&P Nigeria',
      production: '750K bbl/day',
      compliance: 94,
      revenue: '$1.5M',
      rank: 3,
      location: 'Port Harcourt, Nigeria',
      contact: '+234-84-234-567'
    },
    {
      name: 'ExxonMobil Nigeria',
      production: '680K bbl/day',
      compliance: 92,
      revenue: '$1.3M',
      rank: 4,
      location: 'Lagos, Nigeria',
      contact: '+234-1-234-5680'
    },
    {
      name: 'Eni Nigeria',
      production: '520K bbl/day',
      compliance: 90,
      revenue: '$1.1M',
      rank: 5,
      location: 'Lagos, Nigeria',
      contact: '+234-1-234-5681'
    }
  ]);

  const [selectedCompany, setSelectedCompany] = useState(null);
  const [sortBy, setSortBy] = useState('rank');
  const [filterBy, setFilterBy] = useState('all');

  const getComplianceColor = (compliance: number): string => {
    if (compliance >= 95) return 'bg-green-100 text-green-800';
    if (compliance >= 90) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getRankIcon = (rank: number): string => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <EnhancedDashboardLayout
        title="Companies Management"
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
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <TrophyIcon className="h-8 w-8 text-yellow-500 mr-3" />
                Top Performing Companies
              </h1>
              <p className="text-gray-600 mt-2">Performance rankings based on production, compliance, and revenue</p>
            </div>
            <div className="flex space-x-3">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="rank">Sort by Rank</option>
                <option value="production">Sort by Production</option>
                <option value="compliance">Sort by Compliance</option>
                <option value="revenue">Sort by Revenue</option>
              </select>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Export Rankings
              </button>
            </div>
          </div>
        </div>

        {/* Performance Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <BuildingOfficeIcon className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-blue-600">{topCompanies.length}</div>
                <div className="text-sm text-gray-600">Active Companies</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <ChartBarIcon className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-green-600">94.8%</div>
                <div className="text-sm text-gray-600">Avg Compliance</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <TrophyIcon className="h-8 w-8 text-yellow-600 mr-3" />
              <div>
                <div className="text-3xl font-bold text-yellow-600">4.13M</div>
                <div className="text-sm text-gray-600">Total Production</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center">
              <div className="h-8 w-8 text-purple-600 mr-3 text-2xl">💰</div>
              <div>
                <div className="text-3xl font-bold text-purple-600">$7.8M</div>
                <div className="text-sm text-gray-600">Total Revenue</div>
              </div>
            </div>
          </div>
        </div>

        {/* Companies Ranking Table */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Company Performance Rankings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Production</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCompanies.map((company, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="text-2xl mr-2">{getRankIcon(company.rank)}</span>
                        <span className="text-sm font-medium text-gray-900">#{company.rank}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{company.name.charAt(0)}</span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{company.name}</div>
                          <div className="text-sm text-gray-500">{company.contact}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{company.production}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getComplianceColor(company.compliance)}`}>
                        {company.compliance}%
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-green-600">{company.revenue}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{company.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3 flex items-center">
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <PhoneIcon className="h-4 w-4 mr-1" />
                        Contact
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Performance Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Top Performers This Month</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topCompanies.slice(0, 3).map((company, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">{getRankIcon(company.rank)}</span>
                      <div>
                        <div className="font-medium text-gray-900">{company.name}</div>
                        <div className="text-sm text-gray-500">Compliance: {company.compliance}%</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-600">{company.revenue}</div>
                      <div className="text-sm text-gray-500">{company.production}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Performance Metrics</h2>
            </div>
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Average Compliance Rate</span>
                    <span className="text-sm font-bold text-green-600">94.8%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '94.8%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Production Efficiency</span>
                    <span className="text-sm font-bold text-blue-600">87.2%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87.2%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Revenue Growth</span>
                    <span className="text-sm font-bold text-purple-600">+15.3%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '76.5%' }}></div>
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