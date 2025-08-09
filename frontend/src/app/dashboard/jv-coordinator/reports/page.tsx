'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { DocumentTextIcon, ChartBarIcon, CalendarIcon, ClockIcon, CheckCircleIcon, ExclamationTriangleIcon, BuildingOfficeIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface Report {
  id: string;
  title: string;
  type: 'performance' | 'compliance' | 'financial' | 'operational' | 'quarterly' | 'annual';
  category: 'jv-performance' | 'compliance-documentation' | 'financial-analysis' | 'operational-review';
  status: 'draft' | 'in-review' | 'approved' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  jvName: string;
  jvId: string;
  reportingPeriod: {
    startDate: string;
    endDate: string;
    quarter?: string;
    year: number;
  };
  createdBy: string;
  createdDate: string;
  lastModified: string;
  dueDate: string;
  publishDate?: string;
  reviewers: string[];
  approvers: string[];
  tags: string[];
  summary: string;
  keyMetrics: {
    metric: string;
    value: number;
    unit: string;
    target?: number;
    previousValue?: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  sections: {
    id: string;
    title: string;
    content: string;
    status: 'pending' | 'completed' | 'under-review';
    assignee?: string;
  }[];
  attachments: {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadDate: string;
    url?: string;
  }[];
  distribution: {
    internal: string[];
    external: string[];
    confidential: boolean;
  };
  complianceItems: {
    id: string;
    requirement: string;
    status: 'compliant' | 'non-compliant' | 'partial' | 'pending';
    evidence: string;
    dueDate: string;
    responsible: string;
  }[];
}

interface ReportTemplate {
  id: string;
  name: string;
  type: string;
  category: string;
  description: string;
  sections: string[];
  frequency: 'monthly' | 'quarterly' | 'annually' | 'ad-hoc';
  requiredMetrics: string[];
  estimatedTime: number;
  lastUsed?: string;
}

const mockReports: Report[] = [
  {
    id: 'RPT001',
    title: 'Q1 2024 JV Performance Report - Offshore Drilling Consortium',
    type: 'performance',
    category: 'jv-performance',
    status: 'approved',
    priority: 'high',
    jvName: 'Offshore Drilling Consortium',
    jvId: 'JV001',
    reportingPeriod: {
      startDate: '2024-01-01',
      endDate: '2024-03-31',
      quarter: 'Q1',
      year: 2024
    },
    createdBy: 'Dr. Kwame Asante',
    createdDate: '2024-04-01',
    lastModified: '2024-04-15',
    dueDate: '2024-04-30',
    publishDate: '2024-04-20',
    reviewers: ['Eng. Sarah Mitchell', 'Dr. Michael Chen'],
    approvers: ['CEO John Smith'],
    tags: ['quarterly', 'performance', 'drilling', 'offshore'],
    summary: 'Comprehensive performance analysis of the Offshore Drilling Consortium for Q1 2024, showing strong operational performance with 15% increase in drilling efficiency and successful completion of 3 major projects.',
    keyMetrics: [
      {
        metric: 'Revenue',
        value: 45.2,
        unit: 'Million USD',
        target: 42.0,
        previousValue: 39.8,
        trend: 'up'
      },
      {
        metric: 'Drilling Efficiency',
        value: 87.5,
        unit: '%',
        target: 85.0,
        previousValue: 76.2,
        trend: 'up'
      },
      {
        metric: 'Safety Incidents',
        value: 2,
        unit: 'incidents',
        target: 0,
        previousValue: 5,
        trend: 'down'
      },
      {
        metric: 'Local Content',
        value: 68.3,
        unit: '%',
        target: 65.0,
        previousValue: 62.1,
        trend: 'up'
      }
    ],
    sections: [
      {
        id: 'S001',
        title: 'Executive Summary',
        content: 'Q1 2024 performance exceeded expectations with strong financial results and operational improvements.',
        status: 'completed',
        assignee: 'Dr. Kwame Asante'
      },
      {
        id: 'S002',
        title: 'Financial Performance',
        content: 'Revenue increased by 13.5% compared to Q4 2023, driven by improved drilling efficiency and new contract wins.',
        status: 'completed',
        assignee: 'Finance Team'
      },
      {
        id: 'S003',
        title: 'Operational Metrics',
        content: 'Drilling operations showed significant improvement with 87.5% efficiency rate, exceeding target by 2.5%.',
        status: 'completed',
        assignee: 'Operations Team'
      },
      {
        id: 'S004',
        title: 'Local Content Compliance',
        content: 'Local content requirements met at 68.3%, surpassing the 65% target through enhanced local partnerships.',
        status: 'completed',
        assignee: 'Local Content Team'
      }
    ],
    attachments: [
      {
        id: 'ATT001',
        name: 'Financial_Statements_Q1_2024.pdf',
        type: 'PDF',
        size: '2.5 MB',
        uploadDate: '2024-04-10'
      },
      {
        id: 'ATT002',
        name: 'Operational_Data_Q1_2024.xlsx',
        type: 'Excel',
        size: '1.8 MB',
        uploadDate: '2024-04-12'
      }
    ],
    distribution: {
      internal: ['Board of Directors', 'Executive Team', 'Department Heads'],
      external: ['Regulatory Authority', 'JV Partners', 'Key Stakeholders'],
      confidential: false
    },
    complianceItems: [
      {
        id: 'C001',
        requirement: 'Local Content Reporting',
        status: 'compliant',
        evidence: 'Local content achieved 68.3% as documented in section 4',
        dueDate: '2024-04-30',
        responsible: 'Local Content Manager'
      },
      {
        id: 'C002',
        requirement: 'Environmental Compliance',
        status: 'compliant',
        evidence: 'All environmental standards met with zero violations',
        dueDate: '2024-04-30',
        responsible: 'Environmental Manager'
      }
    ]
  },
  {
    id: 'RPT002',
    title: 'Annual Compliance Documentation 2023 - Gas Processing Alliance',
    type: 'compliance',
    category: 'compliance-documentation',
    status: 'in-review',
    priority: 'critical',
    jvName: 'Gas Processing Alliance',
    jvId: 'JV002',
    reportingPeriod: {
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      year: 2023
    },
    createdBy: 'Eng. Ama Darko',
    createdDate: '2024-01-15',
    lastModified: '2024-03-20',
    dueDate: '2024-04-15',
    reviewers: ['Compliance Officer', 'Legal Team'],
    approvers: ['Chief Compliance Officer'],
    tags: ['annual', 'compliance', 'gas-processing', 'regulatory'],
    summary: 'Comprehensive compliance documentation for Gas Processing Alliance covering all regulatory requirements, permits, and certifications for the 2023 operating year.',
    keyMetrics: [
      {
        metric: 'Compliance Rate',
        value: 94.2,
        unit: '%',
        target: 95.0,
        previousValue: 91.8,
        trend: 'up'
      },
      {
        metric: 'Regulatory Violations',
        value: 3,
        unit: 'violations',
        target: 0,
        previousValue: 7,
        trend: 'down'
      },
      {
        metric: 'Permit Renewals',
        value: 12,
        unit: 'permits',
        target: 12,
        previousValue: 10,
        trend: 'up'
      }
    ],
    sections: [
      {
        id: 'S005',
        title: 'Regulatory Framework Overview',
        content: 'Summary of applicable regulations and compliance requirements for gas processing operations.',
        status: 'completed',
        assignee: 'Legal Team'
      },
      {
        id: 'S006',
        title: 'Permit Status and Renewals',
        content: 'Status of all operating permits and licenses, including renewal schedules and compliance status.',
        status: 'under-review',
        assignee: 'Regulatory Affairs'
      },
      {
        id: 'S007',
        title: 'Incident Reports and Corrective Actions',
        content: 'Documentation of all incidents, violations, and implemented corrective measures.',
        status: 'completed',
        assignee: 'Compliance Team'
      }
    ],
    attachments: [
      {
        id: 'ATT003',
        name: 'Permit_Documentation_2023.pdf',
        type: 'PDF',
        size: '15.2 MB',
        uploadDate: '2024-02-01'
      },
      {
        id: 'ATT004',
        name: 'Incident_Reports_2023.pdf',
        type: 'PDF',
        size: '3.7 MB',
        uploadDate: '2024-02-15'
      }
    ],
    distribution: {
      internal: ['Compliance Team', 'Executive Management', 'Operations Team'],
      external: ['Regulatory Authority', 'Environmental Agency'],
      confidential: true
    },
    complianceItems: [
      {
        id: 'C003',
        requirement: 'Environmental Impact Assessment',
        status: 'compliant',
        evidence: 'Annual EIA submitted and approved by environmental agency',
        dueDate: '2024-03-31',
        responsible: 'Environmental Manager'
      },
      {
        id: 'C004',
        requirement: 'Safety Management System Audit',
        status: 'partial',
        evidence: 'Audit completed, minor findings under remediation',
        dueDate: '2024-04-15',
        responsible: 'Safety Manager'
      },
      {
        id: 'C005',
        requirement: 'Local Content Compliance Report',
        status: 'pending',
        evidence: 'Report compilation in progress',
        dueDate: '2024-04-30',
        responsible: 'Local Content Coordinator'
      }
    ]
  },
  {
    id: 'RPT003',
    title: 'Monthly Operational Review - March 2024',
    type: 'operational',
    category: 'operational-review',
    status: 'draft',
    priority: 'medium',
    jvName: 'Environmental Consortium',
    jvId: 'JV003',
    reportingPeriod: {
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      year: 2024
    },
    createdBy: 'Dr. Nana Agyeman',
    createdDate: '2024-04-02',
    lastModified: '2024-04-18',
    dueDate: '2024-04-25',
    reviewers: ['Operations Manager'],
    approvers: ['General Manager'],
    tags: ['monthly', 'operational', 'environmental', 'monitoring'],
    summary: 'Monthly operational review for Environmental Consortium covering March 2024 activities, performance metrics, and key operational highlights.',
    keyMetrics: [
      {
        metric: 'Monitoring Coverage',
        value: 98.7,
        unit: '%',
        target: 95.0,
        previousValue: 97.2,
        trend: 'up'
      },
      {
        metric: 'Response Time',
        value: 18,
        unit: 'minutes',
        target: 30,
        previousValue: 22,
        trend: 'down'
      },
      {
        metric: 'Equipment Uptime',
        value: 96.8,
        unit: '%',
        target: 95.0,
        previousValue: 94.5,
        trend: 'up'
      }
    ],
    sections: [
      {
        id: 'S008',
        title: 'Operational Highlights',
        content: 'Key achievements and milestones reached during March 2024.',
        status: 'pending',
        assignee: 'Operations Team'
      },
      {
        id: 'S009',
        title: 'Performance Metrics',
        content: 'Detailed analysis of operational performance indicators.',
        status: 'pending',
        assignee: 'Analytics Team'
      }
    ],
    attachments: [],
    distribution: {
      internal: ['Operations Team', 'Management'],
      external: [],
      confidential: false
    },
    complianceItems: []
  }
];

const mockTemplates: ReportTemplate[] = [
  {
    id: 'TPL001',
    name: 'Quarterly Performance Report',
    type: 'performance',
    category: 'jv-performance',
    description: 'Standard template for quarterly JV performance reporting',
    sections: ['Executive Summary', 'Financial Performance', 'Operational Metrics', 'Local Content Compliance', 'Risk Assessment'],
    frequency: 'quarterly',
    requiredMetrics: ['Revenue', 'Drilling Efficiency', 'Safety Incidents', 'Local Content'],
    estimatedTime: 40,
    lastUsed: '2024-04-01'
  },
  {
    id: 'TPL002',
    name: 'Annual Compliance Documentation',
    type: 'compliance',
    category: 'compliance-documentation',
    description: 'Comprehensive annual compliance reporting template',
    sections: ['Regulatory Framework', 'Permit Status', 'Incident Reports', 'Corrective Actions', 'Audit Results'],
    frequency: 'annually',
    requiredMetrics: ['Compliance Rate', 'Regulatory Violations', 'Permit Renewals'],
    estimatedTime: 80,
    lastUsed: '2024-01-15'
  },
  {
    id: 'TPL003',
    name: 'Monthly Operational Review',
    type: 'operational',
    category: 'operational-review',
    description: 'Monthly operational performance and activities review',
    sections: ['Operational Highlights', 'Performance Metrics', 'Issues and Resolutions', 'Next Month Planning'],
    frequency: 'monthly',
    requiredMetrics: ['Monitoring Coverage', 'Response Time', 'Equipment Uptime'],
    estimatedTime: 16,
    lastUsed: '2024-04-02'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': case 'published': case 'compliant': return 'bg-green-100 text-green-800';
    case 'in-review': case 'under-review': case 'partial': return 'bg-blue-100 text-blue-800';
    case 'draft': case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'archived': return 'bg-gray-100 text-gray-800';
    case 'non-compliant': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'jv-performance': return 'bg-blue-100 text-blue-800';
    case 'compliance-documentation': return 'bg-red-100 text-red-800';
    case 'financial-analysis': return 'bg-green-100 text-green-800';
    case 'operational-review': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case 'up': return '↗️';
    case 'down': return '↘️';
    case 'stable': return '➡️';
    default: return '➡️';
  }
};

export default function JVReportsPage() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [templates, setTemplates] = useState<ReportTemplate[]>(mockTemplates);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isNewReportModalOpen, setIsNewReportModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.jvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.createdBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesType = typeFilter === 'all' || report.type === typeFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsReportModalOpen(true);
  };

  const handleCreateReport = () => {
    setIsNewReportModalOpen(true);
  };

  const handleGenerateReport = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      toast.success(`Report generation started using ${template.name} template`);
    }
  };

  // Calculate summary statistics
  const totalReports = reports.length;
  const draftReports = reports.filter(r => r.status === 'draft').length;
  const inReviewReports = reports.filter(r => r.status === 'in-review').length;
  const approvedReports = reports.filter(r => r.status === 'approved').length;
  const publishedReports = reports.filter(r => r.status === 'published').length;
  const overdueReports = reports.filter(r => new Date(r.dueDate) < new Date() && r.status !== 'published').length;
  const avgCompletionTime = 15; // Mock average
  const complianceRate = 94.2; // Mock compliance rate

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports &amp; Documentation</h1>
          <p className="text-gray-600">Manage JV performance reports and compliance documentation</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateReport} className="flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <ChartBarIcon className="h-4 w-4" />
            Analytics
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReports}</div>
            <p className="text-xs text-muted-foreground">All reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft</CardTitle>
            <ClockIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{draftReports}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{inReviewReports}</div>
            <p className="text-xs text-muted-foreground">Under review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approvedReports}</div>
            <p className="text-xs text-muted-foreground">Ready to publish</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{publishedReports}</div>
            <p className="text-xs text-muted-foreground">Live reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueReports}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Time</CardTitle>
            <ClockIcon className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{avgCompletionTime}</div>
            <p className="text-xs text-muted-foreground">Days to complete</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliance</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{complianceRate}%</div>
            <p className="text-xs text-muted-foreground">Overall rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Report Templates</CardTitle>
          <CardDescription>Quick start with pre-configured report templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div key={template.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Badge className={getCategoryColor(template.category)}>
                    {template.type.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Frequency:</span>
                    <span className="font-medium">{template.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Est. Time:</span>
                    <span className="font-medium">{template.estimatedTime}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sections:</span>
                    <span className="font-medium">{template.sections.length}</span>
                  </div>
                  {template.lastUsed && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Used:</span>
                      <span className="font-medium">{new Date(template.lastUsed).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <Button 
                  className="w-full mt-3" 
                  size="sm"
                  onClick={() => handleGenerateReport(template.id)}
                >
                  Use Template
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by title, JV name, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="in-review">In Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="jv-performance">JV Performance</SelectItem>
                <SelectItem value="compliance-documentation">Compliance Documentation</SelectItem>
                <SelectItem value="financial-analysis">Financial Analysis</SelectItem>
                <SelectItem value="operational-review">Operational Review</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="compliance">Compliance</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => (
          <Card key={report.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    {report.title}
                    <Badge className={getStatusColor(report.status)}>
                      {report.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 flex-wrap">
                    <Badge className={getCategoryColor(report.category)}>
                      {report.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(report.priority)}>
                      {report.priority.toUpperCase()}
                    </Badge>
                    <span className="text-sm">•</span>
                    <span className="text-sm">{report.jvName}</span>
                    <span className="text-sm">•</span>
                    <span className="text-sm">Created by {report.createdBy}</span>
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewReport(report)}
                  >
                    View Details
                  </Button>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">{report.summary}</p>
                
                {/* Key Metrics */}
                {report.keyMetrics.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">Key Metrics</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {report.keyMetrics.slice(0, 4).map((metric, index) => (
                        <div key={index} className="p-2 bg-gray-50 rounded">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{metric.metric}</span>
                            <span className="text-xs">{getTrendIcon(metric.trend)}</span>
                          </div>
                          <div className="font-semibold">{metric.value} {metric.unit}</div>
                          {metric.target && (
                            <div className="text-xs text-gray-500">Target: {metric.target}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Report Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Reporting Period:</span>
                    <p className="font-medium">
                      {new Date(report.reportingPeriod.startDate).toLocaleDateString()} - 
                      {new Date(report.reportingPeriod.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Due Date:</span>
                    <p className={`font-medium ${
                      new Date(report.dueDate) < new Date() && report.status !== 'published' 
                        ? 'text-red-600' : 'text-gray-900'
                    }`}>
                      {new Date(report.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-500">Last Modified:</span>
                    <p className="font-medium">{new Date(report.lastModified).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Sections:</span>
                    <p className="font-medium">
                      {report.sections.filter(s => s.status === 'completed').length} / {report.sections.length} completed
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Completion Progress</span>
                    <span>{Math.round((report.sections.filter(s => s.status === 'completed').length / report.sections.length) * 100)}%</span>
                  </div>
                  <Progress 
                    value={(report.sections.filter(s => s.status === 'completed').length / report.sections.length) * 100} 
                    className="h-2" 
                  />
                </div>

                {/* Tags */}
                {report.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {report.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Report Details Modal */}
      <Dialog open={isReportModalOpen} onOpenChange={setIsReportModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedReport?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="sections">Sections</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="attachments">Attachments</TabsTrigger>
                <TabsTrigger value="distribution">Distribution</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Report Type</Label>
                    <Badge className={getCategoryColor(selectedReport.category)}>
                      {selectedReport.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Badge className={getCategoryColor(selectedReport.category)}>
                      {selectedReport.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedReport.status)}>
                      {selectedReport.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedReport.priority)}>
                      {selectedReport.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>JV Name</Label>
                    <p className="text-sm font-medium">{selectedReport.jvName}</p>
                  </div>
                  <div>
                    <Label>JV ID</Label>
                    <p className="text-sm font-medium">{selectedReport.jvId}</p>
                  </div>
                  <div>
                    <Label>Created By</Label>
                    <p className="text-sm font-medium">{selectedReport.createdBy}</p>
                  </div>
                  <div>
                    <Label>Created Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedReport.createdDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedReport.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Last Modified</Label>
                    <p className="text-sm font-medium">{new Date(selectedReport.lastModified).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <Label>Summary</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedReport.summary}</p>
                </div>
                <div>
                  <Label>Reporting Period</Label>
                  <p className="text-sm mt-2">
                    {new Date(selectedReport.reportingPeriod.startDate).toLocaleDateString()} - 
                    {new Date(selectedReport.reportingPeriod.endDate).toLocaleDateString()}
                    {selectedReport.reportingPeriod.quarter && ` (${selectedReport.reportingPeriod.quarter})`}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Reviewers</Label>
                    <div className="mt-2 space-y-1">
                      {selectedReport.reviewers.map((reviewer, index) => (
                        <p key={index} className="text-sm">{reviewer}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>Approvers</Label>
                    <div className="mt-2 space-y-1">
                      {selectedReport.approvers.map((approver, index) => (
                        <p key={index} className="text-sm">{approver}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="metrics" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedReport.keyMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{metric.metric}</h4>
                        <span className="text-lg">{getTrendIcon(metric.trend)}</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">
                        {metric.value} {metric.unit}
                      </div>
                      {metric.target && (
                        <div className="text-sm text-gray-600 mb-2">
                          Target: {metric.target} {metric.unit}
                        </div>
                      )}
                      {metric.previousValue && (
                        <div className="text-sm text-gray-600">
                          Previous: {metric.previousValue} {metric.unit}
                        </div>
                      )}
                      {metric.target && (
                        <Progress 
                          value={(metric.value / metric.target) * 100} 
                          className="h-2 mt-2" 
                        />
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="sections" className="space-y-4">
                <div className="space-y-3">
                  {selectedReport.sections.map((section) => (
                    <div key={section.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{section.title}</h4>
                          {section.assignee && (
                            <p className="text-sm text-gray-600">Assigned to: {section.assignee}</p>
                          )}
                        </div>
                        <Badge className={getStatusColor(section.status)}>
                          {section.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{section.content}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="compliance" className="space-y-4">
                <div className="space-y-3">
                  {selectedReport.complianceItems.map((item) => (
                    <div key={item.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{item.requirement}</h4>
                          <p className="text-sm text-gray-600">Responsible: {item.responsible}</p>
                        </div>
                        <Badge className={getStatusColor(item.status)}>
                          {item.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{item.evidence}</p>
                      <div className="text-sm text-gray-500">
                        Due: {new Date(item.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
                {selectedReport.complianceItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No compliance items for this report
                  </div>
                )}
              </TabsContent>
              <TabsContent value="attachments" className="space-y-4">
                <div className="space-y-2">
                  {selectedReport.attachments.map((attachment) => (
                    <div key={attachment.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{attachment.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{attachment.type}</Badge>
                            <span className="text-sm text-gray-500">{attachment.size}</span>
                            <span className="text-sm text-gray-500">{new Date(attachment.uploadDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Upload Attachment
                </Button>
              </TabsContent>
              <TabsContent value="distribution" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Internal Distribution</Label>
                    <div className="mt-2 space-y-1">
                      {selectedReport.distribution.internal.map((recipient, index) => (
                        <p key={index} className="text-sm p-2 bg-blue-50 rounded">{recipient}</p>
                      ))}
                    </div>
                  </div>
                  <div>
                    <Label>External Distribution</Label>
                    <div className="mt-2 space-y-1">
                      {selectedReport.distribution.external.map((recipient, index) => (
                        <p key={index} className="text-sm p-2 bg-green-50 rounded">{recipient}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Label>Confidential Report:</Label>
                  <Badge className={selectedReport.distribution.confidential ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {selectedReport.distribution.confidential ? 'YES' : 'NO'}
                  </Badge>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* New Report Modal */}
      <Dialog open={isNewReportModalOpen} onOpenChange={setIsNewReportModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Set up a new JV report or compliance documentation
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Report Title</Label>
                <Input id="title" placeholder="Enter report title" />
              </div>
              <div>
                <Label htmlFor="type">Report Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="performance">Performance</SelectItem>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="financial">Financial</SelectItem>
                    <SelectItem value="operational">Operational</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jv-performance">JV Performance</SelectItem>
                    <SelectItem value="compliance-documentation">Compliance Documentation</SelectItem>
                    <SelectItem value="financial-analysis">Financial Analysis</SelectItem>
                    <SelectItem value="operational-review">Operational Review</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="jvName">JV Name</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select JV" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jv001">Offshore Drilling Consortium</SelectItem>
                    <SelectItem value="jv002">Gas Processing Alliance</SelectItem>
                    <SelectItem value="jv003">Environmental Consortium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dueDate">Due Date</Label>
                <Input id="dueDate" type="date" />
              </div>
            </div>
            <div>
              <Label htmlFor="summary">Summary</Label>
              <Textarea id="summary" placeholder="Enter report summary" rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewReportModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success('Report created successfully');
                setIsNewReportModalOpen(false);
              }}>
                Create Report
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}