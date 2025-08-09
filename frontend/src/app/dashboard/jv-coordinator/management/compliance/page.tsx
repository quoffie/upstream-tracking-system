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
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ShieldCheckIcon, ExclamationTriangleIcon, DocumentTextIcon, CalendarIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface ComplianceItem {
  id: string;
  jvName: string;
  category: 'regulatory' | 'financial' | 'operational' | 'environmental' | 'safety';
  requirement: string;
  status: 'compliant' | 'non-compliant' | 'pending' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  lastReview: string;
  nextReview: string;
  assignedTo: string;
  description: string;
  evidence: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
  actions: {
    id: string;
    action: string;
    assignee: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    notes?: string;
  }[];
  riskLevel: number;
  complianceScore: number;
}

interface Audit {
  id: string;
  jvName: string;
  type: 'internal' | 'external' | 'regulatory';
  auditor: string;
  date: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  scope: string;
  findings: {
    id: string;
    category: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
    status: 'open' | 'in-progress' | 'closed';
  }[];
  overallRating: number;
  nextAudit: string;
}

const mockComplianceItems: ComplianceItem[] = [
  {
    id: 'C001',
    jvName: 'Offshore Drilling Consortium',
    category: 'regulatory',
    requirement: 'Environmental Impact Assessment Update',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-04-30',
    lastReview: '2024-01-15',
    nextReview: '2024-04-15',
    assignedTo: 'Environmental Team',
    description: 'Annual update of environmental impact assessment required by EPA regulations',
    evidence: [
      { id: 'E001', name: 'EIA Report 2023', type: 'PDF', uploadDate: '2024-01-15', status: 'valid' },
      { id: 'E002', name: 'Monitoring Data', type: 'Excel', uploadDate: '2024-02-01', status: 'valid' }
    ],
    actions: [
      { id: 'A001', action: 'Conduct field assessment', assignee: 'Dr. Sarah Johnson', dueDate: '2024-04-10', status: 'in-progress' },
      { id: 'A002', action: 'Submit updated report', assignee: 'Environmental Team', dueDate: '2024-04-25', status: 'pending' }
    ],
    riskLevel: 75,
    complianceScore: 65
  },
  {
    id: 'C002',
    jvName: 'Gas Processing Alliance',
    category: 'financial',
    requirement: 'Annual Financial Audit',
    status: 'compliant',
    priority: 'medium',
    dueDate: '2024-12-31',
    lastReview: '2024-03-01',
    nextReview: '2024-06-01',
    assignedTo: 'Finance Department',
    description: 'Independent financial audit as required by partnership agreement',
    evidence: [
      { id: 'E003', name: 'Audit Report 2023', type: 'PDF', uploadDate: '2024-03-01', status: 'valid' },
      { id: 'E004', name: 'Financial Statements', type: 'PDF', uploadDate: '2024-03-01', status: 'valid' }
    ],
    actions: [
      { id: 'A003', action: 'Schedule next audit', assignee: 'Finance Manager', dueDate: '2024-09-01', status: 'pending' }
    ],
    riskLevel: 25,
    complianceScore: 95
  },
  {
    id: 'C003',
    jvName: 'Offshore Drilling Consortium',
    category: 'safety',
    requirement: 'Safety Management System Review',
    status: 'overdue',
    priority: 'critical',
    dueDate: '2024-03-15',
    lastReview: '2023-12-01',
    nextReview: '2024-03-01',
    assignedTo: 'Safety Department',
    description: 'Quarterly review of safety management systems and procedures',
    evidence: [
      { id: 'E005', name: 'Safety Audit Q4 2023', type: 'PDF', uploadDate: '2023-12-01', status: 'expired' }
    ],
    actions: [
      { id: 'A004', action: 'Conduct safety review', assignee: 'Safety Manager', dueDate: '2024-03-20', status: 'overdue' },
      { id: 'A005', action: 'Update safety procedures', assignee: 'Safety Team', dueDate: '2024-03-25', status: 'pending' }
    ],
    riskLevel: 90,
    complianceScore: 40
  }
];

const mockAudits: Audit[] = [
  {
    id: 'A001',
    jvName: 'Offshore Drilling Consortium',
    type: 'external',
    auditor: 'PwC Ghana',
    date: '2024-04-15',
    status: 'scheduled',
    scope: 'Financial and operational compliance review',
    findings: [],
    overallRating: 0,
    nextAudit: '2024-10-15'
  },
  {
    id: 'A002',
    jvName: 'Gas Processing Alliance',
    type: 'internal',
    auditor: 'Internal Audit Team',
    date: '2024-03-01',
    status: 'completed',
    scope: 'Process compliance and risk assessment',
    findings: [
      {
        id: 'F001',
        category: 'Process Control',
        severity: 'medium',
        description: 'Documentation gaps in quality control procedures',
        recommendation: 'Update QC documentation and implement regular reviews',
        status: 'in-progress'
      },
      {
        id: 'F002',
        category: 'Risk Management',
        severity: 'low',
        description: 'Minor inconsistencies in risk reporting format',
        recommendation: 'Standardize risk reporting templates',
        status: 'closed'
      }
    ],
    overallRating: 85,
    nextAudit: '2024-09-01'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'compliant': return 'bg-green-100 text-green-800';
    case 'non-compliant': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'overdue': return 'bg-red-100 text-red-800';
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
    case 'regulatory': return 'bg-purple-100 text-purple-800';
    case 'financial': return 'bg-green-100 text-green-800';
    case 'operational': return 'bg-blue-100 text-blue-800';
    case 'environmental': return 'bg-emerald-100 text-emerald-800';
    case 'safety': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'low': return 'bg-blue-100 text-blue-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function ComplianceMonitoringPage() {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(mockComplianceItems);
  const [audits, setAudits] = useState<Audit[]>(mockAudits);
  const [selectedItem, setSelectedItem] = useState<ComplianceItem | null>(null);
  const [selectedAudit, setSelectedAudit] = useState<Audit | null>(null);
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.requirement.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.jvName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || item.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const handleViewItem = (item: ComplianceItem) => {
    setSelectedItem(item);
    setIsItemModalOpen(true);
  };

  const handleViewAudit = (audit: Audit) => {
    setSelectedAudit(audit);
    setIsAuditModalOpen(true);
  };

  const handleUpdateStatus = (itemId: string, newStatus: ComplianceItem['status']) => {
    setComplianceItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, status: newStatus } : item
      )
    );
    toast.success('Compliance status updated successfully');
  };

  // Calculate summary statistics
  const totalItems = complianceItems.length;
  const compliantItems = complianceItems.filter(item => item.status === 'compliant').length;
  const overdueItems = complianceItems.filter(item => item.status === 'overdue').length;
  const criticalItems = complianceItems.filter(item => item.priority === 'critical').length;
  const averageScore = complianceItems.reduce((sum, item) => sum + item.complianceScore, 0) / totalItems;
  const upcomingAudits = audits.filter(audit => audit.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compliance Monitoring</h1>
          <p className="text-gray-600">Monitor and manage JV compliance requirements and audits</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule Audit
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">Compliance requirements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{compliantItems}</div>
            <p className="text-xs text-muted-foreground">Meeting requirements</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <ExclamationTriangleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueItems}</div>
            <p className="text-xs text-muted-foreground">Past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <ExclamationCircleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{criticalItems}</div>
            <p className="text-xs text-muted-foreground">High priority items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Score</CardTitle>
            <ShieldCheckIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageScore.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Compliance rating</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Audits</CardTitle>
            <CalendarIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{upcomingAudits}</div>
            <p className="text-xs text-muted-foreground">Scheduled</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Compliance Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by requirement or JV name..."
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
                <SelectItem value="compliant">Compliant</SelectItem>
                <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="regulatory">Regulatory</SelectItem>
                <SelectItem value="financial">Financial</SelectItem>
                <SelectItem value="operational">Operational</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Items */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Compliance Requirements</h2>
          {filteredItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      {item.requirement}
                      <Badge className={getStatusColor(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge className={getCategoryColor(item.category)}>
                        {item.category.toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(item.priority)}>
                        {item.priority.toUpperCase()}
                      </Badge>
                      <span>• {item.jvName}</span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewItem(item)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Due Date</p>
                      <p className="font-semibold text-sm">{new Date(item.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Assigned To</p>
                      <p className="font-semibold text-sm">{item.assignedTo}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Compliance Score</span>
                      <span>{item.complianceScore}%</span>
                    </div>
                    <Progress value={item.complianceScore} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Risk Level</span>
                      <span className={item.riskLevel > 70 ? 'text-red-600' : item.riskLevel > 40 ? 'text-yellow-600' : 'text-green-600'}>
                        {item.riskLevel}%
                      </span>
                    </div>
                    <Progress 
                      value={item.riskLevel} 
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Audits */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Audits</h2>
          {audits.map((audit) => (
            <Card key={audit.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {audit.jvName} - {audit.type.charAt(0).toUpperCase() + audit.type.slice(1)} Audit
                      <Badge className={audit.status === 'completed' ? 'bg-green-100 text-green-800' : audit.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {audit.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {audit.auditor} • {new Date(audit.date).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewAudit(audit)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium">Scope:</p>
                    <p className="text-sm text-gray-600">{audit.scope}</p>
                  </div>
                  {audit.status === 'completed' && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Overall Rating</span>
                        <span className="font-semibold">{audit.overallRating}%</span>
                      </div>
                      <Progress value={audit.overallRating} className="h-2" />
                    </div>
                  )}
                  {audit.findings.length > 0 && (
                    <div>
                      <p className="text-sm font-medium mb-2">Findings: {audit.findings.length}</p>
                      <div className="flex flex-wrap gap-1">
                        {audit.findings.map((finding) => (
                          <Badge key={finding.id} className={getSeverityColor(finding.severity)}>
                            {finding.severity.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Next Audit</p>
                      <p className="font-semibold">{new Date(audit.nextAudit).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Type</p>
                      <p className="font-semibold capitalize">{audit.type}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Compliance Item Details Modal */}
      <Dialog open={isItemModalOpen} onOpenChange={setIsItemModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Compliance Item Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedItem?.requirement}
            </DialogDescription>
          </DialogHeader>
          {selectedItem && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="evidence">Evidence</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>JV Name</Label>
                    <p className="text-sm font-medium">{selectedItem.jvName}</p>
                  </div>
                  <div>
                    <Label>Category</Label>
                    <Badge className={getCategoryColor(selectedItem.category)}>
                      {selectedItem.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(selectedItem.status)}>
                        {selectedItem.status.toUpperCase()}
                      </Badge>
                      <Select 
                        value={selectedItem.status} 
                        onValueChange={(value) => handleUpdateStatus(selectedItem.id, value as ComplianceItem['status'])}
                      >
                        <SelectTrigger className="w-[150px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="compliant">Compliant</SelectItem>
                          <SelectItem value="non-compliant">Non-Compliant</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="overdue">Overdue</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedItem.priority)}>
                      {selectedItem.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Due Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedItem.dueDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Assigned To</Label>
                    <p className="text-sm font-medium">{selectedItem.assignedTo}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedItem.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Compliance Score</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedItem.complianceScore}%</span>
                      </div>
                      <Progress value={selectedItem.complianceScore} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Risk Level</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Risk</span>
                        <span className={selectedItem.riskLevel > 70 ? 'text-red-600' : selectedItem.riskLevel > 40 ? 'text-yellow-600' : 'text-green-600'}>
                          {selectedItem.riskLevel}%
                        </span>
                      </div>
                      <Progress value={selectedItem.riskLevel} className="h-3" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="evidence" className="space-y-4">
                <div className="space-y-2">
                  {selectedItem.evidence.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {new Date(doc.uploadDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge className={doc.status === 'valid' ? 'bg-green-100 text-green-800' : doc.status === 'expired' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                        {doc.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Upload Evidence
                </Button>
              </TabsContent>
              <TabsContent value="actions" className="space-y-4">
                <div className="space-y-3">
                  {selectedItem.actions.map((action) => (
                    <div key={action.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{action.action}</h4>
                        <Badge className={action.status === 'completed' ? 'bg-green-100 text-green-800' : action.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                          {action.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Assignee</p>
                          <p className="font-medium">{action.assignee}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Due Date</p>
                          <p className="font-medium">{new Date(action.dueDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                      {action.notes && (
                        <div className="mt-2">
                          <p className="text-gray-500 text-sm">Notes</p>
                          <p className="text-sm">{action.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  Add Action Item
                </Button>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div className="space-y-3">
                  <div className="p-3 border-l-4 border-blue-500 bg-blue-50">
                    <p className="font-medium text-sm">Last Review</p>
                    <p className="text-sm text-gray-600">{new Date(selectedItem.lastReview).toLocaleDateString()}</p>
                  </div>
                  <div className="p-3 border-l-4 border-green-500 bg-green-50">
                    <p className="font-medium text-sm">Next Review</p>
                    <p className="text-sm text-gray-600">{new Date(selectedItem.nextReview).toLocaleDateString()}</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Audit Details Modal */}
      <Dialog open={isAuditModalOpen} onOpenChange={setIsAuditModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Audit Details</DialogTitle>
            <DialogDescription>
              Detailed information for {selectedAudit?.jvName} audit
            </DialogDescription>
          </DialogHeader>
          {selectedAudit && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>JV Name</Label>
                  <p className="text-sm font-medium">{selectedAudit.jvName}</p>
                </div>
                <div>
                  <Label>Audit Type</Label>
                  <p className="text-sm font-medium capitalize">{selectedAudit.type}</p>
                </div>
                <div>
                  <Label>Auditor</Label>
                  <p className="text-sm font-medium">{selectedAudit.auditor}</p>
                </div>
                <div>
                  <Label>Date</Label>
                  <p className="text-sm font-medium">{new Date(selectedAudit.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={selectedAudit.status === 'completed' ? 'bg-green-100 text-green-800' : selectedAudit.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                    {selectedAudit.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>Next Audit</Label>
                  <p className="text-sm font-medium">{new Date(selectedAudit.nextAudit).toLocaleDateString()}</p>
                </div>
              </div>
              <div>
                <Label>Scope</Label>
                <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedAudit.scope}</p>
              </div>
              {selectedAudit.status === 'completed' && selectedAudit.overallRating > 0 && (
                <div>
                  <Label>Overall Rating</Label>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Rating</span>
                      <span>{selectedAudit.overallRating}%</span>
                    </div>
                    <Progress value={selectedAudit.overallRating} className="h-3" />
                  </div>
                </div>
              )}
              {selectedAudit.findings.length > 0 && (
                <div>
                  <Label>Findings ({selectedAudit.findings.length})</Label>
                  <div className="space-y-3 mt-2">
                    {selectedAudit.findings.map((finding) => (
                      <div key={finding.id} className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{finding.category}</h4>
                          <div className="flex gap-2">
                            <Badge className={getSeverityColor(finding.severity)}>
                              {finding.severity.toUpperCase()}
                            </Badge>
                            <Badge className={finding.status === 'closed' ? 'bg-green-100 text-green-800' : finding.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}>
                              {finding.status.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{finding.description}</p>
                        <div>
                          <p className="text-sm font-medium">Recommendation:</p>
                          <p className="text-sm text-gray-600">{finding.recommendation}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}