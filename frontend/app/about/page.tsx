'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function About() {
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
            <Link href="/about" className="text-gold-500 font-semibold">About</Link>
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Leading Ghana's petroleum sector regulation and development
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Mission Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Petroleum Commission of Ghana is committed to regulating and managing the petroleum resources 
                of Ghana in a manner that ensures maximum benefit to the people of Ghana while maintaining the 
                highest standards of environmental protection and safety.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through our Upstream Tracking System, we provide transparent oversight of all upstream petroleum 
                activities, ensuring compliance with national regulations and international best practices.
              </p>
            </div>

            {/* Vision Section */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Our Vision</h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                To be a world-class petroleum regulator that ensures the optimal development of Ghana's petroleum 
                resources for the benefit of present and future generations, while maintaining the highest standards 
                of transparency, accountability, and environmental stewardship.
              </p>
            </div>

            {/* Core Values */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Core Values</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Transparency</h3>
                  <p className="text-gray-700">
                    We maintain open and transparent processes in all our regulatory activities, 
                    ensuring stakeholders have access to relevant information.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Accountability</h3>
                  <p className="text-gray-700">
                    We hold ourselves and industry players accountable to the highest standards 
                    of performance and ethical conduct.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Excellence</h3>
                  <p className="text-gray-700">
                    We strive for excellence in all our operations, continuously improving our 
                    processes and capabilities.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-800 mb-3">Sustainability</h3>
                  <p className="text-gray-700">
                    We promote sustainable development practices that balance economic growth 
                    with environmental protection.
                  </p>
                </div>
              </div>
            </div>

            {/* About the System */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">About the Upstream Tracking System</h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                The Upstream Tracking System is a comprehensive digital platform designed to monitor, 
                track, and manage all upstream petroleum activities in Ghana. This system provides:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Real-time monitoring of exploration and production activities</li>
                <li>Comprehensive reporting and compliance tracking</li>
                <li>Transparent data sharing with stakeholders</li>
                <li>Efficient permit and license management</li>
                <li>Environmental impact monitoring</li>
                <li>Revenue tracking and reporting</li>
              </ul>
            </div>

            {/* Leadership */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-blue-800 mb-6">Leadership</h2>
              <div className="bg-blue-50 p-8 rounded-lg">
                <p className="text-lg text-gray-700 leading-relaxed">
                  The Petroleum Commission is led by a team of experienced professionals with extensive 
                  backgrounds in petroleum engineering, geology, environmental science, law, and public 
                  administration. Our leadership is committed to ensuring that Ghana's petroleum resources 
                  are developed in a manner that maximizes benefits for all Ghanaians.
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center bg-gradient-to-r from-blue-800 to-blue-600 text-white p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg mb-6">
                Have questions about our work or the Upstream Tracking System?
              </p>
              <Link 
                href="/contact" 
                className="bg-gold-600 hover:bg-gold-700 text-white px-6 py-3 rounded-md transition duration-300 inline-block"
              >
                Contact Us
              </Link>
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