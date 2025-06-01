'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-blue-900 px-4 py-2 shadow-lg">
            <div className="flex flex-col space-y-2 pb-3">
              <Link href="/" className="hover:text-gold-500 py-2 transition duration-300">Home</Link>
              <Link href="/about" className="hover:text-gold-500 py-2 transition duration-300">About</Link>
              <Link href="/contact" className="hover:text-gold-500 py-2 transition duration-300">Contact</Link>
              <Link href="/regulatory-docs" className="hover:text-gold-500 py-2 transition duration-300">Regulatory Docs</Link>
              <Link href="/faq" className="hover:text-gold-500 py-2 transition duration-300">FAQ/Support</Link>
              <Link 
                href="/login" 
                className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md transition duration-300 inline-block mt-2"
              >
                Login/Register
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-800 to-blue-600 text-white py-16 md:py-24 overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-30"
          >
            <source src="/offshore_rig.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-blue-800/70 to-blue-600/70"></div>
        </div>
        
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight drop-shadow-lg">Petroleum Commission Upstream Tracking System</h1>
            <p className="text-xl mb-6 opacity-90 drop-shadow-md">Digitizing and enforcing regulatory, compliance, and permit management workflows for Ghana's upstream petroleum sector.</p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link 
                href="/register" 
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-md text-center transition duration-300 shadow-lg transform hover:-translate-y-1 backdrop-blur-sm"
              >
                Register Company
              </Link>
              <Link 
                href="/apply/permit" 
                className="bg-white/90 hover:bg-white text-blue-800 px-6 py-3 rounded-md text-center transition duration-300 shadow-lg transform hover:-translate-y-1 backdrop-blur-sm"
              >
                Apply for Permit
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative h-64 w-64 md:h-96 md:w-96 transform hover:scale-105 transition duration-500 drop-shadow-2xl">
              <Image 
                src="/images/offshore-platform.svg" 
                alt="Offshore Platform Illustration" 
                fill
                className="object-contain filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Announcement Banner */}
      <div className="bg-gold-600 text-white py-3">
        <div className="container mx-auto px-4 text-center">
          <p className="font-medium">New regulations for offshore operations effective from January 2023. <a href="/regulatory-docs" className="underline font-bold hover:text-blue-800">Learn more</a></p>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">Industry Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-300">
              <div className="text-gold-600 text-4xl font-bold mb-2">250+</div>
              <div className="text-gray-700 font-medium">Registered Companies</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-300">
              <div className="text-gold-600 text-4xl font-bold mb-2">1,500+</div>
              <div className="text-gray-700 font-medium">Permits Issued</div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md transform hover:-translate-y-1 transition duration-300">
              <div className="text-gold-600 text-4xl font-bold mb-2">35%</div>
              <div className="text-gray-700 font-medium">Ghanaian Ownership</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-blue-800">Key Features</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">Our platform provides comprehensive tools to streamline regulatory compliance and permit management in Ghana's upstream petroleum sector.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Company Registration</h3>
              <p className="text-gray-600">Complete digital registration process with document uploads and automatic validation.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Permit Management</h3>
              <p className="text-gray-600">Streamlined permit application, approval, and renewal for regular and rotator personnel.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">JV Compliance</h3>
              <p className="text-gray-600">Track and enforce joint venture compliance including Ghanaian equity requirements.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Local Content Reporting</h3>
              <p className="text-gray-600">Comprehensive tools for submitting and tracking local content plans and performance.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Workflow Automation</h3>
              <p className="text-gray-600">Automated routing, notifications, and status tracking for all applications.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold-600 hover:shadow-xl transition duration-300">
              <div className="text-blue-800 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Analytics Dashboard</h3>
              <p className="text-gray-600">Real-time insights, compliance metrics, and performance indicators for all stakeholders.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Join hundreds of companies already using our platform to streamline their regulatory compliance and permit management.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link 
              href="/register" 
              className="bg-gold-600 hover:bg-gold-700 text-white px-8 py-3 rounded-md text-center transition duration-300 shadow-lg"
            >
              Register Now
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent hover:bg-white hover:text-blue-800 text-white px-8 py-3 rounded-md border-2 border-white text-center transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-800">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">A</div>
                <div>
                  <h3 className="font-semibold">Akosua Mensah</h3>
                  <p className="text-sm text-gray-500">Compliance Officer, Ghana Oil Ltd</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The platform has significantly reduced our permit processing time and improved our compliance tracking."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">K</div>
                <div>
                  <h3 className="font-semibold">Kwame Osei</h3>
                  <p className="text-sm text-gray-500">Director, Offshore Services Ghana</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The dashboard gives us real-time visibility into our compliance status and upcoming requirements."</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xl mr-4">F</div>
                <div>
                  <h3 className="font-semibold">Fatima Abdulai</h3>
                  <p className="text-sm text-gray-500">Local Content Manager, Atlantic Energy</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"The local content reporting tools have made it much easier to track and demonstrate our compliance with regulations."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
              <p className="mb-2">Plot No. 4A, George Bush Highway</p>
              <p className="mb-2">Accra, Ghana</p>
              <p className="mb-2">Email: info@petrocom.gov.gh</p>
              <p>Phone: +233 302 773 191-3</p>
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
              <div className="mt-6">
                <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                <form className="flex">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="px-3 py-2 bg-blue-800 text-white rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold-500 w-full"
                  />
                  <button 
                    type="submit" 
                    className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-r-md transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p>&copy; {currentYear} Petroleum Commission, Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}