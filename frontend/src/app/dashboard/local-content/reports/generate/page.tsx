'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowDownTrayIcon,
  EyeIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  TableCellsIcon,
  ChartPieIcon
} from '@heroicons/react/24/outline';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  category: 'compliance' | 'performance' | 'financial' | 'operational';
  type: 'summary' | 'detailed' | 'analytical' | 'comparative';
  estimatedTime: string;
  dataPoints: number;
  lastGenerated: string;
  icon: any;
}

interface GenerationOptions {
  format: 'pdf' | 'excel' | 'word' | 'powerpoint';
  period: string;
  companies: string[];
  includeCharts: boolean;
  includeRawData: boolean;
  includeRecommendations: boolean;
  confidentialityLevel: 'public' | 'internal' | 'confidential' | 'restricted';
}

const mockReportTemplates: ReportTemplate[] = [
  {
    id: 'RPT001',
    name: 'Local Content Compliance Summary',
    description: 'Comprehensive overview of local content compliance across all registered companies',
    category: 'compliance',
    type: 'summary',
    estimatedTime: '5-10 minutes',
    dataPoints: 156,
    lastGenerated: '2024-02-01',
    icon: DocumentChartBarIcon
  },
  {
    id: 'RPT002',
    name: 'Company Performance Analysis',
    description: 'Detailed analysis of individual company performance metrics and trends',
    category: 'performance',
    type: 'analytical',
    estimatedTime: '15-20 minutes',
    dataPoints: 342,
    lastGenerated: '2024-01-28',
    icon: ChartBarIcon
  },
  {
    id: 'RPT003',
    name: 'Investment Impact Report',
    description: 'Financial analysis of local content investments and their economic impact',
    category: 'financial',
    type: 'detailed',
    estimatedTime: '20-30 minutes',
    dataPoints: 289,
    lastGenerated: '2024-01-25',
    icon: ChartPieIcon
  },
  {
    id: 'RPT004',
    name: 'Training Program Effectiveness',
    description: 'Evaluation of training programs and their impact on local content development',
    category: 'operational',
    type: 'analytical',
    estimatedTime: '10-15 minutes',
    dataPoints: 198,
    lastGenerated: '2024-01-30',
    icon: UserGroupIcon
  },
  {
    id: 'RPT005',
    name: 'Quarterly Compliance Dashboard',
    description: 'Executive dashboard with key compliance metrics and performance indicators',
    category: 'compliance',
    type: 'summary',
    estimatedTime: '3-5 minutes',
    dataPoints: 89,
    lastGenerated: '2024-02-02',
    icon: PresentationChartLineIcon
  },
  {
    id: 'RPT006',
    name: 'Comparative Industry Analysis',
    description: 'Benchmarking report comparing performance across different industry sectors',
    category: 'performance',
    type: 'comparative',
    estimatedTime: '25-35 minutes',
    dataPoints: 456,
    lastGenerated: '2024-01-20',
    icon: TableCellsIcon
  }
];

const mockCompanies = [
  'Shell Nigeria',
  'TotalEnergies',
  'Chevron Nigeria',
  'ExxonMobil',
  'Eni Nigeria',
  'Addax Petroleum',
  'Oando Energy',
  'Seplat Energy'
];

const categoryColors = {
  compliance: 'bg-blue-100 text-blue-800',
  performance: 'bg-green-100 text-green-800',
  financial: 'bg-yellow-100 text-yellow-800',
  operational: 'bg-purple-100 text-purple-800'
};

const typeColors = {
  summary: 'bg-gray-100 text-gray-800',
  detailed: 'bg-indigo-100 text-indigo-800',
  analytical: 'bg-orange-100 text-orange-800',
  comparative: 'bg-pink-100 text-pink-800'
};

export default function GenerateReportsPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [generationOptions, setGenerationOptions] = useState<GenerationOptions>({
    format: 'pdf',
    period: '3months',
    companies: [],
    includeCharts: true,
    includeRawData: false,
    includeRecommendations: true,
    confidentialityLevel: 'internal'
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredTemplates = mockReportTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template);
  };

  const handleGenerateReport = async () => {
    if (!selectedTemplate) return;
    
    setIsGenerating(true);
    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report "${selectedTemplate.name}" generated successfully!`);
    }, 3000);
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const updateGenerationOptions = (key: keyof GenerationOptions, value: any) => {
    setGenerationOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Generate Reports</h1>
          <p className="text-gray-600">Create customized local content reports and analytics</p>
        </div>
        <button 
          onClick={() => router.back()}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Back to Reports
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Templates */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search and Filters */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search report templates..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="compliance">Compliance</option>
                <option value="performance">Performance</option>
                <option value="financial">Financial</option>
                <option value="operational">Operational</option>
              </select>
            </div>
          </div>

          {/* Template Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredTemplates.map((template) => {
              const IconComponent = template.icon;
              return (
                <div
                  key={template.id}
                  className={`bg-white p-6 rounded-lg shadow cursor-pointer transition-all hover:shadow-md ${
                    selectedTemplate?.id === template.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <IconComponent className="h-8 w-8 text-blue-600 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    </div>
                    {selectedTemplate?.id === template.id && (
                      <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[template.category]}`}>
                      {template.category.toUpperCase()}
                    </span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${typeColors[template.type]}`}>
                      {template.type.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      {template.estimatedTime}
                    </div>
                    <div className="flex items-center">
                      <ChartBarIcon className="h-4 w-4 mr-1" />
                      {template.dataPoints} data points
                    </div>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    Last generated: {template.lastGenerated}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Configuration Panel */}
        <div className="space-y-6">
          {selectedTemplate ? (
            <>
              {/* Selected Template Info */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Template</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Name</p>
                    <p className="text-sm text-gray-900">{selectedTemplate.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Estimated Time</p>
                    <p className="text-sm text-gray-900">{selectedTemplate.estimatedTime}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Data Points</p>
                    <p className="text-sm text-gray-900">{selectedTemplate.dataPoints}</p>
                  </div>
                </div>
              </div>

              {/* Generation Options */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Generation Options</h3>
                <div className="space-y-4">
                  {/* Format */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Output Format</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={generationOptions.format}
                      onChange={(e) => updateGenerationOptions('format', e.target.value)}
                    >
                      <option value="pdf">PDF Document</option>
                      <option value="excel">Excel Spreadsheet</option>
                      <option value="word">Word Document</option>
                      <option value="powerpoint">PowerPoint Presentation</option>
                    </select>
                  </div>

                  {/* Time Period */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Time Period</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={generationOptions.period}
                      onChange={(e) => updateGenerationOptions('period', e.target.value)}
                    >
                      <option value="1month">Last Month</option>
                      <option value="3months">Last 3 Months</option>
                      <option value="6months">Last 6 Months</option>
                      <option value="12months">Last 12 Months</option>
                      <option value="custom">Custom Range</option>
                    </select>
                  </div>

                  {/* Companies */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Companies</label>
                    <div className="max-h-32 overflow-y-auto border border-gray-300 rounded-lg p-2">
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            checked={generationOptions.companies.length === mockCompanies.length}
                            onChange={(e) => {
                              if (e.target.checked) {
                                updateGenerationOptions('companies', mockCompanies);
                              } else {
                                updateGenerationOptions('companies', []);
                              }
                            }}
                          />
                          <span className="ml-2 text-sm text-gray-900 font-medium">All Companies</span>
                        </label>
                        {mockCompanies.map((company) => (
                          <label key={company} className="flex items-center">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                              checked={generationOptions.companies.includes(company)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  updateGenerationOptions('companies', [...generationOptions.companies, company]);
                                } else {
                                  updateGenerationOptions('companies', generationOptions.companies.filter(c => c !== company));
                                }
                              }}
                            />
                            <span className="ml-2 text-sm text-gray-900">{company}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Options */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={generationOptions.includeCharts}
                        onChange={(e) => updateGenerationOptions('includeCharts', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-900">Include Charts & Graphs</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={generationOptions.includeRawData}
                        onChange={(e) => updateGenerationOptions('includeRawData', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-900">Include Raw Data</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        checked={generationOptions.includeRecommendations}
                        onChange={(e) => updateGenerationOptions('includeRecommendations', e.target.checked)}
                      />
                      <span className="ml-2 text-sm text-gray-900">Include Recommendations</span>
                    </label>
                  </div>

                  {/* Confidentiality Level */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Confidentiality Level</label>
                    <select
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      value={generationOptions.confidentialityLevel}
                      onChange={(e) => updateGenerationOptions('confidentialityLevel', e.target.value)}
                    >
                      <option value="public">Public</option>
                      <option value="internal">Internal Use</option>
                      <option value="confidential">Confidential</option>
                      <option value="restricted">Restricted</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="space-y-3">
                  <button
                    onClick={handlePreview}
                    className="w-full bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center gap-2"
                    disabled={isGenerating}
                  >
                    <EyeIcon className="h-5 w-5" />
                    Preview Report
                  </button>
                  <button
                    onClick={handleGenerateReport}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                    disabled={isGenerating || generationOptions.companies.length === 0}
                  >
                    {isGenerating ? (
                      <>
                        <Cog6ToothIcon className="h-5 w-5 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <ArrowDownTrayIcon className="h-5 w-5" />
                        Generate Report
                      </>
                    )}
                  </button>
                </div>
                {generationOptions.companies.length === 0 && (
                  <p className="text-sm text-red-600 mt-2 flex items-center">
                    <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                    Please select at least one company
                  </p>
                )}
              </div>
            </>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-center">
                <InformationCircleIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Report Template</h3>
                <p className="text-gray-600">Choose a report template from the list to configure generation options.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-2/3 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Report Preview</h3>
                <button 
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTemplate.name}</h2>
                  <p className="text-gray-600 mt-2">Generated on {new Date().toLocaleDateString()}</p>
                  <p className="text-sm text-gray-500">Confidentiality: {generationOptions.confidentialityLevel.toUpperCase()}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-900 mb-2">Executive Summary</h4>
                    <p className="text-gray-600 text-sm">This section will contain a high-level overview of the key findings and metrics...</p>
                  </div>
                  
                  {generationOptions.includeCharts && (
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-900 mb-2">Charts & Visualizations</h4>
                      <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                        <p className="text-gray-500">Chart placeholder</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="bg-white p-4 rounded border">
                    <h4 className="font-semibold text-gray-900 mb-2">Detailed Analysis</h4>
                    <p className="text-gray-600 text-sm">Comprehensive analysis of local content performance across selected companies...</p>
                  </div>
                  
                  {generationOptions.includeRecommendations && (
                    <div className="bg-white p-4 rounded border">
                      <h4 className="font-semibold text-gray-900 mb-2">Recommendations</h4>
                      <p className="text-gray-600 text-sm">Strategic recommendations for improving local content compliance and performance...</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button 
                  onClick={() => setShowPreview(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                >
                  Close Preview
                </button>
                <button 
                  onClick={handleGenerateReport}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Generate Full Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}