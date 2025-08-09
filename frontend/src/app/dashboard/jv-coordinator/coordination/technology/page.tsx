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
import { CogIcon, ArrowsRightLeftIcon, ArrowTrendingUpIcon, CalendarIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface TechnologyTransfer {
  id: string;
  title: string;
  description: string;
  category: 'drilling' | 'processing' | 'safety' | 'environmental' | 'digital' | 'maintenance';
  type: 'knowledge-transfer' | 'equipment-transfer' | 'process-transfer' | 'software-transfer' | 'training-transfer';
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  expectedCompletionDate: string;
  actualCompletionDate?: string;
  progress: number;
  budget: number;
  spent: number;
  sourceCompany: string;
  recipientCompany: string;
  jvPartner: string;
  projectManager: string;
  technicalLead: string;
  transferMethod: 'training' | 'documentation' | 'mentoring' | 'joint-operations' | 'secondment';
  location: string;
  beneficiaries: number;
  expectedBeneficiaries: number;
  successMetrics: {
    metric: string;
    target: number;
    current: number;
    unit: string;
  }[];
  milestones: {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    completionDate?: string;
  }[];
  deliverables: {
    id: string;
    name: string;
    type: 'document' | 'training' | 'equipment' | 'software' | 'process';
    status: 'pending' | 'in-progress' | 'completed' | 'delayed';
    dueDate: string;
    completionDate?: string;
  }[];
  risks: {
    id: string;
    description: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    probability: 'low' | 'medium' | 'high';
    mitigation: string;
    status: 'open' | 'mitigated' | 'closed';
  }[];
  stakeholders: {
    id: string;
    name: string;
    role: string;
    company: string;
    involvement: 'primary' | 'secondary' | 'observer';
    contact: string;
  }[];
  documents: {
    id: string;
    name: string;
    type: 'agreement' | 'specification' | 'manual' | 'report' | 'presentation';
    uploadDate: string;
    size: string;
    url?: string;
  }[];
}

interface KnowledgeArea {
  id: string;
  name: string;
  category: string;
  description: string;
  complexity: 'basic' | 'intermediate' | 'advanced' | 'expert';
  transferredCount: number;
  inProgressCount: number;
  plannedCount: number;
  successRate: number;
  averageDuration: number;
  totalBeneficiaries: number;
}

const mockTransfers: TechnologyTransfer[] = [
  {
    id: 'TT001',
    title: 'Advanced Drilling Automation System',
    description: 'Transfer of automated drilling control systems and associated operational knowledge to local engineering teams',
    category: 'drilling',
    type: 'equipment-transfer',
    status: 'in-progress',
    priority: 'high',
    startDate: '2024-01-15',
    expectedCompletionDate: '2024-08-15',
    progress: 65,
    budget: 2500000,
    spent: 1625000,
    sourceCompany: 'DrillTech International',
    recipientCompany: 'Ghana Offshore Engineering',
    jvPartner: 'Offshore Drilling Consortium',
    projectManager: 'Dr. Kwame Asante',
    technicalLead: 'Eng. Sarah Mitchell',
    transferMethod: 'joint-operations',
    location: 'Offshore Platform Alpha',
    beneficiaries: 45,
    expectedBeneficiaries: 60,
    successMetrics: [
      {
        metric: 'System Uptime',
        target: 95,
        current: 87,
        unit: '%'
      },
      {
        metric: 'Local Technicians Certified',
        target: 25,
        current: 18,
        unit: 'people'
      },
      {
        metric: 'Drilling Efficiency Improvement',
        target: 20,
        current: 12,
        unit: '%'
      }
    ],
    milestones: [
      {
        id: 'M001',
        title: 'System Installation',
        description: 'Complete installation of drilling automation hardware',
        dueDate: '2024-03-15',
        status: 'completed',
        completionDate: '2024-03-12'
      },
      {
        id: 'M002',
        title: 'Initial Training Phase',
        description: 'Train first batch of local technicians',
        dueDate: '2024-05-15',
        status: 'completed',
        completionDate: '2024-05-10'
      },
      {
        id: 'M003',
        title: 'Operational Testing',
        description: 'Conduct comprehensive system testing with local operators',
        dueDate: '2024-07-15',
        status: 'in-progress'
      },
      {
        id: 'M004',
        title: 'Knowledge Transfer Completion',
        description: 'Complete all knowledge transfer activities',
        dueDate: '2024-08-15',
        status: 'pending'
      }
    ],
    deliverables: [
      {
        id: 'D001',
        name: 'System Operation Manual',
        type: 'document',
        status: 'completed',
        dueDate: '2024-04-01',
        completionDate: '2024-03-28'
      },
      {
        id: 'D002',
        name: 'Technician Certification Program',
        type: 'training',
        status: 'in-progress',
        dueDate: '2024-06-30'
      },
      {
        id: 'D003',
        name: 'Maintenance Procedures',
        type: 'document',
        status: 'in-progress',
        dueDate: '2024-07-30'
      }
    ],
    risks: [
      {
        id: 'R001',
        description: 'Delay in equipment delivery due to supply chain issues',
        impact: 'high',
        probability: 'medium',
        mitigation: 'Identified alternative suppliers and expedited shipping',
        status: 'mitigated'
      },
      {
        id: 'R002',
        description: 'Insufficient local technical expertise for advanced systems',
        impact: 'medium',
        probability: 'high',
        mitigation: 'Extended training program and mentoring support',
        status: 'open'
      }
    ],
    stakeholders: [
      {
        id: 'S001',
        name: 'Dr. Kwame Asante',
        role: 'Project Manager',
        company: 'Ghana Offshore Engineering',
        involvement: 'primary',
        contact: 'kwame.asante@goe.com'
      },
      {
        id: 'S002',
        name: 'Eng. Sarah Mitchell',
        role: 'Technical Lead',
        company: 'DrillTech International',
        involvement: 'primary',
        contact: 'sarah.mitchell@drilltech.com'
      }
    ],
    documents: [
      {
        id: 'DOC001',
        name: 'Technology Transfer Agreement',
        type: 'agreement',
        uploadDate: '2024-01-10',
        size: '2.5 MB'
      },
      {
        id: 'DOC002',
        name: 'System Technical Specifications',
        type: 'specification',
        uploadDate: '2024-02-15',
        size: '15.2 MB'
      }
    ]
  },
  {
    id: 'TT002',
    title: 'Gas Processing Optimization Software',
    description: 'Transfer of advanced gas processing optimization software and training local engineers on its implementation',
    category: 'processing',
    type: 'software-transfer',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-04-01',
    expectedCompletionDate: '2024-12-31',
    progress: 15,
    budget: 1800000,
    spent: 270000,
    sourceCompany: 'ProcessTech Solutions',
    recipientCompany: 'Ghana Gas Processing Ltd',
    jvPartner: 'Gas Processing Alliance',
    projectManager: 'Eng. Ama Darko',
    technicalLead: 'Dr. Michael Chen',
    transferMethod: 'training',
    location: 'Gas Processing Facility, Tema',
    beneficiaries: 8,
    expectedBeneficiaries: 35,
    successMetrics: [
      {
        metric: 'Processing Efficiency',
        target: 15,
        current: 2,
        unit: '% improvement'
      },
      {
        metric: 'Engineers Trained',
        target: 20,
        current: 3,
        unit: 'people'
      }
    ],
    milestones: [
      {
        id: 'M005',
        title: 'Software Licensing',
        description: 'Secure software licenses and installation rights',
        dueDate: '2024-05-01',
        status: 'in-progress'
      },
      {
        id: 'M006',
        title: 'System Installation',
        description: 'Install software on local systems',
        dueDate: '2024-06-15',
        status: 'pending'
      }
    ],
    deliverables: [
      {
        id: 'D004',
        name: 'Software Installation Package',
        type: 'software',
        status: 'pending',
        dueDate: '2024-05-15'
      },
      {
        id: 'D005',
        name: 'User Training Program',
        type: 'training',
        status: 'pending',
        dueDate: '2024-07-31'
      }
    ],
    risks: [
      {
        id: 'R003',
        description: 'Software compatibility issues with existing systems',
        impact: 'high',
        probability: 'medium',
        mitigation: 'Comprehensive compatibility testing planned',
        status: 'open'
      }
    ],
    stakeholders: [
      {
        id: 'S003',
        name: 'Eng. Ama Darko',
        role: 'Project Manager',
        company: 'Ghana Gas Processing Ltd',
        involvement: 'primary',
        contact: 'ama.darko@ggp.com'
      }
    ],
    documents: [
      {
        id: 'DOC003',
        name: 'Software License Agreement',
        type: 'agreement',
        uploadDate: '2024-03-20',
        size: '1.8 MB'
      }
    ]
  },
  {
    id: 'TT003',
    title: 'Environmental Monitoring System',
    description: 'Implementation of advanced environmental monitoring technologies and training for local environmental teams',
    category: 'environmental',
    type: 'knowledge-transfer',
    status: 'completed',
    priority: 'high',
    startDate: '2023-08-01',
    expectedCompletionDate: '2024-02-29',
    actualCompletionDate: '2024-02-25',
    progress: 100,
    budget: 1200000,
    spent: 1150000,
    sourceCompany: 'EcoTech Environmental',
    recipientCompany: 'Ghana Environmental Services',
    jvPartner: 'Environmental Consortium',
    projectManager: 'Dr. Nana Agyeman',
    technicalLead: 'Dr. Lisa Anderson',
    transferMethod: 'mentoring',
    location: 'Multiple Offshore Locations',
    beneficiaries: 28,
    expectedBeneficiaries: 25,
    successMetrics: [
      {
        metric: 'Monitoring Accuracy',
        target: 98,
        current: 99.2,
        unit: '%'
      },
      {
        metric: 'Response Time',
        target: 30,
        current: 18,
        unit: 'minutes'
      },
      {
        metric: 'Local Specialists Certified',
        target: 15,
        current: 18,
        unit: 'people'
      }
    ],
    milestones: [
      {
        id: 'M007',
        title: 'System Deployment',
        description: 'Deploy monitoring equipment across all sites',
        dueDate: '2023-11-30',
        status: 'completed',
        completionDate: '2023-11-25'
      },
      {
        id: 'M008',
        title: 'Staff Training',
        description: 'Complete training for all environmental staff',
        dueDate: '2024-01-31',
        status: 'completed',
        completionDate: '2024-01-28'
      },
      {
        id: 'M009',
        title: 'Knowledge Transfer',
        description: 'Complete all knowledge transfer activities',
        dueDate: '2024-02-29',
        status: 'completed',
        completionDate: '2024-02-25'
      }
    ],
    deliverables: [
      {
        id: 'D006',
        name: 'Monitoring Procedures Manual',
        type: 'document',
        status: 'completed',
        dueDate: '2023-12-15',
        completionDate: '2023-12-10'
      },
      {
        id: 'D007',
        name: 'Certification Program',
        type: 'training',
        status: 'completed',
        dueDate: '2024-01-31',
        completionDate: '2024-01-28'
      }
    ],
    risks: [],
    stakeholders: [
      {
        id: 'S004',
        name: 'Dr. Nana Agyeman',
        role: 'Project Manager',
        company: 'Ghana Environmental Services',
        involvement: 'primary',
        contact: 'nana.agyeman@ges.com'
      }
    ],
    documents: [
      {
        id: 'DOC004',
        name: 'Final Transfer Report',
        type: 'report',
        uploadDate: '2024-03-01',
        size: '8.5 MB'
      }
    ]
  }
];

const mockKnowledgeAreas: KnowledgeArea[] = [
  {
    id: 'KA001',
    name: 'Drilling Technologies',
    category: 'drilling',
    description: 'Advanced drilling techniques, automation, and optimization',
    complexity: 'advanced',
    transferredCount: 12,
    inProgressCount: 5,
    plannedCount: 8,
    successRate: 85.7,
    averageDuration: 8.5,
    totalBeneficiaries: 245
  },
  {
    id: 'KA002',
    name: 'Gas Processing',
    category: 'processing',
    description: 'Gas processing, purification, and optimization technologies',
    complexity: 'intermediate',
    transferredCount: 8,
    inProgressCount: 3,
    plannedCount: 6,
    successRate: 92.3,
    averageDuration: 6.2,
    totalBeneficiaries: 156
  },
  {
    id: 'KA003',
    name: 'Environmental Monitoring',
    category: 'environmental',
    description: 'Environmental monitoring, compliance, and reporting systems',
    complexity: 'intermediate',
    transferredCount: 15,
    inProgressCount: 2,
    plannedCount: 4,
    successRate: 94.1,
    averageDuration: 5.8,
    totalBeneficiaries: 312
  },
  {
    id: 'KA004',
    name: 'Digital Systems',
    category: 'digital',
    description: 'Digital transformation, IoT, and data analytics',
    complexity: 'expert',
    transferredCount: 6,
    inProgressCount: 4,
    plannedCount: 12,
    successRate: 78.9,
    averageDuration: 10.2,
    totalBeneficiaries: 128
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed': return 'bg-green-100 text-green-800';
    case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'planning': case 'pending': return 'bg-yellow-100 text-yellow-800';
    case 'on-hold': return 'bg-orange-100 text-orange-800';
    case 'cancelled': case 'delayed': return 'bg-red-100 text-red-800';
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
    case 'drilling': return 'bg-blue-100 text-blue-800';
    case 'processing': return 'bg-green-100 text-green-800';
    case 'safety': return 'bg-red-100 text-red-800';
    case 'environmental': return 'bg-emerald-100 text-emerald-800';
    case 'digital': return 'bg-purple-100 text-purple-800';
    case 'maintenance': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'knowledge-transfer': return 'bg-blue-100 text-blue-800';
    case 'equipment-transfer': return 'bg-green-100 text-green-800';
    case 'process-transfer': return 'bg-yellow-100 text-yellow-800';
    case 'software-transfer': return 'bg-purple-100 text-purple-800';
    case 'training-transfer': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getComplexityColor = (complexity: string) => {
  switch (complexity) {
    case 'basic': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-orange-100 text-orange-800';
    case 'expert': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function TechnologyTransferPage() {
  const [transfers, setTransfers] = useState<TechnologyTransfer[]>(mockTransfers);
  const [knowledgeAreas, setKnowledgeAreas] = useState<KnowledgeArea[]>(mockKnowledgeAreas);
  const [selectedTransfer, setSelectedTransfer] = useState<TechnologyTransfer | null>(null);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [isNewTransferModalOpen, setIsNewTransferModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredTransfers = transfers.filter(transfer => {
    const matchesSearch = transfer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.sourceCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.recipientCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.jvPartner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || transfer.category === categoryFilter;
    const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesType;
  });

  const handleViewTransfer = (transfer: TechnologyTransfer) => {
    setSelectedTransfer(transfer);
    setIsTransferModalOpen(true);
  };

  const handleCreateTransfer = () => {
    setIsNewTransferModalOpen(true);
  };

  const handleUpdateProgress = (transferId: string, newProgress: number) => {
    setTransfers(items => 
      items.map(item => 
        item.id === transferId ? { ...item, progress: newProgress } : item
      )
    );
    toast.success('Transfer progress updated successfully');
  };

  // Calculate summary statistics
  const totalTransfers = transfers.length;
  const activeTransfers = transfers.filter(t => t.status === 'in-progress').length;
  const completedTransfers = transfers.filter(t => t.status === 'completed').length;
  const totalBudget = transfers.reduce((sum, t) => sum + t.budget, 0);
  const totalSpent = transfers.reduce((sum, t) => sum + t.spent, 0);
  const totalBeneficiaries = transfers.reduce((sum, t) => sum + t.beneficiaries, 0);
  const averageProgress = transfers.reduce((sum, t) => sum + t.progress, 0) / transfers.length;
  const successRate = (completedTransfers / totalTransfers) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Technology Transfer</h1>
          <p className="text-gray-600">Manage technology transfer initiatives and knowledge sharing programs</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateTransfer} className="flex items-center gap-2">
            <CogIcon className="h-4 w-4" />
            New Transfer
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <DocumentTextIcon className="h-4 w-4" />
            Knowledge Base
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Transfers</CardTitle>
            <CogIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTransfers}</div>
            <p className="text-xs text-muted-foreground">All initiatives</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeTransfers}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedTransfers}</div>
            <p className="text-xs text-muted-foreground">Finished</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">${(totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Total allocated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${(totalSpent / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
            <BuildingOfficeIcon className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{totalBeneficiaries}</div>
            <p className="text-xs text-muted-foreground">People impacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{averageProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">{successRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Completion rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Knowledge Areas Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Areas Overview</CardTitle>
          <CardDescription>Technology transfer activities by knowledge domain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {knowledgeAreas.map((area) => (
              <div key={area.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{area.name}</h4>
                  <Badge className={getComplexityColor(area.complexity)}>
                    {area.complexity.toUpperCase()}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{area.description}</p>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Completed</p>
                    <p className="font-semibold text-green-600">{area.transferredCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Active</p>
                    <p className="font-semibold text-blue-600">{area.inProgressCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Planned</p>
                    <p className="font-semibold text-yellow-600">{area.plannedCount}</p>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Success Rate</span>
                    <span className="font-semibold">{area.successRate.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Avg Duration</span>
                    <span className="font-semibold">{area.averageDuration} months</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Beneficiaries</span>
                    <span className="font-semibold">{area.totalBeneficiaries}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Technology Transfers</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by title, company, or JV partner..."
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
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="drilling">Drilling</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="environmental">Environmental</SelectItem>
                <SelectItem value="digital">Digital</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="knowledge-transfer">Knowledge Transfer</SelectItem>
                <SelectItem value="equipment-transfer">Equipment Transfer</SelectItem>
                <SelectItem value="process-transfer">Process Transfer</SelectItem>
                <SelectItem value="software-transfer">Software Transfer</SelectItem>
                <SelectItem value="training-transfer">Training Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transfers List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredTransfers.map((transfer) => (
          <Card key={transfer.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    {transfer.title}
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 flex-wrap">
                    <Badge className={getCategoryColor(transfer.category)}>
                      {transfer.category.toUpperCase()}
                    </Badge>
                    <Badge className={getTypeColor(transfer.type)}>
                      {transfer.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(transfer.priority)}>
                      {transfer.priority.toUpperCase()}
                    </Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewTransfer(transfer)}
                >
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{transfer.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Source Company</p>
                    <p className="font-semibold text-sm">{transfer.sourceCompany}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Recipient Company</p>
                    <p className="font-semibold text-sm">{transfer.recipientCompany}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">JV Partner</p>
                    <p className="font-semibold text-sm">{transfer.jvPartner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Project Manager</p>
                    <p className="font-semibold text-sm">{transfer.projectManager}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{transfer.progress}%</span>
                  </div>
                  <Progress value={transfer.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Budget</p>
                    <p className="font-semibold">${(transfer.budget / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spent</p>
                    <p className="font-semibold">${(transfer.spent / 1000000).toFixed(1)}M</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Beneficiaries</p>
                    <p className="font-semibold">{transfer.beneficiaries}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Method</p>
                    <p className="font-semibold text-xs">{transfer.transferMethod.replace('-', ' ')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="font-semibold text-sm">{new Date(transfer.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Expected Completion</p>
                    <p className="font-semibold text-sm">{new Date(transfer.expectedCompletionDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Transfer Details Modal */}
      <Dialog open={isTransferModalOpen} onOpenChange={setIsTransferModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Technology Transfer Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedTransfer?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedTransfer && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-7">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="deliverables">Deliverables</TabsTrigger>
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="stakeholders">Stakeholders</TabsTrigger>
                <TabsTrigger value="risks">Risks</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Badge className={getCategoryColor(selectedTransfer.category)}>
                      {selectedTransfer.category.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Badge className={getTypeColor(selectedTransfer.type)}>
                      {selectedTransfer.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedTransfer.status)}>
                      {selectedTransfer.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedTransfer.priority)}>
                      {selectedTransfer.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Source Company</Label>
                    <p className="text-sm font-medium">{selectedTransfer.sourceCompany}</p>
                  </div>
                  <div>
                    <Label>Recipient Company</Label>
                    <p className="text-sm font-medium">{selectedTransfer.recipientCompany}</p>
                  </div>
                  <div>
                    <Label>JV Partner</Label>
                    <p className="text-sm font-medium">{selectedTransfer.jvPartner}</p>
                  </div>
                  <div>
                    <Label>Transfer Method</Label>
                    <p className="text-sm font-medium">{selectedTransfer.transferMethod.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <Label>Project Manager</Label>
                    <p className="text-sm font-medium">{selectedTransfer.projectManager}</p>
                  </div>
                  <div>
                    <Label>Technical Lead</Label>
                    <p className="text-sm font-medium">{selectedTransfer.technicalLead}</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="text-sm font-medium">{selectedTransfer.location}</p>
                  </div>
                  <div>
                    <Label>Beneficiaries</Label>
                    <p className="text-sm font-medium">{selectedTransfer.beneficiaries} / {selectedTransfer.expectedBeneficiaries}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedTransfer.description}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Budget Utilization</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Spent: ${(selectedTransfer.spent / 1000000).toFixed(1)}M</span>
                        <span>Budget: ${(selectedTransfer.budget / 1000000).toFixed(1)}M</span>
                      </div>
                      <Progress value={(selectedTransfer.spent / selectedTransfer.budget) * 100} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Beneficiaries</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current: {selectedTransfer.beneficiaries}</span>
                        <span>Target: {selectedTransfer.expectedBeneficiaries}</span>
                      </div>
                      <Progress value={(selectedTransfer.beneficiaries / selectedTransfer.expectedBeneficiaries) * 100} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Progress</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion</span>
                        <span>{selectedTransfer.progress}%</span>
                      </div>
                      <Progress value={selectedTransfer.progress} className="h-3" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="milestones" className="space-y-4">
                <div className="space-y-3">
                  {selectedTransfer.milestones.map((milestone) => (
                    <div key={milestone.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{milestone.title}</h4>
                          <p className="text-sm text-gray-600">{milestone.description}</p>
                        </div>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Due Date: </span>
                          <span className="font-medium">{new Date(milestone.dueDate).toLocaleDateString()}</span>
                        </div>
                        {milestone.completionDate && (
                          <div>
                            <span className="text-gray-500">Completed: </span>
                            <span className="font-medium">{new Date(milestone.completionDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="deliverables" className="space-y-4">
                <div className="space-y-3">
                  {selectedTransfer.deliverables.map((deliverable) => (
                    <div key={deliverable.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{deliverable.name}</h4>
                          <Badge className={getCategoryColor(deliverable.type)}>
                            {deliverable.type.toUpperCase()}
                          </Badge>
                        </div>
                        <Badge className={getStatusColor(deliverable.status)}>
                          {deliverable.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Due Date: </span>
                          <span className="font-medium">{new Date(deliverable.dueDate).toLocaleDateString()}</span>
                        </div>
                        {deliverable.completionDate && (
                          <div>
                            <span className="text-gray-500">Completed: </span>
                            <span className="font-medium">{new Date(deliverable.completionDate).toLocaleDateString()}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="metrics" className="space-y-4">
                <div className="space-y-3">
                  {selectedTransfer.successMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{metric.metric}</h4>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {metric.current} / {metric.target} {metric.unit}
                          </div>
                          <div className="text-xs text-gray-500">
                            {((metric.current / metric.target) * 100).toFixed(1)}% achieved
                          </div>
                        </div>
                      </div>
                      <Progress value={(metric.current / metric.target) * 100} className="h-3" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="stakeholders" className="space-y-4">
                <div className="space-y-2">
                  {selectedTransfer.stakeholders.map((stakeholder) => (
                    <div key={stakeholder.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{stakeholder.name}</h4>
                          <p className="text-sm text-gray-600">{stakeholder.role} at {stakeholder.company}</p>
                          <p className="text-sm text-gray-500">{stakeholder.contact}</p>
                        </div>
                        <Badge className={stakeholder.involvement === 'primary' ? 'bg-blue-100 text-blue-800' : 
                                        stakeholder.involvement === 'secondary' ? 'bg-yellow-100 text-yellow-800' : 
                                        'bg-gray-100 text-gray-800'}>
                          {stakeholder.involvement.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="risks" className="space-y-4">
                <div className="space-y-3">
                  {selectedTransfer.risks.map((risk) => (
                    <div key={risk.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">Risk Assessment</h4>
                        <div className="flex gap-2">
                          <Badge className={getPriorityColor(risk.impact)}>
                            {risk.impact.toUpperCase()} IMPACT
                          </Badge>
                          <Badge className={getPriorityColor(risk.probability)}>
                            {risk.probability.toUpperCase()} PROB
                          </Badge>
                          <Badge className={getStatusColor(risk.status)}>
                            {risk.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{risk.description}</p>
                      <div>
                        <span className="text-sm font-medium text-gray-700">Mitigation: </span>
                        <span className="text-sm text-gray-600">{risk.mitigation}</span>
                      </div>
                    </div>
                  ))}
                </div>
                {selectedTransfer.risks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No risks identified
                  </div>
                )}
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-2">
                  {selectedTransfer.documents.map((document) => (
                    <div key={document.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{document.name}</p>
                          <div className="flex items-center gap-2">
                            <Badge className={getCategoryColor(document.type)}>
                              {document.type.toUpperCase()}
                            </Badge>
                            <span className="text-sm text-gray-500">{document.size}</span>
                            <span className="text-sm text-gray-500">{new Date(document.uploadDate).toLocaleDateString()}</span>
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
                  Upload Document
                </Button>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* New Transfer Modal */}
      <Dialog open={isNewTransferModalOpen} onOpenChange={setIsNewTransferModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Technology Transfer</DialogTitle>
            <DialogDescription>
              Set up a new technology transfer initiative
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Transfer Title</Label>
                <Input id="title" placeholder="Enter transfer title" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drilling">Drilling</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="environmental">Environmental</SelectItem>
                    <SelectItem value="digital">Digital</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="type">Transfer Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knowledge-transfer">Knowledge Transfer</SelectItem>
                    <SelectItem value="equipment-transfer">Equipment Transfer</SelectItem>
                    <SelectItem value="process-transfer">Process Transfer</SelectItem>
                    <SelectItem value="software-transfer">Software Transfer</SelectItem>
                    <SelectItem value="training-transfer">Training Transfer</SelectItem>
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
                <Label htmlFor="sourceCompany">Source Company</Label>
                <Input id="sourceCompany" placeholder="Enter source company" />
              </div>
              <div>
                <Label htmlFor="recipientCompany">Recipient Company</Label>
                <Input id="recipientCompany" placeholder="Enter recipient company" />
              </div>
              <div>
                <Label htmlFor="jvPartner">JV Partner</Label>
                <Input id="jvPartner" placeholder="Enter JV partner" />
              </div>
              <div>
                <Label htmlFor="projectManager">Project Manager</Label>
                <Input id="projectManager" placeholder="Enter project manager" />
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="Enter budget" />
              </div>
              <div>
                <Label htmlFor="expectedBeneficiaries">Expected Beneficiaries</Label>
                <Input id="expectedBeneficiaries" type="number" placeholder="Enter expected beneficiaries" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter transfer description" rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewTransferModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success('Technology transfer created successfully');
                setIsNewTransferModalOpen(false);
              }}>
                Create Transfer
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}