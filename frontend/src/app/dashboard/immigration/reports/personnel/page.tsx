'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  UsersIcon,
  MagnifyingGlassIcon,
  DocumentArrowDownIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
  UserGroupIcon,
  ChartBarIcon,
  MapPinIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getImmigrationMenuItems } from '../../../../../app/components/layouts/DashboardMenus';

interface PersonnelBreakdown {
  id: string;
  company: string;
  totalPersonnel: number;
  expatriates: number;
  localStaff: number;
  contractors: number;
  offshoreWorkers: number;
  onshoreWorkers: number;
  activeProjects: number;
  averageExperience: number;
  complianceRate: number;
  lastUpdated: string;
  status: 'Active' | 'Under Review' | 'Inactive';
}

interface DepartmentBreakdown {
  department: string;
  expatriates: number;
  localStaff: number;
  contractors: number;
  totalPersonnel: number;
  averageSalary: number;
  complianceRate: number;
}

interface LocationBreakdown {
  location: string;
  type: 'Offshore' | 'Onshore';
  totalPersonnel: number;
  expatriates: number;
  localStaff: number;
  contractors: number;
  activeRigs: number;
  safetyRating: number;
}

interface SkillBreakdown {
  skill: string;
  expatriates: number;
  localStaff: number;
  totalPersonnel: number;
  demandLevel: 'High' | 'Medium' | 'Low';
  averageExperience: number;
}

const mockPersonnelBreakdown: PersonnelBreakdown[] = [
  {
    id: 'PB-001',
    company: 'Tullow Oil Ghana',
    totalPersonnel: 1247,
    expatriates: 156,
    localStaff: 891,
    contractors: 200,
    offshoreWorkers: 423,
    onshoreWorkers: 824,
    activeProjects: 8,
    averageExperience: 7.2,
    complianceRate: 94.5,
    lastUpdated: '2024-01-15',
    status: 'Active'
  },
  {
    id: 'PB-002',
    company: 'ExxonMobil Ghana',
    totalPersonnel: 1856,
    expatriates: 203,
    localStaff: 1342,
    contractors: 311,
    offshoreWorkers: 678,
    onshoreWorkers: 1178,
    activeProjects: 12,
    averageExperience: 8.9,
    complianceRate: 91.2,
    lastUpdated: '2024-01-12',
    status: 'Active'
  },
  {
    id: 'PB-003',
    company: 'CNOOC Ghana',
    totalPersonnel: 892,
    expatriates: 89,
    localStaff: 634,
    contractors: 169,
    offshoreWorkers: 312,
    onshoreWorkers: 580,
    activeProjects: 5,
    averageExperience: 6.1,
    complianceRate: 87.8,
    lastUpdated: '2024-01-10',
    status: 'Under Review'
  },
  {
    id: 'PB-004',
    company: 'Repsol Ghana',
    totalPersonnel: 634,
    expatriates: 67,
    localStaff: 445,
    contractors: 122,
    offshoreWorkers: 234,
    onshoreWorkers: 400,
    activeProjects: 4,
    averageExperience: 5.8,
    complianceRate: 83.4,
    lastUpdated: '2024-01-08',
    status: 'Active'
  },
  {
    id: 'PB-005',
    company: 'Equinor Ghana',
    totalPersonnel: 1123,
    expatriates: 134,
    localStaff: 789,
    contractors: 200,
    offshoreWorkers: 445,
    onshoreWorkers: 678,
    activeProjects: 7,
    averageExperience: 8.3,
    complianceRate: 96.1,
    lastUpdated: '2024-01-14',
    status: 'Active'
  }
];

const mockDepartmentBreakdown: DepartmentBreakdown[] = [
  {
    department: 'Drilling Operations',
    expatriates: 145,
    localStaff: 423,
    contractors: 234,
    totalPersonnel: 802,
    averageSalary: 85000,
    complianceRate: 92.3
  },
  {
    department: 'Production',
    expatriates: 98,
    localStaff: 567,
    contractors: 189,
    totalPersonnel: 854,
    averageSalary: 78000,
    complianceRate: 94.1
  },
  {
    department: 'Engineering',
    expatriates: 123,
    localStaff: 345,
    contractors: 67,
    totalPersonnel: 535,
    averageSalary: 92000,
    complianceRate: 96.8
  },
  {
    department: 'Health & Safety',
    expatriates: 34,
    localStaff: 156,
    contractors: 45,
    totalPersonnel: 235,
    averageSalary: 72000,
    complianceRate: 98.2
  },
  {
    department: 'Administration',
    expatriates: 23,
    localStaff: 234,
    contractors: 12,
    totalPersonnel: 269,
    averageSalary: 58000,
    complianceRate: 89.5
  },
  {
    department: 'Maintenance',
    expatriates: 67,
    localStaff: 345,
    contractors: 178,
    totalPersonnel: 590,
    averageSalary: 65000,
    complianceRate: 91.7
  }
];

const mockLocationBreakdown: LocationBreakdown[] = [
  {
    location: 'Jubilee Field',
    type: 'Offshore',
    totalPersonnel: 456,
    expatriates: 67,
    localStaff: 289,
    contractors: 100,
    activeRigs: 3,
    safetyRating: 4.8
  },
  {
    location: 'TEN Fields',
    type: 'Offshore',
    totalPersonnel: 378,
    expatriates: 45,
    localStaff: 234,
    contractors: 99,
    activeRigs: 2,
    safetyRating: 4.6
  },
  {
    location: 'Sankofa Gye Nyame',
    type: 'Offshore',
    totalPersonnel: 289,
    expatriates: 34,
    localStaff: 189,
    contractors: 66,
    activeRigs: 2,
    safetyRating: 4.7
  },
  {
    location: 'Tema Operations Base',
    type: 'Onshore',
    totalPersonnel: 567,
    expatriates: 78,
    localStaff: 423,
    contractors: 66,
    activeRigs: 0,
    safetyRating: 4.9
  },
  {
    location: 'Takoradi Port',
    type: 'Onshore',
    totalPersonnel: 345,
    expatriates: 45,
    localStaff: 234,
    contractors: 66,
    activeRigs: 0,
    safetyRating: 4.5
  },
  {
    location: 'Accra Head Office',
    type: 'Onshore',
    totalPersonnel: 234,
    expatriates: 34,
    localStaff: 189,
    contractors: 11,
    activeRigs: 0,
    safetyRating: 4.8
  }
];

const mockSkillBreakdown: SkillBreakdown[] = [
  {
    skill: 'Drilling Engineering',
    expatriates: 89,
    localStaff: 123,
    totalPersonnel: 212,
    demandLevel: 'High',
    averageExperience: 8.5
  },
  {
    skill: 'Production Engineering',
    expatriates: 67,
    localStaff: 156,
    totalPersonnel: 223,
    demandLevel: 'High',
    averageExperience: 7.8
  },
  {
    skill: 'Subsea Engineering',
    expatriates: 45,
    localStaff: 67,
    totalPersonnel: 112,
    demandLevel: 'High',
    averageExperience: 9.2
  },
  {
    skill: 'HSE Management',
    expatriates: 34,
    localStaff: 89,
    totalPersonnel: 123,
    demandLevel: 'Medium',
    averageExperience: 6.9
  },
  {
    skill: 'Project Management',
    expatriates: 56,
    localStaff: 78,
    totalPersonnel: 134,
    demandLevel: 'High',
    averageExperience: 8.1
  },
  {
    skill: 'Geoscience',
    expatriates: 23,
    localStaff: 45,
    totalPersonnel: 68,
    demandLevel: 'Medium',
    averageExperience: 7.3
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800';
    case 'Under Review':
      return 'bg-yellow-100 text-yellow-800';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getDemandLevelColor = (level: string) => {
  switch (level) {
    case 'High':
      return 'bg-red-100 text-red-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    case 'Low':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default function OffshorePersonnelBreakdownPage() {
  const [personnelBreakdown, setPersonnelBreakdown] = useState<PersonnelBreakdown[]>(mockPersonnelBreakdown);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedView, setSelectedView] = useState('Company');
  const pathname = usePathname();

  const sidebarItems = getImmigrationMenuItems(pathname);

  const filteredBreakdown = personnelBreakdown.filter(breakdown => {
    const matchesSearch = breakdown.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || breakdown.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate overall statistics
  const totalPersonnel = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.totalPersonnel, 0);
  const totalExpatriates = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.expatriates, 0);
  const totalLocalStaff = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.localStaff, 0);
  const totalContractors = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.contractors, 0);
  const totalOffshoreWorkers = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.offshoreWorkers, 0);
  const totalOnshoreWorkers = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.onshoreWorkers, 0);
  const averageComplianceRate = personnelBreakdown.reduce((sum, breakdown) => sum + breakdown.complianceRate, 0) / personnelBreakdown.length;

  const handleExportReport = () => {
    // Handle export report logic here
    console.log('Exporting personnel breakdown report...');
  };

  const handleGenerateReport = () => {
    // Handle generate report logic here
    console.log('Generating detailed personnel report...');
  };

  const renderCompanyView = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Company Personnel Breakdown</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {filteredBreakdown.map((breakdown) => (
          <div key={breakdown.id} className="p-6 hover:bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <BuildingOfficeIcon className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">{breakdown.company}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(breakdown.status)}`}>
                  {breakdown.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-900">{breakdown.totalPersonnel}</p>
                <p className="text-sm text-gray-600">Total Personnel</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-600 font-medium">Expatriates</p>
                <p className="text-2xl font-bold text-blue-900">{breakdown.expatriates}</p>
                <p className="text-sm text-blue-600">{((breakdown.expatriates / breakdown.totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-green-600 font-medium">Local Staff</p>
                <p className="text-2xl font-bold text-green-900">{breakdown.localStaff}</p>
                <p className="text-sm text-green-600">{((breakdown.localStaff / breakdown.totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg">
                <p className="text-purple-600 font-medium">Contractors</p>
                <p className="text-2xl font-bold text-purple-900">{breakdown.contractors}</p>
                <p className="text-sm text-purple-600">{((breakdown.contractors / breakdown.totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <p className="text-orange-600 font-medium">Offshore Workers</p>
                <p className="text-2xl font-bold text-orange-900">{breakdown.offshoreWorkers}</p>
                <p className="text-sm text-orange-600">{((breakdown.offshoreWorkers / breakdown.totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4" />
                <span className="font-medium">Active Projects:</span> {breakdown.activeProjects}
              </div>
              <div className="flex items-center gap-2">
                <AcademicCapIcon className="h-4 w-4" />
                <span className="font-medium">Avg Experience:</span> {breakdown.averageExperience} years
              </div>
              <div className="flex items-center gap-2">
                <ChartBarIcon className="h-4 w-4" />
                <span className="font-medium">Compliance Rate:</span> 
                <span className={`font-semibold ${breakdown.complianceRate >= 95 ? 'text-green-600' : breakdown.complianceRate >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {breakdown.complianceRate.toFixed(1)}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ClockIcon className="h-4 w-4" />
                <span className="font-medium">Last Updated:</span> {new Date(breakdown.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDepartmentView = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Department Personnel Breakdown</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Department</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Expatriates</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Local Staff</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Contractors</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Salary</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Compliance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockDepartmentBreakdown.map((dept, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{dept.department}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">{dept.expatriates}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">{dept.localStaff}</td>
                  <td className="py-3 px-4 text-purple-600 font-semibold">{dept.contractors}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{dept.totalPersonnel}</td>
                  <td className="py-3 px-4 text-gray-600">${dept.averageSalary.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${dept.complianceRate >= 95 ? 'text-green-600' : dept.complianceRate >= 90 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {dept.complianceRate.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderLocationView = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Location Personnel Breakdown</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockLocationBreakdown.map((location, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-gray-900">{location.location}</h3>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  location.type === 'Offshore' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {location.type}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-600">Total Personnel:</p>
                  <p className="font-bold text-gray-900">{location.totalPersonnel}</p>
                </div>
                <div>
                  <p className="text-gray-600">Expatriates:</p>
                  <p className="font-bold text-blue-600">{location.expatriates}</p>
                </div>
                <div>
                  <p className="text-gray-600">Local Staff:</p>
                  <p className="font-bold text-green-600">{location.localStaff}</p>
                </div>
                <div>
                  <p className="text-gray-600">Contractors:</p>
                  <p className="font-bold text-purple-600">{location.contractors}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center text-sm border-t pt-3">
                <div>
                  <p className="text-gray-600">Active Rigs: <span className="font-semibold">{location.activeRigs}</span></p>
                </div>
                <div>
                  <p className="text-gray-600">Safety Rating: 
                    <span className={`font-semibold ml-1 ${
                      location.safetyRating >= 4.5 ? 'text-green-600' : location.safetyRating >= 4.0 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {location.safetyRating}/5.0
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkillView = () => (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Skills Personnel Breakdown</h2>
      </div>
      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Skill Area</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Expatriates</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Local Staff</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Demand Level</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-900">Avg Experience</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockSkillBreakdown.map((skill, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{skill.skill}</td>
                  <td className="py-3 px-4 text-blue-600 font-semibold">{skill.expatriates}</td>
                  <td className="py-3 px-4 text-green-600 font-semibold">{skill.localStaff}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{skill.totalPersonnel}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandLevelColor(skill.demandLevel)}`}>
                      {skill.demandLevel}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{skill.averageExperience} years</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Offshore Personnel Breakdown</h1>
            <p className="text-gray-600">Comprehensive analysis of personnel distribution across operations</p>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleGenerateReport}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              <ChartBarIcon className="h-5 w-5" />
              Generate Report
            </button>
            <button 
              onClick={handleExportReport}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <DocumentArrowDownIcon className="h-5 w-5" />
              Export Data
            </button>
          </div>
        </div>

        {/* Overall Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Personnel</p>
                <p className="text-2xl font-bold text-gray-900">{totalPersonnel.toLocaleString()}</p>
              </div>
              <UsersIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Expatriates</p>
                <p className="text-2xl font-bold text-blue-600">{totalExpatriates}</p>
                <p className="text-xs text-gray-500">{((totalExpatriates / totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <GlobeAltIcon className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Local Staff</p>
                <p className="text-2xl font-bold text-green-600">{totalLocalStaff}</p>
                <p className="text-xs text-gray-500">{((totalLocalStaff / totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <UserGroupIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contractors</p>
                <p className="text-2xl font-bold text-purple-600">{totalContractors}</p>
                <p className="text-xs text-gray-500">{((totalContractors / totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <BriefcaseIcon className="h-8 w-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Offshore Workers</p>
                <p className="text-2xl font-bold text-orange-600">{totalOffshoreWorkers}</p>
                <p className="text-xs text-gray-500">{((totalOffshoreWorkers / totalPersonnel) * 100).toFixed(1)}%</p>
              </div>
              <MapPinIcon className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Compliance</p>
                <p className="text-2xl font-bold text-green-600">{averageComplianceRate.toFixed(1)}%</p>
              </div>
              <ChartBarIcon className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        {/* View Selector and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex gap-2">
              {['Company', 'Department', 'Location', 'Skills'].map((view) => (
                <button
                  key={view}
                  onClick={() => setSelectedView(view)}
                  className={`px-4 py-2 rounded-lg font-medium ${
                    selectedView === view
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
            
            {selectedView === 'Company' && (
              <>
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </>
            )}
          </div>
        </div>

        {/* Dynamic Content Based on Selected View */}
        {selectedView === 'Company' && renderCompanyView()}
        {selectedView === 'Department' && renderDepartmentView()}
        {selectedView === 'Location' && renderLocationView()}
        {selectedView === 'Skills' && renderSkillView()}
      </div>
    </DashboardLayout>
  );
}