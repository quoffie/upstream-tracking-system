'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TermsOfService() {
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Please read these terms carefully before using the Upstream Tracking System
          </p>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  <strong>Last Updated:</strong> January 1, {currentYear}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Service ("Terms") govern your use of the Upstream Tracking System ("the System") 
                  operated by the Petroleum Commission of Ghana ("we," "us," or "the Commission"). By accessing 
                  or using the System, you agree to be bound by these Terms.
                </p>
              </div>

              {/* Table of Contents */}
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Table of Contents</h2>
                <ul className="space-y-2">
                  <li><a href="#acceptance" className="text-blue-600 hover:text-blue-800">1. Acceptance of Terms</a></li>
                  <li><a href="#description" className="text-blue-600 hover:text-blue-800">2. Description of Service</a></li>
                  <li><a href="#eligibility" className="text-blue-600 hover:text-blue-800">3. Eligibility and Registration</a></li>
                  <li><a href="#user-obligations" className="text-blue-600 hover:text-blue-800">4. User Obligations</a></li>
                  <li><a href="#prohibited-uses" className="text-blue-600 hover:text-blue-800">5. Prohibited Uses</a></li>
                  <li><a href="#data-submission" className="text-blue-600 hover:text-blue-800">6. Data Submission and Accuracy</a></li>
                  <li><a href="#intellectual-property" className="text-blue-600 hover:text-blue-800">7. Intellectual Property</a></li>
                  <li><a href="#system-availability" className="text-blue-600 hover:text-blue-800">8. System Availability</a></li>
                  <li><a href="#compliance" className="text-blue-600 hover:text-blue-800">9. Regulatory Compliance</a></li>
                  <li><a href="#limitation-liability" className="text-blue-600 hover:text-blue-800">10. Limitation of Liability</a></li>
                  <li><a href="#indemnification" className="text-blue-600 hover:text-blue-800">11. Indemnification</a></li>
                  <li><a href="#termination" className="text-blue-600 hover:text-blue-800">12. Termination</a></li>
                  <li><a href="#governing-law" className="text-blue-600 hover:text-blue-800">13. Governing Law</a></li>
                  <li><a href="#changes" className="text-blue-600 hover:text-blue-800">14. Changes to Terms</a></li>
                  <li><a href="#contact" className="text-blue-600 hover:text-blue-800">15. Contact Information</a></li>
                </ul>
              </div>

              {/* Section 1 */}
              <div id="acceptance" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing, browsing, or using the Upstream Tracking System, you acknowledge that you have 
                  read, understood, and agree to be bound by these Terms and all applicable laws and regulations. 
                  If you do not agree with these Terms, you must not use the System.
                </p>
              </div>

              {/* Section 2 */}
              <div id="description" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  The Upstream Tracking System is a digital platform designed to facilitate the regulation and 
                  monitoring of Ghana's petroleum upstream sector. The System provides:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>License application and management services</li>
                  <li>Regulatory reporting and compliance monitoring</li>
                  <li>Data submission and validation tools</li>
                  <li>Document management and storage</li>
                  <li>Communication and notification services</li>
                  <li>Analytics and reporting capabilities</li>
                </ul>
              </div>

              {/* Section 3 */}
              <div id="eligibility" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">3. Eligibility and Registration</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Requirements</h3>
                <p className="text-gray-700 mb-4">To use the System, you must:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Be at least 18 years of age</li>
                  <li>Have legal authority to enter into binding agreements</li>
                  <li>Be authorized to represent your organization (if applicable)</li>
                  <li>Hold valid petroleum sector credentials or licenses (where required)</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Registration Process</h3>
                <p className="text-gray-700 mb-4">
                  Registration requires providing accurate, complete, and current information. You are responsible 
                  for maintaining the confidentiality of your account credentials and for all activities that 
                  occur under your account.
                </p>
              </div>

              {/* Section 4 */}
              <div id="user-obligations" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">4. User Obligations</h2>
                <p className="text-gray-700 mb-4">As a user of the System, you agree to:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Provide accurate, complete, and truthful information</li>
                  <li>Maintain the security and confidentiality of your account</li>
                  <li>Comply with all applicable laws and regulations</li>
                  <li>Submit required reports and data in a timely manner</li>
                  <li>Notify us immediately of any unauthorized use of your account</li>
                  <li>Use the System only for its intended purposes</li>
                  <li>Respect the intellectual property rights of others</li>
                </ul>
              </div>

              {/* Section 5 */}
              <div id="prohibited-uses" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">5. Prohibited Uses</h2>
                <p className="text-gray-700 mb-4">You may not use the System to:</p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Submit false, misleading, or fraudulent information</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Interfere with or disrupt the System's operation</li>
                  <li>Attempt to gain unauthorized access to the System</li>
                  <li>Transmit viruses, malware, or other harmful code</li>
                  <li>Engage in any form of data mining or scraping</li>
                  <li>Impersonate another person or entity</li>
                  <li>Share your account credentials with unauthorized parties</li>
                </ul>
              </div>

              {/* Section 6 */}
              <div id="data-submission" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">6. Data Submission and Accuracy</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Accuracy</h3>
                <p className="text-gray-700 mb-4">
                  You are solely responsible for the accuracy, completeness, and timeliness of all data submitted 
                  through the System. Inaccurate or false data may result in regulatory action and account suspension.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Validation</h3>
                <p className="text-gray-700 mb-4">
                  The Commission reserves the right to validate, verify, and audit all submitted data. You agree 
                  to cooperate with such validation processes and provide additional documentation when requested.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Retention</h3>
                <p className="text-gray-700 mb-4">
                  Submitted data will be retained in accordance with applicable laws and the Commission's data 
                  retention policies. You acknowledge that certain data may be retained permanently for regulatory purposes.
                </p>
              </div>

              {/* Section 7 */}
              <div id="intellectual-property" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">7. Intellectual Property</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Commission's Rights</h3>
                <p className="text-gray-700 mb-4">
                  The System, including its software, design, content, and documentation, is owned by the 
                  Petroleum Commission of Ghana and is protected by intellectual property laws. You are granted 
                  a limited, non-exclusive license to use the System for its intended purposes.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">User Content</h3>
                <p className="text-gray-700 mb-4">
                  You retain ownership of the data and content you submit to the System. However, you grant the 
                  Commission a non-exclusive, royalty-free license to use, process, and analyze such content for 
                  regulatory purposes.
                </p>
              </div>

              {/* Section 8 */}
              <div id="system-availability" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">8. System Availability</h2>
                <p className="text-gray-700 mb-4">
                  While we strive to maintain continuous system availability, we do not guarantee uninterrupted 
                  access. The System may be temporarily unavailable due to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Scheduled maintenance and updates</li>
                  <li>Technical difficulties or system failures</li>
                  <li>Security incidents or threats</li>
                  <li>Force majeure events</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  We will make reasonable efforts to provide advance notice of scheduled maintenance.
                </p>
              </div>

              {/* Section 9 */}
              <div id="compliance" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">9. Regulatory Compliance</h2>
                <p className="text-gray-700 mb-4">
                  Use of the System does not relieve you of any regulatory obligations under Ghana's petroleum 
                  laws and regulations. You remain fully responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Obtaining and maintaining required licenses and permits</li>
                  <li>Complying with reporting requirements and deadlines</li>
                  <li>Meeting safety and environmental standards</li>
                  <li>Paying applicable fees and taxes</li>
                  <li>Adhering to local content requirements</li>
                </ul>
              </div>

              {/* Section 10 */}
              <div id="limitation-liability" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  To the maximum extent permitted by law, the Petroleum Commission of Ghana shall not be liable for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Any indirect, incidental, special, or consequential damages</li>
                  <li>Loss of profits, data, or business opportunities</li>
                  <li>System downtime or unavailability</li>
                  <li>Actions taken based on information provided through the System</li>
                  <li>Third-party content or services</li>
                </ul>
                <p className="text-gray-700 mb-4">
                  The System is provided "as is" without warranties of any kind, express or implied.
                </p>
              </div>

              {/* Section 11 */}
              <div id="indemnification" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">11. Indemnification</h2>
                <p className="text-gray-700 mb-4">
                  You agree to indemnify, defend, and hold harmless the Petroleum Commission of Ghana, its 
                  officers, employees, and agents from any claims, damages, losses, or expenses arising from:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Your use of the System</li>
                  <li>Violation of these Terms</li>
                  <li>Infringement of third-party rights</li>
                  <li>Submission of false or misleading information</li>
                  <li>Non-compliance with applicable laws</li>
                </ul>
              </div>

              {/* Section 12 */}
              <div id="termination" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">12. Termination</h2>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by User</h3>
                <p className="text-gray-700 mb-4">
                  You may terminate your account at any time by contacting us. However, you remain responsible 
                  for any outstanding obligations and submitted data.
                </p>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Termination by Commission</h3>
                <p className="text-gray-700 mb-4">
                  We may suspend or terminate your access to the System at any time for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 space-y-1">
                  <li>Violation of these Terms</li>
                  <li>Fraudulent or illegal activities</li>
                  <li>Non-compliance with regulatory requirements</li>
                  <li>Security concerns</li>
                  <li>Extended periods of inactivity</li>
                </ul>
              </div>

              {/* Section 13 */}
              <div id="governing-law" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">13. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms are governed by the laws of Ghana. Any disputes arising from these Terms or your 
                  use of the System shall be subject to the exclusive jurisdiction of the courts of Ghana.
                </p>
              </div>

              {/* Section 14 */}
              <div id="changes" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">14. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right to modify these Terms at any time. Material changes will be communicated 
                  through the System or by email. Your continued use of the System after such changes constitutes 
                  acceptance of the modified Terms.
                </p>
              </div>

              {/* Section 15 */}
              <div id="contact" className="mb-8">
                <h2 className="text-2xl font-semibold text-blue-800 mb-4">15. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  For questions about these Terms or the System, please contact us:
                </p>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Department</h3>
                  <p className="text-gray-700 mb-2"><strong>Petroleum Commission of Ghana</strong></p>
                  <p className="text-gray-700 mb-2">No. 3 Ambassadorial Enclave</p>
                  <p className="text-gray-700 mb-2">East Legon, Accra, Ghana</p>
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> legal@petrocom.gov.gh</p>
                  <p className="text-gray-700 mb-2"><strong>Phone:</strong> +233 (0) 302 540 381</p>
                  <p className="text-gray-700"><strong>Website:</strong> www.petrocom.gov.gh</p>
                </div>
              </div>

              {/* Acknowledgment */}
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Acknowledgment</h3>
                <p className="text-gray-700 mb-4">
                  By clicking "I Agree" or by using the Upstream Tracking System, you acknowledge that:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>You have read and understood these Terms of Service</li>
                  <li>You agree to be bound by these Terms</li>
                  <li>You have the authority to enter into this agreement</li>
                  <li>You will comply with all applicable laws and regulations</li>
                </ul>
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