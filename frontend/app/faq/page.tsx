'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function FAQ() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      id: 1,
      category: 'General',
      question: 'What is the Upstream Tracking System?',
      answer: 'The Upstream Tracking System is a comprehensive digital platform designed to monitor, track, and manage all upstream petroleum activities in Ghana. It provides real-time oversight of exploration and production activities, ensuring compliance with national regulations and international best practices.'
    },
    {
      id: 2,
      category: 'Registration',
      question: 'How do I register for an account on the system?',
      answer: 'To register for an account, click on the "Login/Register" button and select "Create New Account". You will need to provide your company information, contact details, and relevant documentation. Your account will be reviewed and approved by our team within 2-3 business days.'
    },
    {
      id: 3,
      category: 'Compliance',
      question: 'What are the reporting requirements for petroleum companies?',
      answer: 'Petroleum companies are required to submit monthly production reports, quarterly financial reports, annual environmental impact assessments, and real-time operational data through the system. Specific requirements vary based on the type and scale of operations.'
    },
    {
      id: 4,
      category: 'Technical',
      question: 'What browsers are supported by the system?',
      answer: 'The system supports all modern web browsers including Chrome (version 90+), Firefox (version 88+), Safari (version 14+), and Edge (version 90+). We recommend using the latest version of your preferred browser for the best experience.'
    },
    {
      id: 5,
      category: 'Data',
      question: 'How is my company data protected?',
      answer: 'We employ industry-standard security measures including SSL encryption, multi-factor authentication, regular security audits, and compliance with international data protection standards. All data is stored in secure, redundant systems with regular backups.'
    },
    {
      id: 6,
      category: 'Permits',
      question: 'How do I apply for exploration permits through the system?',
      answer: 'Navigate to the "Permits" section in your dashboard, select "New Application", and complete the required forms. You will need to upload supporting documents including geological surveys, environmental impact assessments, and financial guarantees.'
    },
    {
      id: 7,
      category: 'Technical',
      question: 'Can I access the system on mobile devices?',
      answer: 'Yes, the system is fully responsive and can be accessed on smartphones and tablets. We also offer a dedicated mobile app for iOS and Android devices with core functionality for field operations.'
    },
    {
      id: 8,
      category: 'Compliance',
      question: 'What happens if I miss a reporting deadline?',
      answer: 'Missing reporting deadlines may result in penalties as outlined in your petroleum agreement. The system will send automated reminders before deadlines. If you anticipate delays, contact our compliance team immediately to discuss possible extensions.'
    },
    {
      id: 9,
      category: 'Data',
      question: 'How do I export my data from the system?',
      answer: 'You can export your data in various formats (CSV, Excel, PDF) from the "Reports" section of your dashboard. Select the data range and format you need, and the system will generate a downloadable file.'
    },
    {
      id: 10,
      category: 'General',
      question: 'Who can I contact for technical support?',
      answer: 'For technical support, you can contact our help desk at support@petrocom.gov.gh, call +233 (0) 302 540 381, or use the live chat feature in the system. Our support team is available Monday-Friday, 8:00 AM - 6:00 PM GMT.'
    },
    {
      id: 11,
      category: 'Permits',
      question: 'How long does permit approval take?',
      answer: 'Permit approval times vary depending on the type and complexity of the application. Exploration permits typically take 60-90 days, while production permits may take 120-180 days. The system provides real-time status updates throughout the review process.'
    },
    {
      id: 12,
      category: 'Training',
      question: 'Do you provide training on how to use the system?',
      answer: 'Yes, we offer comprehensive training programs including online tutorials, webinars, and on-site training sessions. New users receive access to our training portal with step-by-step guides and video tutorials.'
    }
  ];

  const categories = ['All', 'General', 'Registration', 'Compliance', 'Technical', 'Data', 'Permits', 'Training'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

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
            <Link href="/faq" className="text-gold-500 font-semibold">FAQ/Support</Link>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Find answers to common questions about the Upstream Tracking System
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                    selectedCategory === category
                      ? 'bg-blue-800 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Results Count */}
            <div className="mb-8">
              <p className="text-gray-600">
                Showing {filteredFAQs.length} of {faqs.length} questions
              </p>
            </div>

            {/* FAQ Items */}
            <div className="space-y-4">
              {filteredFAQs.map(faq => (
                <div key={faq.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition duration-300"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          {faq.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2">{faq.question}</h3>
                    </div>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                        openFAQ === faq.id ? 'transform rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {openFAQ === faq.id && (
                    <div className="px-6 pb-4">
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
                <p className="text-gray-500">Try adjusting your search terms or category filter.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-blue-800 mb-6">Still Need Help?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Email Support */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                <p className="text-gray-600 mb-4">Get help via email</p>
                <a href="mailto:support@petrocom.gov.gh" className="text-blue-600 hover:text-blue-800 font-medium">
                  support@petrocom.gov.gh
                </a>
              </div>

              {/* Phone Support */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                <p className="text-gray-600 mb-4">Call our support line</p>
                <a href="tel:+233302540381" className="text-blue-600 hover:text-blue-800 font-medium">
                  +233 (0) 302 540 381
                </a>
              </div>

              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Contact Form</h3>
                <p className="text-gray-600 mb-4">Send us a message</p>
                <Link href="/contact" className="text-blue-600 hover:text-blue-800 font-medium">
                  Contact Us
                </Link>
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