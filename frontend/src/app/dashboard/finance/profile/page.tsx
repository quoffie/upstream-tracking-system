'use client';

import React, { useState, ChangeEvent } from 'react';
import DashboardLayout from '../../../../app/components/layouts/DashboardLayout';
import {
  HomeIcon,
  PaymentIcon,
  AnalyticsIcon,
  DocumentIcon,
  HistoryIcon,
  NotificationIcon,
  ProfileIcon,
  SupportIcon,
  CalculatorIcon
} from '../../../components/icons/DashboardIcons';

export default function ProfileSettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [currentView, setCurrentView] = useState('profile'); // 'profile', 'security', 'preferences'

  const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard/finance', icon: HomeIcon, current: activeTab === 'overview' },
    { name: 'Payment Processing', href: '/dashboard/finance/payments', icon: PaymentIcon, current: activeTab === 'payments' },
    { name: 'Payment Verification', href: '/dashboard/finance/verification', icon: DocumentIcon, current: activeTab === 'verification' },
    { name: 'Revenue Analytics', href: '/dashboard/finance/analytics', icon: AnalyticsIcon, current: activeTab === 'analytics' },
    { name: 'Invoices & Receipts', href: '/dashboard/finance/invoices', icon: DocumentIcon, current: activeTab === 'invoices' },
    { name: 'Fee Management', href: '/dashboard/finance/fees', icon: CalculatorIcon, current: activeTab === 'fees' },
    { name: 'Transaction History', href: '/dashboard/finance/history', icon: HistoryIcon, current: activeTab === 'history' },
    { name: 'Audit Logs', href: '/dashboard/finance/audit', icon: HistoryIcon, current: activeTab === 'audit' },
    { name: 'Notifications', href: '/dashboard/finance/notifications', icon: NotificationIcon, current: activeTab === 'notifications' },
    { name: 'Profile/Settings', href: '/dashboard/finance/profile', icon: ProfileIcon, current: activeTab === 'profile' },
    { name: 'Help/Support', href: '/dashboard/finance/support', icon: SupportIcon, current: activeTab === 'support' },
  ];

  // Mock user data
  const userData = {
    name: 'Michael Addo',
    email: 'michael.addo@pc.gov.gh',
    role: 'Finance Officer',
    department: 'Finance Department',
    employeeId: 'FIN-2021-045',
    phone: '+233 20 123 4567',
    joinDate: 'January 15, 2021',
    lastLogin: 'May 31, 2023 14:22:45',
    profileImage: null // No image for now
  };

  // Form state for profile information
  const [profileForm, setProfileForm] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    department: userData.department
  });

  // Form state for security settings
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Form state for preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    smsNotifications: false,
    darkMode: false,
    language: 'english',
    timezone: 'GMT'
  });

  // Handle profile form changes
  const handleProfileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm({
      ...profileForm,
      [name]: value
    });
  };

  // Handle security form changes
  const handleSecurityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm({
      ...securityForm,
      [name]: value
    });
  };

  // Handle preference changes
  const handlePreferenceChange = (name: string, value: boolean | string) => {
    setPreferences({
      ...preferences,
      [name]: value
    });
  };

  // Handle form submissions
  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call
    alert('Profile updated successfully');
  };

  const handleSecuritySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate passwords
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    // In a real application, this would make an API call
    alert('Password updated successfully');
    setSecurityForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePreferencesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would make an API call
    alert('Preferences updated successfully');
  };

  return (
    <DashboardLayout
      title="Finance Officer Dashboard"
      userRole="Finance Officer"
      userName="Michael Addo"
      userInitials="MA"
      sidebarItems={sidebarItems}
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Profile & Settings</h2>
            </div>
          </div>
          
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setCurrentView('profile')} 
              className={`px-6 py-3 text-sm font-medium ${currentView === 'profile' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Profile Information
            </button>
            <button 
              onClick={() => setCurrentView('security')} 
              className={`px-6 py-3 text-sm font-medium ${currentView === 'security' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Security
            </button>
            <button 
              onClick={() => setCurrentView('preferences')} 
              className={`px-6 py-3 text-sm font-medium ${currentView === 'preferences' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Preferences
            </button>
          </div>
          
          <div className="p-6">
            {currentView === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      {userData.profileImage ? (
                        <img 
                          src={userData.profileImage} 
                          alt="Profile" 
                          className="h-32 w-32 rounded-full object-cover border-4 border-white shadow"
                        />
                      ) : (
                        <div className="h-32 w-32 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-semibold border-4 border-white shadow">
                          {userData.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                      <button className="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">{userData.name}</h3>
                    <p className="text-sm text-gray-500">{userData.role}</p>
                    <div className="text-sm text-gray-500">
                      <p>Employee ID: {userData.employeeId}</p>
                      <p>Joined: {userData.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-900">Account Information</h4>
                    <dl className="mt-2 space-y-3 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Last login</dt>
                        <dd className="text-gray-900">{userData.lastLogin}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Account status</dt>
                        <dd className="text-green-600">Active</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Two-factor auth</dt>
                        <dd className="text-red-600">Not enabled</dd>
                      </div>
                    </dl>
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                        <p className="mt-1 text-sm text-gray-500">Update your personal information and contact details.</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                          <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            value={profileForm.name}
                            onChange={handleProfileChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                          <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={profileForm.email}
                            onChange={handleProfileChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                          <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={profileForm.phone}
                            onChange={handleProfileChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700">Department</label>
                          <input 
                            type="text" 
                            id="department" 
                            name="department" 
                            value={profileForm.department}
                            onChange={handleProfileChange}
                            className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button 
                          type="submit" 
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
            
            {currentView === 'security' && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                  <p className="mt-1 text-sm text-gray-500">Update your password and security preferences.</p>
                </div>
                
                <form onSubmit={handleSecuritySubmit} className="space-y-6">
                  <div>
                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input 
                      type="password" 
                      id="currentPassword" 
                      name="currentPassword" 
                      value={securityForm.currentPassword}
                      onChange={handleSecurityChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">New Password</label>
                    <input 
                      type="password" 
                      id="newPassword" 
                      name="newPassword" 
                      value={securityForm.newPassword}
                      onChange={handleSecurityChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">Password must be at least 8 characters and include a number and a special character.</p>
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input 
                      type="password" 
                      id="confirmPassword" 
                      name="confirmPassword" 
                      value={securityForm.confirmPassword}
                      onChange={handleSecurityChange}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        <p className="text-xs text-red-600 mt-1">Not enabled</p>
                      </div>
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300"
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Session Management</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">Manage your active sessions</p>
                        <p className="text-xs text-gray-500 mt-1">Last active: {userData.lastLogin}</p>
                      </div>
                      <button 
                        type="button" 
                        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700"
                      >
                        Sign Out All Devices
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Update Password
                    </button>
                  </div>
                </form>
              </div>
            )}
            
            {currentView === 'preferences' && (
              <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900">User Preferences</h3>
                  <p className="mt-1 text-sm text-gray-500">Customize your experience and notification settings.</p>
                </div>
                
                <form onSubmit={handlePreferencesSubmit} className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Notification Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900">Email Notifications</p>
                          <p className="text-xs text-gray-500">Receive email notifications for important events</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handlePreferenceChange('emailNotifications', !preferences.emailNotifications)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${preferences.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`${preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900">SMS Notifications</p>
                          <p className="text-xs text-gray-500">Receive text message alerts for critical updates</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handlePreferenceChange('smsNotifications', !preferences.smsNotifications)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${preferences.smsNotifications ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`${preferences.smsNotifications ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="text-sm font-medium text-gray-900 mb-4">Display Preferences</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-900">Dark Mode</p>
                          <p className="text-xs text-gray-500">Use dark theme for the dashboard</p>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => handlePreferenceChange('darkMode', !preferences.darkMode)}
                          className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${preferences.darkMode ? 'bg-blue-600' : 'bg-gray-200'}`}
                        >
                          <span className={`${preferences.darkMode ? 'translate-x-5' : 'translate-x-0'} inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200`}></span>
                        </button>
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
                        <select 
                          id="language" 
                          name="language" 
                          value={preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="english">English</option>
                          <option value="french">French</option>
                          <option value="spanish">Spanish</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
                        <select 
                          id="timezone" 
                          name="timezone" 
                          value={preferences.timezone}
                          onChange={(e) => handlePreferenceChange('timezone', e.target.value)}
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        >
                          <option value="GMT">GMT (Greenwich Mean Time)</option>
                          <option value="EST">EST (Eastern Standard Time)</option>
                          <option value="CST">CST (Central Standard Time)</option>
                          <option value="PST">PST (Pacific Standard Time)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}