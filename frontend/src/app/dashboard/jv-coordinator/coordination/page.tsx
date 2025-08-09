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
import { AcademicCapIcon, CogIcon, UsersIcon, ArrowTrendingUpIcon, CalendarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface LocalContentInitiative {
  id: string;
  jvName: string;
  type: 'training' | 'technology-transfer' | 'capacity-building' | 'procurement';
  title: string;
  description: string;
  status: 'planning' | 'active' | 'completed' | 'on-hold' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  coordinator: string;
  beneficiaries: number;
  targetBeneficiaries: number;
  milestones: {
    id: string;
    title: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed' | 'overdue';
    description: string;
  }[];
  kpis: {
    id: string;
    metric: string;
    target: number;
    current: number;
    unit: string;
  }[];
  partners: string[];
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
  }[];
}

interface Meeting {
  id: string;
  title: string;
  type: 'coordination' | 'review' | 'planning' | 'stakeholder';
  date: string;
  time: string;
  duration: number;
  location: string;
  organizer: string;
  attendees: string[];
  agenda: string[];
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  actionItems: {
    id: string;
    action: string;
    assignee: string;
    dueDate: string;
    status: 'pending' | 'in-progress' | 'completed';
  }[];
}

const mockInitiatives: LocalContentInitiative[] = [
  {
    id: 'LC001',
    jvName: 'Offshore Drilling Consortium',
    type: 'training',
    title: 'Advanced Drilling Techniques Training Program',
    description: 'Comprehensive training program for local engineers on advanced offshore drilling techniques and safety protocols',
    status: 'active',
    priority: 'high',
    startDate: '2024-01-15',
    endDate: '2024-12-31',
    budget: 500000,
    spent: 180000,
    progress: 45,
    coordinator: 'Dr. Kwame Asante',
    beneficiaries: 28,
    targetBeneficiaries: 50,
    milestones: [
      {
        id: 'M001',
        title: 'Phase 1: Basic Training Completion',
        dueDate: '2024-04-30',
        status: 'completed',
        description: 'Complete basic drilling fundamentals training for all participants'
      },
      {
        id: 'M002',
        title: 'Phase 2: Advanced Techniques',
        dueDate: '2024-08-31',
        status: 'in-progress',
        description: 'Advanced drilling techniques and equipment operation training'
      },
      {
        id: 'M003',
        title: 'Phase 3: Certification',
        dueDate: '2024-12-15',
        status: 'pending',
        description: 'Final assessment and certification of participants'
      }
    ],
    kpis: [
      { id: 'K001', metric: 'Training Completion Rate', target: 90, current: 85, unit: '%' },
      { id: 'K002', metric: 'Skill Assessment Score', target: 80, current: 78, unit: '%' },
      { id: 'K003', metric: 'Employment Rate Post-Training', target: 75, current: 65, unit: '%' }
    ],
    partners: ['Ghana Institute of Engineering', 'Offshore Training Center', 'Local Technical College'],
    documents: [
      { id: 'D001', name: 'Training Curriculum', type: 'PDF', uploadDate: '2024-01-10' },
      { id: 'D002', name: 'Progress Report Q1', type: 'PDF', uploadDate: '2024-04-01' }
    ]
  },
  {
    id: 'LC002',
    jvName: 'Gas Processing Alliance',
    type: 'technology-transfer',
    title: 'Gas Processing Technology Transfer Initiative',
    description: 'Transfer of advanced gas processing technologies to local companies and institutions',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-06-01',
    endDate: '2025-05-31',
    budget: 750000,
    spent: 25000,
    progress: 15,
    coordinator: 'Eng. Ama Osei',
    beneficiaries: 5,
    targetBeneficiaries: 15,
    milestones: [
      {
        id: 'M004',
        title: 'Technology Assessment',
        dueDate: '2024-07-31',
        status: 'pending',
        description: 'Assess current local capabilities and technology gaps'
      },
      {
        id: 'M005',
        title: 'Partnership Agreements',
        dueDate: '2024-09-30',
        status: 'pending',
        description: 'Finalize agreements with local institutions and companies'
      }
    ],
    kpis: [
      { id: 'K004', metric: 'Technology Transfer Success Rate', target: 80, current: 20, unit: '%' },
      { id: 'K005', metric: 'Local Company Participation', target: 10, current: 3, unit: 'companies' },
      { id: 'K006', metric: 'Knowledge Retention Rate', target: 85, current: 0, unit: '%' }
    ],
    partners: ['University of Ghana Engineering', 'Ghana Gas Company', 'Local Manufacturing Hub'],
    documents: [
      { id: 'D003', name: 'Technology Transfer Plan', type: 'PDF', uploadDate: '2024-05-15' }
    ]
  },
  {
    id: 'LC003',
    jvName: 'Offshore Drilling Consortium',
    type: 'capacity-building',
    title: 'Local Supplier Development Program',
    description: 'Program to build capacity of local suppliers to meet international standards',
    status: 'active',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-11-30',
    budget: 300000,
    spent: 120000,
    progress: 60,
    coordinator: 'Mr. Kofi Mensah',
    beneficiaries: 12,
    targetBeneficiaries: 20,
    milestones: [
      {
        id: 'M006',
        title: 'Supplier Assessment',
        dueDate: '2024-03-31',
        status: 'completed',
        description: 'Complete assessment of local supplier capabilities'
      },
      {
        id: 'M007',
        title: 'Capacity Building Training',
        dueDate: '2024-08-31',
        status: 'in-progress',
        description: 'Conduct training programs for quality management and standards'
      }
    ],
    kpis: [
      { id: 'K007', metric: 'Supplier Certification Rate', target: 70, current: 45, unit: '%' },
      { id: 'K008', metric: 'Quality Improvement Score', target: 85, current: 72, unit: '%' },
      { id: 'K009', metric: 'Contract Award Rate', target: 60, current: 35, unit: '%' }
    ],
    partners: ['Ghana Standards Authority', 'Association of Ghana Industries', 'Quality Assurance Institute'],
    documents: [
      { id: 'D004', name: 'Supplier Assessment Report', type: 'PDF', uploadDate: '2024-04-01' },
      { id: 'D005', name: 'Training Materials', type: 'ZIP', uploadDate: '2024-05-01' }
    ]
  }
];

const mockMeetings: Meeting[] = [
  {
    id: 'MT001',
    title: 'Monthly Local Content Coordination Meeting',
    type: 'coordination',
    date: '2024-04-15',
    time: '10:00',
    duration: 120,
    location: 'Conference Room A, Accra Office',
    organizer: 'Dr. Kwame Asante',
    attendees: ['Eng. Ama Osei', 'Mr. Kofi Mensah', 'Ms. Akosua Darko', 'Prof. Nana Agyeman'],
    agenda: [
      'Review of Q1 progress across all initiatives',
      'Budget allocation for Q2 activities',
      'Partnership development updates',
      'Upcoming milestone reviews'
    ],
    status: 'scheduled',
    actionItems: [
      {
        id: 'AI001',
        action: 'Prepare Q1 financial report',
        assignee: 'Finance Team',
        dueDate: '2024-04-12',
        status: 'pending'
      },
      {
        id: 'AI002',
        action: 'Schedule partner meetings',
        assignee: 'Eng. Ama Osei',
        dueDate: '2024-04-20',
        status: 'pending'
      }
    ]
  },
  {
    id: 'MT002',
    title: 'Training Program Review',
    type: 'review',
    date: '2024-04-08',
    time: '14:00',
    duration: 90,
    location: 'Virtual Meeting',
    organizer: 'Dr. Kwame Asante',
    attendees: ['Training Coordinators', 'Program Participants', 'Industry Partners'],
    agenda: [
      'Phase 1 completion assessment',
      'Participant feedback review',
      'Phase 2 planning and preparation',
      'Resource allocation discussion'
    ],
    status: 'completed',
    notes: 'Excellent progress in Phase 1. Participants showed strong engagement and skill development.',
    actionItems: [
      {
        id: 'AI003',
        action: 'Develop Phase 2 detailed curriculum',
        assignee: 'Training Team',
        dueDate: '2024-04-15',
        status: 'completed'
      },
      {
        id: 'AI004',
        action: 'Procure advanced training equipment',
        assignee: 'Procurement Team',
        dueDate: '2024-04-25',
        status: 'in-progress'
      }
    ]
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': case 'completed': case 'scheduled': return 'bg-green-100 text-green-800';
    case 'planning': case 'pending': case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'on-hold': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': case 'overdue': return 'bg-red-100 text-red-800';
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

const getTypeColor = (type: string) => {
  switch (type) {
    case 'training': return 'bg-purple-100 text-purple-800';
    case 'technology-transfer': return 'bg-blue-100 text-blue-800';
    case 'capacity-building': return 'bg-green-100 text-green-800';
    case 'procurement': return 'bg-orange-100 text-orange-800';
    case 'coordination': return 'bg-indigo-100 text-indigo-800';
    case 'review': return 'bg-teal-100 text-teal-800';
    case 'planning': return 'bg-cyan-100 text-cyan-800';
    case 'stakeholder': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function LocalContentCoordinationPage() {
  const [initiatives, setInitiatives] = useState<LocalContentInitiative[]>(mockInitiatives);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedInitiative, setSelectedInitiative] = useState<LocalContentInitiative | null>(null);
  const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);
  const [isInitiativeModalOpen, setIsInitiativeModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredInitiatives = initiatives.filter(initiative => {
    const matchesSearch = initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         initiative.jvName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || initiative.status === statusFilter;
    const matchesType = typeFilter === 'all' || initiative.type === typeFilter;
    const matchesPriority = priorityFilter === 'all' || initiative.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleViewInitiative = (initiative: LocalContentInitiative) => {
    setSelectedInitiative(initiative);
    setIsInitiativeModalOpen(true);
  };

  const handleViewMeeting = (meeting: Meeting) => {
    setSelectedMeeting(meeting);
    setIsMeetingModalOpen(true);
  };

  const handleUpdateProgress = (initiativeId: string, newProgress: number) => {
    setInitiatives(items => 
      items.map(item => 
        item.id === initiativeId ? { ...item, progress: newProgress } : item
      )
    );
    toast.success('Progress updated successfully');
  };

  // Calculate summary statistics
  const totalInitiatives = initiatives.length;
  const activeInitiatives = initiatives.filter(i => i.status === 'active').length;
  const totalBudget = initiatives.reduce((sum, i) => sum + i.budget, 0);
  const totalSpent = initiatives.reduce((sum, i) => sum + i.spent, 0);
  const averageProgress = initiatives.reduce((sum, i) => sum + i.progress, 0) / totalInitiatives;
  const totalBeneficiaries = initiatives.reduce((sum, i) => sum + i.beneficiaries, 0);
  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Local Content Coordination</h1>
          <p className="text-gray-600">Manage and coordinate local content initiatives and stakeholder meetings</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <AcademicCapIcon className="h-4 w-4" />
            New Initiative
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4" />
            Schedule Meeting
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Initiatives</CardTitle>
            <CogIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInitiatives}</div>
            <p className="text-xs text-muted-foreground">All programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeInitiatives}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">${(totalBudget / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Allocated funds</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${(totalSpent / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% utilized</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Progress</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averageProgress.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall completion</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Beneficiaries</CardTitle>
            <UsersIcon className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{totalBeneficiaries}</div>
            <p className="text-xs text-muted-foreground">People impacted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{upcomingMeetings}</div>
            <p className="text-xs text-muted-foreground">Upcoming</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Initiatives</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by title or JV name..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="training">Training</SelectItem>
                <SelectItem value="technology-transfer">Technology Transfer</SelectItem>
                <SelectItem value="capacity-building">Capacity Building</SelectItem>
                <SelectItem value="procurement">Procurement</SelectItem>
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
        {/* Initiatives */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Local Content Initiatives</h2>
          {filteredInitiatives.map((initiative) => (
            <Card key={initiative.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2 mb-2">
                      {initiative.title}
                      <Badge className={getStatusColor(initiative.status)}>
                        {initiative.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge className={getTypeColor(initiative.type)}>
                        {initiative.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(initiative.priority)}>
                        {initiative.priority.toUpperCase()}
                      </Badge>
                      <span>• {initiative.jvName}</span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewInitiative(initiative)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">{initiative.description}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Coordinator</p>
                      <p className="font-semibold text-sm">{initiative.coordinator}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">End Date</p>
                      <p className="font-semibold text-sm">{new Date(initiative.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{initiative.progress}%</span>
                    </div>
                    <Progress value={initiative.progress} className="h-2" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Budget</p>
                      <p className="font-semibold">${(initiative.budget / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Spent</p>
                      <p className="font-semibold">${(initiative.spent / 1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Beneficiaries</p>
                      <p className="font-semibold">{initiative.beneficiaries}/{initiative.targetBeneficiaries}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Meetings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Coordination Meetings</h2>
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {meeting.title}
                      <Badge className={getStatusColor(meeting.status)}>
                        {meeting.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Badge className={getTypeColor(meeting.type)}>
                        {meeting.type.replace('-', ' ').toUpperCase()}
                      </Badge>
                      <span>• {new Date(meeting.date).toLocaleDateString()} at {meeting.time}</span>
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewMeeting(meeting)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Organizer</p>
                      <p className="font-semibold text-sm">{meeting.organizer}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-semibold text-sm">{meeting.duration} minutes</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-sm">{meeting.location}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Attendees ({meeting.attendees.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {meeting.attendees.slice(0, 3).map((attendee, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {attendee}
                        </Badge>
                      ))}
                      {meeting.attendees.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{meeting.attendees.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  {meeting.actionItems.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-500">Action Items: {meeting.actionItems.length}</p>
                      <div className="flex gap-1 mt-1">
                        {meeting.actionItems.map((item) => (
                          <Badge key={item.id} className={getStatusColor(item.status)}>
                            {item.status.toUpperCase()}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Initiative Details Modal */}
      <Dialog open={isInitiativeModalOpen} onOpenChange={setIsInitiativeModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Initiative Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedInitiative?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedInitiative && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="kpis">KPIs</TabsTrigger>
                <TabsTrigger value="partners">Partners</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>JV Name</Label>
                    <p className="text-sm font-medium">{selectedInitiative.jvName}</p>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Badge className={getTypeColor(selectedInitiative.type)}>
                      {selectedInitiative.type.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedInitiative.status)}>
                      {selectedInitiative.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedInitiative.priority)}>
                      {selectedInitiative.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedInitiative.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedInitiative.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Coordinator</Label>
                    <p className="text-sm font-medium">{selectedInitiative.coordinator}</p>
                  </div>
                  <div>
                    <Label>Beneficiaries</Label>
                    <p className="text-sm font-medium">{selectedInitiative.beneficiaries} / {selectedInitiative.targetBeneficiaries}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedInitiative.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Budget Utilization</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Spent: ${(selectedInitiative.spent / 1000).toFixed(0)}K</span>
                        <span>Budget: ${(selectedInitiative.budget / 1000).toFixed(0)}K</span>
                      </div>
                      <Progress value={(selectedInitiative.spent / selectedInitiative.budget) * 100} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Progress</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion</span>
                        <span>{selectedInitiative.progress}%</span>
                      </div>
                      <Progress value={selectedInitiative.progress} className="h-3" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="milestones" className="space-y-4">
                <div className="space-y-3">
                  {selectedInitiative.milestones.map((milestone) => (
                    <div key={milestone.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{milestone.title}</h4>
                        <Badge className={getStatusColor(milestone.status)}>
                          {milestone.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{milestone.description}</p>
                      <div className="text-sm">
                        <span className="text-gray-500">Due Date: </span>
                        <span className="font-medium">{new Date(milestone.dueDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="kpis" className="space-y-4">
                <div className="space-y-4">
                  {selectedInitiative.kpis.map((kpi) => (
                    <div key={kpi.id} className="p-4 border rounded">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{kpi.metric}</h4>
                        <span className="text-sm font-semibold">
                          {kpi.current}{kpi.unit} / {kpi.target}{kpi.unit}
                        </span>
                      </div>
                      <Progress value={(kpi.current / kpi.target) * 100} className="h-3" />
                      <div className="text-xs text-gray-500 mt-1">
                        Achievement: {((kpi.current / kpi.target) * 100).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="partners" className="space-y-4">
                <div className="space-y-2">
                  {selectedInitiative.partners.map((partner, index) => (
                    <div key={index} className="flex items-center p-3 border rounded">
                      <UsersIcon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="font-medium">{partner}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-2">
                  {selectedInitiative.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">{doc.type} • {new Date(doc.uploadDate).toLocaleDateString()}</p>
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

      {/* Meeting Details Modal */}
      <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Meeting Details</DialogTitle>
            <DialogDescription>
              Information for {selectedMeeting?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedMeeting && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Meeting Type</Label>
                  <Badge className={getTypeColor(selectedMeeting.type)}>
                    {selectedMeeting.type.replace('-', ' ').toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>Status</Label>
                  <Badge className={getStatusColor(selectedMeeting.status)}>
                    {selectedMeeting.status.toUpperCase()}
                  </Badge>
                </div>
                <div>
                  <Label>Date & Time</Label>
                  <p className="text-sm font-medium">
                    {new Date(selectedMeeting.date).toLocaleDateString()} at {selectedMeeting.time}
                  </p>
                </div>
                <div>
                  <Label>Duration</Label>
                  <p className="text-sm font-medium">{selectedMeeting.duration} minutes</p>
                </div>
                <div>
                  <Label>Organizer</Label>
                  <p className="text-sm font-medium">{selectedMeeting.organizer}</p>
                </div>
                <div>
                  <Label>Location</Label>
                  <p className="text-sm font-medium">{selectedMeeting.location}</p>
                </div>
              </div>
              <div>
                <Label>Attendees ({selectedMeeting.attendees.length})</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedMeeting.attendees.map((attendee, index) => (
                    <Badge key={index} variant="outline">
                      {attendee}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <Label>Agenda</Label>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  {selectedMeeting.agenda.map((item, index) => (
                    <li key={index} className="text-sm">{item}</li>
                  ))}
                </ul>
              </div>
              {selectedMeeting.notes && (
                <div>
                  <Label>Notes</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedMeeting.notes}</p>
                </div>
              )}
              {selectedMeeting.actionItems.length > 0 && (
                <div>
                  <Label>Action Items ({selectedMeeting.actionItems.length})</Label>
                  <div className="space-y-2 mt-2">
                    {selectedMeeting.actionItems.map((item) => (
                      <div key={item.id} className="p-3 border rounded">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-medium text-sm">{item.action}</p>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Assignee: </span>
                            <span className="font-medium">{item.assignee}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Due: </span>
                            <span className="font-medium">{new Date(item.dueDate).toLocaleDateString()}</span>
                          </div>
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