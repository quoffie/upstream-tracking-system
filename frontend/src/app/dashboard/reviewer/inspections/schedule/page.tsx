'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, CalendarIcon, MapPinIcon, UserGroupIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, PlusIcon } from '@heroicons/react/24/outline';

interface Inspection {
  id: string;
  inspectionNumber: string;
  facilityName: string;
  companyName: string;
  inspectionType: 'routine' | 'compliance' | 'safety' | 'environmental' | 'emergency';
  scheduledDate: string;
  scheduledTime: string;
  duration: number; // in hours
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'high' | 'medium' | 'low';
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  inspectors: {
    id: string;
    name: string;
    role: string;
    specialization: string[];
  }[];
  checklist: string[];
  requirements: string[];
  notes?: string;
  createdBy: string;
  createdDate: string;
  lastModified: string;
  contactPerson: {
    name: string;
    position: string;
    phone: string;
    email: string;
  };
  estimatedCost: number;
  approvalRequired: boolean;
  approvedBy?: string;
  approvalDate?: string;
}

const mockInspections: Inspection[] = [
  {
    id: 'INS001',
    inspectionNumber: 'INS-2024-001',
    facilityName: 'Bonny Island LNG Terminal',
    companyName: 'Nigeria LNG Limited',
    inspectionType: 'routine',
    scheduledDate: '2024-02-15',
    scheduledTime: '09:00',
    duration: 8,
    status: 'scheduled',
    priority: 'high',
    location: {
      address: 'Bonny Island, Rivers State, Nigeria',
      coordinates: { lat: 4.4511, lng: 7.1693 }
    },
    inspectors: [
      { id: 'I001', name: 'Engr. Adebayo Ogundimu', role: 'Lead Inspector', specialization: ['Safety', 'Operations'] },
      { id: 'I002', name: 'Dr. Kemi Adeosun', role: 'Environmental Inspector', specialization: ['Environmental', 'Compliance'] },
      { id: 'I003', name: 'Engr. Tunde Bakare', role: 'Technical Inspector', specialization: ['Technical', 'Mechanical'] }
    ],
    checklist: [
      'Safety equipment inspection',
      'Environmental compliance check',
      'Operational procedures review',
      'Personnel certification verification',
      'Equipment maintenance records'
    ],
    requirements: [
      'Safety helmets and protective gear',
      'Gas detection equipment',
      'Environmental monitoring tools',
      'Documentation cameras',
      'Measurement instruments'
    ],
    contactPerson: {
      name: 'Mr. James Okafor',
      position: 'Operations Manager',
      phone: '+234-803-123-4567',
      email: 'j.okafor@nlng.com'
    },
    estimatedCost: 2500000,
    approvalRequired: true,
    createdBy: 'Dr. Amina Hassan',
    createdDate: '2024-01-20',
    lastModified: '2024-01-22'
  },
  {
    id: 'INS002',
    inspectionNumber: 'INS-2024-002',
    facilityName: 'Escravos Gas-to-Liquids Plant',
    companyName: 'Chevron Nigeria Limited',
    inspectionType: 'compliance',
    scheduledDate: '2024-02-18',
    scheduledTime: '08:30',
    duration: 6,
    status: 'confirmed',
    priority: 'high',
    location: {
      address: 'Escravos, Delta State, Nigeria',
      coordinates: { lat: 5.2317, lng: 5.0648 }
    },
    inspectors: [
      { id: 'I004', name: 'Prof. Ngozi Okonkwo', role: 'Lead Inspector', specialization: ['Compliance', 'Legal'] },
      { id: 'I005', name: 'Engr. Segun Obasanjo', role: 'Safety Inspector', specialization: ['Safety', 'Risk Assessment'] }
    ],
    checklist: [
      'Local content compliance verification',
      'Personnel training records',
      'Contractor compliance check',
      'Documentation review',
      'Regulatory compliance assessment'
    ],
    requirements: [
      'Compliance documentation',
      'Personnel records access',
      'Training certificates',
      'Contractor agreements',
      'Audit trail documentation'
    ],
    contactPerson: {
      name: 'Mrs. Sarah Johnson',
      position: 'Compliance Manager',
      phone: '+234-805-987-6543',
      email: 's.johnson@chevron.com'
    },
    estimatedCost: 1800000,
    approvalRequired: true,
    approvedBy: 'Dr. Folake Solanke',
    approvalDate: '2024-01-25',
    createdBy: 'Prof. Kemi Adeosun',
    createdDate: '2024-01-18',
    lastModified: '2024-01-25'
  },
  {
    id: 'INS003',
    inspectionNumber: 'INS-2024-003',
    facilityName: 'Agbami FPSO Facility',
    companyName: 'Chevron Nigeria Limited',
    inspectionType: 'safety',
    scheduledDate: '2024-02-20',
    scheduledTime: '10:00',
    duration: 10,
    status: 'in_progress',
    priority: 'medium',
    location: {
      address: 'Agbami Field, Offshore Lagos, Nigeria',
      coordinates: { lat: 3.8333, lng: 3.5000 }
    },
    inspectors: [
      { id: 'I006', name: 'Capt. Ibrahim Musa', role: 'Marine Inspector', specialization: ['Marine Safety', 'Offshore Operations'] },
      { id: 'I007', name: 'Engr. Fatima Aliyu', role: 'Process Safety Inspector', specialization: ['Process Safety', 'HSE'] }
    ],
    checklist: [
      'Fire and gas detection systems',
      'Emergency response procedures',
      'Lifeboat and safety equipment',
      'Process safety systems',
      'Personnel safety training'
    ],
    requirements: [
      'Marine safety equipment',
      'Helicopter access coordination',
      'Emergency response gear',
      'Communication equipment',
      'Weather monitoring tools'
    ],
    contactPerson: {
      name: 'Capt. Michael Brown',
      position: 'Offshore Installation Manager',
      phone: '+234-807-456-7890',
      email: 'm.brown@chevron.com'
    },
    estimatedCost: 4200000,
    approvalRequired: true,
    approvedBy: 'Chief Emeka Anyaoku',
    approvalDate: '2024-01-28',
    createdBy: 'Dr. Amina Hassan',
    createdDate: '2024-01-15',
    lastModified: '2024-02-01'
  },
  {
    id: 'INS004',
    inspectionNumber: 'INS-2024-004',
    facilityName: 'Warri Refining & Petrochemical Company',
    companyName: 'Nigerian National Petroleum Corporation',
    inspectionType: 'environmental',
    scheduledDate: '2024-02-25',
    scheduledTime: '07:00',
    duration: 12,
    status: 'scheduled',
    priority: 'high',
    location: {
      address: 'Warri, Delta State, Nigeria',
      coordinates: { lat: 5.5160, lng: 5.7500 }
    },
    inspectors: [
      { id: 'I008', name: 'Dr. Aisha Abubakar', role: 'Environmental Inspector', specialization: ['Environmental Impact', 'Waste Management'] },
      { id: 'I009', name: 'Prof. Chinwe Obaji', role: 'Chemical Inspector', specialization: ['Chemical Safety', 'Air Quality'] }
    ],
    checklist: [
      'Waste management systems',
      'Air quality monitoring',
      'Water treatment facilities',
      'Soil contamination assessment',
      'Environmental permits compliance'
    ],
    requirements: [
      'Environmental monitoring equipment',
      'Sampling containers',
      'Air quality meters',
      'Water testing kits',
      'Soil sampling tools'
    ],
    contactPerson: {
      name: 'Dr. Yusuf Maitama',
      position: 'Environmental Manager',
      phone: '+234-809-234-5678',
      email: 'y.maitama@nnpc.gov.ng'
    },
    estimatedCost: 3100000,
    approvalRequired: false,
    createdBy: 'Prof. Kemi Adeosun',
    createdDate: '2024-01-25',
    lastModified: '2024-01-30'
  }
];

export default function ScheduleInspectionsPage() {
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [newInspection, setNewInspection] = useState<Partial<Inspection>>({});

  const filteredInspections = inspections.filter(inspection => {
    const matchesSearch = inspection.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inspection.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inspection.inspectionNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || inspection.status === statusFilter;
    const matchesType = typeFilter === 'all' || inspection.inspectionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'in_progress':
        return <ClockIcon className="w-5 h-5 text-blue-500" />;
      case 'confirmed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'rescheduled':
        return <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />;
      default:
        return <CalendarIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rescheduled':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'routine':
        return 'bg-blue-100 text-blue-800';
      case 'compliance':
        return 'bg-purple-100 text-purple-800';
      case 'safety':
        return 'bg-red-100 text-red-800';
      case 'environmental':
        return 'bg-green-100 text-green-800';
      case 'emergency':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleViewDetails = (inspection: Inspection) => {
    setSelectedInspection(inspection);
    setShowDetailsModal(true);
  };

  const handleScheduleNew = () => {
    setNewInspection({
      inspectionType: 'routine',
      priority: 'medium',
      status: 'scheduled',
      duration: 8,
      approvalRequired: false,
      inspectors: [],
      checklist: [],
      requirements: []
    });
    setShowScheduleModal(true);
  };

  const submitNewInspection = () => {
    if (newInspection.facilityName && newInspection.scheduledDate) {
      const inspection: Inspection = {
        id: `INS${String(inspections.length + 1).padStart(3, '0')}`,
        inspectionNumber: `INS-2024-${String(inspections.length + 1).padStart(3, '0')}`,
        facilityName: newInspection.facilityName || '',
        companyName: newInspection.companyName || '',
        inspectionType: newInspection.inspectionType || 'routine',
        scheduledDate: newInspection.scheduledDate || '',
        scheduledTime: newInspection.scheduledTime || '09:00',
        duration: newInspection.duration || 8,
        status: 'scheduled',
        priority: newInspection.priority || 'medium',
        location: {
          address: newInspection.location?.address || ''
        },
        inspectors: newInspection.inspectors || [],
        checklist: newInspection.checklist || [],
        requirements: newInspection.requirements || [],
        notes: newInspection.notes,
        contactPerson: newInspection.contactPerson || {
          name: '',
          position: '',
          phone: '',
          email: ''
        },
        estimatedCost: newInspection.estimatedCost || 0,
        approvalRequired: newInspection.approvalRequired || false,
        createdBy: 'Current User',
        createdDate: new Date().toISOString().split('T')[0],
        lastModified: new Date().toISOString().split('T')[0]
      };
      
      setInspections(prev => [...prev, inspection]);
      setShowScheduleModal(false);
      setNewInspection({});
    }
  };

  const getTotalCost = () => {
    return inspections.reduce((sum, inspection) => sum + inspection.estimatedCost, 0);
  };

  const getUpcomingInspections = () => {
    const today = new Date();
    return inspections.filter(inspection => {
      const inspectionDate = new Date(inspection.scheduledDate);
      return inspectionDate >= today && (inspection.status === 'scheduled' || inspection.status === 'confirmed');
    }).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule Inspections</h1>
          <p className="text-sm text-gray-600">Plan and coordinate facility inspections</p>
        </div>
        <button
          onClick={handleScheduleNew}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusIcon className="w-5 h-5 mr-2" />
          Schedule New Inspection
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Inspections</p>
              <p className="text-2xl font-bold text-gray-900">{inspections.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Upcoming</p>
              <p className="text-2xl font-bold text-gray-900">{getUpcomingInspections()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {inspections.filter(i => i.status === 'in_progress').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <UserGroupIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-lg font-bold text-gray-900">{formatCurrency(getTotalCost())}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by facility, company, or inspection number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="rescheduled">Rescheduled</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="routine">Routine</option>
              <option value="compliance">Compliance</option>
              <option value="safety">Safety</option>
              <option value="environmental">Environmental</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Schedule</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspectors</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInspections.map((inspection) => (
                <tr key={inspection.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{inspection.facilityName}</div>
                      <div className="text-sm text-gray-500">{inspection.companyName}</div>
                      <div className="text-xs text-gray-400">{inspection.inspectionNumber}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(inspection.inspectionType)}`}>
                      {inspection.inspectionType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 text-gray-400 mr-1" />
                        {inspection.scheduledDate}
                      </div>
                      <div className="flex items-center mt-1">
                        <ClockIcon className="w-4 h-4 text-gray-400 mr-1" />
                        {inspection.scheduledTime} ({inspection.duration}h)
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{inspection.inspectors.length}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(inspection.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(inspection.status)}`}>
                        {inspection.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatCurrency(inspection.estimatedCost)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(inspection)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Details
                      </button>
                      {(inspection.status === 'scheduled' || inspection.status === 'confirmed') && (
                        <button className="text-green-600 hover:text-green-900">
                          Edit
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedInspection && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Inspection Details - {selectedInspection.inspectionNumber}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium">Facility:</span> {selectedInspection.facilityName}</div>
                    <div><span className="font-medium">Company:</span> {selectedInspection.companyName}</div>
                    <div><span className="font-medium">Type:</span> {selectedInspection.inspectionType}</div>
                    <div><span className="font-medium">Priority:</span> {selectedInspection.priority}</div>
                    <div><span className="font-medium">Location:</span> {selectedInspection.location.address}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Schedule & Cost</h4>
                  <div className="space-y-2">
                    <div><span className="font-medium">Date:</span> {selectedInspection.scheduledDate}</div>
                    <div><span className="font-medium">Time:</span> {selectedInspection.scheduledTime}</div>
                    <div><span className="font-medium">Duration:</span> {selectedInspection.duration} hours</div>
                    <div><span className="font-medium">Cost:</span> {formatCurrency(selectedInspection.estimatedCost)}</div>
                    <div><span className="font-medium">Approval Required:</span> {selectedInspection.approvalRequired ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Assigned Inspectors</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedInspection.inspectors.map((inspector, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{inspector.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{inspector.role}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{inspector.specialization.join(', ')}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Inspection Checklist</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedInspection.checklist.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Requirements</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedInspection.requirements.map((item, index) => (
                      <li key={index} className="text-sm text-gray-700">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Contact Person</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="font-medium">Name:</span> {selectedInspection.contactPerson.name}</div>
                    <div><span className="font-medium">Position:</span> {selectedInspection.contactPerson.position}</div>
                    <div><span className="font-medium">Phone:</span> {selectedInspection.contactPerson.phone}</div>
                    <div><span className="font-medium">Email:</span> {selectedInspection.contactPerson.email}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule New Inspection Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-4/5 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule New Inspection</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facility Name</label>
                  <input
                    type="text"
                    value={newInspection.facilityName || ''}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, facilityName: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter facility name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <input
                    type="text"
                    value={newInspection.companyName || ''}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter company name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Inspection Type</label>
                  <select
                    value={newInspection.inspectionType || 'routine'}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, inspectionType: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="routine">Routine</option>
                    <option value="compliance">Compliance</option>
                    <option value="safety">Safety</option>
                    <option value="environmental">Environmental</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={newInspection.priority || 'medium'}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (hours)</label>
                  <input
                    type="number"
                    value={newInspection.duration || 8}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="24"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Date</label>
                  <input
                    type="date"
                    value={newInspection.scheduledDate || ''}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, scheduledDate: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Scheduled Time</label>
                  <input
                    type="time"
                    value={newInspection.scheduledTime || '09:00'}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, scheduledTime: e.target.value }))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  value={newInspection.location?.address || ''}
                  onChange={(e) => setNewInspection(prev => ({ 
                    ...prev, 
                    location: { ...prev.location, address: e.target.value }
                  }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter facility address"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Cost (NGN)</label>
                <input
                  type="number"
                  value={newInspection.estimatedCost || 0}
                  onChange={(e) => setNewInspection(prev => ({ ...prev, estimatedCost: parseInt(e.target.value) }))}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter estimated cost"
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newInspection.approvalRequired || false}
                    onChange={(e) => setNewInspection(prev => ({ ...prev, approvalRequired: e.target.checked }))}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">Requires approval before execution</span>
                </label>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowScheduleModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitNewInspection}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Schedule Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}