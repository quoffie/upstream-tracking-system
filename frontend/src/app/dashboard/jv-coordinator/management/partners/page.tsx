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
import { UsersIcon, BuildingOfficeIcon, CalendarIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, PhoneIcon, EnvelopeIcon, GlobeAltIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface Partner {
  id: string;
  name: string;
  country: string;
  type: 'local' | 'international' | 'government';
  status: 'active' | 'inactive' | 'pending';
  equityShare: number;
  role: string;
  contactPerson: {
    name: string;
    position: string;
    email: string;
    phone: string;
  };
  address: {
    street: string;
    city: string;
    country: string;
    postalCode: string;
  };
  joinedDate: string;
  lastContact: string;
  nextMeeting: string;
  jvs: string[];
  performance: {
    commitmentFulfillment: number;
    communicationRating: number;
    complianceScore: number;
    overallRating: number;
  };
  documents: {
    id: string;
    name: string;
    type: string;
    uploadDate: string;
    status: 'valid' | 'expired' | 'pending';
  }[];
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'board-meeting' | 'coordination' | 'review' | 'planning';
  status: 'scheduled' | 'completed' | 'cancelled';
  participants: string[];
  agenda: string;
  location: string;
  notes?: string;
}

const mockPartners: Partner[] = [
  {
    id: 'P001',
    name: 'Ghana National Petroleum Corporation',
    country: 'Ghana',
    type: 'government',
    status: 'active',
    equityShare: 35,
    role: 'Lead Partner',
    contactPerson: {
      name: 'Dr. Kwame Asante',
      position: 'Director of Operations',
      email: 'k.asante@gnpc.gov.gh',
      phone: '+233-302-665544'
    },
    address: {
      street: '42 Independence Avenue',
      city: 'Accra',
      country: 'Ghana',
      postalCode: 'GA-039-5028'
    },
    joinedDate: '2024-01-15',
    lastContact: '2024-03-10',
    nextMeeting: '2024-04-15',
    jvs: ['Offshore Drilling Consortium', 'Gas Processing Alliance'],
    performance: {
      commitmentFulfillment: 92,
      communicationRating: 88,
      complianceScore: 95,
      overallRating: 92
    },
    documents: [
      { id: 'D001', name: 'Partnership Agreement', type: 'Legal', uploadDate: '2024-01-15', status: 'valid' },
      { id: 'D002', name: 'Compliance Certificate', type: 'Compliance', uploadDate: '2024-02-01', status: 'valid' },
      { id: 'D003', name: 'Financial Statement', type: 'Financial', uploadDate: '2024-01-01', status: 'expired' }
    ]
  },
  {
    id: 'P002',
    name: 'TotalEnergies EP Ghana',
    country: 'France',
    type: 'international',
    status: 'active',
    equityShare: 40,
    role: 'Operating Partner',
    contactPerson: {
      name: 'Marie Dubois',
      position: 'Country Manager',
      email: 'm.dubois@totalenergies.com',
      phone: '+233-302-123456'
    },
    address: {
      street: 'Ridge Tower, West Ridge',
      city: 'Accra',
      country: 'Ghana',
      postalCode: 'GA-187-4521'
    },
    joinedDate: '2024-01-15',
    lastContact: '2024-03-12',
    nextMeeting: '2024-04-20',
    jvs: ['Offshore Drilling Consortium'],
    performance: {
      commitmentFulfillment: 95,
      communicationRating: 92,
      complianceScore: 88,
      overallRating: 92
    },
    documents: [
      { id: 'D004', name: 'Operating Agreement', type: 'Legal', uploadDate: '2024-01-15', status: 'valid' },
      { id: 'D005', name: 'Technical Specifications', type: 'Technical', uploadDate: '2024-02-15', status: 'valid' },
      { id: 'D006', name: 'Insurance Certificate', type: 'Insurance', uploadDate: '2024-01-20', status: 'pending' }
    ]
  },
  {
    id: 'P003',
    name: 'Eni Ghana Exploration',
    country: 'Italy',
    type: 'international',
    status: 'active',
    equityShare: 25,
    role: 'Technical Partner',
    contactPerson: {
      name: 'Giuseppe Romano',
      position: 'Operations Director',
      email: 'g.romano@eni.com',
      phone: '+233-302-789012'
    },
    address: {
      street: 'Airport City, Accra',
      city: 'Accra',
      country: 'Ghana',
      postalCode: 'GA-234-7890'
    },
    joinedDate: '2024-01-15',
    lastContact: '2024-03-08',
    nextMeeting: '2024-04-18',
    jvs: ['Offshore Drilling Consortium'],
    performance: {
      commitmentFulfillment: 88,
      communicationRating: 85,
      complianceScore: 90,
      overallRating: 88
    },
    documents: [
      { id: 'D007', name: 'Technical Partnership Agreement', type: 'Legal', uploadDate: '2024-01-15', status: 'valid' },
      { id: 'D008', name: 'Environmental Compliance', type: 'Environmental', uploadDate: '2024-02-10', status: 'valid' }
    ]
  }
];

const mockMeetings: Meeting[] = [
  {
    id: 'M001',
    title: 'Quarterly Board Meeting',
    date: '2024-04-15',
    time: '10:00',
    type: 'board-meeting',
    status: 'scheduled',
    participants: ['P001', 'P002', 'P003'],
    agenda: 'Review Q1 performance, discuss upcoming projects, approve budget allocations',
    location: 'GNPC Headquarters, Accra'
  },
  {
    id: 'M002',
    title: 'Technical Coordination Meeting',
    date: '2024-04-20',
    time: '14:00',
    type: 'coordination',
    status: 'scheduled',
    participants: ['P002', 'P003'],
    agenda: 'Discuss technical specifications for new drilling operations',
    location: 'TotalEnergies Office, Accra'
  },
  {
    id: 'M003',
    title: 'Compliance Review Session',
    date: '2024-03-15',
    time: '09:00',
    type: 'review',
    status: 'completed',
    participants: ['P001', 'P002', 'P003'],
    agenda: 'Review compliance status and address any issues',
    location: 'Virtual Meeting',
    notes: 'All partners meeting compliance requirements. Minor documentation updates needed.'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case 'local': return 'bg-blue-100 text-blue-800';
    case 'international': return 'bg-purple-100 text-purple-800';
    case 'government': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getMeetingStatusColor = (status: string) => {
  switch (status) {
    case 'scheduled': return 'bg-blue-100 text-blue-800';
    case 'completed': return 'bg-green-100 text-green-800';
    case 'cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function PartnerCoordinationPage() {
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isPartnerModalOpen, setIsPartnerModalOpen] = useState(false);
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [newMeeting, setNewMeeting] = useState<Partial<Meeting>>({
    title: '',
    date: '',
    time: '',
    type: 'coordination',
    participants: [],
    agenda: '',
    location: ''
  });

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    const matchesType = typeFilter === 'all' || partner.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleViewPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsPartnerModalOpen(true);
  };

  const handleScheduleMeeting = () => {
    if (newMeeting.title && newMeeting.date && newMeeting.time) {
      const meeting: Meeting = {
        id: `M${String(meetings.length + 1).padStart(3, '0')}`,
        title: newMeeting.title!,
        date: newMeeting.date!,
        time: newMeeting.time!,
        type: newMeeting.type as Meeting['type'],
        status: 'scheduled',
        participants: newMeeting.participants || [],
        agenda: newMeeting.agenda || '',
        location: newMeeting.location || ''
      };
      setMeetings([...meetings, meeting]);
      setNewMeeting({
        title: '',
        date: '',
        time: '',
        type: 'coordination',
        participants: [],
        agenda: '',
        location: ''
      });
      setIsMeetingModalOpen(false);
      toast.success('Meeting scheduled successfully');
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const upcomingMeetings = meetings.filter(m => m.status === 'scheduled' && new Date(m.date) >= new Date());
  const totalPartners = partners.length;
  const activePartners = partners.filter(p => p.status === 'active').length;
  const averagePerformance = partners.reduce((sum, p) => sum + p.performance.overallRating, 0) / partners.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Partner Coordination</h1>
          <p className="text-gray-600">Manage relationships and coordination with JV partners</p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => setIsMeetingModalOpen(true)}
            className="flex items-center gap-2"
          >
            <CalendarIcon className="h-4 w-4" />
            Schedule Meeting
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Add Partner
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPartners}</div>
            <p className="text-xs text-muted-foreground">Across all JVs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <BuildingOfficeIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activePartners}</div>
            <p className="text-xs text-muted-foreground">Currently engaged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Meetings</CardTitle>
            <CalendarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{upcomingMeetings.length}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Performance</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averagePerformance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Partners</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by partner name or contact..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="local">Local</SelectItem>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="government">Government</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Partners List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Partners</h2>
          {filteredPartners.map((partner) => (
            <Card key={partner.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {partner.name}
                      <Badge className={getStatusColor(partner.status)}>
                        {partner.status.toUpperCase()}
                      </Badge>
                      <Badge className={getTypeColor(partner.type)}>
                        {partner.type.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {partner.role} • {partner.equityShare}% equity • {partner.country}
                    </CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewPartner(partner)}
                  >
                    View Details
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                    <span>{partner.contactPerson.name} - {partner.contactPerson.position}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <PhoneIcon className="h-4 w-4 text-gray-400" />
                    <span>{partner.contactPerson.phone}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-xs text-gray-500">Performance Rating</p>
                      <p className="font-semibold">{partner.performance.overallRating}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Last Contact</p>
                      <p className="font-semibold">{new Date(partner.lastContact).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Meetings */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Meetings</h2>
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {meeting.title}
                      <Badge className={getMeetingStatusColor(meeting.status)}>
                        {meeting.status.toUpperCase()}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {new Date(meeting.date).toLocaleDateString()} at {meeting.time} • {meeting.location}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium">Participants:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {meeting.participants.map((participantId) => {
                        const participant = partners.find(p => p.id === participantId);
                        return participant ? (
                          <Badge key={participantId} variant="outline" className="text-xs">
                            {participant.name.split(' ')[0]}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Agenda:</p>
                    <p className="text-sm text-gray-600">{meeting.agenda}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Partner Details Modal */}
      <Dialog open={isPartnerModalOpen} onOpenChange={setIsPartnerModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Partner Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedPartner?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Company Name</Label>
                    <p className="text-sm font-medium">{selectedPartner.name}</p>
                  </div>
                  <div>
                    <Label>Country</Label>
                    <p className="text-sm">{selectedPartner.country}</p>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Badge className={getTypeColor(selectedPartner.type)}>
                      {selectedPartner.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedPartner.status)}>
                      {selectedPartner.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <p className="text-sm">{selectedPartner.role}</p>
                  </div>
                  <div>
                    <Label>Equity Share</Label>
                    <p className="text-sm font-semibold">{selectedPartner.equityShare}%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label>Contact Person</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded">
                      <p className="font-medium">{selectedPartner.contactPerson.name}</p>
                      <p className="text-sm text-gray-600">{selectedPartner.contactPerson.position}</p>
                      <p className="text-sm">{selectedPartner.contactPerson.email}</p>
                      <p className="text-sm">{selectedPartner.contactPerson.phone}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Address</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded">
                      <p className="text-sm">{selectedPartner.address.street}</p>
                      <p className="text-sm">{selectedPartner.address.city}, {selectedPartner.address.postalCode}</p>
                      <p className="text-sm">{selectedPartner.address.country}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Commitment Fulfillment</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedPartner.performance.commitmentFulfillment}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-blue-500 rounded-full"
                          style={{ width: `${selectedPartner.performance.commitmentFulfillment}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Communication Rating</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedPartner.performance.communicationRating}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-green-500 rounded-full"
                          style={{ width: `${selectedPartner.performance.communicationRating}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Compliance Score</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedPartner.performance.complianceScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-purple-500 rounded-full"
                          style={{ width: `${selectedPartner.performance.complianceScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label>Overall Rating</Label>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{selectedPartner.performance.overallRating}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="h-2 bg-orange-500 rounded-full"
                          style={{ width: `${selectedPartner.performance.overallRating}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="documents" className="space-y-4">
                <div className="space-y-2">
                  {selectedPartner.documents.map((doc) => (
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
              </TabsContent>
              <TabsContent value="communication" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Last Contact</Label>
                    <p className="text-sm font-medium">{new Date(selectedPartner.lastContact).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Next Meeting</Label>
                    <p className="text-sm font-medium">{new Date(selectedPartner.nextMeeting).toLocaleDateString()}</p>
                  </div>
                </div>
                <div>
                  <Label>Joint Ventures</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedPartner.jvs.map((jv, index) => (
                      <Badge key={index} variant="outline">{jv}</Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Schedule Meeting Modal */}
      <Dialog open={isMeetingModalOpen} onOpenChange={setIsMeetingModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule New Meeting</DialogTitle>
            <DialogDescription>
              Create a new meeting with partners
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Meeting Title</Label>
              <Input
                id="title"
                value={newMeeting.title || ''}
                onChange={(e) => setNewMeeting({ ...newMeeting, title: e.target.value })}
                placeholder="Enter meeting title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newMeeting.date || ''}
                  onChange={(e) => setNewMeeting({ ...newMeeting, date: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={newMeeting.time || ''}
                  onChange={(e) => setNewMeeting({ ...newMeeting, time: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="type">Meeting Type</Label>
              <Select value={newMeeting.type} onValueChange={(value) => setNewMeeting({ ...newMeeting, type: value as Meeting['type'] })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="board-meeting">Board Meeting</SelectItem>
                  <SelectItem value="coordination">Coordination</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="planning">Planning</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={newMeeting.location || ''}
                onChange={(e) => setNewMeeting({ ...newMeeting, location: e.target.value })}
                placeholder="Meeting location"
              />
            </div>
            <div>
              <Label htmlFor="agenda">Agenda</Label>
              <Textarea
                id="agenda"
                value={newMeeting.agenda || ''}
                onChange={(e) => setNewMeeting({ ...newMeeting, agenda: e.target.value })}
                placeholder="Meeting agenda and topics"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsMeetingModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleMeeting}>
                Schedule Meeting
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}