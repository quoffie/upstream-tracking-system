'use client';

import { useState } from 'react';
import {
  BriefcaseIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  DocumentTextIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface JobPosting {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  type: 'full_time' | 'part_time' | 'contract' | 'temporary';
  level: 'entry' | 'mid' | 'senior' | 'executive';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedDate: string;
  closingDate: string;
  status: 'active' | 'closed' | 'draft' | 'on_hold';
  applicants: number;
  positions: number;
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  phone: string;
  experience: number;
  education: string;
  currentCompany: string;
  applicationDate: string;
  status: 'submitted' | 'reviewing' | 'shortlisted' | 'interviewed' | 'offered' | 'rejected' | 'hired';
  resumeUrl: string;
  coverLetter: string;
  score: number;
  notes: string;
  interviewDate?: string;
}

const mockJobPostings: JobPosting[] = [
  {
    id: 'JP001',
    title: 'Senior Petroleum Engineer',
    company: 'Shell Nigeria',
    department: 'Engineering',
    location: 'Lagos, Nigeria',
    type: 'full_time',
    level: 'senior',
    salary: {
      min: 8000000,
      max: 12000000,
      currency: 'NGN'
    },
    description: 'We are seeking an experienced Senior Petroleum Engineer to join our upstream operations team.',
    requirements: [
      'Bachelor\'s degree in Petroleum Engineering',
      'Minimum 8 years of experience in upstream operations',
      'Professional certification (SPE membership preferred)',
      'Experience with reservoir simulation software',
      'Strong analytical and problem-solving skills'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Health insurance for family',
      'Annual leave and sick leave',
      'Professional development opportunities',
      'Retirement savings plan'
    ],
    postedDate: '2024-02-01',
    closingDate: '2024-02-28',
    status: 'active',
    applicants: 45,
    positions: 2,
    urgency: 'high'
  },
  {
    id: 'JP002',
    title: 'HSE Officer',
    company: 'TotalEnergies',
    department: 'Health, Safety & Environment',
    location: 'Port Harcourt, Nigeria',
    type: 'full_time',
    level: 'mid',
    salary: {
      min: 4500000,
      max: 6500000,
      currency: 'NGN'
    },
    description: 'Join our HSE team to ensure compliance with safety regulations and environmental standards.',
    requirements: [
      'Bachelor\'s degree in Environmental Science or related field',
      'Minimum 5 years HSE experience in oil & gas',
      'NEBOSH certification required',
      'Knowledge of Nigerian environmental regulations',
      'Excellent communication skills'
    ],
    benefits: [
      'Competitive salary package',
      'Medical insurance',
      'Training and certification support',
      'Career advancement opportunities',
      'Performance bonuses'
    ],
    postedDate: '2024-01-28',
    closingDate: '2024-02-25',
    status: 'active',
    applicants: 32,
    positions: 1,
    urgency: 'medium'
  },
  {
    id: 'JP003',
    title: 'Junior Geologist',
    company: 'Chevron Nigeria',
    department: 'Exploration',
    location: 'Warri, Nigeria',
    type: 'full_time',
    level: 'entry',
    salary: {
      min: 3000000,
      max: 4500000,
      currency: 'NGN'
    },
    description: 'Entry-level position for recent geology graduates to join our exploration team.',
    requirements: [
      'Bachelor\'s degree in Geology or Geophysics',
      'Fresh graduate or 1-2 years experience',
      'Knowledge of geological software (Petrel, GeoFrame)',
      'Strong analytical skills',
      'Willingness to work in field conditions'
    ],
    benefits: [
      'Graduate training program',
      'Mentorship opportunities',
      'Health and life insurance',
      'Transportation allowance',
      'Professional development budget'
    ],
    postedDate: '2024-02-05',
    closingDate: '2024-03-05',
    status: 'active',
    applicants: 78,
    positions: 3,
    urgency: 'low'
  },
  {
    id: 'JP004',
    title: 'Operations Manager',
    company: 'ExxonMobil',
    department: 'Operations',
    location: 'Abuja, Nigeria',
    type: 'full_time',
    level: 'executive',
    salary: {
      min: 15000000,
      max: 20000000,
      currency: 'NGN'
    },
    description: 'Lead our operations team and oversee daily production activities.',
    requirements: [
      'Master\'s degree in Engineering or Business',
      'Minimum 12 years management experience',
      'Proven track record in oil & gas operations',
      'Strong leadership and communication skills',
      'Experience with budget management'
    ],
    benefits: [
      'Executive compensation package',
      'Stock options',
      'Executive health plan',
      'Company car and driver',
      'International assignment opportunities'
    ],
    postedDate: '2024-01-20',
    closingDate: '2024-02-20',
    status: 'closed',
    applicants: 23,
    positions: 1,
    urgency: 'critical'
  }
];

const mockJobApplications: JobApplication[] = [
  {
    id: 'JA001',
    jobId: 'JP001',
    jobTitle: 'Senior Petroleum Engineer',
    applicantName: 'Adebayo Johnson',
    applicantEmail: 'adebayo.johnson@email.com',
    phone: '+234-801-234-5678',
    experience: 10,
    education: 'M.Sc. Petroleum Engineering',
    currentCompany: 'Nigerian National Petroleum Corporation',
    applicationDate: '2024-02-03',
    status: 'shortlisted',
    resumeUrl: '/documents/resume-adebayo.pdf',
    coverLetter: 'I am excited to apply for the Senior Petroleum Engineer position...',
    score: 85,
    notes: 'Strong technical background, excellent experience in reservoir engineering.',
    interviewDate: '2024-02-15'
  },
  {
    id: 'JA002',
    jobId: 'JP002',
    jobTitle: 'HSE Officer',
    applicantName: 'Grace Okafor',
    applicantEmail: 'grace.okafor@email.com',
    phone: '+234-803-456-7890',
    experience: 7,
    education: 'B.Sc. Environmental Science',
    currentCompany: 'Seplat Energy',
    applicationDate: '2024-01-30',
    status: 'interviewed',
    resumeUrl: '/documents/resume-grace.pdf',
    coverLetter: 'With my extensive HSE experience in the oil and gas sector...',
    score: 92,
    notes: 'Excellent HSE knowledge, NEBOSH certified, strong communication skills.',
    interviewDate: '2024-02-08'
  },
  {
    id: 'JA003',
    jobId: 'JP003',
    jobTitle: 'Junior Geologist',
    applicantName: 'Michael Chen',
    applicantEmail: 'michael.chen@email.com',
    phone: '+234-805-678-9012',
    experience: 1,
    education: 'B.Sc. Geology',
    currentCompany: 'Recent Graduate',
    applicationDate: '2024-02-07',
    status: 'reviewing',
    resumeUrl: '/documents/resume-michael.pdf',
    coverLetter: 'As a recent geology graduate with internship experience...',
    score: 78,
    notes: 'Fresh graduate with good academic record and internship experience.'
  },
  {
    id: 'JA004',
    jobId: 'JP001',
    jobTitle: 'Senior Petroleum Engineer',
    applicantName: 'Sarah Williams',
    applicantEmail: 'sarah.williams@email.com',
    phone: '+234-807-890-1234',
    experience: 12,
    education: 'Ph.D. Petroleum Engineering',
    currentCompany: 'Schlumberger',
    applicationDate: '2024-02-02',
    status: 'offered',
    resumeUrl: '/documents/resume-sarah.pdf',
    coverLetter: 'I am writing to express my interest in the Senior Petroleum Engineer role...',
    score: 95,
    notes: 'Outstanding candidate with PhD and extensive industry experience.',
    interviewDate: '2024-02-12'
  }
];

const typeColors = {
  full_time: 'bg-green-100 text-green-800',
  part_time: 'bg-blue-100 text-blue-800',
  contract: 'bg-yellow-100 text-yellow-800',
  temporary: 'bg-gray-100 text-gray-800'
};

const levelColors = {
  entry: 'bg-green-100 text-green-800',
  mid: 'bg-blue-100 text-blue-800',
  senior: 'bg-purple-100 text-purple-800',
  executive: 'bg-red-100 text-red-800'
};

const statusColors = {
  active: 'bg-green-100 text-green-800',
  closed: 'bg-red-100 text-red-800',
  draft: 'bg-gray-100 text-gray-800',
  on_hold: 'bg-yellow-100 text-yellow-800',
  submitted: 'bg-blue-100 text-blue-800',
  reviewing: 'bg-yellow-100 text-yellow-800',
  shortlisted: 'bg-purple-100 text-purple-800',
  interviewed: 'bg-indigo-100 text-indigo-800',
  offered: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-green-200 text-green-900'
};

const urgencyColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState<'postings' | 'applications'>('postings');
  const [jobPostings, setJobPostings] = useState(mockJobPostings);
  const [jobApplications, setJobApplications] = useState(mockJobApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredJobPostings = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesLevel = levelFilter === 'all' || job.level === levelFilter;
    return matchesSearch && matchesStatus && matchesLevel;
  });

  const filteredApplications = jobApplications.filter(application => {
    const matchesSearch = application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         application.applicantEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || application.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleViewJob = (job: JobPosting) => {
    setSelectedJob(job);
    setSelectedApplication(null);
    setShowModal(true);
  };

  const handleViewApplication = (application: JobApplication) => {
    setSelectedApplication(application);
    setSelectedJob(null);
    setShowModal(true);
  };

  const formatSalary = (salary: { min: number; max: number; currency: string }) => {
    const formatNumber = (num: number) => {
      if (num >= 1000000) {
        return `${(num / 1000000).toFixed(1)}M`;
      }
      return num.toLocaleString();
    };
    return `${salary.currency} ${formatNumber(salary.min)} - ${formatNumber(salary.max)}`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Jobs Management</h1>
          <p className="text-gray-600">Manage job postings and track applications</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Job Posting
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BriefcaseIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Jobs</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobPostings.filter(job => job.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Applications</p>
              <p className="text-2xl font-bold text-gray-900">{jobApplications.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ClockIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobApplications.filter(app => app.status === 'submitted' || app.status === 'reviewing').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Hired</p>
              <p className="text-2xl font-bold text-gray-900">
                {jobApplications.filter(app => app.status === 'hired').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('postings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'postings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Applications
            </button>
          </nav>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder={`Search ${activeTab === 'postings' ? 'job postings' : 'applications'}...`}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              {activeTab === 'postings' ? (
                <>
                  <option value="active">Active</option>
                  <option value="closed">Closed</option>
                  <option value="draft">Draft</option>
                  <option value="on_hold">On Hold</option>
                </>
              ) : (
                <>
                  <option value="submitted">Submitted</option>
                  <option value="reviewing">Reviewing</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interviewed">Interviewed</option>
                  <option value="offered">Offered</option>
                  <option value="rejected">Rejected</option>
                  <option value="hired">Hired</option>
                </>
              )}
            </select>
            {activeTab === 'postings' && (
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="entry">Entry Level</option>
                <option value="mid">Mid Level</option>
                <option value="senior">Senior Level</option>
                <option value="executive">Executive</option>
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'postings' ? (
            <div className="space-y-4">
              {filteredJobPostings.map((job) => (
                <div key={job.id} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-900">{job.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[job.status]}`}>
                          {job.status.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyColors[job.urgency]}`}>
                          {job.urgency.toUpperCase()}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                          <span>{job.company}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                          <span>{formatSalary(job.salary)}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[job.type]}`}>
                          {job.type.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[job.level]}`}>
                          {job.level.toUpperCase()}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3">{job.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="font-medium text-gray-700">Posted</p>
                          <p className="text-gray-900">{job.postedDate}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Closing</p>
                          <p className="text-gray-900">{job.closingDate}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Applicants</p>
                          <p className="text-gray-900">{job.applicants}</p>
                        </div>
                        <div>
                          <p className="font-medium text-gray-700">Positions</p>
                          <p className="text-gray-900">{job.positions}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex flex-col space-y-2">
                      <button
                        onClick={() => handleViewJob(job)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Job Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <UserIcon className="h-6 w-6 text-gray-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{application.applicantName}</div>
                            <div className="text-sm text-gray-500">{application.applicantEmail}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{application.jobTitle}</div>
                        <div className="text-sm text-gray-500">{application.currentCompany}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.experience} years
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm font-medium text-gray-900">{application.score}%</span>
                          {application.score >= 90 && <StarIcon className="h-4 w-4 text-yellow-500 ml-1" />}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[application.status]}`}>
                          {application.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {application.applicationDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleViewApplication(application)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <DocumentTextIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {showModal && (selectedJob || selectedApplication) && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedJob ? 'Job Posting Details' : 'Application Details'}
                </h3>
                <button 
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              {selectedJob && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{selectedJob.title}</h4>
                    <p className="text-gray-600">{selectedJob.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Company</p>
                      <p className="text-sm text-gray-900">{selectedJob.company}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Department</p>
                      <p className="text-sm text-gray-900">{selectedJob.department}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Location</p>
                      <p className="text-sm text-gray-900">{selectedJob.location}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Salary Range</p>
                      <p className="text-sm text-gray-900">{formatSalary(selectedJob.salary)}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Type</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[selectedJob.type]}`}>
                        {selectedJob.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Level</p>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${levelColors[selectedJob.level]}`}>
                        {selectedJob.level.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Requirements</p>
                    <ul className="text-sm text-gray-900 list-disc list-inside mt-1">
                      {selectedJob.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Benefits</p>
                    <ul className="text-sm text-gray-900 list-disc list-inside mt-1">
                      {selectedJob.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Posted Date</p>
                      <p className="text-sm text-gray-900">{selectedJob.postedDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Closing Date</p>
                      <p className="text-sm text-gray-900">{selectedJob.closingDate}</p>
                    </div>
                  </div>
                </div>
              )}
              
              {selectedApplication && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Application ID</p>
                      <p className="text-sm text-gray-900">{selectedApplication.id}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Job Title</p>
                      <p className="text-sm text-gray-900">{selectedApplication.jobTitle}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Applicant Name</p>
                      <p className="text-sm text-gray-900">{selectedApplication.applicantName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-sm text-gray-900">{selectedApplication.applicantEmail}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Experience</p>
                      <p className="text-sm text-gray-900">{selectedApplication.experience} years</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Education</p>
                      <p className="text-sm text-gray-900">{selectedApplication.education}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Current Company</p>
                      <p className="text-sm text-gray-900">{selectedApplication.currentCompany}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Application Date</p>
                      <p className="text-sm text-gray-900">{selectedApplication.applicationDate}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700">Score</p>
                      <p className="text-sm text-gray-900">{selectedApplication.score}%</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[selectedApplication.status]}`}>
                      {selectedApplication.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Cover Letter</p>
                    <p className="text-sm text-gray-900">{selectedApplication.coverLetter}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes</p>
                    <p className="text-sm text-gray-900">{selectedApplication.notes}</p>
                  </div>
                  
                  {selectedApplication.interviewDate && (
                    <div>
                      <p className="text-sm font-medium text-gray-700">Interview Date</p>
                      <p className="text-sm text-gray-900">{selectedApplication.interviewDate}</p>
                    </div>
                  )}
                </div>
              )}
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  {selectedJob ? 'Edit Job' : 'Update Status'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}