'use client';

import { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  ClockIcon,
  BellIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';

interface OutstandingPayment {
  id: string;
  invoiceNumber: string;
  company: string;
  amount: number;
  currency: string;
  dueDate: string;
  daysPastDue: number;
  type: 'permit_fee' | 'registration' | 'penalty' | 'renewal';
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  lastReminderSent: string | null;
  reminderCount: number;
}

export default function OutstandingPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [overdueFilter, setOverdueFilter] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState<OutstandingPayment | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [reminderMessage, setReminderMessage] = useState('');

  // Mock data
  const outstandingPayments: OutstandingPayment[] = [
    {
      id: 'OUT-2024-001',
      invoiceNumber: 'INV-2024-001',
      company: 'Ghana Oil Company Ltd',
      amount: 25000,
      currency: 'GHS',
      dueDate: '2024-01-10',
      daysPastDue: 5,
      type: 'permit_fee',
      priority: 'high',
      description: 'Exploration Permit Fee - Block A',
      contactPerson: 'John Mensah',
      contactEmail: 'john.mensah@ghanaoil.com',
      contactPhone: '+233-24-123-4567',
      lastReminderSent: '2024-01-12',
      reminderCount: 2
    },
    {
      id: 'OUT-2024-002',
      invoiceNumber: 'INV-2024-002',
      company: 'Tullow Ghana Limited',
      amount: 15000,
      currency: 'GHS',
      dueDate: '2024-01-08',
      daysPastDue: 7,
      type: 'registration',
      priority: 'critical',
      description: 'Company Registration Fee',
      contactPerson: 'Sarah Johnson',
      contactEmail: 'sarah.johnson@tullow.com',
      contactPhone: '+233-30-234-5678',
      lastReminderSent: '2024-01-10',
      reminderCount: 3
    },
    {
      id: 'OUT-2024-003',
      invoiceNumber: 'INV-2024-003',
      company: 'Eni Ghana Exploration',
      amount: 5000,
      currency: 'GHS',
      dueDate: '2024-01-12',
      daysPastDue: 3,
      type: 'penalty',
      priority: 'medium',
      description: 'Late Submission Penalty',
      contactPerson: 'Marco Rossi',
      contactEmail: 'marco.rossi@eni.com',
      contactPhone: '+233-21-345-6789',
      lastReminderSent: null,
      reminderCount: 0
    },
    {
      id: 'OUT-2024-004',
      invoiceNumber: 'INV-2024-004',
      company: 'Kosmos Energy Ghana',
      amount: 12000,
      currency: 'GHS',
      dueDate: '2024-01-15',
      daysPastDue: 0,
      type: 'renewal',
      priority: 'low',
      description: 'Permit Renewal Fee - Block B',
      contactPerson: 'David Wilson',
      contactEmail: 'david.wilson@kosmos.com',
      contactPhone: '+233-24-456-7890',
      lastReminderSent: '2024-01-14',
      reminderCount: 1
    },
    {
      id: 'OUT-2024-005',
      invoiceNumber: 'INV-2024-005',
      company: 'Springfield E&P Limited',
      amount: 8000,
      currency: 'GHS',
      dueDate: '2024-01-05',
      daysPastDue: 10,
      type: 'permit_fee',
      priority: 'critical',
      description: 'Personnel Permit Fee',
      contactPerson: 'Kwame Asante',
      contactEmail: 'kwame.asante@springfield.com',
      contactPhone: '+233-20-567-8901',
      lastReminderSent: '2024-01-08',
      reminderCount: 4
    }
  ];

  const filteredPayments = outstandingPayments.filter(payment => {
    const matchesSearch = payment.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || payment.priority === priorityFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    const matchesOverdue = overdueFilter === 'all' || 
                          (overdueFilter === 'overdue' && payment.daysPastDue > 0) ||
                          (overdueFilter === 'due_today' && payment.daysPastDue === 0);
    
    return matchesSearch && matchesPriority && matchesType && matchesOverdue;
  });

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-orange-100 text-orange-800',
      critical: 'bg-red-100 text-red-800'
    };
    return priorityConfig[priority as keyof typeof priorityConfig] || 'bg-gray-100 text-gray-800';
  };

  const getOverdueStatus = (daysPastDue: number) => {
    if (daysPastDue > 0) {
      return {
        text: `${daysPastDue} days overdue`,
        className: 'text-red-600',
        icon: <ExclamationTriangleIcon className="h-4 w-4" />
      };
    } else if (daysPastDue === 0) {
      return {
        text: 'Due today',
        className: 'text-orange-600',
        icon: <ClockIcon className="h-4 w-4" />
      };
    } else {
      return {
        text: `Due in ${Math.abs(daysPastDue)} days`,
        className: 'text-green-600',
        icon: <CheckCircleIcon className="h-4 w-4" />
      };
    }
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      permit_fee: 'Permit Fee',
      registration: 'Registration',
      penalty: 'Penalty',
      renewal: 'Renewal'
    };
    return labels[type as keyof typeof labels] || type;
  };

  const formatCurrency = (amount: number, currency: string = 'GHS') => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewDetails = (payment: OutstandingPayment) => {
    setSelectedPayment(payment);
    setShowModal(true);
  };

  const handleSendReminder = (payment: OutstandingPayment) => {
    setSelectedPayment(payment);
    setReminderMessage(`Dear ${payment.contactPerson},\n\nThis is a reminder that payment for ${payment.description} (Invoice: ${payment.invoiceNumber}) is ${payment.daysPastDue > 0 ? 'overdue' : 'due today'}.\n\nAmount: ${formatCurrency(payment.amount, payment.currency)}\nDue Date: ${formatDate(payment.dueDate)}\n\nPlease arrange for payment at your earliest convenience.\n\nBest regards,\nPetroleum Commission`);
    setShowReminderModal(true);
  };

  const handleExport = () => {
    // Mock export functionality
    const csvContent = [
      ['Invoice', 'Company', 'Amount', 'Due Date', 'Days Past Due', 'Priority', 'Type', 'Contact Person', 'Contact Email'].join(','),
      ...filteredPayments.map(p => [
        p.invoiceNumber,
        p.company,
        `${p.currency} ${p.amount}`,
        formatDate(p.dueDate),
        p.daysPastDue.toString(),
        p.priority,
        getTypeLabel(p.type),
        p.contactPerson,
        p.contactEmail
      ].join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'outstanding-payments.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const totalOutstanding = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const overdueCount = filteredPayments.filter(p => p.daysPastDue > 0).length;
  const criticalCount = filteredPayments.filter(p => p.priority === 'critical').length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Outstanding Payments</h1>
          <p className="text-gray-600 mt-1">Track and manage overdue payments</p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
          Export
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalOutstanding)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Overdue Payments</p>
              <p className="text-2xl font-bold text-gray-900">{overdueCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-orange-50 rounded-lg">
              <BellIcon className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Critical Priority</p>
              <p className="text-2xl font-bold text-gray-900">{criticalCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search payments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="permit_fee">Permit Fee</option>
            <option value="registration">Registration</option>
            <option value="penalty">Penalty</option>
            <option value="renewal">Renewal</option>
          </select>

          {/* Overdue Filter */}
          <select
            value={overdueFilter}
            onChange={(e) => setOverdueFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="overdue">Overdue Only</option>
            <option value="due_today">Due Today</option>
          </select>

          {/* Clear Filters */}
          <button
            onClick={() => {
              setSearchTerm('');
              setPriorityFilter('all');
              setTypeFilter('all');
              setOverdueFilter('all');
            }}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FunnelIcon className="h-5 w-5 mr-2" />
            Clear
          </button>
        </div>
      </div>

      {/* Outstanding Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => {
                const overdueStatus = getOverdueStatus(payment.daysPastDue);
                return (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.invoiceNumber}</div>
                      <div className="text-sm text-gray-500">{payment.id}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{payment.company}</div>
                      <div className="text-sm text-gray-500">{payment.contactPerson}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(payment.amount, payment.currency)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{formatDate(payment.dueDate)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm font-medium ${overdueStatus.className}`}>
                        {overdueStatus.icon}
                        <span className="ml-1">{overdueStatus.text}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        getPriorityBadge(payment.priority)
                      }`}>
                        {payment.priority.charAt(0).toUpperCase() + payment.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {getTypeLabel(payment.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleViewDetails(payment)}
                          className="text-blue-600 hover:text-blue-900 flex items-center"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleSendReminder(payment)}
                          className="text-orange-600 hover:text-orange-900 flex items-center"
                        >
                          <BellIcon className="h-4 w-4 mr-1" />
                          Remind
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredPayments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No outstanding payments found</div>
            <div className="text-gray-400 text-sm mt-1">Try adjusting your search criteria</div>
          </div>
        )}
      </div>

      {/* Payment Details Modal */}
      {showModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Payment Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Invoice Number</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPayment.invoiceNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Payment ID</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedPayment.id}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.company}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Amount</label>
                    <p className="mt-1 text-sm text-gray-900">
                      {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                    <p className="mt-1 text-sm text-gray-900">{formatDate(selectedPayment.dueDate)}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      getPriorityBadge(selectedPayment.priority)
                    }`}>
                      {selectedPayment.priority.charAt(0).toUpperCase() + selectedPayment.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Type</label>
                    <p className="mt-1 text-sm text-gray-900">{getTypeLabel(selectedPayment.type)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-1 text-sm text-gray-900">{selectedPayment.description}</p>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                  <div className="grid grid-cols-1 gap-2">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Contact Person: </span>
                      <span className="text-sm text-gray-900">{selectedPayment.contactPerson}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Email: </span>
                      <span className="text-sm text-gray-900">{selectedPayment.contactEmail}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Phone: </span>
                      <span className="text-sm text-gray-900">{selectedPayment.contactPhone}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Reminder History</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm font-medium text-gray-500">Reminders Sent: </span>
                      <span className="text-sm text-gray-900">{selectedPayment.reminderCount}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-gray-500">Last Reminder: </span>
                      <span className="text-sm text-gray-900">
                        {selectedPayment.lastReminderSent ? formatDate(selectedPayment.lastReminderSent) : 'Never'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    handleSendReminder(selectedPayment);
                  }}
                  className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Send Reminder
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Reminder Modal */}
      {showReminderModal && selectedPayment && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Send Payment Reminder</h3>
                <button
                  onClick={() => setShowReminderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedPayment.contactPerson} ({selectedPayment.contactEmail})
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subject</label>
                  <p className="mt-1 text-sm text-gray-900">
                    Payment Reminder - {selectedPayment.invoiceNumber}
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    rows={8}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => {
                    // Mock send reminder functionality
                    alert('Reminder sent successfully!');
                    setShowReminderModal(false);
                    setReminderMessage('');
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send Reminder
                </button>
                <button
                  onClick={() => {
                    setShowReminderModal(false);
                    setReminderMessage('');
                  }}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}