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
import { AcademicCapIcon, UsersIcon, ArrowTrendingUpIcon, CalendarIcon, DocumentTextIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface TrainingProgram {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'safety' | 'management' | 'soft-skills' | 'certification';
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  status: 'planning' | 'active' | 'completed' | 'suspended' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startDate: string;
  endDate: string;
  duration: number; // in hours
  budget: number;
  spent: number;
  progress: number;
  instructor: string;
  location: string;
  maxParticipants: number;
  enrolledParticipants: number;
  completedParticipants: number;
  passRate: number;
  rating: number;
  jvPartner: string;
  prerequisites: string[];
  learningObjectives: string[];
  modules: {
    id: string;
    title: string;
    duration: number;
    status: 'pending' | 'in-progress' | 'completed';
    completionRate: number;
  }[];
  assessments: {
    id: string;
    type: 'quiz' | 'practical' | 'project' | 'exam';
    title: string;
    passingScore: number;
    averageScore: number;
    completionRate: number;
  }[];
  resources: {
    id: string;
    name: string;
    type: 'document' | 'video' | 'presentation' | 'software';
    url?: string;
  }[];
  feedback: {
    id: string;
    participant: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

interface Participant {
  id: string;
  name: string;
  email: string;
  company: string;
  department: string;
  position: string;
  experience: number;
  enrollmentDate: string;
  status: 'enrolled' | 'active' | 'completed' | 'dropped' | 'suspended';
  progress: number;
  attendance: number;
  assessmentScores: {
    assessmentId: string;
    score: number;
    passed: boolean;
  }[];
  certificateIssued: boolean;
  certificateDate?: string;
}

const mockPrograms: TrainingProgram[] = [
  {
    id: 'TP001',
    title: 'Advanced Offshore Drilling Techniques',
    description: 'Comprehensive training program covering advanced drilling techniques, equipment operation, and safety protocols for offshore operations',
    category: 'technical',
    level: 'advanced',
    status: 'active',
    priority: 'high',
    startDate: '2024-02-01',
    endDate: '2024-06-30',
    duration: 120,
    budget: 150000,
    spent: 85000,
    progress: 65,
    instructor: 'Dr. Kwame Asante',
    location: 'Offshore Training Center, Takoradi',
    maxParticipants: 25,
    enrolledParticipants: 23,
    completedParticipants: 8,
    passRate: 87.5,
    rating: 4.6,
    jvPartner: 'Offshore Drilling Consortium',
    prerequisites: ['Basic Drilling Certification', '2+ years offshore experience', 'Safety Training Level 2'],
    learningObjectives: [
      'Master advanced drilling techniques and equipment operation',
      'Understand complex geological formations and drilling challenges',
      'Implement safety protocols and emergency procedures',
      'Optimize drilling performance and efficiency'
    ],
    modules: [
      {
        id: 'M001',
        title: 'Advanced Drilling Theory',
        duration: 24,
        status: 'completed',
        completionRate: 100
      },
      {
        id: 'M002',
        title: 'Equipment Operation & Maintenance',
        duration: 32,
        status: 'in-progress',
        completionRate: 75
      },
      {
        id: 'M003',
        title: 'Safety & Emergency Procedures',
        duration: 28,
        status: 'pending',
        completionRate: 0
      },
      {
        id: 'M004',
        title: 'Practical Field Training',
        duration: 36,
        status: 'pending',
        completionRate: 0
      }
    ],
    assessments: [
      {
        id: 'A001',
        type: 'quiz',
        title: 'Drilling Theory Assessment',
        passingScore: 80,
        averageScore: 85.2,
        completionRate: 100
      },
      {
        id: 'A002',
        type: 'practical',
        title: 'Equipment Operation Test',
        passingScore: 75,
        averageScore: 78.5,
        completionRate: 75
      },
      {
        id: 'A003',
        type: 'exam',
        title: 'Final Certification Exam',
        passingScore: 80,
        averageScore: 0,
        completionRate: 0
      }
    ],
    resources: [
      {
        id: 'R001',
        name: 'Drilling Operations Manual',
        type: 'document',
        url: '/resources/drilling-manual.pdf'
      },
      {
        id: 'R002',
        name: 'Equipment Operation Videos',
        type: 'video',
        url: '/resources/equipment-videos'
      },
      {
        id: 'R003',
        name: 'Safety Protocols Presentation',
        type: 'presentation',
        url: '/resources/safety-protocols.pptx'
      }
    ],
    feedback: [
      {
        id: 'F001',
        participant: 'John Mensah',
        rating: 5,
        comment: 'Excellent program with practical hands-on experience. The instructor is very knowledgeable.',
        date: '2024-03-15'
      },
      {
        id: 'F002',
        participant: 'Ama Osei',
        rating: 4,
        comment: 'Good content but could use more practical exercises. Overall very informative.',
        date: '2024-03-20'
      }
    ]
  },
  {
    id: 'TP002',
    title: 'Gas Processing Technology Transfer',
    description: 'Technology transfer program focusing on modern gas processing techniques and equipment',
    category: 'technical',
    level: 'intermediate',
    status: 'planning',
    priority: 'medium',
    startDate: '2024-05-01',
    endDate: '2024-09-30',
    duration: 80,
    budget: 120000,
    spent: 15000,
    progress: 20,
    instructor: 'Eng. Ama Darko',
    location: 'Gas Processing Facility, Tema',
    maxParticipants: 20,
    enrolledParticipants: 18,
    completedParticipants: 0,
    passRate: 0,
    rating: 0,
    jvPartner: 'Gas Processing Alliance',
    prerequisites: ['Chemical Engineering Background', 'Basic Process Control Knowledge'],
    learningObjectives: [
      'Understand gas processing fundamentals',
      'Learn modern processing technologies',
      'Master process control systems',
      'Implement quality control measures'
    ],
    modules: [
      {
        id: 'M005',
        title: 'Gas Processing Fundamentals',
        duration: 20,
        status: 'pending',
        completionRate: 0
      },
      {
        id: 'M006',
        title: 'Modern Processing Technologies',
        duration: 24,
        status: 'pending',
        completionRate: 0
      },
      {
        id: 'M007',
        title: 'Process Control Systems',
        duration: 20,
        status: 'pending',
        completionRate: 0
      },
      {
        id: 'M008',
        title: 'Quality Control & Testing',
        duration: 16,
        status: 'pending',
        completionRate: 0
      }
    ],
    assessments: [
      {
        id: 'A004',
        type: 'quiz',
        title: 'Fundamentals Quiz',
        passingScore: 75,
        averageScore: 0,
        completionRate: 0
      },
      {
        id: 'A005',
        type: 'project',
        title: 'Process Design Project',
        passingScore: 80,
        averageScore: 0,
        completionRate: 0
      }
    ],
    resources: [
      {
        id: 'R004',
        name: 'Gas Processing Handbook',
        type: 'document'
      },
      {
        id: 'R005',
        name: 'Process Simulation Software',
        type: 'software'
      }
    ],
    feedback: []
  },
  {
    id: 'TP003',
    title: 'Leadership Development for Local Managers',
    description: 'Management and leadership skills development program for local staff in supervisory roles',
    category: 'management',
    level: 'intermediate',
    status: 'completed',
    priority: 'medium',
    startDate: '2023-10-01',
    endDate: '2024-01-31',
    duration: 60,
    budget: 80000,
    spent: 78000,
    progress: 100,
    instructor: 'Prof. Nana Agyeman',
    location: 'Management Training Center, Accra',
    maxParticipants: 30,
    enrolledParticipants: 28,
    completedParticipants: 26,
    passRate: 92.9,
    rating: 4.8,
    jvPartner: 'Multiple JV Partners',
    prerequisites: ['Supervisory Experience', 'Basic Management Training'],
    learningObjectives: [
      'Develop effective leadership skills',
      'Master team management techniques',
      'Understand strategic planning',
      'Improve communication and decision-making'
    ],
    modules: [
      {
        id: 'M009',
        title: 'Leadership Fundamentals',
        duration: 15,
        status: 'completed',
        completionRate: 100
      },
      {
        id: 'M010',
        title: 'Team Management',
        duration: 15,
        status: 'completed',
        completionRate: 100
      },
      {
        id: 'M011',
        title: 'Strategic Planning',
        duration: 15,
        status: 'completed',
        completionRate: 100
      },
      {
        id: 'M012',
        title: 'Communication & Decision Making',
        duration: 15,
        status: 'completed',
        completionRate: 100
      }
    ],
    assessments: [
      {
        id: 'A006',
        type: 'project',
        title: 'Leadership Case Study',
        passingScore: 75,
        averageScore: 82.4,
        completionRate: 100
      },
      {
        id: 'A007',
        type: 'exam',
        title: 'Management Principles Exam',
        passingScore: 80,
        averageScore: 85.7,
        completionRate: 100
      }
    ],
    resources: [
      {
        id: 'R006',
        name: 'Leadership Handbook',
        type: 'document'
      },
      {
        id: 'R007',
        name: 'Case Study Collection',
        type: 'document'
      }
    ],
    feedback: [
      {
        id: 'F003',
        participant: 'Kofi Asante',
        rating: 5,
        comment: 'Transformative program that significantly improved my leadership capabilities.',
        date: '2024-02-05'
      },
      {
        id: 'F004',
        participant: 'Akosua Mensah',
        rating: 5,
        comment: 'Excellent facilitator and very practical content. Highly recommend.',
        date: '2024-02-10'
      }
    ]
  }
];

const mockParticipants: Participant[] = [
  {
    id: 'P001',
    name: 'John Mensah',
    email: 'john.mensah@company.com',
    company: 'Ghana Offshore Services',
    department: 'Drilling Operations',
    position: 'Senior Drilling Engineer',
    experience: 8,
    enrollmentDate: '2024-01-25',
    status: 'active',
    progress: 75,
    attendance: 95,
    assessmentScores: [
      { assessmentId: 'A001', score: 88, passed: true },
      { assessmentId: 'A002', score: 82, passed: true }
    ],
    certificateIssued: false
  },
  {
    id: 'P002',
    name: 'Ama Osei',
    email: 'ama.osei@company.com',
    company: 'Local Energy Solutions',
    department: 'Engineering',
    position: 'Process Engineer',
    experience: 5,
    enrollmentDate: '2024-01-28',
    status: 'active',
    progress: 70,
    attendance: 88,
    assessmentScores: [
      { assessmentId: 'A001', score: 85, passed: true },
      { assessmentId: 'A002', score: 76, passed: true }
    ],
    certificateIssued: false
  },
  {
    id: 'P003',
    name: 'Kofi Asante',
    email: 'kofi.asante@company.com',
    company: 'Ghana Maritime Services',
    department: 'Operations',
    position: 'Operations Manager',
    experience: 12,
    enrollmentDate: '2023-09-15',
    status: 'completed',
    progress: 100,
    attendance: 100,
    assessmentScores: [
      { assessmentId: 'A006', score: 85, passed: true },
      { assessmentId: 'A007', score: 88, passed: true }
    ],
    certificateIssued: true,
    certificateDate: '2024-02-15'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': case 'completed': case 'enrolled': return 'bg-green-100 text-green-800';
    case 'planning': case 'pending': case 'in-progress': return 'bg-blue-100 text-blue-800';
    case 'suspended': case 'dropped': return 'bg-yellow-100 text-yellow-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
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
    case 'technical': return 'bg-blue-100 text-blue-800';
    case 'safety': return 'bg-red-100 text-red-800';
    case 'management': return 'bg-purple-100 text-purple-800';
    case 'soft-skills': return 'bg-green-100 text-green-800';
    case 'certification': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getLevelColor = (level: string) => {
  switch (level) {
    case 'beginner': return 'bg-green-100 text-green-800';
    case 'intermediate': return 'bg-yellow-100 text-yellow-800';
    case 'advanced': return 'bg-orange-100 text-orange-800';
    case 'expert': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function TrainingProgramsPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>(mockPrograms);
  const [participants, setParticipants] = useState<Participant[]>(mockParticipants);
  const [selectedProgram, setSelectedProgram] = useState<TrainingProgram | null>(null);
  const [isProgramModalOpen, setIsProgramModalOpen] = useState(false);
  const [isNewProgramModalOpen, setIsNewProgramModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const filteredPrograms = programs.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.jvPartner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || program.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || program.category === categoryFilter;
    const matchesLevel = levelFilter === 'all' || program.level === levelFilter;
    return matchesSearch && matchesStatus && matchesCategory && matchesLevel;
  });

  const handleViewProgram = (program: TrainingProgram) => {
    setSelectedProgram(program);
    setIsProgramModalOpen(true);
  };

  const handleCreateProgram = () => {
    setIsNewProgramModalOpen(true);
  };

  const handleUpdateProgress = (programId: string, newProgress: number) => {
    setPrograms(items => 
      items.map(item => 
        item.id === programId ? { ...item, progress: newProgress } : item
      )
    );
    toast.success('Program progress updated successfully');
  };

  // Calculate summary statistics
  const totalPrograms = programs.length;
  const activePrograms = programs.filter(p => p.status === 'active').length;
  const completedPrograms = programs.filter(p => p.status === 'completed').length;
  const totalParticipants = programs.reduce((sum, p) => sum + p.enrolledParticipants, 0);
  const totalBudget = programs.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = programs.reduce((sum, p) => sum + p.spent, 0);
  const averageRating = programs.filter(p => p.rating > 0).reduce((sum, p) => sum + p.rating, 0) / programs.filter(p => p.rating > 0).length;
  const averagePassRate = programs.filter(p => p.passRate > 0).reduce((sum, p) => sum + p.passRate, 0) / programs.filter(p => p.passRate > 0).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Training Programs</h1>
          <p className="text-gray-600">Manage local content training programs and participant development</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateProgram} className="flex items-center gap-2">
            <AcademicCapIcon className="h-4 w-4" />
            New Program
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Manage Participants
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programs</CardTitle>
            <AcademicCapIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrograms}</div>
            <p className="text-xs text-muted-foreground">All programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activePrograms}</div>
            <p className="text-xs text-muted-foreground">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{completedPrograms}</div>
            <p className="text-xs text-muted-foreground">Finished programs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <UsersIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{totalParticipants}</div>
            <p className="text-xs text-muted-foreground">Total enrolled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${(totalBudget / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">Total allocated</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Spent</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${(totalSpent / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">{((totalSpent / totalBudget) * 100).toFixed(1)}% used</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Out of 5.0</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pass Rate</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-600">{averagePassRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Average success</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Programs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by title, instructor, or JV partner..."
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
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="safety">Safety</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="soft-skills">Soft Skills</SelectItem>
                <SelectItem value="certification">Certification</SelectItem>
              </SelectContent>
            </Select>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Programs List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPrograms.map((program) => (
          <Card key={program.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    {program.title}
                    <Badge className={getStatusColor(program.status)}>
                      {program.status.toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 flex-wrap">
                    <Badge className={getCategoryColor(program.category)}>
                      {program.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getLevelColor(program.level)}>
                      {program.level.toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(program.priority)}>
                      {program.priority.toUpperCase()}
                    </Badge>
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewProgram(program)}
                >
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-gray-600">{program.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Instructor</p>
                    <p className="font-semibold text-sm">{program.instructor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">JV Partner</p>
                    <p className="font-semibold text-sm">{program.jvPartner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="font-semibold text-sm flex items-center gap-1">
                      <ClockIcon className="h-3 w-3" />
                      {program.duration}h
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="font-semibold text-sm">{program.location}</p>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>{program.progress}%</span>
                  </div>
                  <Progress value={program.progress} className="h-2" />
                </div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Enrolled</p>
                    <p className="font-semibold">{program.enrolledParticipants}/{program.maxParticipants}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Completed</p>
                    <p className="font-semibold">{program.completedParticipants}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Pass Rate</p>
                    <p className="font-semibold">{program.passRate > 0 ? `${program.passRate.toFixed(1)}%` : 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Rating</p>
                    <p className="font-semibold">{program.rating > 0 ? `${program.rating.toFixed(1)}/5` : 'N/A'}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="font-semibold text-sm">${(program.budget / 1000).toFixed(0)}K</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Spent</p>
                    <p className="font-semibold text-sm">${(program.spent / 1000).toFixed(0)}K ({((program.spent / program.budget) * 100).toFixed(1)}%)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Program Details Modal */}
      <Dialog open={isProgramModalOpen} onOpenChange={setIsProgramModalOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Program Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedProgram?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedProgram && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="modules">Modules</TabsTrigger>
                <TabsTrigger value="assessments">Assessments</TabsTrigger>
                <TabsTrigger value="participants">Participants</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
                <TabsTrigger value="feedback">Feedback</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Badge className={getCategoryColor(selectedProgram.category)}>
                      {selectedProgram.category.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Level</Label>
                    <Badge className={getLevelColor(selectedProgram.level)}>
                      {selectedProgram.level.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedProgram.status)}>
                      {selectedProgram.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedProgram.priority)}>
                      {selectedProgram.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Start Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedProgram.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>End Date</Label>
                    <p className="text-sm font-medium">{new Date(selectedProgram.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Duration</Label>
                    <p className="text-sm font-medium">{selectedProgram.duration} hours</p>
                  </div>
                  <div>
                    <Label>Instructor</Label>
                    <p className="text-sm font-medium">{selectedProgram.instructor}</p>
                  </div>
                  <div>
                    <Label>Location</Label>
                    <p className="text-sm font-medium">{selectedProgram.location}</p>
                  </div>
                  <div>
                    <Label>JV Partner</Label>
                    <p className="text-sm font-medium">{selectedProgram.jvPartner}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm mt-2 p-3 bg-gray-50 rounded">{selectedProgram.description}</p>
                </div>
                <div>
                  <Label>Prerequisites</Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {selectedProgram.prerequisites.map((prereq, index) => (
                      <li key={index} className="text-sm">{prereq}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Label>Learning Objectives</Label>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    {selectedProgram.learningObjectives.map((objective, index) => (
                      <li key={index} className="text-sm">{objective}</li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Budget Utilization</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Spent: ${(selectedProgram.spent / 1000).toFixed(0)}K</span>
                        <span>Budget: ${(selectedProgram.budget / 1000).toFixed(0)}K</span>
                      </div>
                      <Progress value={(selectedProgram.spent / selectedProgram.budget) * 100} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Enrollment</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Enrolled: {selectedProgram.enrolledParticipants}</span>
                        <span>Max: {selectedProgram.maxParticipants}</span>
                      </div>
                      <Progress value={(selectedProgram.enrolledParticipants / selectedProgram.maxParticipants) * 100} className="h-3" />
                    </div>
                  </div>
                  <div>
                    <Label>Progress</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Completion</span>
                        <span>{selectedProgram.progress}%</span>
                      </div>
                      <Progress value={selectedProgram.progress} className="h-3" />
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="modules" className="space-y-4">
                <div className="space-y-3">
                  {selectedProgram.modules.map((module) => (
                    <div key={module.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{module.title}</h4>
                        <Badge className={getStatusColor(module.status)}>
                          {module.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Duration: </span>
                          <span className="font-medium">{module.duration} hours</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Completion: </span>
                          <span className="font-medium">{module.completionRate}%</span>
                        </div>
                      </div>
                      <Progress value={module.completionRate} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="assessments" className="space-y-4">
                <div className="space-y-3">
                  {selectedProgram.assessments.map((assessment) => (
                    <div key={assessment.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{assessment.title}</h4>
                          <Badge className={getCategoryColor(assessment.type)}>
                            {assessment.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            Avg: {assessment.averageScore > 0 ? assessment.averageScore.toFixed(1) : 'N/A'}
                          </div>
                          <div className="text-xs text-gray-500">
                            Pass: {assessment.passingScore}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Completion Rate</div>
                          <Progress value={assessment.completionRate} className="h-2" />
                          <div className="text-xs text-gray-500 mt-1">{assessment.completionRate}%</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Pass Rate</div>
                          <Progress 
                            value={assessment.averageScore > 0 ? (assessment.averageScore / assessment.passingScore) * 100 : 0} 
                            className="h-2" 
                          />
                          <div className="text-xs text-gray-500 mt-1">
                            {assessment.averageScore > 0 ? 
                              `${((assessment.averageScore / assessment.passingScore) * 100).toFixed(1)}%` : 
                              'N/A'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="participants" className="space-y-4">
                <div className="space-y-2">
                  {participants.filter(p => 
                    selectedProgram.id === 'TP001' && ['P001', 'P002'].includes(p.id) ||
                    selectedProgram.id === 'TP003' && p.id === 'P003'
                  ).map((participant) => (
                    <div key={participant.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{participant.name}</h4>
                          <p className="text-sm text-gray-600">{participant.position} at {participant.company}</p>
                        </div>
                        <Badge className={getStatusColor(participant.status)}>
                          {participant.status.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-4 gap-4 mb-2">
                        <div className="text-sm">
                          <span className="text-gray-500">Progress: </span>
                          <span className="font-medium">{participant.progress}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Attendance: </span>
                          <span className="font-medium">{participant.attendance}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Experience: </span>
                          <span className="font-medium">{participant.experience} years</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-500">Certificate: </span>
                          <span className="font-medium">{participant.certificateIssued ? 'Issued' : 'Pending'}</span>
                        </div>
                      </div>
                      <Progress value={participant.progress} className="h-2" />
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="resources" className="space-y-4">
                <div className="space-y-2">
                  {selectedProgram.resources.map((resource) => (
                    <div key={resource.id} className="flex items-center justify-between p-3 border rounded">
                      <div className="flex items-center gap-3">
                        <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                        <div>
                          <p className="font-medium">{resource.name}</p>
                          <Badge className={getCategoryColor(resource.type)}>
                            {resource.type.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        {resource.type === 'software' ? 'Access' : 'Download'}
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full">
                  <DocumentTextIcon className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </TabsContent>
              <TabsContent value="feedback" className="space-y-4">
                <div className="space-y-3">
                  {selectedProgram.feedback.map((feedback) => (
                    <div key={feedback.id} className="p-4 border rounded">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{feedback.participant}</h4>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-500 ml-1">({feedback.rating}/5)</span>
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{new Date(feedback.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-600">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
                {selectedProgram.feedback.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    No feedback available yet
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* New Program Modal */}
      <Dialog open={isNewProgramModalOpen} onOpenChange={setIsNewProgramModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Training Program</DialogTitle>
            <DialogDescription>
              Set up a new local content training program
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Program Title</Label>
                <Input id="title" placeholder="Enter program title" />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="management">Management</SelectItem>
                    <SelectItem value="soft-skills">Soft Skills</SelectItem>
                    <SelectItem value="certification">Certification</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
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
                <Label htmlFor="instructor">Instructor</Label>
                <Input id="instructor" placeholder="Enter instructor name" />
              </div>
              <div>
                <Label htmlFor="jvPartner">JV Partner</Label>
                <Input id="jvPartner" placeholder="Enter JV partner" />
              </div>
              <div>
                <Label htmlFor="duration">Duration (hours)</Label>
                <Input id="duration" type="number" placeholder="Enter duration" />
              </div>
              <div>
                <Label htmlFor="maxParticipants">Max Participants</Label>
                <Input id="maxParticipants" type="number" placeholder="Enter max participants" />
              </div>
              <div>
                <Label htmlFor="budget">Budget ($)</Label>
                <Input id="budget" type="number" placeholder="Enter budget" />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="Enter location" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Enter program description" rows={3} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewProgramModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => {
                toast.success('Training program created successfully');
                setIsNewProgramModalOpen(false);
              }}>
                Create Program
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}