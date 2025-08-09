'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, ExclamationTriangleIcon, ClockIcon as ClockSolidIcon } from '@heroicons/react/24/solid';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import { getInspectorMenuItems } from '../../../../app/components/layouts/DashboardMenus';

interface ScheduledInspection {
  id: string;
  title: string;
  company: string;
  location: string;
  date: string;
  time: string;
  inspector: string;
  type: 'Safety' | 'Environmental' | 'Compliance' | 'Routine';
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  description: string;
  estimatedDuration: string;
}

const mockInspections: ScheduledInspection[] = [
  {
    id: 'INS-001',
    title: 'Safety Equipment Inspection',
    company: 'Tullow Oil Ghana',
    location: 'Jubilee Field - Platform A',
    date: '2024-01-15',
    time: '09:00',
    inspector: 'John Mensah',
    type: 'Safety',
    status: 'Scheduled',
    priority: 'High',
    description: 'Comprehensive safety equipment and protocol inspection',
    estimatedDuration: '4 hours'
  },
  {
    id: 'INS-002',
    title: 'Environmental Compliance Check',
    company: 'Kosmos Energy',
    location: 'TEN Field - FPSO',
    date: '2024-01-16',
    time: '08:30',
    inspector: 'Sarah Asante',
    type: 'Environmental',
    status: 'In Progress',
    priority: 'Medium',
    description: 'Environmental impact and waste management inspection',
    estimatedDuration: '6 hours'
  },
  {
    id: 'INS-003',
    title: 'Routine Operations Audit',
    company: 'Eni Ghana',
    location: 'Sankofa Field - Wellhead',
    date: '2024-01-17',
    time: '10:00',
    inspector: 'Michael Osei',
    type: 'Routine',
    status: 'Scheduled',
    priority: 'Low',
    description: 'Standard operational procedures and documentation review',
    estimatedDuration: '3 hours'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Completed':
      return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
    case 'In Progress':
      return <ClockSolidIcon className="h-5 w-5 text-yellow-500" />;
    case 'Cancelled':
      return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
    default:
      return <CalendarIcon className="h-5 w-5 text-blue-500" />;
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
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

export default function InspectorSchedulePage() {
  const [inspections, setInspections] = useState<ScheduledInspection[]>(mockInspections);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<ScheduledInspection | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const pathname = usePathname();

  const sidebarItems = getInspectorMenuItems(pathname);

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inspection.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || inspection.status === statusFilter;
    const matchesType = typeFilter === 'All' || inspection.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleScheduleInspection = (inspectionData: any) => {
    const newInspection: ScheduledInspection = {
      id: `INS-${String(inspections.length + 1).padStart(3, '0')}`,
      ...inspectionData,
      status: 'Scheduled' as const
    };
    setInspections([...inspections, newInspection]);
    setShowScheduleModal(false);
  };

  const handleDeleteInspection = (id: string) => {
    setInspections(inspections.filter(inspection => inspection.id !== id));
  };

  return (
    <DashboardLayout title="Dashboard" userRole="User" sidebarItems={sidebarItems}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Schedule Management</h1>
            <p className="text-gray-600">Manage and schedule field inspections</p>
          </div>
          <button
            onClick={() => setShowScheduleModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <PlusIcon className="h-5 w-5" />
            Schedule Inspection
          </button>
        </div>

        {/* Filters and Search */}
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search inspections..."
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
                <option value="Scheduled">Scheduled</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="All">All Types</option>
                <option value="Safety">Safety</option>
                <option value="Environmental">Environmental</option>
                <option value="Compliance">Compliance</option>
                <option value="Routine">Routine</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inspections List */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Scheduled Inspections</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredInspections.map((inspection) => (
              <div key={inspection.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      {getStatusIcon(inspection.status)}
                      <h3 className="text-lg font-semibold text-gray-900">{inspection.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(inspection.priority)}`}>
                        {inspection.priority}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4" />
                        <span>{inspection.company}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{inspection.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{new Date(inspection.date).toLocaleDateString()} at {inspection.time}</span>
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                      <span>Inspector: {inspection.inspector}</span>
                      <span>Duration: {inspection.estimatedDuration}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {inspection.type}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => {
                        setSelectedInspection(inspection);
                        setShowDetailsModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      title="View Details"
                    >
                      <EyeIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedInspection(inspection);
                        setShowScheduleModal(true);
                      }}
                      className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteInspection(inspection.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule Inspection Modal */}
        {showScheduleModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedInspection ? 'Edit Inspection' : 'Schedule New Inspection'}
              </h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const inspectionData = {
                    title: formData.get('title'),
                    company: formData.get('company'),
                    location: formData.get('location'),
                    date: formData.get('date'),
                    time: formData.get('time'),
                    inspector: formData.get('inspector'),
                    type: formData.get('type'),
                    priority: formData.get('priority'),
                    description: formData.get('description'),
                    estimatedDuration: formData.get('estimatedDuration')
                  };
                  handleScheduleInspection(inspectionData);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                      type="text"
                      name="title"
                      defaultValue={selectedInspection?.title || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                    <input
                      type="text"
                      name="company"
                      defaultValue={selectedInspection?.company || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      defaultValue={selectedInspection?.location || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      type="date"
                      name="date"
                      defaultValue={selectedInspection?.date || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      type="time"
                      name="time"
                      defaultValue={selectedInspection?.time || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Inspector</label>
                    <input
                      type="text"
                      name="inspector"
                      defaultValue={selectedInspection?.inspector || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                      name="type"
                      defaultValue={selectedInspection?.type || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Type</option>
                      <option value="Safety">Safety</option>
                      <option value="Environmental">Environmental</option>
                      <option value="Compliance">Compliance</option>
                      <option value="Routine">Routine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      name="priority"
                      defaultValue={selectedInspection?.priority || ''}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Duration</label>
                    <input
                      type="text"
                      name="estimatedDuration"
                      defaultValue={selectedInspection?.estimatedDuration || ''}
                      placeholder="e.g., 4 hours"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    defaultValue={selectedInspection?.description || ''}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowScheduleModal(false);
                      setSelectedInspection(null);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {selectedInspection ? 'Update' : 'Schedule'} Inspection
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Details Modal */}
        {showDetailsModal && selectedInspection && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">Inspection Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">ID</label>
                    <p className="text-gray-900">{selectedInspection.id}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(selectedInspection.status)}
                      <span>{selectedInspection.status}</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <p className="text-gray-900">{selectedInspection.title}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                      {selectedInspection.type}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Company</label>
                    <p className="text-gray-900">{selectedInspection.company}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`px-2 py-1 rounded text-sm ${getPriorityColor(selectedInspection.priority)}`}>
                      {selectedInspection.priority}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="text-gray-900">{selectedInspection.location}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Inspector</label>
                    <p className="text-gray-900">{selectedInspection.inspector}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date &amp; Time</label>
                    <p className="text-gray-900">
                      {new Date(selectedInspection.date).toLocaleDateString()} at {selectedInspection.time}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-gray-900">{selectedInspection.estimatedDuration}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="text-gray-900 mt-1">{selectedInspection.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}