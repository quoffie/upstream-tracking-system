'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { getJVCoordinatorMenuItems } from '../../components/layouts/DashboardMenus';
import {
  HomeIcon,
  ApplicationIcon,
  DocumentIcon,
  AnalyticsIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon,
  AuditIcon,
  WorkflowIcon,
  ReportIcon
} from '../../components/icons/DashboardIcons';



export default function JVCoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();
  const pathname = usePathname();
  const sidebarItems = getJVCoordinatorMenuItems(pathname);
  
  console.log('JV Coordinator sidebarItems:', sidebarItems);
  console.log('JV Coordinator pathname:', pathname);



  return (
    <DashboardLayout
      title="Joint Venture Coordinator Dashboard"
      userRole="JV Coordinator"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ApplicationIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Active JV Companies</dt>
                    <dd className="text-lg font-medium text-gray-900">24</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DocumentIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Partnership Agreements</dt>
                    <dd className="text-lg font-medium text-gray-900">18</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <AuditIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Compliance Issues</dt>
                    <dd className="text-lg font-medium text-red-600">3</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <ReportIcon className="h-6 w-6 text-gray-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Monthly Reports</dt>
                    <dd className="text-lg font-medium text-gray-900">12</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent JV Activities</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-blue-900">New JV Application Submitted</p>
                  <p className="text-sm text-blue-700">TechDrill-Global Energy Partnership</p>
                </div>
                <span className="text-xs text-blue-600">2 hours ago</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-900">Partnership Agreement Approved</p>
                  <p className="text-sm text-green-700">Acme-Local Services JV</p>
                </div>
                <span className="text-xs text-green-600">1 day ago</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-amber-900">Compliance Review Required</p>
                  <p className="text-sm text-amber-700">Offshore Drilling Consortium</p>
                </div>
                <span className="text-xs text-amber-600">3 days ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">JV Performance Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Local Content Compliance</span>
                  <span className="text-sm font-medium text-green-600">87%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Partnership Effectiveness</span>
                  <span className="text-sm font-medium text-blue-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Regulatory Compliance</span>
                  <span className="text-sm font-medium text-purple-600">95%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Upcoming Deadlines</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-red-900">Q4 Performance Report</p>
                    <p className="text-xs text-red-700">Due in 5 days</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Urgent
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-amber-900">JV Agreement Renewal</p>
                    <p className="text-xs text-amber-700">Due in 2 weeks</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Important
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-blue-900">Compliance Audit</p>
                    <p className="text-xs text-blue-700">Due in 1 month</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}