'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DocumentTextIcon, CloudArrowUpIcon, EyeIcon, DownloadIcon, CheckCircleIcon, XCircleIcon, ClockIcon, PlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface BoardResolution {
  id: string;
  jvName: string;
  resolutionType: 'formation' | 'amendment' | 'dissolution' | 'capital-increase' | 'board-appointment';
  title: string;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  status: 'pending' | 'under-review' | 'approved' | 'rejected' | 'requires-amendment';
  reviewedBy?: string;
  reviewDate?: string;
  comments?: string;
  documentUrl: string;
  documentSize: string;
  documentType: string;
  expiryDate?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}

const mockResolutions: BoardResolution[] = [
  {
    id: 'BR001',
    jvName: 'Offshore Drilling Consortium',
    resolutionType: 'formation',
    title: 'JV Formation Resolution',
    description: 'Board resolution approving the formation of joint venture for offshore drilling operations',
    uploadedBy: 'John Mensah',
    uploadDate: '2024-03-15',
    status: 'approved',
    reviewedBy: 'Sarah Johnson',
    reviewDate: '2024-03-18',
    comments: 'All requirements met. Approved for implementation.',
    documentUrl: '/documents/br001-formation.pdf',
    documentSize: '2.4 MB',
    documentType: 'PDF',
    priority: 'high'
  },
  {
    id: 'BR002',
    jvName: 'Gas Processing Alliance',
    resolutionType: 'capital-increase',
    title: 'Capital Increase Authorization',
    description: 'Resolution to authorize increase in joint venture capital from $1.5B to $2.0B',
    uploadedBy: 'Mary Asante',
    uploadDate: '2024-03-20',
    status: 'under-review',
    comments: 'Pending financial documentation review',
    documentUrl: '/documents/br002-capital.pdf',
    documentSize: '1.8 MB',
    documentType: 'PDF',
    priority: 'critical'
  },
  {
    id: 'BR003',
    jvName: 'Renewable Energy Partnership',
    resolutionType: 'board-appointment',
    title: 'Board Member Appointment',
    description: 'Resolution to appoint new board members for the renewable energy joint venture',
    uploadedBy: 'David Osei',
    uploadDate: '2024-03-22',
    status: 'requires-amendment',
    reviewedBy: 'Michael Brown',
    reviewDate: '2024-03-24',
    comments: 'Missing required signatures from two board members. Please resubmit with complete documentation.',
    documentUrl: '/documents/br003-appointment.pdf',
    documentSize: '1.2 MB',
    documentType: 'PDF',
    expiryDate: '2024-04-15',
    priority: 'medium'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'under-review': return 'bg-yellow-100 text-yellow-800';
    case 'pending': return 'bg-blue-100 text-blue-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'requires-amendment': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'bg-red-100 text-red-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'low': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved': return <CheckCircleIcon className="h-5 w-5 text-green-600" />;
    case 'rejected': return <XCircleIcon className="h-5 w-5 text-red-600" />;
    case 'under-review': case 'pending': return <ClockIcon className="h-5 w-5 text-yellow-600" />;
    case 'requires-amendment': return <DocumentTextIcon className="h-5 w-5 text-orange-600" />;
    default: return <ClockIcon className="h-5 w-5 text-gray-600" />;
  }
};

export default function BoardResolutionsPage() {
  const [resolutions, setResolutions] = useState<BoardResolution[]>(mockResolutions);
  const [selectedResolution, setSelectedResolution] = useState<BoardResolution | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');

  const filteredResolutions = resolutions.filter(resolution => {
    const matchesSearch = resolution.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resolution.jvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resolution.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || resolution.status === statusFilter;
    const matchesType = typeFilter === 'all' || resolution.resolutionType === typeFilter;
    const matchesPriority = priorityFilter === 'all' || resolution.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const handleViewResolution = (resolution: BoardResolution) => {
    setSelectedResolution(resolution);
    setIsViewModalOpen(true);
  };

  const handleDownload = (resolution: BoardResolution) => {
    toast.success(`Downloading ${resolution.title}`);
    // Simulate download
  };

  const handleStatusUpdate = (resolutionId: string, newStatus: string, comments?: string) => {
    setResolutions(prev => prev.map(res => 
      res.id === resolutionId 
        ? { 
            ...res, 
            status: newStatus as any,
            reviewedBy: 'Current User',
            reviewDate: new Date().toISOString().split('T')[0],
            comments: comments || res.comments
          }
        : res
    ));
    toast.success('Resolution status updated successfully');
  };

  // Calculate summary statistics
  const totalResolutions = resolutions.length;
  const pendingReview = resolutions.filter(r => r.status === 'under-review' || r.status === 'pending').length;
  const approved = resolutions.filter(r => r.status === 'approved').length;
  const requiresAction = resolutions.filter(r => r.status === 'requires-amendment' || r.status === 'rejected').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Board Resolution Management</h1>
          <p className="text-gray-600">Upload and manage board resolutions for joint ventures</p>
        </div>
        <Button 
          className="flex items-center gap-2"
          onClick={() => setIsUploadModalOpen(true)}
        >
          <CloudArrowUpIcon className="h-4 w-4" />
          Upload Resolution
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Resolutions</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalResolutions}</div>
            <p className="text-xs text-muted-foreground">All uploaded resolutions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <ClockIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendingReview}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircleIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{approved}</div>
            <p className="text-xs text-muted-foreground">Successfully approved</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Requires Action</CardTitle>
            <XCircleIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{requiresAction}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Resolutions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by title, JV name, or uploader..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="requires-amendment">Requires Amendment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="formation">Formation</SelectItem>
                <SelectItem value="amendment">Amendment</SelectItem>
                <SelectItem value="dissolution">Dissolution</SelectItem>
                <SelectItem value="capital-increase">Capital Increase</SelectItem>
                <SelectItem value="board-appointment">Board Appointment</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Resolutions List */}
      <div className="grid gap-6">
        {filteredResolutions.map((resolution) => (
          <Card key={resolution.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {getStatusIcon(resolution.status)}
                    <CardTitle className="text-lg">{resolution.title}</CardTitle>
                    <Badge className={getStatusColor(resolution.status)}>
                      {resolution.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getPriorityColor(resolution.priority)}>
                      {resolution.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-sm">
                    <strong>JV:</strong> {resolution.jvName} • 
                    <strong>Type:</strong> {resolution.resolutionType.replace('-', ' ')} • 
                    <strong>Size:</strong> {resolution.documentSize}
                  </CardDescription>
                  <p className="text-sm text-gray-600 mt-1">{resolution.description}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(resolution)}
                    className="flex items-center gap-1"
                  >
                    <DownloadIcon className="h-4 w-4" />
                    Download
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewResolution(resolution)}
                    className="flex items-center gap-1"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>Uploaded by: <strong>{resolution.uploadedBy}</strong></span>
                  <span>Date: {new Date(resolution.uploadDate).toLocaleDateString()}</span>
                  {resolution.expiryDate && (
                    <span className="text-orange-600">Expires: {new Date(resolution.expiryDate).toLocaleDateString()}</span>
                  )}
                </div>
                {resolution.reviewedBy && (
                  <span>Reviewed by: <strong>{resolution.reviewedBy}</strong></span>
                )}
              </div>
              {resolution.comments && (
                <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                  <strong>Comments:</strong> {resolution.comments}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Resolution Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Resolution Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedResolution?.title}
            </DialogDescription>
          </DialogHeader>
          {selectedResolution && (
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="review">Review</TabsTrigger>
                <TabsTrigger value="actions">Actions</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Resolution Title</Label>
                    <p className="text-sm font-medium">{selectedResolution.title}</p>
                  </div>
                  <div>
                    <Label>Joint Venture</Label>
                    <p className="text-sm">{selectedResolution.jvName}</p>
                  </div>
                  <div>
                    <Label>Type</Label>
                    <p className="text-sm capitalize">{selectedResolution.resolutionType.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <Label>Priority</Label>
                    <Badge className={getPriorityColor(selectedResolution.priority)}>
                      {selectedResolution.priority.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedResolution.status)}>
                      {selectedResolution.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Document Size</Label>
                    <p className="text-sm">{selectedResolution.documentSize}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm mt-1">{selectedResolution.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="review" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Uploaded By</Label>
                    <p className="text-sm font-medium">{selectedResolution.uploadedBy}</p>
                  </div>
                  <div>
                    <Label>Upload Date</Label>
                    <p className="text-sm">{new Date(selectedResolution.uploadDate).toLocaleDateString()}</p>
                  </div>
                  {selectedResolution.reviewedBy && (
                    <>
                      <div>
                        <Label>Reviewed By</Label>
                        <p className="text-sm font-medium">{selectedResolution.reviewedBy}</p>
                      </div>
                      <div>
                        <Label>Review Date</Label>
                        <p className="text-sm">{selectedResolution.reviewDate ? new Date(selectedResolution.reviewDate).toLocaleDateString() : 'N/A'}</p>
                      </div>
                    </>
                  )}
                </div>
                {selectedResolution.comments && (
                  <div>
                    <Label>Review Comments</Label>
                    <div className="mt-2 p-3 bg-gray-50 rounded text-sm">
                      {selectedResolution.comments}
                    </div>
                  </div>
                )}
              </TabsContent>
              <TabsContent value="actions" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Update Status</Label>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedResolution.id, 'approved')}
                        className="text-green-600 border-green-600 hover:bg-green-50"
                      >
                        Approve
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedResolution.id, 'rejected')}
                        className="text-red-600 border-red-600 hover:bg-red-50"
                      >
                        Reject
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleStatusUpdate(selectedResolution.id, 'requires-amendment')}
                        className="text-orange-600 border-orange-600 hover:bg-orange-50"
                      >
                        Request Amendment
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>Add Comments</Label>
                    <Textarea 
                      placeholder="Enter review comments..."
                      className="mt-2"
                    />
                    <Button className="mt-2" size="sm">
                      Add Comment
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Upload Resolution Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Upload Board Resolution</DialogTitle>
            <DialogDescription>
              Upload a new board resolution document for review and approval
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Joint Venture</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select JV" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="offshore-drilling">Offshore Drilling Consortium</SelectItem>
                    <SelectItem value="gas-processing">Gas Processing Alliance</SelectItem>
                    <SelectItem value="renewable-energy">Renewable Energy Partnership</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Resolution Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="formation">Formation</SelectItem>
                    <SelectItem value="amendment">Amendment</SelectItem>
                    <SelectItem value="dissolution">Dissolution</SelectItem>
                    <SelectItem value="capital-increase">Capital Increase</SelectItem>
                    <SelectItem value="board-appointment">Board Appointment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Resolution Title</Label>
              <Input placeholder="Enter resolution title" />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea placeholder="Describe the resolution purpose and details" />
            </div>
            <div>
              <Label>Priority Level</Label>
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
              <Label>Upload Document</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <CloudArrowUpIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Drag and drop your file here, or click to browse</p>
                <p className="text-xs text-gray-500">Supported formats: PDF, DOC, DOCX (Max 10MB)</p>
                <Button variant="outline" className="mt-2">
                  Choose File
                </Button>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsUploadModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                toast.success('Board resolution uploaded successfully');
                setIsUploadModalOpen(false);
              }}>Upload Resolution</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}