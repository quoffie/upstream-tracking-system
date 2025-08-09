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
import { ChartBarIcon, BuildingOfficeIcon, PlusIcon, EyeIcon, PencilIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { toast } from 'sonner';

interface EquityParticipation {
  id: string;
  jvName: string;
  totalValue: number;
  partners: {
    name: string;
    country: string;
    equityShare: number;
    investmentAmount: number;
    role: string;
    status: 'active' | 'pending' | 'withdrawn';
  }[];
  sector: string;
  status: 'active' | 'under-negotiation' | 'completed' | 'terminated';
  establishedDate: string;
  lastUpdated: string;
}

const mockEquityData: EquityParticipation[] = [
  {
    id: 'EQ001',
    jvName: 'Offshore Drilling Consortium',
    totalValue: 2500000000,
    partners: [
      { name: 'Ghana National Petroleum', country: 'Ghana', equityShare: 35, investmentAmount: 875000000, role: 'Lead Partner', status: 'active' },
      { name: 'TotalEnergies', country: 'France', equityShare: 40, investmentAmount: 1000000000, role: 'Operating Partner', status: 'active' },
      { name: 'Eni Ghana', country: 'Italy', equityShare: 25, investmentAmount: 625000000, role: 'Technical Partner', status: 'active' }
    ],
    sector: 'Upstream',
    status: 'active',
    establishedDate: '2024-01-15',
    lastUpdated: '2024-03-10'
  },
  {
    id: 'EQ002',
    jvName: 'Gas Processing Alliance',
    totalValue: 1800000000,
    partners: [
      { name: 'Ghana Gas Company', country: 'Ghana', equityShare: 40, investmentAmount: 720000000, role: 'Lead Partner', status: 'active' },
      { name: 'Shell Ghana', country: 'Netherlands', equityShare: 35, investmentAmount: 630000000, role: 'Operating Partner', status: 'active' },
      { name: 'Kosmos Energy', country: 'USA', equityShare: 25, investmentAmount: 450000000, role: 'Financial Partner', status: 'pending' }
    ],
    sector: 'Midstream',
    status: 'under-negotiation',
    establishedDate: '2024-02-20',
    lastUpdated: '2024-03-15'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'under-negotiation': return 'bg-yellow-100 text-yellow-800';
    case 'completed': return 'bg-blue-100 text-blue-800';
    case 'terminated': return 'bg-red-100 text-red-800';
    case 'pending': return 'bg-orange-100 text-orange-800';
    case 'withdrawn': return 'bg-gray-100 text-gray-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function EquityParticipationPage() {
  const [equityData, setEquityData] = useState<EquityParticipation[]>(mockEquityData);
  const [selectedJV, setSelectedJV] = useState<EquityParticipation | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');

  const filteredData = equityData.filter(jv => {
    const matchesSearch = jv.jvName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jv.partners.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || jv.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || jv.sector === sectorFilter;
    return matchesSearch && matchesStatus && matchesSector;
  });

  const handleViewDetails = (jv: EquityParticipation) => {
    setSelectedJV(jv);
    setIsViewModalOpen(true);
  };

  const handleEditEquity = (jv: EquityParticipation) => {
    setSelectedJV(jv);
    setIsEditModalOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate summary statistics
  const totalInvestment = equityData.reduce((sum, jv) => sum + jv.totalValue, 0);
  const activeJVs = equityData.filter(jv => jv.status === 'active').length;
  const averageEquity = equityData.reduce((sum, jv) => {
    const ghanaianPartner = jv.partners.find(p => p.country === 'Ghana');
    return sum + (ghanaianPartner?.equityShare || 0);
  }, 0) / equityData.length;

  // Prepare chart data
  const sectorDistribution = equityData.reduce((acc, jv) => {
    acc[jv.sector] = (acc[jv.sector] || 0) + jv.totalValue;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(sectorDistribution).map(([sector, value]) => ({
    name: sector,
    value,
    percentage: ((value / totalInvestment) * 100).toFixed(1)
  }));

  const equityTrendData = equityData.map(jv => ({
    name: jv.jvName.substring(0, 15) + '...',
    ghanaianEquity: jv.partners.find(p => p.country === 'Ghana')?.equityShare || 0,
    foreignEquity: jv.partners.filter(p => p.country !== 'Ghana').reduce((sum, p) => sum + p.equityShare, 0)
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Equity Participation Management</h1>
          <p className="text-gray-600">Monitor and manage equity shares in joint ventures</p>
        </div>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          New Equity Structure
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalInvestment)}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <ArrowTrendingUpIcon className="h-3 w-3 text-green-500" />
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active JVs</CardTitle>
            <BuildingOfficeIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{activeJVs}</div>
            <p className="text-xs text-muted-foreground">Out of {equityData.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Ghanaian Equity</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{averageEquity.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Local participation rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Negotiation</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {equityData.filter(jv => jv.status === 'under-negotiation').length}
            </div>
            <p className="text-xs text-muted-foreground">Pending agreements</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment by Sector</CardTitle>
            <CardDescription>Distribution of total investment across sectors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Equity Distribution</CardTitle>
            <CardDescription>Ghanaian vs Foreign equity participation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={equityTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ghanaianEquity" stackId="a" fill="#00C49F" name="Ghanaian Equity" />
                <Bar dataKey="foreignEquity" stackId="a" fill="#0088FE" name="Foreign Equity" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Joint Ventures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <Input
                placeholder="Search by JV name or partner..."
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
                <SelectItem value="under-negotiation">Under Negotiation</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
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

      {/* JV Equity List */}
      <div className="grid gap-6">
        {filteredData.map((jv) => (
          <Card key={jv.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {jv.jvName}
                    <Badge className={getStatusColor(jv.status)}>
                      {jv.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {jv.sector} • Total Value: {formatCurrency(jv.totalValue)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditEquity(jv)}
                    className="flex items-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewDetails(jv)}
                    className="flex items-center gap-1"
                  >
                    <EyeIcon className="h-4 w-4" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Partner Equity Distribution</h4>
                  <div className="space-y-2">
                    {jv.partners.map((partner, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                          <span className="text-sm font-medium">{partner.name}</span>
                          <Badge variant="outline" className="text-xs">{partner.country}</Badge>
                          <Badge className={getStatusColor(partner.status)} variant="outline">
                            {partner.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{partner.equityShare}%</p>
                          <p className="text-xs text-gray-500">{formatCurrency(partner.investmentAmount)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Established: {new Date(jv.establishedDate).toLocaleDateString()}</span>
                  <span>Last Updated: {new Date(jv.lastUpdated).toLocaleDateString()}</span>
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
            <DialogTitle>Equity Participation Details</DialogTitle>
            <DialogDescription>
              Comprehensive equity information for {selectedJV?.jvName}
            </DialogDescription>
          </DialogHeader>
          {selectedJV && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="partners">Partners</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Joint Venture Name</Label>
                    <p className="text-sm font-medium">{selectedJV.jvName}</p>
                  </div>
                  <div>
                    <Label>Status</Label>
                    <Badge className={getStatusColor(selectedJV.status)}>
                      {selectedJV.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Sector</Label>
                    <p className="text-sm">{selectedJV.sector}</p>
                  </div>
                  <div>
                    <Label>Total Investment Value</Label>
                    <p className="text-sm font-semibold">{formatCurrency(selectedJV.totalValue)}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="partners" className="space-y-4">
                <div className="space-y-4">
                  {selectedJV.partners.map((partner, index) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label>Company Name</Label>
                            <p className="text-sm font-medium">{partner.name}</p>
                          </div>
                          <div>
                            <Label>Country</Label>
                            <p className="text-sm">{partner.country}</p>
                          </div>
                          <div>
                            <Label>Role</Label>
                            <p className="text-sm">{partner.role}</p>
                          </div>
                          <div>
                            <Label>Status</Label>
                            <Badge className={getStatusColor(partner.status)}>
                              {partner.status.toUpperCase()}
                            </Badge>
                          </div>
                          <div>
                            <Label>Equity Share</Label>
                            <p className="text-sm font-semibold">{partner.equityShare}%</p>
                          </div>
                          <div>
                            <Label>Investment Amount</Label>
                            <p className="text-sm font-semibold">{formatCurrency(partner.investmentAmount)}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Investment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Value:</span>
                        <span className="text-sm font-semibold">{formatCurrency(selectedJV.totalValue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Ghanaian Investment:</span>
                        <span className="text-sm font-semibold">
                          {formatCurrency(selectedJV.partners.filter(p => p.country === 'Ghana').reduce((sum, p) => sum + p.investmentAmount, 0))}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Foreign Investment:</span>
                        <span className="text-sm font-semibold">
                          {formatCurrency(selectedJV.partners.filter(p => p.country !== 'Ghana').reduce((sum, p) => sum + p.investmentAmount, 0))}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Equity Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={selectedJV.partners.map((p, i) => ({ name: p.name, value: p.equityShare, fill: COLORS[i % COLORS.length] }))}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ value }) => `${value}%`}
                          >
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">JV Established</p>
                      <p className="text-xs text-gray-500">{new Date(selectedJV.establishedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium">Last Updated</p>
                      <p className="text-xs text-gray-500">{new Date(selectedJV.lastUpdated).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Equity Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Equity Structure</DialogTitle>
            <DialogDescription>
              Modify equity participation for {selectedJV?.jvName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-4">
              {selectedJV?.partners.map((partner, index) => (
                <div key={index} className="grid grid-cols-3 gap-4 p-4 border rounded">
                  <div>
                    <Label>Partner</Label>
                    <p className="text-sm font-medium">{partner.name}</p>
                  </div>
                  <div>
                    <Label>Current Equity</Label>
                    <p className="text-sm">{partner.equityShare}%</p>
                  </div>
                  <div>
                    <Label>New Equity (%)</Label>
                    <Input type="number" defaultValue={partner.equityShare} min="0" max="100" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
              <Button onClick={() => {
                toast.success('Equity structure updated successfully');
                setIsEditModalOpen(false);
              }}>Update Equity</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}