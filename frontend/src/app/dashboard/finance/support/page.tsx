'use client';

import React, { useState, ChangeEvent } from 'react';
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

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState('support');
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

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

  // Mock FAQs data
  const faqs = [
    {
      id: 1,
      question: 'How do I verify a payment receipt?',
      answer: 'To verify a payment receipt, navigate to the Payment Verification page, select the pending receipt from the queue, review the attached documentation, cross-reference with the bank statement, and click "Verify" if everything matches. If there are discrepancies, click "Request Clarification" and provide details about the issue.'
    },
    {
      id: 2,
      question: 'What should I do if the payment amount doesn\'t match the invoice?',
      answer: 'If the payment amount doesn\'t match the invoice, you should: 1) Check if there are any approved fee adjustments or waivers, 2) Verify if multiple payments were made for the same invoice, 3) Contact the company for clarification, 4) Document the discrepancy in the system, and 5) If needed, request additional payment or process a refund.'
    },
    {
      id: 3,
      question: 'How can I generate a custom financial report?',
      answer: 'To generate a custom financial report, go to the Revenue Analytics page, click on "Generate Report" button, select the report type, specify the date range and other parameters, choose the data fields to include, select the output format (PDF, Excel, CSV), and click "Generate". The report will be prepared and available for download.'
    },
    {
      id: 4,
      question: 'How do I update fee structures in the system?',
      answer: 'To update fee structures, navigate to the Fee Management page, select the "Fee Structures" tab, click "Edit" next to the fee type you want to modify, enter the new fee amount and effective date, provide a reason for the change, and click "Save Changes". The system will apply the new fees to applications submitted after the effective date.'
    },
    {
      id: 5,
      question: 'What is the process for handling refund requests?',
      answer: 'For refund requests, verify the original payment in the Transaction History, create a new refund transaction in the system, document the reason for the refund, get approval from your supervisor if required, process the refund through the appropriate financial channel, and update the transaction status once the refund is complete. Send a notification to the applicant about the processed refund.'
    },
    {
      id: 6,
      question: 'How do I track overdue payments?',
      answer: 'To track overdue payments, go to the Dashboard home page and check the "Overdue Payments" section. You can also use the Transaction History page and filter by "Status: Overdue". The system automatically flags payments that are past their due date. You can send payment reminders directly from the system by selecting the overdue item and clicking "Send Reminder".'
    },
  ];

  // Mock support tickets data
  const supportTickets = [
    {
      id: 'TKT-2023-0542',
      subject: 'Cannot access payment verification queue',
      status: 'Open',
      priority: 'High',
      created: 'May 29, 2023',
      lastUpdate: 'May 30, 2023'
    },
    {
      id: 'TKT-2023-0498',
      subject: 'Error when generating monthly revenue report',
      status: 'In Progress',
      priority: 'Medium',
      created: 'May 25, 2023',
      lastUpdate: 'May 28, 2023'
    },
    {
      id: 'TKT-2023-0456',
      subject: 'Request for additional payment categories',
      status: 'Closed',
      priority: 'Low',
      created: 'May 20, 2023',
      lastUpdate: 'May 27, 2023'
    },
  ];

  // Filter FAQs based on search query
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle ticket form submission
  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would submit the ticket to an API
    alert('Support ticket submitted successfully!');
    setTicketForm({
      subject: '',
      category: '',
      priority: 'medium',
      description: ''
    });
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTicketForm({
      ...ticketForm,
      [name]: value
    });
  };

  // Toggle accordion
  const toggleAccordion = (id: string | number) => {
    setActiveAccordion(activeAccordion === id ? null : String(id));
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
              <h2 className="text-2xl font-bold text-gray-900">Help & Support</h2>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Support Resources */}
              <div className="md:col-span-2 space-y-6">
                {/* Search */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search for help topics..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                {/* Quick Links */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Quick Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a href="#" className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100">
                      <div className="flex-shrink-0 bg-blue-100 rounded-full p-2">
                        <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-900">User Manual</p>
                      </div>
                    </a>
                    
                    <a href="#" className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100">
                      <div className="flex-shrink-0 bg-green-100 rounded-full p-2">
                        <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-900">Video Tutorials</p>
                      </div>
                    </a>
                    
                    <a href="#" className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100">
                      <div className="flex-shrink-0 bg-purple-100 rounded-full p-2">
                        <svg className="h-6 w-6 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-purple-900">Knowledge Base</p>
                      </div>
                    </a>
                  </div>
                </div>
                
                {/* FAQs */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    {filteredFaqs.length > 0 ? (
                      filteredFaqs.map(faq => (
                        <div key={faq.id} className="border border-gray-200 rounded-md overflow-hidden">
                          <button
                            className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 focus:outline-none"
                            onClick={() => toggleAccordion(faq.id)}
                          >
                            <span className="text-sm font-medium text-gray-900">{faq.question}</span>
                            <svg
                              className={`h-5 w-5 text-gray-500 transform ${activeAccordion === String(faq.id) ? 'rotate-180' : ''}`}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {activeAccordion === String(faq.id) && (
                            <div className="px-4 py-3 bg-white">
                              <p className="text-sm text-gray-500">{faq.answer}</p>
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-gray-500">No FAQs match your search. Try different keywords or browse all questions.</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Contact Support Team</h3>
                  <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Email Support</p>
                        <p className="text-sm text-gray-500">support@pc.gov.gh</p>
                        <p className="text-xs text-gray-500 mt-1">Response time: 24-48 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Phone Support</p>
                        <p className="text-sm text-gray-500">+233 30 222 1234</p>
                        <p className="text-xs text-gray-500 mt-1">Available: Mon-Fri, 8am-5pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Live Chat</p>
                        <p className="text-sm text-gray-500">Chat with support team</p>
                        <p className="text-xs text-gray-500 mt-1">Available: Mon-Fri, 9am-4pm</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">IT Department</p>
                        <p className="text-sm text-gray-500">it@pc.gov.gh</p>
                        <p className="text-xs text-gray-500 mt-1">For technical issues only</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Support Ticket Form */}
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Submit a Support Ticket</h3>
                  <form onSubmit={handleTicketSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={ticketForm.subject}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        id="category"
                        name="category"
                        value={ticketForm.category}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="payment">Payment Issues</option>
                        <option value="system">System Access</option>
                        <option value="report">Reports & Analytics</option>
                        <option value="invoice">Invoices & Receipts</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                      <select
                        id="priority"
                        name="priority"
                        value={ticketForm.priority}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={ticketForm.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      ></textarea>
                      <p className="mt-1 text-xs text-gray-500">Please provide as much detail as possible</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Attachments (Optional)</label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                </div>
                
                {/* Recent Tickets */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Your Recent Tickets</h3>
                  <div className="space-y-3">
                    {supportTickets.map(ticket => (
                      <div key={ticket.id} className="border border-gray-200 rounded-md p-4">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-gray-900">{ticket.subject}</span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ticket.status === 'Open' ? 'bg-yellow-100 text-yellow-800' : ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                            {ticket.status}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between text-xs text-gray-500">
                          <span>ID: {ticket.id}</span>
                          <span>Created: {ticket.created}</span>
                        </div>
                        <div className="mt-2 flex justify-between">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${ticket.priority === 'High' ? 'bg-red-100 text-red-800' : ticket.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                            {ticket.priority} Priority
                          </span>
                          <a href="#" className="text-xs text-blue-600 hover:text-blue-800">View Details</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}