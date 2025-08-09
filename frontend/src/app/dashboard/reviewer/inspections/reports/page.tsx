'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, EyeIcon, ArrowDownTrayIcon, CalendarIcon, MapPinIcon, UserIcon } from '@heroicons/react/24/outline';

interface InspectionReport {
  id: string;
  reportNumber: string;
  inspectionId: string;
  facilityName: string;
  companyName: string;
  inspectionType: 'routine' | 'compliance' | 'safety' | 'environmental' | 'emergency';
  inspectionDate: string;
  reportDate: string;
  status: 'draft' | 'under_review' | 'approved' | 'rejected' | 'published';
  priority: 'high' | 'medium' | 'low';
  leadInspector: {
    name: string;
    id: string;
    certification: string;
  };
  inspectors: {
    id: string;
    name: string;
    role: string;
  }[];
  location: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  findings: {
    id: string;
    category: 'compliance' | 'safety' | 'environmental' | 'operational' | 'documentation';
    severity: 'critical' | 'major' | 'minor' | 'observation';
    description: string;
    recommendation: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    dueDate?: string;
  }[];
  overallRating: 'excellent' | 'good' | 'satisfactory' | 'needs_improvement' | 'unsatisfactory';
  complianceScore: number; // 0-100
  recommendations: string[];
  followUpRequired: boolean;
  followUpDate?: string;
  attachments: {
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }[];
  reviewedBy?: string;
  reviewDate?: string;
  approvedBy?: string;
  approvalDate?: string;
  publishedDate?: string;
  summary: string;
  nextInspectionDue?: string;
}

const mockReports: InspectionReport[] = [
  {
    id: 'RPT001',
    reportNumber: 'RPT-2024-001',
    inspectionId: 'INS-2024-001',
    facilityName: 'Bonny Island LNG Terminal',
    companyName: 'Nigeria LNG Limited',
    inspectionType: 'routine',
    inspectionDate: '2024-02-15',
    reportDate: '2024-02-18',
    status: 'approved',
    priority: 'high',
    leadInspector: {
      name: 'Engr. Adebayo Ogundimu',
      id: 'I001',
      certification: 'Certified Safety Inspector (CSI)'
    },
    inspectors: [
      { id: 'I001', name: 'Engr. Adebayo Ogundimu', role: 'Lead Inspector' },
      { id: 'I002', name: 'Dr. Kemi Adeosun', role: 'Environmental Inspector' },
      { id: 'I003', name: 'Engr. Tunde Bakare', role: 'Technical Inspector' }
    ],
    location: {
      address: 'Bonny Island, Rivers State, Nigeria',
      coordinates: { lat: 4.4511, lng: 7.1693 }
    },
    findings: [
      {
        id: 'F001',
        category: 'safety',
        severity: 'minor',
        description: 'Some safety signage requires updating to current standards',
        recommendation: 'Update all safety signage within 30 days',
        status: 'in_progress',
        dueDate: '2024-03-20'
      },
      {
        id: 'F002',
        category: 'environmental',
        severity: 'observation',
        description: 'Waste segregation practices are exemplary',
        recommendation: 'Continue current practices and consider sharing as best practice',
        status: 'closed'
      },
      {
        id: 'F003',
        category: 'compliance',
        severity: 'major',
        description: 'Local content reporting documentation incomplete',
        recommendation: 'Complete missing documentation and implement quarterly review process',
        status: 'open',
        dueDate: '2024-03-15'
      }
    ],
    overallRating: 'good',
    complianceScore: 85,
    recommendations: [
      'Implement digital tracking system for local content compliance',
      'Enhance safety training program for new personnel',
      'Establish regular environmental monitoring schedule'
    ],
    followUpRequired: true,
    followUpDate: '2024-05-15',
    attachments: [
      { id: 'A001', name: 'Inspection_Photos.zip', type: 'application/zip', size: 15728640, url: '/attachments/A001' },
      { id: 'A002', name: 'Compliance_Checklist.pdf', type: 'application/pdf', size: 2097152, url: '/attachments/A002' },
      { id: 'A003', name: 'Environmental_Readings.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 524288, url: '/attachments/A003' }
    ],
    reviewedBy: 'Dr. Folake Solanke',
    reviewDate: '2024-02-20',
    approvedBy: 'Chief Emeka Anyaoku',
    approvalDate: '2024-02-22',
    publishedDate: '2024-02-23',
    summary: 'Overall facility operations are satisfactory with minor areas for improvement. Strong environmental practices observed. Local content compliance documentation needs attention.',
    nextInspectionDue: '2024-08-15'
  },
  {
    id: 'RPT002',
    reportNumber: 'RPT-2024-002',
    inspectionId: 'INS-2024-002',
    facilityName: 'Escravos Gas-to-Liquids Plant',
    companyName: 'Chevron Nigeria Limited',
    inspectionType: 'compliance',
    inspectionDate: '2024-02-18',
    reportDate: '2024-02-21',
    status: 'under_review',
    priority: 'high',
    leadInspector: {
      name: 'Prof. Ngozi Okonkwo',
      id: 'I004',
      certification: 'Certified Compliance Auditor (CCA)'
    },
    inspectors: [
      { id: 'I004', name: 'Prof. Ngozi Okonkwo', role: 'Lead Inspector' },
      { id: 'I005', name: 'Engr. Segun Obasanjo', role: 'Safety Inspector' }
    ],
    location: {
      address: 'Escravos, Delta State, Nigeria',
      coordinates: { lat: 5.2317, lng: 5.0648 }
    },
    findings: [
      {
        id: 'F004',
        category: 'compliance',
        severity: 'critical',
        description: 'Local content plan implementation significantly behind schedule',
        recommendation: 'Immediate action required to bring local content compliance up to required levels',
        status: 'open',
        dueDate: '2024-03-01'
      },
      {
        id: 'F005',
        category: 'documentation',
        severity: 'major',
        description: 'Personnel training records not properly maintained',
        recommendation: 'Implement comprehensive training record management system',
        status: 'open',
        dueDate: '2024-03-10'
      },
      {
        id: 'F006',
        category: 'operational',
        severity: 'minor',
        description: 'Some operational procedures need updating',
        recommendation: 'Review and update operational procedures to reflect current best practices',
        status: 'open',
        dueDate: '2024-04-01'
      }
    ],
    overallRating: 'needs_improvement',
    complianceScore: 65,
    recommendations: [
      'Urgent review of local content implementation strategy',
      'Establish dedicated compliance monitoring team',
      'Implement monthly compliance reporting system',
      'Enhance personnel training and record keeping'
    ],
    followUpRequired: true,
    followUpDate: '2024-04-18',
    attachments: [
      { id: 'A004', name: 'Compliance_Assessment.pdf', type: 'application/pdf', size: 3145728, url: '/attachments/A004' },
      { id: 'A005', name: 'Training_Records_Analysis.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 1048576, url: '/attachments/A005' }
    ],
    reviewedBy: 'Dr. Amina Hassan',
    reviewDate: '2024-02-23',
    summary: 'Significant compliance gaps identified requiring immediate attention. Facility operations are technically sound but regulatory compliance needs substantial improvement.',
    nextInspectionDue: '2024-05-18'
  },
  {
    id: 'RPT003',
    reportNumber: 'RPT-2024-003',
    inspectionId: 'INS-2024-003',
    facilityName: 'Agbami FPSO Facility',
    companyName: 'Chevron Nigeria Limited',
    inspectionType: 'safety',
    inspectionDate: '2024-02-20',
    reportDate: '2024-02-23',
    status: 'draft',
    priority: 'medium',
    leadInspector: {
      name: 'Capt. Ibrahim Musa',
      id: 'I006',
      certification: 'Marine Safety Inspector (MSI)'
    },
    inspectors: [
      { id: 'I006', name: 'Capt. Ibrahim Musa', role: 'Marine Inspector' },
      { id: 'I007', name: 'Engr. Fatima Aliyu', role: 'Process Safety Inspector' }
    ],
    location: {
      address: 'Agbami Field, Offshore Lagos, Nigeria',
      coordinates: { lat: 3.8333, lng: 3.5000 }
    },
    findings: [
      {
        id: 'F007',
        category: 'safety',
        severity: 'minor',
        description: 'Emergency response drill frequency could be improved',
        recommendation: 'Increase emergency drill frequency to monthly',
        status: 'open',
        dueDate: '2024-03-25'
      },
      {
        id: 'F008',
        category: 'safety',
        severity: 'observation',
        description: 'Excellent maintenance of safety equipment',
        recommendation: 'Continue current maintenance practices',
        status: 'closed'
      }
    ],
    overallRating: 'excellent',
    complianceScore: 95,
    recommendations: [
      'Maintain current high safety standards',
      'Consider sharing safety best practices with other facilities',
      'Implement advanced safety monitoring technologies'
    ],
    followUpRequired: false,
    attachments: [
      { id: 'A006', name: 'Safety_Assessment.pdf', type: 'application/pdf', size: 2621440, url: '/attachments/A006' }
    ],
    summary: 'Exceptional safety standards observed. Facility demonstrates industry-leading safety practices with minimal areas for improvement.',
    nextInspectionDue: '2024-08-20'
  },
  {
    id: 'RPT004',
    reportNumber: 'RPT-2024-004',
    inspectionId: 'INS-2024-004',
    facilityName: 'Warri Refining & Petrochemical Company',
    companyName: 'Nigerian National Petroleum Corporation',
    inspectionType: 'environmental',
    inspectionDate: '2024-02-25',
    reportDate: '2024-02-28',
    status: 'published',
    priority: 'high',
    leadInspector: {
      name: 'Dr. Aisha Abubakar',
      id: 'I008',
      certification: 'Environmental Impact Assessor (EIA)'
    },
    inspectors: [
      { id: 'I008', name: 'Dr. Aisha Abubakar', role: 'Environmental Inspector' },
      { id: 'I009', name: 'Prof. Chinwe Obaji', role: 'Chemical Inspector' }
    ],
    location: {
      address: 'Warri, Delta State, Nigeria',
      coordinates: { lat: 5.5160, lng: 5.7500 }
    },
    findings: [
      {
        id: 'F009',
        category: 'environmental',
        severity: 'major',
        description: 'Waste water treatment system requires upgrade',
        recommendation: 'Upgrade waste water treatment system to meet current environmental standards',
        status: 'open',
        dueDate: '2024-06-25'
      },
      {
        id: 'F010',
        category: 'environmental',
        severity: 'minor',
        description: 'Air quality monitoring could be enhanced',
        recommendation: 'Install additional air quality monitoring stations',
        status: 'in_progress',
        dueDate: '2024-04-25'
      }
    ],
    overallRating: 'satisfactory',
    complianceScore: 78,
    recommendations: [
      'Prioritize waste water treatment system upgrade',
      'Enhance environmental monitoring capabilities',
      'Develop comprehensive environmental management plan'
    ],
    followUpRequired: true,
    followUpDate: '2024-05-25',
    attachments: [
      { id: 'A007', name: 'Environmental_Report.pdf', type: 'application/pdf', size: 4194304, url: '/attachments/A007' },
      { id: 'A008', name: 'Water_Quality_Data.xlsx', type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', size: 786432, url: '/attachments/A008' }
    ],
    reviewedBy: 'Prof. Kemi Adeosun',
    reviewDate: '2024-03-02',
    approvedBy: 'Dr. Folake Solanke',
    approvalDate: '2024-03-05',
    publishedDate: '2024-03-06',
    summary: 'Environmental compliance is generally satisfactory with some areas requiring attention. Waste water treatment upgrade is priority.',
    nextInspectionDue: '2024-08-25'
  }
];

export default function InspectionReportsPage() {
  const [reports, setReports] = useState<InspectionReport[]>(mockReports);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<InspectionReport | null>(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.reportNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesType = typeFilter === 'all' || report.inspectionType === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'approved':
        return <CheckCircleIcon className="w-5 h-5 text-blue-500" />;
      case 'rejected':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      case 'under_review':
        return <ExclamationTriangleIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-yellow-100 text-yellow-800';
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

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'excellent':
        return 'bg-green-100 text-green-800';
      case 'good':
        return 'bg-blue-100 text-blue-800';
      case 'satisfactory':
        return 'bg-yellow-100 text-yellow-800';
      case 'needs_improvement':
        return 'bg-orange-100 text-orange-800';
      case 'unsatisfactory':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'major':
        return 'bg-orange-100 text-orange-800';
      case 'minor':
        return 'bg-yellow-100 text-yellow-800';
      case 'observation':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleViewDetails = (report: InspectionReport) => {
    setSelectedReport(report);
    setShowDetailsModal(true);
  };

  const getAverageComplianceScore = () => {
    const total = reports.reduce((sum, report) => sum + report.complianceScore, 0);
    return Math.round(total / reports.length);
  };

  const getCriticalFindings = () => {
    return reports.reduce((count, report) => {
      return count + report.findings.filter(finding => finding.severity === 'critical').length;
    }, 0);
  };

  const getPendingReports = () => {
    return reports.filter(report => report.status === 'draft' || report.status === 'under_review').length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inspection Reports</h1>
          <p className="text-sm text-gray-600">Review and manage facility inspection reports</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DocumentTextIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">{getPendingReports()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Findings</p>
              <p className="text-2xl font-bold text-gray-900">{getCriticalFindings()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Compliance</p>
              <p className="text-2xl font-bold text-gray-900">{getAverageComplianceScore()}%</p>
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
                placeholder="Search by facility, company, or report number..."
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
              <option value="draft">Draft</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="published">Published</option>
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

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Facility</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inspector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.reportNumber}</div>
                      <div className="text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4 inline mr-1" />
                        {report.reportDate}
                      </div>
                      <div className="text-xs text-gray-400">Score: {report.complianceScore}%</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.facilityName}</div>
                      <div className="text-sm text-gray-500">{report.companyName}</div>
                      <div className="text-xs text-gray-400">
                        <MapPinIcon className="w-3 h-3 inline mr-1" />
                        {report.location.address.split(',')[0]}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(report.inspectionType)}`}>
                      {report.inspectionType.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <div>
                        <div className="text-sm text-gray-900">{report.leadInspector.name}</div>
                        <div className="text-xs text-gray-500">{report.leadInspector.certification}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(report.overallRating)}`}>
                      {report.overallRating.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className={`ml-2 inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(report.status)}`}>
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleViewDetails(report)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        View
                      </button>
                      <button className="text-green-600 hover:text-green-900 flex items-center">
                        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedReport && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-6xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Inspection Report - {selectedReport.reportNumber}
                </h3>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>
              
              {/* Report Header */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Facility Information</h4>
                  <div className="space-y-1">
                    <div><span className="font-medium">Facility:</span> {selectedReport.facilityName}</div>
                    <div><span className="font-medium">Company:</span> {selectedReport.companyName}</div>
                    <div><span className="font-medium">Location:</span> {selectedReport.location.address}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Inspection Details</h4>
                  <div className="space-y-1">
                    <div><span className="font-medium">Type:</span> {selectedReport.inspectionType}</div>
                    <div><span className="font-medium">Date:</span> {selectedReport.inspectionDate}</div>
                    <div><span className="font-medium">Report Date:</span> {selectedReport.reportDate}</div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Assessment</h4>
                  <div className="space-y-1">
                    <div><span className="font-medium">Rating:</span> 
                      <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${getRatingColor(selectedReport.overallRating)}`}>
                        {selectedReport.overallRating.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div><span className="font-medium">Compliance Score:</span> {selectedReport.complianceScore}%</div>
                    <div><span className="font-medium">Follow-up Required:</span> {selectedReport.followUpRequired ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>

              {/* Summary */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Executive Summary</h4>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedReport.summary}</p>
              </div>

              {/* Inspection Team */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Inspection Team</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Certification</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedReport.inspectors.map((inspector, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm text-gray-900">{inspector.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">{inspector.role}</td>
                          <td className="px-4 py-2 text-sm text-gray-900">
                            {inspector.id === selectedReport.leadInspector.id ? selectedReport.leadInspector.certification : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Findings */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Findings ({selectedReport.findings.length})</h4>
                <div className="space-y-4">
                  {selectedReport.findings.map((finding) => (
                    <div key={finding.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(finding.severity)}`}>
                            {finding.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">{finding.category}</span>
                        </div>
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          finding.status === 'closed' ? 'bg-green-100 text-green-800' :
                          finding.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {finding.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-900 font-medium">Finding:</p>
                        <p className="text-sm text-gray-700">{finding.description}</p>
                      </div>
                      <div className="mb-2">
                        <p className="text-sm text-gray-900 font-medium">Recommendation:</p>
                        <p className="text-sm text-gray-700">{finding.recommendation}</p>
                      </div>
                      {finding.dueDate && (
                        <div className="text-xs text-gray-500">
                          Due Date: {finding.dueDate}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Recommendations</h4>
                <ul className="list-disc list-inside space-y-1">
                  {selectedReport.recommendations.map((recommendation, index) => (
                    <li key={index} className="text-sm text-gray-700">{recommendation}</li>
                  ))}
                </ul>
              </div>

              {/* Attachments */}
              {selectedReport.attachments.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Attachments ({selectedReport.attachments.length})</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedReport.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center p-3 border border-gray-200 rounded-lg">
                        <DocumentTextIcon className="w-8 h-8 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm font-medium text-gray-900">{attachment.name}</div>
                          <div className="text-xs text-gray-500">{formatFileSize(attachment.size)}</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-900">
                          <ArrowDownTrayIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approval History */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Approval History</h4>
                <div className="space-y-2">
                  {selectedReport.reviewedBy && (
                    <div className="text-sm">
                      <span className="font-medium">Reviewed by:</span> {selectedReport.reviewedBy} on {selectedReport.reviewDate}
                    </div>
                  )}
                  {selectedReport.approvedBy && (
                    <div className="text-sm">
                      <span className="font-medium">Approved by:</span> {selectedReport.approvedBy} on {selectedReport.approvalDate}
                    </div>
                  )}
                  {selectedReport.publishedDate && (
                    <div className="text-sm">
                      <span className="font-medium">Published on:</span> {selectedReport.publishedDate}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}