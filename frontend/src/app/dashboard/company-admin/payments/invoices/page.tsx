'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  DocumentTextIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowLeftIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

const invoiceData = [
  {
    id: 'INV-2024-001',
    invoice_number: 'UTS-INV-001',
    description: 'Work Permit Application Fees',
    amount: 2500.00,
    currency: 'GHS',
    issue_date: '2024-01-15',
    due_date: '2024-02-14',
    status: 'paid',
    payment_date: '2024-01-20',
    payment_method: 'Bank Transfer',
    category: 'permits',
    reference: 'WP-2024-0156'
  },
  {
    id: 'INV-2024-002',
    invoice_number: 'UTS-INV-002',
    description: 'Environmental Compliance Assessment',
    amount: 5000.00,
    currency: 'GHS',
    issue_date: '2024-01-10',
    due_date: '2024-02-09',
    status: 'overdue',
    payment_date: null,
    payment_method: null,
    category: 'compliance',
    reference: 'ENV-2024-0089'
  },
  {
    id: 'INV-2024-003',
    invoice_number: 'UTS-INV-003',
    description: 'Local Content Training Program',
    amount: 3200.00,
    currency: 'GHS',
    issue_date: '2024-01-12',
    due_date: '2024-02-11',
    status: 'pending',
    payment_date: null,
    payment_method: null,
    category: 'training',
    reference: 'LC-TRN-2024-0023'
  },
  {
    id: 'INV-2024-004',
    invoice_number: 'UTS-INV-004',
    description: 'Safety Audit and Certification',
    amount: 4500.00,
    currency: 'GHS',
    issue_date: '2024-01-08',
    due_date: '2024-02-07',
    status: 'paid',
    payment_date: '2024-01-25',
    payment_method: 'Credit Card',
    category: 'safety',
    reference: 'SA-2024-0067'
  },
  {
    id: 'INV-2024-005',
    invoice_number: 'UTS-INV-005',
    description: 'Joint Venture Registration Fees',
    amount: 1800.00,
    currency: 'GHS',
    issue_date: '2024-01-14',
    due_date: '2024-02-13',
    status: 'pending',
    payment_date: null,
    payment_method: null,
    category: 'registration',
    reference: 'JV-2024-0034'
  },
  {
    id: 'INV-2024-006',
    invoice_number: 'UTS-INV-006',
    description: 'Personnel Permit Processing',
    amount: 3600.00,
    currency: 'GHS',
    issue_date: '2024-01-11',
    due_date: '2024-02-10',
    status: 'paid',
    payment_date: '2024-01-28',
    payment_method: 'Bank Transfer',
    category: 'permits',
    reference: 'PP-2024-0145'
  },
  {
    id: 'INV-2024-007',
    invoice_number: 'UTS-INV-007',
    description: 'Quarterly Compliance Review',
    amount: 2800.00,
    currency: 'GHS',
    issue_date: '2024-01-13',
    due_date: '2024-02-12',
    status: 'pending',
    payment_date: null,
    payment_method: null,
    category: 'compliance',
    reference: 'QCR-2024-0012'
  },
  {
    id: 'INV-2024-008',
    invoice_number: 'UTS-INV-008',
    description: 'Immigration Document Processing',
    amount: 1200.00,
    currency: 'GHS',
    issue_date: '2024-01-09',
    due_date: '2024-02-08',
    status: 'paid',
    payment_date: '2024-01-22',
    payment_method: 'Online Payment',
    category: 'immigration',
    reference: 'IMG-2024-0078'
  }
];

const paymentSummary = {
  total_invoices: invoiceData.length,
  total_amount: invoiceData.reduce((sum, inv) => sum + inv.amount, 0),
  paid_amount: invoiceData.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
  pending_amount: invoiceData.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
  overdue_amount: invoiceData.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
};

export default function InvoicesPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-yellow-500" />;
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { bg: 'bg-green-100', text: 'text-green-800', label: 'Paid' },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' },
      overdue: { bg: 'bg-red-100', text: 'text-red-800', label: 'Overdue' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        {config.label}
      </span>
    );
  };

  const filteredInvoices = invoiceData.filter(invoice => {
    const matchesSearch = invoice.invoice_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || invoice.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const downloadInvoice = (invoice: any) => {
    // Simulate invoice download
    const invoiceData = {
      ...invoice,
      company: 'Your Company Name',
      address: '123 Business Street, Accra, Ghana',
      generated: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${invoice.invoice_number}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const viewInvoiceDetails = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Invoices</h1>
                <p className="text-gray-600 mt-1">Manage and track your payment invoices</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">{paymentSummary.total_invoices}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Paid Amount</p>
                <p className="text-2xl font-bold text-gray-900">GH₵{paymentSummary.paid_amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClockIcon className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending Amount</p>
                <p className="text-2xl font-bold text-gray-900">GH₵{paymentSummary.pending_amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Overdue Amount</p>
                <p className="text-2xl font-bold text-gray-900">GH₵{paymentSummary.overdue_amount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="permits">Permits</option>
                <option value="compliance">Compliance</option>
                <option value="training">Training</option>
                <option value="safety">Safety</option>
                <option value="registration">Registration</option>
                <option value="immigration">Immigration</option>
              </select>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
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
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(invoice.status)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
                          <div className="text-sm text-gray-500">{invoice.reference}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{invoice.description}</div>
                      <div className="text-sm text-gray-500 capitalize">{invoice.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {invoice.currency} {invoice.amount.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(invoice.due_date).toLocaleDateString()}
                      </div>
                      {invoice.payment_date && (
                        <div className="text-sm text-gray-500">
                          Paid: {new Date(invoice.payment_date).toLocaleDateString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(invoice.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => viewInvoiceDetails(invoice)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="View Details"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => downloadInvoice(invoice)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Download Invoice"
                        >
                          <ArrowDownTrayIcon className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Invoice Details Modal */}
        {showInvoiceModal && selectedInvoice && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Invoice Details</h3>
                  <button
                    onClick={() => setShowInvoiceModal(false)}
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
                      <p className="mt-1 text-sm text-gray-900">{selectedInvoice.invoice_number}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Reference</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedInvoice.reference}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <p className="mt-1 text-sm text-gray-900">{selectedInvoice.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Amount</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {selectedInvoice.currency} {selectedInvoice.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedInvoice.status)}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Issue Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedInvoice.issue_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Due Date</label>
                      <p className="mt-1 text-sm text-gray-900">
                        {new Date(selectedInvoice.due_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  {selectedInvoice.payment_date && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Date</label>
                        <p className="mt-1 text-sm text-gray-900">
                          {new Date(selectedInvoice.payment_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedInvoice.payment_method}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => downloadInvoice(selectedInvoice)}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <ArrowDownTrayIcon className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button
                    onClick={() => setShowInvoiceModal(false)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}