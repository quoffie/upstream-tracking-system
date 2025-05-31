'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function PrivacyPolicy() {
  const [currentYear, setCurrentYear] = useState(2024);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  <strong>Last Updated:</strong> January 1, {currentYear}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The Petroleum Commission of Ghana ("we," "us," or "our") is committed to protecting your privacy. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
                  use our Upstream Tracking System ("the System").
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  <li><a href="#information-collection" className="text-blue-600 hover:text-blue-800">1. Information We Collect</a></li>
                  <li><a href="#information-use" className="text-blue-600 hover:text-blue-800">2. How We Use Your Information</a></li>
                  <li><a href="#information-sharing" className="text-blue-600 hover:text-blue-800">3. Information Sharing and Disclosure</a></li>
                  <li><a href="#data-security" className="text-blue-600 hover:text-blue-800">4. Data Security</a></li>
                  <li><a href="#data-retention" className="text-blue-600 hover:text-blue-800">5. Data Retention</a></li>
                  <li><a href="#your-rights" className="text-blue-600 hover:text-blue-800">6. Your Rights</a></li>
                  <li><a href="#cookies" className="text-blue-600 hover:text-blue-800">7. Cookies and Tracking Technologies</a></li>
                  <li><a href="#third-party" className="text-blue-600 hover:text-blue-800">8. Third-Party Services</a></li>
                  <li><a href="#international-transfers" className="text-blue-600 hover:text-blue-800">9. International Data Transfers</a></li>
                  <li><a href="#children" className="text-blue-600 hover:text-blue-800">10. Children's Privacy</a></li>
                  <li><a href="#changes" className="text-blue-600 hover:text-blue-800">11. Changes to This Policy</a></li>
                  <li><a href="#contact" className="text-blue-600 hover:text-blue-800">12. Contact Information</a></li>
                </ul>
              </div>

              {/* Section 1 */}
              <div id="information-collection" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">1. Information We Collect</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">We may collect the following personal information:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Name, email address, and contact information</li>
                  <li>Company or organization affiliation</li>
                  <li>Professional credentials and qualifications</li>
                  <li>Government-issued identification numbers (where required)</li>
                  <li>Digital signatures and authentication credentials</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Business Information</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Petroleum license and permit information</li>
                  <li>Production and operational data</li>
                  <li>Financial and commercial information</li>
                  <li>Technical reports and documentation</li>
                  <li>Compliance and regulatory submissions</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Technical Information</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>IP addresses and device identifiers</li>
                  <li>Browser type and version</li>
                  <li>Operating system information</li>
                  <li>Access logs and usage patterns</li>
                  <li>Session data and preferences</li>
                </ul>
              </div>

              {/* Section 2 */}
              <div id="information-use" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-700 mb-4">We use the collected information for the following purposes:</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Regulatory Functions</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Processing license applications and renewals</li>
                  <li>Monitoring compliance with petroleum regulations</li>
                  <li>Conducting inspections and audits</li>
                  <li>Generating regulatory reports and statistics</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">System Operations</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Providing access to the Upstream Tracking System</li>
                  <li>Authenticating users and maintaining security</li>
                  <li>Improving system functionality and user experience</li>
                  <li>Providing technical support and assistance</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Sending system notifications and updates</li>
                  <li>Responding to inquiries and support requests</li>
                  <li>Providing regulatory guidance and information</li>
                  <li>Conducting training and educational programs</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="information-sharing" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">3. Information Sharing and Disclosure</h2>
                <p className="text-gray-700 mb-4">We may share your information in the following circumstances:</p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Government Agencies</h3>
                <p className="text-gray-700 mb-4">
                  We may share information with other government agencies, ministries, and departments as required 
                  for regulatory oversight, policy development, and national resource management.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Requirements</h3>
                <p className="text-gray-700 mb-4">
                  We may disclose information when required by law, court order, or other legal process, or when 
                  necessary to protect our rights, property, or safety.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Providers</h3>
                <p className="text-gray-700 mb-4">
                  We may engage third-party service providers to assist with system operations, data processing, 
                  or technical support, subject to appropriate confidentiality agreements.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Public Information</h3>
                <p className="text-gray-700 mb-4">
                  Certain information may be made publicly available as required by law or in the public interest, 
                  such as license holder information and production statistics.
                </p>
              </div>

              {/* Section 4 */}
              <div id="data-security" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">4. Data Security</h2>
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Multi-factor authentication and access controls</li>
                  <li>Regular security assessments and audits</li>
                  <li>Employee training on data protection</li>
                  <li>Incident response and breach notification procedures</li>
                  <li>Secure data centers and infrastructure</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div id="data-retention" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">5. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  We retain your information for as long as necessary to fulfill the purposes outlined in this policy 
                  and as required by applicable laws and regulations. Retention periods may vary based on:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Legal and regulatory requirements</li>
                  <li>The nature and sensitivity of the information</li>
                  <li>Operational and business needs</li>
                  <li>Your relationship with the Commission</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="your-rights" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 mb-4">Subject to applicable laws, you may have the following rights:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li><strong>Access:</strong> Request access to your personal information</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your information (subject to legal requirements)</li>
                  <li><strong>Portability:</strong> Request transfer of your information</li>
                  <li><strong>Objection:</strong> Object to certain processing activities</li>
                  <li><strong>Restriction:</strong> Request restriction of processing</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  To exercise these rights, please contact us using the information provided in Section 12.
                </p>
              </div>

              {/* Section 7 */}
              <div id="cookies" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies and similar technologies to enhance your experience and improve our services:
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Types of Cookies</h3>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li><strong>Essential Cookies:</strong> Required for system functionality</li>
                  <li><strong>Performance Cookies:</strong> Help us analyze system usage</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences</li>
                  <li><strong>Security Cookies:</strong> Protect against unauthorized access</li>
                </ul>
                
                <p className="text-gray-700 mb-4">
                  You can control cookie settings through your browser preferences, but disabling certain cookies 
                  may affect system functionality.
                </p>
              </div>

              {/* Section 8 */}
              <div id="third-party" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">8. Third-Party Services</h2>
                <p className="text-gray-700 mb-4">
                  Our system may integrate with third-party services for enhanced functionality. These services 
                  have their own privacy policies, and we encourage you to review them. We are not responsible 
                  for the privacy practices of third-party services.
                </p>
              </div>

              {/* Section 9 */}
              <div id="international-transfers" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">9. International Data Transfers</h2>
                <p className="text-gray-700 mb-4">
                  Your information is primarily processed and stored within Ghana. If we transfer information 
                  internationally, we ensure appropriate safeguards are in place to protect your data in 
                  accordance with applicable laws.
                </p>
              </div>

              {/* Section 10 */}
              <div id="children" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">10. Children's Privacy</h2>
                <p className="text-gray-700 mb-4">
                  Our system is not intended for use by individuals under the age of 18. We do not knowingly 
                  collect personal information from children. If we become aware that we have collected information 
                  from a child, we will take steps to delete such information.
                </p>
              </div>

              {/* Section 11 */}
              <div id="changes" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any material changes 
                  by posting the updated policy on our website and updating the "Last Updated" date. Your continued 
                  use of the system after such changes constitutes acceptance of the updated policy.
                </p>
              </div>

              {/* Section 12 */}
              <div id="contact" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">12. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Protection Officer</h3>
                  <p className="text-gray-700 mb-2"><strong>Petroleum Commission of Ghana</strong></p>
                  <p className="text-gray-700 mb-2">No. 3 Ambassadorial Enclave</p>
                  <p className="text-gray-700 mb-2">East Legon, Accra, Ghana</p>
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@petrocom.gov.gh</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +233 (0) 302 540 381</p>
                  <p className="text-gray-700"><strong>Website:</strong> www.petrocom.gov.gh</p>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Acknowledgment</h3>
                <p className="text-gray-700">
                  By using the Upstream Tracking System, you acknowledge that you have read, understood, and 
                  agree to be bound by this Privacy Policy.
                </p>
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
            <p>&copy; {currentYear} Petroleum Commission, Ghana. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}