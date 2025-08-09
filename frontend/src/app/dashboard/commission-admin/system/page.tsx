'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  CogIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  ServerIcon,
  CircleStackIcon,
  BellIcon,
  DocumentTextIcon,
  KeyIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface SystemSetting {
  id: string;
  category: 'security' | 'database' | 'notifications' | 'audit' | 'backup' | 'performance';
  name: string;
  description: string;
  value: string | boolean | number;
  type: 'text' | 'boolean' | 'number' | 'select' | 'password';
  options?: string[];
  lastModified: string;
  modifiedBy: string;
  status: 'active' | 'inactive' | 'warning';
}

interface SystemHealth {
  component: string;
  status: 'healthy' | 'warning' | 'critical';
  uptime: string;
  lastCheck: string;
  details: string;
}

export default function SystemSettingsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>('');

  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([
    {
      id: '1',
      category: 'security',
      name: 'Session Timeout',
      description: 'Automatic logout time for inactive users (minutes)',
      value: 30,
      type: 'number',
      lastModified: '2024-01-15T10:30:00Z',
      modifiedBy: 'System Administrator',
      status: 'active'
    },
    {
      id: '2',
      category: 'security',
      name: 'Two-Factor Authentication',
      description: 'Require 2FA for all administrative accounts',
      value: true,
      type: 'boolean',
      lastModified: '2024-01-14T16:20:00Z',
      modifiedBy: 'Security Officer',
      status: 'active'
    },
    {
      id: '3',
      category: 'security',
      name: 'Password Policy',
      description: 'Minimum password complexity requirements',
      value: 'Strong',
      type: 'select',
      options: ['Basic', 'Medium', 'Strong', 'Very Strong'],
      lastModified: '2024-01-13T14:15:00Z',
      modifiedBy: 'System Administrator',
      status: 'active'
    },
    {
      id: '4',
      category: 'database',
      name: 'Backup Frequency',
      description: 'Automated database backup interval',
      value: 'Daily',
      type: 'select',
      options: ['Hourly', 'Daily', 'Weekly', 'Monthly'],
      lastModified: '2024-01-12T11:45:00Z',
      modifiedBy: 'Database Administrator',
      status: 'active'
    },
    {
      id: '5',
      category: 'database',
      name: 'Connection Pool Size',
      description: 'Maximum number of concurrent database connections',
      value: 100,
      type: 'number',
      lastModified: '2024-01-11T09:30:00Z',
      modifiedBy: 'Database Administrator',
      status: 'active'
    },
    {
      id: '6',
      category: 'notifications',
      name: 'Email Notifications',
      description: 'Send email notifications for critical events',
      value: true,
      type: 'boolean',
      lastModified: '2024-01-10T15:20:00Z',
      modifiedBy: 'System Administrator',
      status: 'active'
    },
    {
      id: '7',
      category: 'notifications',
      name: 'SMS Alerts',
      description: 'Send SMS alerts for emergency situations',
      value: false,
      type: 'boolean',
      lastModified: '2024-01-09T13:10:00Z',
      modifiedBy: 'System Administrator',
      status: 'warning'
    },
    {
      id: '8',
      category: 'audit',
      name: 'Audit Log Retention',
      description: 'Number of days to retain audit logs',
      value: 365,
      type: 'number',
      lastModified: '2024-01-08T10:00:00Z',
      modifiedBy: 'Compliance Officer',
      status: 'active'
    },
    {
      id: '9',
      category: 'audit',
      name: 'Failed Login Tracking',
      description: 'Track and alert on failed login attempts',
      value: true,
      type: 'boolean',
      lastModified: '2024-01-07T14:30:00Z',
      modifiedBy: 'Security Officer',
      status: 'active'
    },
    {
      id: '10',
      category: 'performance',
      name: 'Cache Duration',
      description: 'Application cache timeout (minutes)',
      value: 15,
      type: 'number',
      lastModified: '2024-01-06T12:15:00Z',
      modifiedBy: 'System Administrator',
      status: 'active'
    }
  ]);

  const systemHealth: SystemHealth[] = [
    {
      component: 'Web Server',
      status: 'healthy',
      uptime: '99.9%',
      lastCheck: '2024-01-15T11:45:00Z',
      details: 'All services running normally'
    },
    {
      component: 'Database',
      status: 'healthy',
      uptime: '99.8%',
      lastCheck: '2024-01-15T11:45:00Z',
      details: 'Connection pool: 45/100 active'
    },
    {
      component: 'File Storage',
      status: 'warning',
      uptime: '99.5%',
      lastCheck: '2024-01-15T11:45:00Z',
      details: 'Storage usage: 85% (Warning threshold)'
    },
    {
      component: 'Email Service',
      status: 'healthy',
      uptime: '99.7%',
      lastCheck: '2024-01-15T11:45:00Z',
      details: 'Queue: 12 pending messages'
    },
    {
      component: 'Backup System',
      status: 'healthy',
      uptime: '100%',
      lastCheck: '2024-01-15T11:45:00Z',
      details: 'Last backup: 2024-01-15 02:00 AM'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return ShieldCheckIcon;
      case 'database': return CircleStackIcon;
      case 'notifications': return BellIcon;
      case 'audit': return DocumentTextIcon;
      case 'backup': return ServerIcon;
      case 'performance': return ArrowPathIcon;
      default: return CogIcon;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'active': return 'bg-green-100 text-green-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical':
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getHealthIcon = (status: string) => {
    switch (status) {
      case 'healthy': return CheckCircleIcon;
      case 'warning': return ExclamationTriangleIcon;
      case 'critical': return XCircleIcon;
      default: return ClockIcon;
    }
  };

  const filteredSettings = selectedCategory === 'all' 
    ? systemSettings 
    : systemSettings.filter(setting => setting.category === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleEdit = (setting: SystemSetting) => {
    setEditingId(setting.id);
    setEditValue(setting.value);
  };

  const handleSave = (settingId: string) => {
    setSystemSettings(prev => prev.map(setting => 
      setting.id === settingId 
        ? { 
            ...setting, 
            value: editValue, 
            lastModified: new Date().toISOString(),
            modifiedBy: 'Current User'
          }
        : setting
    ));
    setEditingId(null);
    setEditValue('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditValue('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
              <p className="text-gray-600 mt-2">Configure system-wide settings and monitor system health</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => router.push('/dashboard/commission-admin/system/backup')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <ServerIcon className="h-4 w-4 mr-2" />
                Backup Settings
              </button>
              <button
                onClick={() => router.push('/dashboard/commission-admin/system/audit')}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <DocumentTextIcon className="h-4 w-4 mr-2" />
                View Audit Logs
              </button>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Health</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {systemHealth.map((component, index) => {
                const HealthIcon = getHealthIcon(component.status);
                return (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{component.component}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        getStatusColor(component.status)
                      }`}>
                        {component.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center mb-2">
                      <HealthIcon className={`h-5 w-5 mr-2 ${
                        component.status === 'healthy' ? 'text-green-600' :
                        component.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                      <span className="text-sm text-gray-600">Uptime: {component.uptime}</span>
                    </div>
                    <p className="text-sm text-gray-500">{component.details}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Last check: {formatDate(component.lastCheck)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Settings
              </button>
              {['security', 'database', 'notifications', 'audit', 'performance'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Configuration Settings</h2>
            <div className="space-y-4">
              {filteredSettings.map((setting) => {
                const CategoryIcon = getCategoryIcon(setting.category);
                const isEditing = editingId === setting.id;
                
                return (
                  <div key={setting.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-lg ${
                          setting.category === 'security' ? 'bg-red-100' :
                          setting.category === 'database' ? 'bg-blue-100' :
                          setting.category === 'notifications' ? 'bg-yellow-100' :
                          setting.category === 'audit' ? 'bg-green-100' :
                          setting.category === 'performance' ? 'bg-purple-100' : 'bg-gray-100'
                        }`}>
                          <CategoryIcon className={`h-5 w-5 ${
                            setting.category === 'security' ? 'text-red-600' :
                            setting.category === 'database' ? 'text-blue-600' :
                            setting.category === 'notifications' ? 'text-yellow-600' :
                            setting.category === 'audit' ? 'text-green-600' :
                            setting.category === 'performance' ? 'text-purple-600' : 'text-gray-600'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium text-gray-900">{setting.name}</h3>
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              getStatusColor(setting.status)
                            }`}>
                              {setting.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mb-3">{setting.description}</p>
                          
                          {/* Value Display/Edit */}
                          <div className="mb-3">
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                {setting.type === 'boolean' ? (
                                  <select
                                    value={editValue.toString()}
                                    onChange={(e) => setEditValue(e.target.value === 'true')}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    <option value="true">Enabled</option>
                                    <option value="false">Disabled</option>
                                  </select>
                                ) : setting.type === 'select' ? (
                                  <select
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  >
                                    {setting.options?.map((option) => (
                                      <option key={option} value={option}>{option}</option>
                                    ))}
                                  </select>
                                ) : (
                                  <input
                                    type={setting.type === 'number' ? 'number' : 'text'}
                                    value={editValue}
                                    onChange={(e) => setEditValue(
                                      setting.type === 'number' ? parseInt(e.target.value) : e.target.value
                                    )}
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                                  />
                                )}
                                <button
                                  onClick={() => handleSave(setting.id)}
                                  className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                                >
                                  Save
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-3 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900">
                                  {setting.type === 'boolean' 
                                    ? (setting.value ? 'Enabled' : 'Disabled')
                                    : setting.value.toString()
                                  }
                                </span>
                                <button
                                  onClick={() => handleEdit(setting)}
                                  className="p-1 text-gray-400 hover:text-gray-600"
                                >
                                  <PencilIcon className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                          
                          <div className="text-xs text-gray-500">
                            <p>Last modified: {formatDate(setting.lastModified)} by {setting.modifiedBy}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">System Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => router.push('/dashboard/commission-admin/system/backup')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ServerIcon className="h-8 w-8 text-blue-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">System Backup</p>
                  <p className="text-sm text-gray-500">Create system backup</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/system/maintenance')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <CogIcon className="h-8 w-8 text-yellow-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Enable maintenance mode</p>
                </div>
              </button>
              
              <button
                onClick={() => router.push('/dashboard/commission-admin/system/logs')}
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="h-8 w-8 text-green-600 mr-3" />
                <div className="text-left">
                  <p className="font-medium text-gray-900">System Logs</p>
                  <p className="text-sm text-gray-500">View system logs</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}