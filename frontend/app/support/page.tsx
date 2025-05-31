'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Support() {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    ticketType: '',
    priority: '',
    subject: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Your support ticket has been submitted successfully. You will receive a confirmation email shortly.');
      setIsSubmitting(false);
      setFormData({ name: '', email: '', company: '', ticketType: '', priority: '', subject: '', description: '' });
    }, 2000);
  };

  const supportResources = [
    {
      title: 'User Manual',
      description: 'Comprehensive guide to using the Upstream Tracking System',
      icon: '📖',
      link: '#'
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides for common tasks',
      icon: '🎥',
      link: '#'
    },
    {
      title: 'API Documentation',
      description: 'Technical documentation for system integration',
      icon: '⚙️',
      link: '#'
    },
    {
      title: 'System Status',
      description: 'Real-time system status and maintenance updates',
      icon: '🔍',
      link: '#'
    },
    {
      title: 'Training Materials',
      description: 'Training resources and certification programs',
      icon: '🎓',
      link: '#'
    },
    {
      title: 'Best Practices',
      description: 'Industry best practices and compliance guidelines',
      icon: '✅',
      link: '#'
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-800 text-white sticky top-0 z-50 shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="relative h-16 w-40 cursor-pointer">
                <Image 
                  src="/images/pc-ghana-logo.svg" 
                  alt="Petroleum Commission Ghana Logo" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            <h1 className="text-xl font-bold hidden md:block">Upstream Tracking System</h1>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gold-500 transition duration-300">Home</Link>
            <Link href="/about" className="hover:text-gold-500 transition duration-300">About</Link>
            <Link href="/contact" className="hover:text-gold-500 transition duration-300">Contact</Link>
            <Link href="/regulatory-docs" className="hover:text-gold-500 transition duration-300">Regulatory Docs</Link>
            <Link href="/faq" className="hover:text-gold-500 transition duration-300">FAQ/Support</Link>
          </div>
          
          {/* Login/Register Button */}
          <div className="hidden md:block">
            <Link 
              href="/login" 
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Login/Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Technical Support</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Get the help you need to make the most of the Upstream Tracking System
          </p>
        </div>
      </section>

      {/* Quick Support Options */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Get Support</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Live Chat */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help from our support team</p>
                <p className="text-sm text-gray-500 mb-4">Available: Mon-Fri, 8AM-6PM GMT</p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition duration-300">
                  Start Chat
                </button>
              </div>

              {/* Phone Support */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Speak directly with our technical team</p>
                <p className="text-sm text-gray-500 mb-4">+233 (0) 302 540 381</p>
                <a href="tel:+233302540381" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition duration-300 inline-block">
                  Call Now
                </a>
              </div>

              {/* Email Support */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Send us your questions and concerns</p>
                <p className="text-sm text-gray-500 mb-4">Response within 24 hours</p>
                <a href="mailto:support@petrocom.gov.gh" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md transition duration-300 inline-block">
                  Send Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Ticket Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Submit a Support Ticket</h2>
            
            {submitMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                {submitMessage}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    Company/Organization
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label htmlFor="ticketType" className="block text-sm font-medium text-gray-700 mb-2">
                    Issue Type *
                  </label>
                  <select
                    id="ticketType"
                    name="ticketType"
                    value={formData.ticketType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select issue type</option>
                    <option value="technical">Technical Issue</option>
                    <option value="account">Account Access</option>
                    <option value="data">Data/Reporting Issue</option>
                    <option value="training">Training Request</option>
                    <option value="feature">Feature Request</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level *
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select priority</option>
                    <option value="low">Low - General inquiry</option>
                    <option value="medium">Medium - Non-urgent issue</option>
                    <option value="high">High - Urgent issue</option>
                    <option value="critical">Critical - System down</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of the issue"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Detailed Description *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please provide as much detail as possible about the issue, including steps to reproduce, error messages, and any relevant information."
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 px-6 rounded-md transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Support Ticket'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Support Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">Self-Help Resources</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {supportResources.map((resource, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <div className="text-4xl mb-4">{resource.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <a href={resource.link} className="text-blue-600 hover:text-blue-800 font-medium">
                    Learn More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* System Status */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-blue-800 mb-8 text-center">System Status</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Current System Status</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600 font-medium">All Systems Operational</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Web Application</h4>
                    <p className="text-sm text-gray-600">Main system interface</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">API Services</h4>
                    <p className="text-sm text-gray-600">Data integration and reporting</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <div>
                    <h4 className="font-medium text-gray-900">Database</h4>
                    <p className="text-sm text-gray-600">Data storage and retrieval</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h4 className="font-medium text-gray-900">File Upload/Download</h4>
                    <p className="text-sm text-gray-600">Document management system</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-green-600 text-sm">Operational</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                  View Detailed Status Page →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="relative h-16 w-40 mb-4">
                <Image 
                  src="/images/pc-ghana-logo.svg" 
                  alt="Petroleum Commission Ghana Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-gray-300">
                Regulating Ghana's petroleum sector for sustainable development and maximum benefit to all Ghanaians.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-gold-500 transition duration-300">Home</Link></li>
                <li><Link href="/about" className="hover:text-gold-500 transition duration-300">About</Link></li>
                <li><Link href="/contact" className="hover:text-gold-500 transition duration-300">Contact</Link></li>
                <li><Link href="/regulatory-docs" className="hover:text-gold-500 transition duration-300">Regulatory Docs</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-gold-500 transition duration-300">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-gold-500 transition duration-300">Support</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-gold-500 transition duration-300">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-gold-500 transition duration-300">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gold-500 transition duration-300" aria-label="Facebook">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gold-500 transition duration-300" aria-label="Twitter">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gold-500 transition duration-300" aria-label="LinkedIn">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 Petroleum Commission, Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}