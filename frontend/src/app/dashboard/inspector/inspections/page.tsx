'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  MagnifyingGlassIcon, 
  CalendarIcon, 
  MapPinIcon, 
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PlusIcon,
  FunnelIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getInspectorMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface Inspection {
  id: string;
  company: string;
  type: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'requires-followup';
  date: string;
  time: string;
  location: string;
  inspector: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  lastUpdated: string;
}

const mockInspections: Inspection[] = [
  {
    id: 'INS-2024-0001',
    company: 'Tullow Ghana Ltd',
    type: 'Safety Inspection',
    status: 'scheduled',
    date: '2024-01-15',
    time: '09:00',
    location: 'TEN Field - Platform A',
    inspector: 'John Mensah',
    priority: 'high',
    description: 'Quarterly safety compliance inspection of drilling operations',
    lastUpdated: '2024-01-10T10:30:00Z'
  },
  {
    id: 'INS-2024-0002',
    company: 'Eni Ghana Ltd',
    type: 'Environmental Audit',
    status: 'in-progress',
    date: '2024-01-12',
    time: '08:00',
    location: 'Sankofa Field - FPSO',
    inspector: 'Sarah Asante',
    priority: 'medium',
    description: 'Environmental compliance audit and waste management review',
    lastUpdated: '2024-01-12T14:20:00Z'
  },
  {
    id: 'INS-2024-0003',
    company: 'Springfield E&P',
    type: 'Technical Review',
    status: 'completed',
    date: '2024-01-08',
    time: '10:00',
    location: 'West Cape Three Points',
    inspector: 'Michael Osei',
    priority: 'medium',
    description: 'Technical equipment inspection and maintenance review',
    lastUpdated: '2024-01-08T16:45:00Z'
  },
  {
    id: 'INS-2024-0004',
    company: 'Kosmos Energy',
    type: 'Operational Audit',
    status: 'requires-followup',
    date: '2024-01-05',
    time: '07:30',
    location: 'Jubilee Field - Platform B',
    inspector: 'Grace Adjei',
    priority: 'critical',
    description: 'Operational procedures audit with compliance issues identified',
    lastUpdated: '2024-01-05T18:00:00Z'
  },
  {
    id: 'INS-2024-0005',
    company: 'Hess Corporation',
    type: 'Safety Inspection',
    status: 'scheduled',
    date: '2024-01-20',
    time: '11:00',
    location: 'Deepwater Tano - Rig 3',
    inspector: 'Emmanuel Boateng',
    priority: 'high',
    description: 'Pre-drilling safety inspection and equipment verification',
    lastUpdated: '2024-01-11T09:15:00Z'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'in-progress': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-gray-100 text-gray-800';
    case 'requires-followup': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function InspectionsPage() {
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [filteredInspections, setFilteredInspections] = useState<Inspection[]>(mockInspections);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const pathname = usePathname();
  const sidebarItems = getInspectorMenuItems(pathname);

  useEffect(() => {
    let filtered = inspections;

    if (searchTerm) {
      filtered = filtered.filter(inspection => 
        inspection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inspection.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inspection.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inspection.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(inspection => inspection.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(inspection => inspection.type === typeFilter);
    }

    if (priorityFilter !== 'all') {
      filtered = filtered.filter(inspection => inspection.priority === priorityFilter);
    }

    setFilteredInspections(filtered);
  }, [searchTerm, statusFilter, typeFilter, priorityFilter, inspections]);

  const handleStartInspection = (inspectionId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInspections(prev => prev.map(inspection => 
        inspection.id === inspectionId 
          ? { ...inspection, status: 'in-progress' as const, lastUpdated: new Date().toISOString() }
          : inspection
      ));
      setLoading(false);
    }, 1000);
  };

  const handleCompleteInspection = (inspectionId: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setInspections(prev => prev.map(inspection => 
        inspection.id === inspectionId 
          ? { ...inspection, status: 'completed' as const, lastUpdated: new Date().toISOString() }
          : inspection
      ));
      setLoading(false);
    }, 1000);
  };

  return (
    <DashboardLayout
      title="Field Inspections"
      userRole="Inspector"
      userName="Inspector Panel"
      userInitials="IP"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Field Inspections</h1>
            <p className="text-gray-600 mt-1">Manage and track all field inspections</p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <Link
              href="/dashboard/inspector/inspections/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Schedule Inspection
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search inspections by company, type, location, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Statuses</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="requires-followup">Requires Follow-up</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Types</option>
                    <option value="Safety Inspection">Safety Inspection</option>
                    <option value="Environmental Audit">Environmental Audit</option>
                    <option value="Technical Review">Technical Review</option>
                    <option value="Operational Audit">Operational Audit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                  <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Priorities</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="critical">Critical</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Inspections List */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Inspections ({filteredInspections.length})
            </h3>
          </div>
          
          {filteredInspections.length === 0 ? (
            <div className="text-center py-12">
              <MagnifyingGlassIcon className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No inspections found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspection</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredInspections.map((inspection) => (
                    <tr key={inspection.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{inspection.id}</div>
                          <div className="text-sm text-gray-500">{inspection.type}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{inspection.company}</div>
                        <div className="text-sm text-gray-500">Inspector: {inspection.inspector}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {inspection.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <ClockIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {inspection.time}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-gray-900">
                          <MapPinIcon className="h-4 w-4 mr-1 text-gray-400" />
                          {inspection.location}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                          {inspection.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(inspection.priority)}`}>
                          {inspection.priority.charAt(0).toUpperCase() + inspection.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/dashboard/inspector/inspections/${inspection.id}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </Link>
                        {inspection.status === 'scheduled' && (
                          <button
                            onClick={() => handleStartInspection(inspection.id)}
                            disabled={loading}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            Start
                          </button>
                        )}
                        {inspection.status === 'in-progress' && (
                          <button
                            onClick={() => handleCompleteInspection(inspection.id)}
                            disabled={loading}
                            className="text-green-600 hover:text-green-900 disabled:opacity-50"
                          >
                            Complete
                          </button>
                        )}
                        <Link
                          href={`/dashboard/inspector/inspections/${inspection.id}/report`}
                          className="text-purple-600 hover:text-purple-900"
                        >
                          Report
                        </Link>
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