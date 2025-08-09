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
import { BuildingOfficeIcon, UsersIcon, ChartBarIcon, CalendarIcon, EyeIcon, PencilIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';

interface JointVenture {
  id: string;
  name: string;
  sector: string;
  status: 'active' | 'inactive' | 'under-formation' | 'dissolved';
  establishedDate: string;
  totalInvestment: number;
  partners: {
    name: string;
    country: string;
    equityShare: number;
    role: string;
  }[];
  keyMetrics: {
    revenue: number;
    profit: number;
    employees: number;
    projects: number;
  };
  compliance: {
    localContent: number;
    training: number;
    technology: number;
    overall: number;
  };
  lastReview: string;
  nextReview: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
}

const mockJVs: JointVenture[] = [
  {
    id: 'JV001',
    name: 'Offshore Drilling Consortium',
    sector: 'Upstream',
    status: 'active',
    establishedDate: '2024-01-15',
    totalInvestment: 2500000000,
    partners: [
      { name: 'Ghana National Petroleum', country: 'Ghana', equityShare: 35, role: 'Lead Partner' },
      { name: 'TotalEnergies', country: 'France', equityShare: 40, role: 'Operating Partner' },
      { name: 'Eni Ghana', country: 'Italy', equityShare: 25, role: 'Technical Partner' }
    ],
    keyMetrics: {
      revenue: 850000000,
      profit: 127500000,
      employees: 1250,
      projects: 8
    },
    compliance: {
      localContent: 85,
      training: 92,
      technology: 78,
      overall: 85
    },
    lastReview: '2024-02-15',
    nextReview: '2024-05-15',
    riskLevel: 'low'
  },
  {
    id: 'JV002',
    name: 'Gas Processing Alliance',
    sector: 'Midstream',
    status: 'active',
    establishedDate: '2024-02-20',
    totalInvestment: 1800000000,
    partners: [
      { name: 'Ghana Gas Company', country: 'Ghana', equityShare: 40, role: 'Lead Partner' },
      { name: 'Shell Ghana', country: 'Netherlands', equityShare: 35, role: 'Operating Partner' },
      { name: 'Kosmos Energy', country: 'USA', equityShare: 25, role: 'Financial Partner' }
    ],
    keyMetrics: {
      revenue: 620000000,
      profit: 93000000,
      employees: 890,
      projects: 5
    },
    compliance: {
      localContent: 72,
      training: 88,
      technology: 65,
      overall: 75
    },
    lastReview: '2024-03-01',
    nextReview: '2024-06-01',
    riskLevel: 'medium'
  },
  {
    id: 'JV003',
    name: 'Renewable Energy Partnership',
    sector: 'Renewable',
    status: 'under-formation',
    establishedDate: '2024-03-10',
    totalInvestment: 1200000000,
    partners: [
      { name: 'Ghana Energy Commission', country: 'Ghana', equityShare: 45, role: 'Lead Partner' },
      { name: 'Orsted', country: 'Denmark', equityShare: 35, role: 'Technical Partner' },
      { name: 'African Development Bank', country: 'International', equityShare: 20, role: 'Financial Partner' }
    ],
    keyMetrics: {
      revenue: 0,
      profit: 0,
      employees: 45,
      projects: 2
    },
    compliance: {
      localContent: 90,
      training: 95,
      technology: 85,
      overall: 90
    },
    lastReview: '2024-03-15',
    nextReview: '2024-04-15',
    riskLevel: 'low'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-gray-100 text-gray-800';
    case 'under-formation': return 'bg-blue-100 text-blue-800';
    case 'dissolved': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-100 text-green-800';
    case 'medium': return 'bg-yellow-100 text-yellow-800';
    case 'high': return 'bg-orange-100 text-orange-800';
    case 'critical': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export default function JVManagementPage() {
  const [jvs, setJVs] = useState<JointVenture[]>(mockJVs);
  const [selectedJV, setSelectedJV] = useState<JointVenture | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  const filteredJVs = jvs.filter(jv => {
    const matchesSearch = jv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         jv.partners.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || jv.status === statusFilter;
    const matchesSector = sectorFilter === 'all' || jv.sector === sectorFilter;
    const matchesRisk = riskFilter === 'all' || jv.riskLevel === riskFilter;
    return matchesSearch && matchesStatus && matchesSector && matchesRisk;
  });

  const handleViewDetails = (jv: JointVenture) => {
    setSelectedJV(jv);
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

  // Calculate summary statistics
  const totalInvestment = jvs.reduce((sum, jv) => sum + jv.totalInvestment, 0);
  const activeJVs = jvs.filter(jv => jv.status === 'active').length;
  const totalRevenue = jvs.reduce((sum, jv) => sum + jv.keyMetrics.revenue, 0);
  const averageCompliance = jvs.reduce((sum, jv) => sum + jv.compliance.overall, 0) / jvs.length;

  // Prepare chart data
  const sectorDistribution = jvs.reduce((acc, jv) => {
    acc[jv.sector] = (acc[jv.sector] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(sectorDistribution).map(([sector, count]) => ({
    name: sector,
    value: count
  }));

  const performanceData = jvs.map(jv => ({
    name: jv.name.substring(0, 15) + '...',
    revenue: jv.keyMetrics.revenue / 1000000, // Convert to millions
    profit: jv.keyMetrics.profit / 1000000,
    compliance: jv.compliance.overall
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Joint Venture Management</h1>
          <p className="text-gray-600">Monitor and manage active joint ventures</p>
        </div>
        <Button className="flex items-center gap-2">
          <BuildingOfficeIcon className="h-4 w-4" />
          Create New JV
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
              +15% from last quarter
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
            <p className="text-xs text-muted-foreground">Out of {jvs.length} total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <ArrowTrendingUpIcon className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">Annual revenue</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Compliance</CardTitle>
            <ChartBarIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{averageCompliance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Overall compliance rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>JV Distribution by Sector</CardTitle>
            <CardDescription>Number of joint ventures per sector</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>Revenue, profit, and compliance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar yAxisId="left" dataKey="revenue" fill="#0088FE" name="Revenue (M$)" />
                <Bar yAxisId="left" dataKey="profit" fill="#00C49F" name="Profit (M$)" />
                <Bar yAxisId="right" dataKey="compliance" fill="#FFBB28" name="Compliance (%)" />
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
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="under-formation">Under Formation</SelectItem>
                <SelectItem value="dissolved">Dissolved</SelectItem>
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
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by risk" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="low">Low Risk</SelectItem>
                <SelectItem value="medium">Medium Risk</SelectItem>
                <SelectItem value="high">High Risk</SelectItem>
                <SelectItem value="critical">Critical Risk</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* JV List */}
      <div className="grid gap-6">
        {filteredJVs.map((jv) => (
          <Card key={jv.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {jv.name}
                    <Badge className={getStatusColor(jv.status)}>
                      {jv.status.replace('-', ' ').toUpperCase()}
                    </Badge>
                    <Badge className={getRiskColor(jv.riskLevel)}>
                      {jv.riskLevel.toUpperCase()} RISK
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {jv.sector} • Established: {new Date(jv.establishedDate).toLocaleDateString()} • 
                    Investment: {formatCurrency(jv.totalInvestment)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
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
                {/* Key Metrics */}
                <div>
                  <h4 className="font-medium mb-2">Key Performance Metrics</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="font-semibold text-blue-600">{formatCurrency(jv.keyMetrics.revenue)}</p>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded">
                      <p className="text-sm text-gray-600">Profit</p>
                      <p className="font-semibold text-green-600">{formatCurrency(jv.keyMetrics.profit)}</p>
                    </div>
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <p className="text-sm text-gray-600">Employees</p>
                      <p className="font-semibold text-purple-600">{jv.keyMetrics.employees.toLocaleString()}</p>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded">
                      <p className="text-sm text-gray-600">Projects</p>
                      <p className="font-semibold text-orange-600">{jv.keyMetrics.projects}</p>
                    </div>
                  </div>
                </div>

                {/* Partners */}
                <div>
                  <h4 className="font-medium mb-2">Partners</h4>
                  <div className="flex flex-wrap gap-2">
                    {jv.partners.map((partner, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded text-sm">
                        <span className="font-medium">{partner.name}</span>
                        <Badge variant="outline">{partner.equityShare}%</Badge>
                        <span className="text-gray-500">({partner.role})</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compliance */}
                <div>
                  <h4 className="font-medium mb-2">Compliance Status</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Local Content</p>
                      <p className={`font-semibold ${jv.compliance.localContent >= 80 ? 'text-green-600' : jv.compliance.localContent >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {jv.compliance.localContent}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Training</p>
                      <p className={`font-semibold ${jv.compliance.training >= 80 ? 'text-green-600' : jv.compliance.training >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {jv.compliance.training}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Technology</p>
                      <p className={`font-semibold ${jv.compliance.technology >= 80 ? 'text-green-600' : jv.compliance.technology >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {jv.compliance.technology}%
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Overall</p>
                      <p className={`font-semibold ${jv.compliance.overall >= 80 ? 'text-green-600' : jv.compliance.overall >= 60 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {jv.compliance.overall}%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-500 pt-2 border-t">
                  <span>Last Review: {new Date(jv.lastReview).toLocaleDateString()}</span>
                  <span>Next Review: {new Date(jv.nextReview).toLocaleDateString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* View Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Joint Venture Details</DialogTitle>
            <DialogDescription>
              Comprehensive information for {selectedJV?.name}
            </DialogDescription>
          </DialogHeader>
          {selectedJV && (
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="partners">Partners</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="compliance">Compliance</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Joint Venture Name</Label>
                    <p className="text-sm font-medium">{selectedJV.name}</p>
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
                    <Label>Risk Level</Label>
                    <Badge className={getRiskColor(selectedJV.riskLevel)}>
                      {selectedJV.riskLevel.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <Label>Established Date</Label>
                    <p className="text-sm">{new Date(selectedJV.establishedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label>Total Investment</Label>
                    <p className="text-sm font-semibold">{formatCurrency(selectedJV.totalInvestment)}</p>
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
                            <Label>Equity Share</Label>
                            <p className="text-sm font-semibold">{partner.equityShare}%</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="performance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Financial Performance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Revenue:</span>
                        <span className="text-sm font-semibold">{formatCurrency(selectedJV.keyMetrics.revenue)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Annual Profit:</span>
                        <span className="text-sm font-semibold">{formatCurrency(selectedJV.keyMetrics.profit)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Profit Margin:</span>
                        <span className="text-sm font-semibold">
                          {selectedJV.keyMetrics.revenue > 0 ? ((selectedJV.keyMetrics.profit / selectedJV.keyMetrics.revenue) * 100).toFixed(1) : 0}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Operational Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Total Employees:</span>
                        <span className="text-sm font-semibold">{selectedJV.keyMetrics.employees.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Projects:</span>
                        <span className="text-sm font-semibold">{selectedJV.keyMetrics.projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Revenue per Employee:</span>
                        <span className="text-sm font-semibold">
                          {formatCurrency(selectedJV.keyMetrics.employees > 0 ? selectedJV.keyMetrics.revenue / selectedJV.keyMetrics.employees : 0)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="compliance" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label>Local Content Compliance</Label>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedJV.compliance.localContent}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedJV.compliance.localContent >= 80 ? 'bg-green-500' : 
                              selectedJV.compliance.localContent >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedJV.compliance.localContent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Training Compliance</Label>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedJV.compliance.training}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedJV.compliance.training >= 80 ? 'bg-green-500' : 
                              selectedJV.compliance.training >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedJV.compliance.training}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label>Technology Transfer</Label>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedJV.compliance.technology}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedJV.compliance.technology >= 80 ? 'bg-green-500' : 
                              selectedJV.compliance.technology >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedJV.compliance.technology}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <Label>Overall Compliance</Label>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{selectedJV.compliance.overall}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              selectedJV.compliance.overall >= 80 ? 'bg-green-500' : 
                              selectedJV.compliance.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedJV.compliance.overall}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Last Review Date</Label>
                      <p className="text-sm font-medium">{new Date(selectedJV.lastReview).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <Label>Next Review Date</Label>
                      <p className="text-sm font-medium">{new Date(selectedJV.nextReview).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Quarterly Review Completed</p>
                        <p className="text-xs text-gray-500">{new Date(selectedJV.lastReview).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Next Review Scheduled</p>
                        <p className="text-xs text-gray-500">{new Date(selectedJV.nextReview).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}