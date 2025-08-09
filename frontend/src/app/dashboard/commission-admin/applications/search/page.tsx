'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/hooks/useAuth';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCommissionAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { usePathname } from 'next/navigation';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  DocumentTextIcon,
  CalendarIcon,
  UserIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Application {
  id: string;
  companyName: string;
  applicationType: string;
  status: 'Pending' | 'Under Review' | 'Approved' | 'Rejected' | 'Requires Action';
  submissionDate: string;
  lastUpdated: string;
  applicant: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  location: string;
  value: number;
}

interface SearchFilters {
  searchTerm: string;
  status: string;
  applicationType: string;
  dateFrom: string;
  dateTo: string;
  priority: string;
  category: string;
  location: string;
  minValue: string;
  maxValue: string;
}

export default function ApplicationSearchPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = getCommissionAdminMenuItems(pathname);

  const [applications, setApplications] = useState<Application[]>([]);
  const [filteredApplications, setFilteredApplications] = useState<Application[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    searchTerm: '',
    status: '',
    applicationType: '',
    dateFrom: '',
    dateTo: '',
    priority: '',
    category: '',
    location: '',
    minValue: '',
    maxValue: ''
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'commission_admin')) {
      router.push('/auth/login');
      return;
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Mock applications data
    const mockApplications: Application[] = [
      {
        id: 'APP-2024-001',
        companyName: 'TechDrill Solutions Ltd',
        applicationType: 'Drilling Permit',
        status: 'Under Review',
        submissionDate: '2024-01-15',
        lastUpdated: '2024-01-20',
        applicant: 'John Smith',
        priority: 'High',
        category: 'Offshore Drilling',
        location: 'Lagos State',
        value: 2500000
      },
      {
        id: 'APP-2024-002',
        companyName: 'Global Energy Corp',
        applicationType: 'Environmental Impact',
        status: 'Pending',
        submissionDate: '2024-01-18',
        lastUpdated: '2024-01-18',
        applicant: 'Sarah Johnson',
        priority: 'Medium',
        category: 'Environmental',
        location: 'Rivers State',
        value: 1800000
      },
      {
        id: 'APP-2024-003',
        companyName: 'Offshore Dynamics',
        applicationType: 'Safety Certification',
        status: 'Approved',
        submissionDate: '2024-01-10',
        lastUpdated: '2024-01-22',
        applicant: 'Michael Brown',
        priority: 'High',
        category: 'Safety & Compliance',
        location: 'Bayelsa State',
        value: 3200000
      },
      {
        id: 'APP-2024-004',
        companyName: 'Marine Services Ltd',
        applicationType: 'Vessel Registration',
        status: 'Requires Action',
        submissionDate: '2024-01-12',
        lastUpdated: '2024-01-19',
        applicant: 'Emily Davis',
        priority: 'Medium',
        category: 'Marine Operations',
        location: 'Delta State',
        value: 950000
      },
      {
        id: 'APP-2024-005',
        companyName: 'Petroleum Logistics',
        applicationType: 'Transport License',
        status: 'Rejected',
        submissionDate: '2024-01-08',
        lastUpdated: '2024-01-21',
        applicant: 'Robert Wilson',
        priority: 'Low',
        category: 'Transportation',
        location: 'Akwa Ibom State',
        value: 750000
      }
    ];
    setApplications(mockApplications);
    setFilteredApplications(mockApplications);
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      let filtered = applications.filter(app => {
        const matchesSearchTerm = !searchFilters.searchTerm || 
          app.companyName.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
          app.applicant.toLowerCase().includes(searchFilters.searchTerm.toLowerCase()) ||
          app.id.toLowerCase().includes(searchFilters.searchTerm.toLowerCase());
        
        const matchesStatus = !searchFilters.status || app.status === searchFilters.status;
        const matchesType = !searchFilters.applicationType || app.applicationType === searchFilters.applicationType;
        const matchesPriority = !searchFilters.priority || app.priority === searchFilters.priority;
        const matchesCategory = !searchFilters.category || app.category === searchFilters.category;
        const matchesLocation = !searchFilters.location || app.location === searchFilters.location;
        
        const matchesDateFrom = !searchFilters.dateFrom || new Date(app.submissionDate) >= new Date(searchFilters.dateFrom);
        const matchesDateTo = !searchFilters.dateTo || new Date(app.submissionDate) <= new Date(searchFilters.dateTo);
        
        const matchesMinValue = !searchFilters.minValue || app.value >= parseInt(searchFilters.minValue);
        const matchesMaxValue = !searchFilters.maxValue || app.value <= parseInt(searchFilters.maxValue);
        
        return matchesSearchTerm && matchesStatus && matchesType && matchesPriority && 
               matchesCategory && matchesLocation && matchesDateFrom && matchesDateTo && 
               matchesMinValue && matchesMaxValue;
      });
      
      setFilteredApplications(filtered);
      setIsLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setSearchFilters({
      searchTerm: '',
      status: '',
      applicationType: '',
      dateFrom: '',
      dateTo: '',
      priority: '',
      category: '',
      location: '',
      minValue: '',
      maxValue: ''
    });
    setFilteredApplications(applications);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      case 'Under Review': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Requires Action': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Advanced Application Search"
      userRole="Commission Admin"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Advanced Application Search</h1>
              <p className="text-gray-600 mt-1">Search and filter applications with advanced criteria</p>
            </div>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              ← Back
            </button>
          </div>

          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search by company name, applicant, or application ID..."
                value={searchFilters.searchTerm}
                onChange={(e) => setSearchFilters({...searchFilters, searchTerm: e.target.value})}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
              <FunnelIcon className="h-5 w-5" />
              Advanced Filters
              <ChevronDownIcon className={`h-4 w-4 transition-transform ${showAdvancedFilters ? 'rotate-180' : ''}`} />
            </button>
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="border-t pt-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={searchFilters.status}
                    onChange={(e) => setSearchFilters({...searchFilters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Requires Action">Requires Action</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                  <select
                    value={searchFilters.applicationType}
                    onChange={(e) => setSearchFilters({...searchFilters, applicationType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Types</option>
                    <option value="Drilling Permit">Drilling Permit</option>
                    <option value="Environmental Impact">Environmental Impact</option>
                    <option value="Safety Certification">Safety Certification</option>
                    <option value="Vessel Registration">Vessel Registration</option>
                    <option value="Transport License">Transport License</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={searchFilters.priority}
                    onChange={(e) => setSearchFilters({...searchFilters, priority: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Priorities</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date From</label>
                  <input
                    type="date"
                    value={searchFilters.dateFrom}
                    onChange={(e) => setSearchFilters({...searchFilters, dateFrom: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date To</label>
                  <input
                    type="date"
                    value={searchFilters.dateTo}
                    onChange={(e) => setSearchFilters({...searchFilters, dateTo: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select
                    value={searchFilters.location}
                    onChange={(e) => setSearchFilters({...searchFilters, location: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">All Locations</option>
                    <option value="Lagos State">Lagos State</option>
                    <option value="Rivers State">Rivers State</option>
                    <option value="Bayelsa State">Bayelsa State</option>
                    <option value="Delta State">Delta State</option>
                    <option value="Akwa Ibom State">Akwa Ibom State</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2"
                >
                  <XMarkIcon className="h-4 w-4" />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Search Results ({filteredApplications.length} applications found)
            </h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Searching applications...</p>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="p-8 text-center">
              <DocumentTextIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No applications found matching your search criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Application
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.id}</div>
                          <div className="text-sm text-gray-500">{app.applicationType}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{app.companyName}</div>
                          <div className="text-sm text-gray-500">{app.applicant}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(app.priority)}`}>
                          {app.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(app.submissionDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₦{app.value.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => router.push(`/dashboard/commission-admin/applications/${app.id}`)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          View
                        </button>
                        <button
                          onClick={() => router.push(`/dashboard/commission-admin/applications/${app.id}/edit`)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}