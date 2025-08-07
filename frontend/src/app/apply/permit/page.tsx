'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PermitApplication() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    permitType: '',
    companyName: '',
    companyRegistrationNumber: '',
    contactPerson: '',
    contactEmail: '',
    contactPhone: '',
    projectName: '',
    projectDescription: '',
    startDate: '',
    endDate: '',
    localContentPlan: '',
    personnelDetails: [],
    documents: [],
    termsAccepted: false
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      // Redirect to login if not authenticated
      router.push('/auth/login?redirect=/apply/permit');
      return;
    }
    
    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setIsAuthenticated(true);
      
      // Pre-fill company information if user is company admin or personnel
      if (['COMPANY_ADMIN', 'PERSONNEL'].includes(parsedUser.role)) {
        setFormData(prev => ({
          ...prev,
          companyName: parsedUser.company?.name || '',
          companyRegistrationNumber: parsedUser.company?.registrationNumber || '',
          contactPerson: `${parsedUser.firstName} ${parsedUser.lastName}`,
          contactEmail: parsedUser.email,
          contactPhone: parsedUser.phone || ''
        }));
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login?redirect=/apply/permit');
    }
  }, [router]);

  const permitTypes = [
    { id: 'exploration', name: 'Exploration Permit' },
    { id: 'production', name: 'Production Operations Permit' },
    { id: 'personnel', name: 'Personnel Work Permit' },
    { id: 'installation', name: 'Installation & Equipment Permit' },
    { id: 'environmental', name: 'Environmental Compliance Permit' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically send the data to your backend API
    console.log('Form submitted:', formData);
    // Redirect to confirmation page or show success message
    setCurrentStep(4); // Move to confirmation step
  };

  // Show loading state while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-800 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-12 w-32">
                <Image 
                  src="/images/pc-logo.svg" 
                  alt="Petroleum Commission Ghana Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h1 className="text-xl font-bold hidden md:block">Upstream Tracking System</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <span className="text-white">
                Welcome, {user?.firstName || user?.name || 'User'}
              </span>
            )}
            <Link href="/dashboard" className="text-white hover:text-gold-500">
              Dashboard
            </Link>
            <button 
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/auth/login');
              }}
              className="bg-gold-600 hover:bg-gold-700 text-white px-4 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-blue-800 text-white py-4 px-6">
            <h1 className="text-2xl font-bold">Permit Application</h1>
            <p className="text-sm mt-1">Complete all required information to submit your application</p>
          </div>
          
          {/* Progress Steps */}
          <div className="px-6 pt-6">
            <div className="flex items-center justify-between mb-8">
              <div className={`flex flex-col items-center ${currentStep >= 1 ? 'text-blue-800' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <span className="text-xs mt-1">Basic Info</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${currentStep >= 2 ? 'text-blue-800' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
                <span className="text-xs mt-1">Project Details</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${currentStep >= 3 ? 'text-blue-800' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  3
                </div>
                <span className="text-xs mt-1">Documents</span>
              </div>
              <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? 'bg-blue-800' : 'bg-gray-200'}`}></div>
              <div className={`flex flex-col items-center ${currentStep >= 4 ? 'text-blue-800' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-blue-800 text-white' : 'bg-gray-200 text-gray-600'}`}>
                  4
                </div>
                <span className="text-xs mt-1">Confirmation</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 pb-6">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Basic Information</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="permitType">
                    Permit Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="permitType"
                    name="permitType"
                    value={formData.permitType}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select Permit Type</option>
                    {permitTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyRegistrationNumber">
                    Company Registration Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="companyRegistrationNumber"
                    name="companyRegistrationNumber"
                    value={formData.companyRegistrationNumber}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPerson">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactEmail">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contactPhone">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end mt-8">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 2: Project Details */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Project Details</h2>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectName">
                    Project Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="projectDescription">
                    Project Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="projectDescription"
                    name="projectDescription"
                    value={formData.projectDescription}
                    onChange={handleInputChange}
                    rows={4}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="startDate">
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="endDate">
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="localContentPlan">
                    Local Content Plan <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="localContentPlan"
                    name="localContentPlan"
                    value={formData.localContentPlan}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe how your project will meet local content requirements..."
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  ></textarea>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 3: Documents */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold text-blue-800 mb-4">Required Documents</h2>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 text-blue-700 p-4 mb-6">
                  <p className="text-sm">Please upload all required documents. Accepted formats: PDF, JPG, PNG (max 10MB each)</p>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Company Registration Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload-1" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload-1" name="file-upload-1" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Tax Clearance Certificate <span className="text-red-500">*</span>
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload-2" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload-2" name="file-upload-2" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Environmental Impact Assessment (if applicable)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label htmlFor="file-upload-3" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                          <span>Upload a file</span>
                          <input id="file-upload-3" name="file-upload-3" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      id="termsAccepted"
                      name="termsAccepted"
                      type="checkbox"
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="termsAccepted" className="ml-2 block text-sm text-gray-900">
                      I certify that all information provided is true and accurate. I understand that providing false information may result in the rejection of this application and potential legal consequences. <span className="text-red-500">*</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-between mt-8">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Previous
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            )}
            
            {/* Step 4: Confirmation */}
            {currentStep === 4 && (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="mx-auto bg-green-100 rounded-full h-24 w-24 flex items-center justify-center">
                    <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-blue-800 mb-2">Application Submitted Successfully!</h2>
                <p className="text-gray-600 mb-6">Your application has been received and is now under review. You will receive a confirmation email shortly.</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 inline-block">
                  <p className="text-blue-800 font-semibold">Application Reference Number:</p>
                  <p className="text-2xl font-bold text-blue-800">PCG-APP-2023-0458</p>
                </div>
                
                <p className="text-gray-600 mb-8">You can track the status of your application by logging into your account.</p>
                
                <div className="flex justify-center space-x-4">
                  <Link href="/dashboard/company" className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                    Go to Dashboard
                  </Link>
                  <Link href="/" className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline">
                    Return to Home
                  </Link>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2023 Petroleum Commission Ghana. All rights reserved.</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/privacy-policy" className="hover:text-gold-500">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gold-500">Terms of Service</Link>
              <Link href="/contact" className="hover:text-gold-500">Contact Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}