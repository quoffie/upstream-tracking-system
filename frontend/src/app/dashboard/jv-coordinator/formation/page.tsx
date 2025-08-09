'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BuildingOfficeIcon, DocumentTextIcon, ChartBarIcon, DocumentCheckIcon, PlusIcon, EyeIcon, CalendarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface JVFormation {
  id: string;
  name: string;
  partners: string[];
  equityShare: number;
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected';
  submissionDate: string;
  reviewDate?: string;
  description: string;
  sector: string;
  estimatedValue: number;
}

const mockFormations: JVFormation[] = [
  {
    id: 'JV001',
    name: 'Offshore Drilling Consortium',
    partners: ['Ghana National Petroleum', 'TotalEnergies', 'Eni Ghana'],
    equityShare: 35,
    status: 'approved',
    submissionDate: '2024-01-15',
    reviewDate: '2024-02-01',
    description: 'Joint venture for offshore drilling operations in the Jubilee field',
    sector: 'Upstream',
    estimatedValue: 2500000000
  },
  {
    id: 'JV002',
    name: 'Gas Processing Alliance',
    partners: ['Ghana Gas Company', 'Shell Ghana', 'Kosmos Energy'],
    equityShare: 40,
    status: 'under-review',
    submissionDate: '2024-02-20',
    description: 'Partnership for natural gas processing and distribution',
    sector: 'Midstream',
    estimatedValue: 1800000000
  },
  {
    id: 'JV003',
    name: 'Renewable Energy Initiative',
    partners: ['VRA', 'Tullow Oil', 'Local Energy Partners'],
    equityShare: 25,
    status: 'draft',
    submissionDate: '2024-03-10',
    description: 'Joint venture for renewable energy projects',
    sector: 'Renewable',
    estimatedValue: 950000000
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-800';
    case 'under-review': return 'bg-yellow-100 text-yellow-800';
    case 'submitted': return 'bg-blue-100 text-blue-800';
    case 'rejected': return 'bg-red-100 text-red-800';
    case 'draft': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function JVFormationPage() {
  const [formations, setFormations] = useState<JVFormation[]>(mockFormations);
  const [selectedFormation, setSelectedFormation] = useState<JVFormation | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.partners.some(partner => partner.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || formation.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || formation.sector === sectorFilter;
    return matchesSearch && matchesStatus && matchesSector;
  });

  const handleCreateFormation = () => {
    toast.success('JV Formation plan created successfully');
    setIsCreateModalOpen(false);
  };

  const handleViewDetails = (formation: JVFormation) => {
    setSelectedFormation(formation);
    setIsViewModalOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">JV Formation Management</h1>
          <p className="text-gray-600">Manage joint venture formation plans and submissions</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Create JV Plan
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New JV Formation Plan</DialogTitle>
              <DialogDescription>
                Submit a new joint venture formation plan for review
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jv-name">JV Name</Label>
                  <Input id="jv-name" placeholder="Enter JV name" />
                </div>
                <div>
                  <Label htmlFor="sector">Sector</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upstream">Upstream</SelectItem>
                      <SelectItem value="midstream">Midstream</SelectItem>
                      <SelectItem value="downstream">Downstream</SelectItem>
                      <SelectItem value="renewable">Renewable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="equity-share">Equity Share (%)</Label>
                  <Input id="equity-share" type="number" placeholder="Enter equity percentage" />
                </div>
                <div>
                  <Label htmlFor="estimated-value">Estimated Value (USD)</Label>
                  <Input id="estimated-value" type="number" placeholder="Enter estimated value" />
                </div>
              </div>
              <div>
                <Label htmlFor="partners">Partners</Label>
                <Textarea id="partners" placeholder="List all JV partners (one per line)" rows={3} />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Describe the JV formation plan" rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                <Button onClick={handleCreateFormation}>Create Plan</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total JV Plans</CardTitle>
            <BuildingOfficeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formations.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <DocumentCheckIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formations.filter(f => f.status === 'approved').length}
            </div>
            <p className="text-xs text-muted-foreground">67% approval rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <DocumentTextIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {formations.filter(f => f.status === 'under-review').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(formations.reduce((sum, f) => sum + f.estimatedValue, 0))}
            </div>
            <p className="text-xs text-muted-foreground">Combined portfolio</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter JV Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by name or partner..."
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
                <SelectItem value="submitted">Submitted</SelectItem>
                <SelectItem value="under-review">Under Review</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                <SelectItem value="Upstream">Upstream</SelectItem>
                <SelectItem value="Midstream">Midstream</SelectItem>
                <SelectItem value="Downstream">Downstream</SelectItem>
                <SelectItem value="Renewable">Renewable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* JV Plans List */}
      <div className="grid gap-6">
        {filteredFormations.map((formation) => (
          <Card key={formation.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {formation.name}
                    <Badge className={getStatusColor(formation.status)}>
                      {formation.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{formation.description}</CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleViewDetails(formation)}
                  className="flex items-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Partners</p>
                  <p className="text-sm">{formation.partners.length} partners</p>
                  <p className="text-xs text-gray-400">{formation.partners.slice(0, 2).join(', ')}{formation.partners.length > 2 ? '...' : ''}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Equity Share</p>
                  <p className="text-sm font-semibold">{formation.equityShare}%</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                  <p className="text-sm font-semibold">{formatCurrency(formation.estimatedValue)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Submission Date</p>
                  <p className="text-sm">{new Date(formation.submissionDate).toLocaleDateString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>JV Formation Details</DialogTitle>
            <DialogDescription>
              Comprehensive details for {selectedFormation?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedFormation && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="partners">Partners</TabsTrigger>
                <TabsTrigger value="equity">Equity</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>JV Name</Label>
                    <p className="text-sm font-medium">{selectedFormation.name}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedFormation.status)}>
                      {selectedFormation.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Sector</Label>
                    <p className="text-sm">{selectedFormation.sector}</p>
                  </div>
                  <div>
                    <Label>Estimated Value</Label>
                    <p className="text-sm font-semibold">{formatCurrency(selectedFormation.estimatedValue)}</p>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <p className="text-sm text-gray-600">{selectedFormation.description}</p>
                </div>
              </TabsContent>
              <TabsContent value="partners" className="space-y-4">
                <div>
                  <Label>Partner Companies</Label>
                  <div className="space-y-2 mt-2">
                    {selectedFormation.partners.map((partner, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <UserGroupIcon className="h-4 w-4 text-gray-500" />
                        <span className="text-sm">{partner}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="equity" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Equity Share</Label>
                    <p className="text-2xl font-bold text-blue-600">{selectedFormation.equityShare}%</p>
                  </div>
                  <div>
                    <Label>Investment Value</Label>
                    <p className="text-2xl font-bold text-green-600">
                      {formatCurrency(selectedFormation.estimatedValue * selectedFormation.equityShare / 100)}
                    </p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="timeline" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">Submission Date</p>
                      <p className="text-sm text-gray-600">{new Date(selectedFormation.submissionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  {selectedFormation.reviewDate && (
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Review Date</p>
                        <p className="text-sm text-gray-600">{new Date(selectedFormation.reviewDate).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}