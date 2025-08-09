'use client';

import { useState } from 'react';
import { DocumentTextIcon, CalendarIcon, BuildingOfficeIcon, UserGroupIcon, ChartBarIcon, ArrowDownTrayIcon, PlayIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'compliance' | 'inspection' | 'local_content' | 'jv_compliance' | 'financial' | 'operational';
  estimatedTime: string;
  lastGenerated?: string;
  parameters: {
    id: string;
    name: string;
    type: 'date' | 'select' | 'multiselect' | 'text' | 'number' | 'boolean';
    required: boolean;
    options?: string[];
    defaultValue?: any;
    description?: string;
  }[];
}

interface GeneratedReport {
  id: string;
  templateId: string;
  templateName: string;
  generatedAt: string;
  generatedBy: string;
  status: 'generating' | 'completed' | 'failed';
  parameters: Record<string, any>;
  downloadUrl?: string;
  fileSize?: number;
  format: 'pdf' | 'excel' | 'csv';
}

const reportTemplates: ReportTemplate[] = [
  {
    id: 'compliance-summary',
    name: 'Compliance Summary Report',
    description: 'Comprehensive overview of compliance status across all reviewed facilities',
    category: 'compliance',
    estimatedTime: '5-10 minutes',
    lastGenerated: '2024-02-20',
    parameters: [
      {
        id: 'dateRange',
        name: 'Date Range',
        type: 'select',
        required: true,
        options: ['Last 30 days', 'Last 90 days', 'Last 6 months', 'Last year', 'Custom range'],
        defaultValue: 'Last 90 days',
        description: 'Select the time period for the report'
      },
      {
        id: 'companies',
        name: 'Companies',
        type: 'multiselect',
        required: false,
        options: ['Nigeria LNG Limited', 'Chevron Nigeria Limited', 'Shell Petroleum Development Company', 'ExxonMobil Nigeria', 'Total E&P Nigeria'],
        description: 'Select specific companies (leave empty for all)'
      },
      {
        id: 'complianceTypes',
        name: 'Compliance Areas',
        type: 'multiselect',
        required: true,
        options: ['Local Content', 'Environmental', 'Safety', 'Operational', 'Financial'],
        defaultValue: ['Local Content', 'Environmental', 'Safety'],
        description: 'Select compliance areas to include'
      },
      {
        id: 'includeRecommendations',
        name: 'Include Recommendations',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Include detailed recommendations in the report'
      }
    ]
  },
  {
    id: 'inspection-performance',
    name: 'Inspection Performance Report',
    description: 'Analysis of inspection activities, findings, and resolution rates',
    category: 'inspection',
    estimatedTime: '3-7 minutes',
    lastGenerated: '2024-02-18',
    parameters: [
      {
        id: 'period',
        name: 'Reporting Period',
        type: 'select',
        required: true,
        options: ['Monthly', 'Quarterly', 'Semi-Annual', 'Annual'],
        defaultValue: 'Quarterly',
        description: 'Select the reporting frequency'
      },
      {
        id: 'inspectionTypes',
        name: 'Inspection Types',
        type: 'multiselect',
        required: true,
        options: ['Routine', 'Compliance', 'Safety', 'Environmental', 'Emergency'],
        defaultValue: ['Routine', 'Compliance'],
        description: 'Select types of inspections to include'
      },
      {
        id: 'includeMetrics',
        name: 'Performance Metrics',
        type: 'multiselect',
        required: true,
        options: ['Response Time', 'Resolution Rate', 'Compliance Score', 'Finding Severity', 'Follow-up Status'],
        defaultValue: ['Response Time', 'Resolution Rate', 'Compliance Score'],
        description: 'Select metrics to include in analysis'
      }
    ]
  },
  {
    id: 'local-content-audit',
    name: 'Local Content Audit Report',
    description: 'Detailed analysis of local content compliance and implementation',
    category: 'local_content',
    estimatedTime: '7-12 minutes',
    lastGenerated: '2024-02-15',
    parameters: [
      {
        id: 'auditScope',
        name: 'Audit Scope',
        type: 'multiselect',
        required: true,
        options: ['Training Programs', 'Succession Planning', 'Technology Transfer', 'Local Procurement', 'Employment Targets'],
        defaultValue: ['Training Programs', 'Succession Planning'],
        description: 'Select areas to include in the audit'
      },
      {
        id: 'companySize',
        name: 'Company Size Filter',
        type: 'select',
        required: false,
        options: ['All', 'Large (>500 employees)', 'Medium (100-500 employees)', 'Small (<100 employees)'],
        defaultValue: 'All',
        description: 'Filter by company size'
      },
      {
        id: 'includeFinancial',
        name: 'Include Financial Data',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Include financial investment data in local content'
      }
    ]
  },
  {
    id: 'jv-compliance-review',
    name: 'Joint Venture Compliance Review',
    description: 'Assessment of joint venture structures and compliance with regulations',
    category: 'jv_compliance',
    estimatedTime: '8-15 minutes',
    lastGenerated: '2024-02-12',
    parameters: [
      {
        id: 'jvStatus',
        name: 'JV Status',
        type: 'multiselect',
        required: true,
        options: ['Active', 'Under Formation', 'Pending Approval', 'Suspended', 'Terminated'],
        defaultValue: ['Active', 'Under Formation'],
        description: 'Select JV status to include'
      },
      {
        id: 'equityThreshold',
        name: 'Minimum Equity Threshold (%)',
        type: 'number',
        required: false,
        defaultValue: 10,
        description: 'Minimum local equity percentage to include'
      },
      {
        id: 'includeGovernance',
        name: 'Include Governance Analysis',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Include board composition and governance structure analysis'
      }
    ]
  },
  {
    id: 'regulatory-trends',
    name: 'Regulatory Trends Analysis',
    description: 'Analysis of regulatory compliance trends and patterns across the industry',
    category: 'compliance',
    estimatedTime: '10-20 minutes',
    lastGenerated: '2024-02-10',
    parameters: [
      {
        id: 'trendPeriod',
        name: 'Analysis Period',
        type: 'select',
        required: true,
        options: ['6 months', '1 year', '2 years', '3 years'],
        defaultValue: '1 year',
        description: 'Period for trend analysis'
      },
      {
        id: 'sectors',
        name: 'Industry Sectors',
        type: 'multiselect',
        required: true,
        options: ['Upstream Oil & Gas', 'Downstream Oil & Gas', 'LNG', 'Petrochemicals', 'Renewable Energy'],
        defaultValue: ['Upstream Oil & Gas', 'LNG'],
        description: 'Select industry sectors to analyze'
      },
      {
        id: 'includeForecasting',
        name: 'Include Forecasting',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Include predictive analysis and forecasting'
      }
    ]
  },
  {
    id: 'executive-dashboard',
    name: 'Executive Dashboard Report',
    description: 'High-level summary report for executive leadership and stakeholders',
    category: 'operational',
    estimatedTime: '3-5 minutes',
    lastGenerated: '2024-02-22',
    parameters: [
      {
        id: 'executiveLevel',
        name: 'Executive Level',
        type: 'select',
        required: true,
        options: ['Board of Directors', 'C-Suite', 'Department Heads', 'Regulatory Affairs'],
        defaultValue: 'C-Suite',
        description: 'Target audience for the report'
      },
      {
        id: 'kpiSelection',
        name: 'Key Performance Indicators',
        type: 'multiselect',
        required: true,
        options: ['Compliance Rate', 'Inspection Efficiency', 'Revenue Impact', 'Risk Assessment', 'Stakeholder Satisfaction'],
        defaultValue: ['Compliance Rate', 'Inspection Efficiency', 'Risk Assessment'],
        description: 'Select KPIs to highlight'
      },
      {
        id: 'includeActionItems',
        name: 'Include Action Items',
        type: 'boolean',
        required: false,
        defaultValue: true,
        description: 'Include recommended action items and next steps'
      }
    ]
  }
];

const mockGeneratedReports: GeneratedReport[] = [
  {
    id: 'GR001',
    templateId: 'compliance-summary',
    templateName: 'Compliance Summary Report',
    generatedAt: '2024-02-20 14:30:00',
    generatedBy: 'Dr. Folake Solanke',
    status: 'completed',
    parameters: { dateRange: 'Last 90 days', complianceTypes: ['Local Content', 'Environmental'] },
    downloadUrl: '/reports/GR001.pdf',
    fileSize: 2457600,
    format: 'pdf'
  },
  {
    id: 'GR002',
    templateId: 'inspection-performance',
    templateName: 'Inspection Performance Report',
    generatedAt: '2024-02-18 09:15:00',
    generatedBy: 'Engr. Adebayo Ogundimu',
    status: 'completed',
    parameters: { period: 'Quarterly', inspectionTypes: ['Routine', 'Safety'] },
    downloadUrl: '/reports/GR002.xlsx',
    fileSize: 1048576,
    format: 'excel'
  },
  {
    id: 'GR003',
    templateId: 'local-content-audit',
    templateName: 'Local Content Audit Report',
    generatedAt: '2024-02-22 16:45:00',
    generatedBy: 'Dr. Amina Hassan',
    status: 'generating',
    parameters: { auditScope: ['Training Programs', 'Technology Transfer'] },
    format: 'pdf'
  }
];

export default function GenerateReportsPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>(mockGeneratedReports);
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const filteredTemplates = reportTemplates.filter(template => 
    categoryFilter === 'all' || template.category === categoryFilter
  );

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance':
        return <CheckCircleIcon className="w-5 h-5" />;
      case 'inspection':
        return <DocumentTextIcon className="w-5 h-5" />;
      case 'local_content':
        return <UserGroupIcon className="w-5 h-5" />;
      case 'jv_compliance':
        return <BuildingOfficeIcon className="w-5 h-5" />;
      case 'financial':
        return <ChartBarIcon className="w-5 h-5" />;
      case 'operational':
        return <ClockIcon className="w-5 h-5" />;
      default:
        return <DocumentTextIcon className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'compliance':
        return 'bg-green-100 text-green-800';
      case 'inspection':
        return 'bg-blue-100 text-blue-800';
      case 'local_content':
        return 'bg-purple-100 text-purple-800';
      case 'jv_compliance':
        return 'bg-orange-100 text-orange-800';
      case 'financial':
        return 'bg-yellow-100 text-yellow-800';
      case 'operational':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleGenerateReport = (template: ReportTemplate) => {
    setSelectedTemplate(template);
    // Initialize parameters with default values
    const initialParams: Record<string, any> = {};
    template.parameters.forEach(param => {
      if (param.defaultValue !== undefined) {
        initialParams[param.id] = param.defaultValue;
      }
    });
    setParameters(initialParams);
    setShowGenerateModal(true);
  };

  const handleParameterChange = (paramId: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [paramId]: value
    }));
  };

  const handleSubmitGeneration = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    
    // Simulate report generation
    const newReport: GeneratedReport = {
      id: `GR${String(generatedReports.length + 1).padStart(3, '0')}`,
      templateId: selectedTemplate.id,
      templateName: selectedTemplate.name,
      generatedAt: new Date().toISOString().replace('T', ' ').substring(0, 19),
      generatedBy: 'Current User',
      status: 'generating',
      parameters: { ...parameters },
      format: 'pdf'
    };
    
    setGeneratedReports(prev => [newReport, ...prev]);
    
    // Simulate generation time
    setTimeout(() => {
      setGeneratedReports(prev => prev.map(report => 
        report.id === newReport.id 
          ? { ...report, status: 'completed', downloadUrl: `/reports/${newReport.id}.pdf`, fileSize: Math.floor(Math.random() * 5000000) + 1000000 }
          : report
      ));
      setIsGenerating(false);
      setShowGenerateModal(false);
      setSelectedTemplate(null);
      setParameters({});
    }, 3000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'generating':
        return <ClockIcon className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'failed':
        return <DocumentTextIcon className="w-5 h-5 text-red-500" />;
      default:
        return <DocumentTextIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const renderParameterInput = (param: ReportTemplate['parameters'][0]) => {
    const value = parameters[param.id];
    
    switch (param.type) {
      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleParameterChange(param.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={param.required}
          >
            <option value="">Select {param.name}</option>
            {param.options?.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'multiselect':
        return (
          <div className="space-y-2">
            {param.options?.map(option => (
              <label key={option} className="flex items-center">
                <input
                  type="checkbox"
                  checked={Array.isArray(value) ? value.includes(option) : false}
                  onChange={(e) => {
                    const currentValue = Array.isArray(value) ? value : [];
                    if (e.target.checked) {
                      handleParameterChange(param.id, [...currentValue, option]);
                    } else {
                      handleParameterChange(param.id, currentValue.filter(v => v !== option));
                    }
                  }}
                  className="mr-2"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        );
      
      case 'boolean':
        return (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleParameterChange(param.id, e.target.checked)}
              className="mr-2"
            />
            <span className="text-sm">{param.description}</span>
          </label>
        );
      
      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleParameterChange(param.id, parseInt(e.target.value))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={param.required}
          />
        );
      
      case 'text':
      default:
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleParameterChange(param.id, e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required={param.required}
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Reports</h1>
          <p className="text-sm text-gray-600">Create custom reports from available templates</p>
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
              <p className="text-sm font-medium text-gray-600">Available Templates</p>
              <p className="text-2xl font-bold text-gray-900">{reportTemplates.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Generated Today</p>
              <p className="text-2xl font-bold text-gray-900">{generatedReports.filter(r => r.generatedAt.startsWith('2024-02-22')).length}</p>
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
              <p className="text-2xl font-bold text-gray-900">{generatedReports.filter(r => r.status === 'generating').length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Generated</p>
              <p className="text-2xl font-bold text-gray-900">{generatedReports.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoryFilter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Categories
          </button>
          {['compliance', 'inspection', 'local_content', 'jv_compliance', 'financial', 'operational'].map(category => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 ${
                categoryFilter === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category)}
              <span>{category.replace('_', ' ').toUpperCase()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getCategoryColor(template.category)}`}>
                  {getCategoryIcon(template.category)}
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(template.category)}`}>
                    {template.category.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{template.description}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <ClockIcon className="w-4 h-4 mr-2" />
                <span>Est. Time: {template.estimatedTime}</span>
              </div>
              {template.lastGenerated && (
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  <span>Last Generated: {template.lastGenerated}</span>
                </div>
              )}
              <div className="flex items-center text-sm text-gray-500">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                <span>{template.parameters.length} Parameters</span>
              </div>
            </div>
            
            <button
              onClick={() => handleGenerateReport(template)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <PlayIcon className="w-4 h-4" />
              <span>Generate Report</span>
            </button>
          </div>
        ))}
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {generatedReports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.templateName}</div>
                      <div className="text-sm text-gray-500">ID: {report.id}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{report.generatedAt}</div>
                      <div className="text-sm text-gray-500">by {report.generatedBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getStatusIcon(report.status)}
                      <span className="ml-2 text-sm text-gray-900">
                        {report.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.fileSize ? formatFileSize(report.fileSize) : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {report.status === 'completed' && report.downloadUrl ? (
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                        Download
                      </button>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateModal && selectedTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-11/12 max-w-4xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-medium text-gray-900">
                  Generate Report: {selectedTemplate.name}
                </h3>
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                  disabled={isGenerating}
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <p className="text-sm text-gray-600">{selectedTemplate.description}</p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>Estimated time: {selectedTemplate.estimatedTime}</span>
                </div>
              </div>

              <div className="space-y-6">
                {selectedTemplate.parameters.map((param) => (
                  <div key={param.id}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {param.name}
                      {param.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {param.description && (
                      <p className="text-xs text-gray-500 mb-2">{param.description}</p>
                    )}
                    {renderParameterInput(param)}
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-3 mt-8">
                <button
                  onClick={() => setShowGenerateModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  disabled={isGenerating}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitGeneration}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <ClockIcon className="w-4 h-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4" />
                      <span>Generate Report</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}