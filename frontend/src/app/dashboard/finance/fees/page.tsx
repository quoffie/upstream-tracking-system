'use client';

import { useState } from 'react';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
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

export default function FeeManagementPage() {
  const [activeTab, setActiveTab] = useState('fees');
  const [currentView, setCurrentView] = useState('fee-structure'); // 'fee-structure' or 'calculator'

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

  // Mock data for fee structure
  const feeStructure = [
    { id: 1, category: 'Application', type: 'New Application', amount: '₵2,500', lastUpdated: 'Jan 15, 2023' },
    { id: 2, category: 'Permit', type: 'Standard Permit', amount: '₵5,000', lastUpdated: 'Jan 15, 2023' },
    { id: 3, category: 'Permit', type: 'Expedited Permit', amount: '₵7,500', lastUpdated: 'Feb 20, 2023' },
    { id: 4, category: 'Renewal', type: 'Standard Renewal', amount: '₵3,500', lastUpdated: 'Jan 15, 2023' },
    { id: 5, category: 'Renewal', type: 'Late Renewal', amount: '₵4,500', lastUpdated: 'Mar 10, 2023' },
    { id: 6, category: 'Penalty', type: 'Late Payment', amount: '₵500', lastUpdated: 'Jan 15, 2023' },
    { id: 7, category: 'Penalty', type: 'Non-Compliance', amount: '₵1,000', lastUpdated: 'Jan 15, 2023' },
  ];

  // Mock data for calculator presets
  const calculatorPresets = [
    { id: 1, name: 'Standard Application + Permit', description: 'New application with standard permit', amount: '₵7,500' },
    { id: 2, name: 'Expedited Processing', description: 'New application with expedited permit', amount: '₵10,000' },
    { id: 3, name: 'Standard Renewal', description: 'Regular permit renewal', amount: '₵3,500' },
    { id: 4, name: 'Late Renewal with Penalty', description: 'Late renewal with penalty fee', amount: '₵5,000' },
  ];

  // State for fee calculator
  const [calculatedFee, setCalculatedFee] = useState<number | null>(null);
  const [calculatorInputs, setCalculatorInputs] = useState({
    applicationType: '',
    permitType: '',
    isExpedited: false,
    isLate: false,
    additionalFees: [] as string[]
  });

  const handleCalculate = () => {
    // Simple calculation logic for demo purposes
    let total = 0;
    
    if (calculatorInputs.applicationType === 'new') {
      total += 2500; // New application fee
    } else if (calculatorInputs.applicationType === 'renewal') {
      total += 3500; // Renewal fee
    }
    
    if (calculatorInputs.permitType === 'standard') {
      total += 5000; // Standard permit fee
    } else if (calculatorInputs.permitType === 'special') {
      total += 6000; // Special permit fee
    }
    
    if (calculatorInputs.isExpedited) {
      total += 2500; // Expedited processing fee
    }
    
    if (calculatorInputs.isLate) {
      total += 500; // Late fee
    }
    
    // Add any additional fees
    calculatorInputs.additionalFees.forEach(fee => {
      if (fee === 'admin') total += 200;
      if (fee === 'processing') total += 300;
    });
    
    setCalculatedFee(total);
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
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Fee Management</h2>
            <div className="flex space-x-2">
              <button 
                onClick={() => setCurrentView('fee-structure')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentView === 'fee-structure' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Fee Structure
              </button>
              <button 
                onClick={() => setCurrentView('calculator')} 
                className={`px-4 py-2 text-sm font-medium rounded-md ${currentView === 'calculator' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
              >
                Fee Calculator
              </button>
            </div>
          </div>
          
          {currentView === 'fee-structure' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Current Fee Structure</h3>
                  <p className="text-sm text-gray-500">Manage and update fee amounts for different categories</p>
                </div>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700">
                    Update Fee Structure
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {feeStructure.map((fee) => (
                      <tr key={fee.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{fee.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.type}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.amount}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.lastUpdated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                          <button className="text-red-600 hover:text-red-900">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Fee</h3>
                <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <select id="category" name="category" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                      <option>Select category</option>
                      <option>Application</option>
                      <option>Permit</option>
                      <option>Renewal</option>
                      <option>Penalty</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="feeType" className="block text-sm font-medium text-gray-700 mb-1">Fee Type</label>
                    <input type="text" id="feeType" name="feeType" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="Enter fee type" />
                  </div>
                  
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (₵)</label>
                    <input type="text" id="amount" name="amount" className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
                  </div>
                  
                  <div className="flex items-end">
                    <button type="submit" className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 w-full">
                      Add Fee
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {currentView === 'calculator' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Fee Calculator</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="applicationType" className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                    <select 
                      id="applicationType" 
                      name="applicationType" 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={calculatorInputs.applicationType}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, applicationType: e.target.value})}
                    >
                      <option value="">Select application type</option>
                      <option value="new">New Application</option>
                      <option value="renewal">Renewal</option>
                      <option value="amendment">Amendment</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="permitType" className="block text-sm font-medium text-gray-700 mb-1">Permit Type</label>
                    <select 
                      id="permitType" 
                      name="permitType" 
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      value={calculatorInputs.permitType}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, permitType: e.target.value})}
                    >
                      <option value="">Select permit type</option>
                      <option value="standard">Standard Permit</option>
                      <option value="special">Special Permit</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="isExpedited" 
                      name="isExpedited" 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={calculatorInputs.isExpedited}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, isExpedited: e.target.checked})}
                    />
                    <label htmlFor="isExpedited" className="ml-2 block text-sm text-gray-900">
                      Expedited Processing (+₵2,500)
                    </label>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      id="isLate" 
                      name="isLate" 
                      type="checkbox" 
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      checked={calculatorInputs.isLate}
                      onChange={(e) => setCalculatorInputs({...calculatorInputs, isLate: e.target.checked})}
                    />
                    <label htmlFor="isLate" className="ml-2 block text-sm text-gray-900">
                      Late Application/Renewal (+₵500)
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Additional Fees</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <input 
                          id="adminFee" 
                          name="adminFee" 
                          type="checkbox" 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={calculatorInputs.additionalFees.includes('admin')}
                          onChange={(e) => {
                            const newFees = e.target.checked 
                              ? [...calculatorInputs.additionalFees, 'admin']
                              : calculatorInputs.additionalFees.filter(f => f !== 'admin');
                            setCalculatorInputs({...calculatorInputs, additionalFees: newFees});
                          }}
                        />
                        <label htmlFor="adminFee" className="ml-2 block text-sm text-gray-900">
                          Administrative Fee (+₵200)
                        </label>
                      </div>
                      
                      <div className="flex items-center">
                        <input 
                          id="processingFee" 
                          name="processingFee" 
                          type="checkbox" 
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          checked={calculatorInputs.additionalFees.includes('processing')}
                          onChange={(e) => {
                            const newFees = e.target.checked 
                              ? [...calculatorInputs.additionalFees, 'processing']
                              : calculatorInputs.additionalFees.filter(f => f !== 'processing');
                            setCalculatorInputs({...calculatorInputs, additionalFees: newFees});
                          }}
                        />
                        <label htmlFor="processingFee" className="ml-2 block text-sm text-gray-900">
                          Processing Fee (+₵300)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button 
                      type="button" 
                      className="w-full px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700"
                      onClick={handleCalculate}
                    >
                      Calculate Fee
                    </button>
                  </div>
                  
                  {calculatedFee !== null && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-md">
                      <h4 className="text-lg font-medium text-gray-900">Calculated Fee</h4>
                      <p className="text-3xl font-bold text-blue-600">₵{calculatedFee.toLocaleString()}</p>
                      <div className="mt-2 flex justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-900">Generate Invoice</button>
                        <button className="text-sm text-blue-600 hover:text-blue-900">Save Calculation</button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preset Calculations</h3>
                <div className="space-y-4">
                  {calculatorPresets.map((preset) => (
                    <div key={preset.id} className="p-4 border border-gray-200 rounded-md hover:border-blue-500 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">{preset.name}</h4>
                          <p className="text-sm text-gray-500">{preset.description}</p>
                        </div>
                        <span className="text-lg font-semibold text-blue-600">{preset.amount}</span>
                      </div>
                      <div className="mt-2 flex justify-end space-x-2">
                        <button className="text-sm text-blue-600 hover:text-blue-900">Apply</button>
                        <button className="text-sm text-blue-600 hover:text-blue-900">Generate Invoice</button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="p-4 border border-dashed border-gray-300 rounded-md hover:border-blue-500 transition-colors">
                    <div className="flex justify-center items-center h-16">
                      <button className="text-blue-600 hover:text-blue-900 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Add New Preset
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}