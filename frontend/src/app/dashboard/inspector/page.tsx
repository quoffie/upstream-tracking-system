'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock data for charts
const inspectionStatusData = [
  { name: 'Scheduled', value: 18 },
  { name: 'In Progress', value: 7 },
  { name: 'Completed', value: 35 },
  { name: 'Requires Follow-up', value: 12 },
  { name: 'Cancelled', value: 3 },
];

const complianceByTypeData = [
  { name: 'Safety', compliant: 85, nonCompliant: 15 },
  { name: 'Environmental', compliant: 78, nonCompliant: 22 },
  { name: 'Technical', compliant: 92, nonCompliant: 8 },
  { name: 'Operational', compliant: 88, nonCompliant: 12 },
  { name: 'Local Content', compliant: 75, nonCompliant: 25 },
];

const monthlyInspectionsData = [
  { name: 'Jan', inspections: 22 },
  { name: 'Feb', inspections: 28 },
  { name: 'Mar', inspections: 25 },
  { name: 'Apr', inspections: 32 },
  { name: 'May', inspections: 30 },
  { name: 'Jun', inspections: 27 },
];

const upcomingInspections = [
  { id: 'INS-2023-0142', company: 'Tullow Ghana Ltd', type: 'Safety', date: '2023-12-22', location: 'TEN Field' },
  { id: 'INS-2023-0143', company: 'Eni Ghana Ltd', type: 'Environmental', date: '2023-12-23', location: 'Sankofa Field' },
  { id: 'INS-2023-0144', company: 'Springfield E&P', type: 'Technical', date: '2023-12-28', location: 'West Cape Three Points' },
  { id: 'INS-2023-0145', company: 'Kosmos Energy', type: 'Operational', date: '2023-12-30', location: 'Jubilee Field' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function InspectorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-32">
              <Image 
                src="/images/pc-ghana-logo.svg" 
                alt="Petroleum Commission Ghana Logo" 
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold hidden md:block">Upstream Tracking System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="text-white hover:text-gold-500">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gold-600 flex items-center justify-center text-white font-bold">
                IN
              </div>
              <span className="hidden md:block">Inspector Portal</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-blue-800">Inspector Dashboard</h2>
          </div>
          <nav className="mt-4">
            <ul>
              <li>
                <button 
                  onClick={() => setActiveTab('overview')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'overview' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Overview
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('schedule')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'schedule' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Inspection Schedule
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('reports')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'reports' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Inspection Reports
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('compliance')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'compliance' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 7h6" />
                  </svg>
                  Compliance Tracking
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('companies')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'companies' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Company Directory
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('checklists')} 
                  className={`flex items-center w-full px-4 py-3 ${activeTab === 'checklists' ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  Inspection Checklists
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div>
              <h1 className="text-2xl font-bold text-blue-800 mb-6">Inspector Dashboard</h1>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Scheduled Inspections</p>
                      <p className="text-2xl font-bold text-blue-800">18</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-md">
                      <svg className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-blue-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                      View schedule
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Completed This Month</p>
                      <p className="text-2xl font-bold text-green-600">12</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-md">
                      <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-green-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      Up 20% from last month
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Requires Follow-up</p>
                      <p className="text-2xl font-bold text-red-500">12</p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-md">
                      <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-red-500 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      Action required
                    </span>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-gold-600">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Overall Compliance</p>
                      <p className="text-2xl font-bold text-gold-600">84%</p>
                    </div>
                    <div className="p-2 bg-gold-100 rounded-md">
                      <svg className="h-6 w-6 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-sm text-gold-600 flex items-center">
                      <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Up 3% from last quarter
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Inspection Status</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={inspectionStatusData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {inspectionStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Monthly Inspections</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={monthlyInspectionsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="inspections" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Compliance by Type</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={complianceByTypeData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis type="category" dataKey="name" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="compliant" stackId="a" fill="#82ca9d" name="Compliant (%)" />
                        <Bar dataKey="nonCompliant" stackId="a" fill="#ff8042" name="Non-Compliant (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-blue-800 mb-4">Upcoming Inspections</h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {upcomingInspections.map((inspection, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{inspection.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.company}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{inspection.location}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All Scheduled Inspections
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'overview' && (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-800 mb-4">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h2>
              <p className="text-gray-600 mb-6">This section is under development. Please check back soon.</p>
              <button 
                onClick={() => setActiveTab('overview')} 
                className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Return to Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}