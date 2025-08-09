'use client';

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DocumentTextIcon,
  UserIcon,
  BriefcaseIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export default function ApplyRegularPermitPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (!token || !userData) {
      router.push('/auth/login?redirect=' + encodeURIComponent(pathname));
      return;
    }
    
    try {
      const user = JSON.parse(userData);
      if (user.role !== 'COMPANY_ADMIN' && user.role !== 'PERSONNEL') {
        router.push('/auth/login');
        return;
      }
      
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error parsing user data:', error);
      router.push('/auth/login');
      return;
    }
    
    setIsLoading(false);
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    passportNumber: '',
    passportExpiry: '',
    
    // Professional Information
    position: '',
    department: '',
    yearsExperience: '',
    qualifications: '',
    previousExperience: '',
    
    // Permit Details
    permitType: 'regular',
    requestedStartDate: '',
    requestedDuration: '',
    workLocation: '',
    projectDescription: '',
    
    // Company Information
    companyName: '',
    companyRegistration: '',
    supervisorName: '',
    supervisorEmail: '',
    
    // Documents
    documents: {
      passport: null,
      cv: null,
      qualificationCertificates: null,
      medicalCertificate: null,
      policeReport: null,
      companyLetter: null
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Personal Information', icon: UserIcon },
    { id: 2, name: 'Professional Details', icon: BriefcaseIcon },
    { id: 3, name: 'Permit Information', icon: DocumentTextIcon },
    { id: 4, name: 'Documents Upload', icon: DocumentTextIcon },
    { id: 5, name: 'Review & Submit', icon: CheckCircleIcon }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (documentType: string, file: File | null) => {
    setFormData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required';
        if (!formData.lastName) newErrors.lastName = 'Last name is required';
        if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
        if (!formData.nationality) newErrors.nationality = 'Nationality is required';
        if (!formData.passportNumber) newErrors.passportNumber = 'Passport number is required';
        if (!formData.passportExpiry) newErrors.passportExpiry = 'Passport expiry is required';
        break;
      case 2:
        if (!formData.position) newErrors.position = 'Position is required';
        if (!formData.department) newErrors.department = 'Department is required';
        if (!formData.yearsExperience) newErrors.yearsExperience = 'Years of experience is required';
        break;
      case 3:
        if (!formData.requestedStartDate) newErrors.requestedStartDate = 'Start date is required';
        if (!formData.requestedDuration) newErrors.requestedDuration = 'Duration is required';
        if (!formData.workLocation) newErrors.workLocation = 'Work location is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to applications page with success message
      router.push('/dashboard/company-admin/applications/all?success=true');
    } catch (error) {
      console.error('Error submitting application:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <Input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={errors.firstName ? 'border-red-500' : ''}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <Input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={errors.lastName ? 'border-red-500' : ''}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  className={errors.dateOfBirth ? 'border-red-500' : ''}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nationality *
                </label>
                <Input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className={errors.nationality ? 'border-red-500' : ''}
                />
                {errors.nationality && (
                  <p className="mt-1 text-sm text-red-600">{errors.nationality}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Number *
                </label>
                <Input
                  type="text"
                  value={formData.passportNumber}
                  onChange={(e) => handleInputChange('passportNumber', e.target.value)}
                  className={errors.passportNumber ? 'border-red-500' : ''}
                />
                {errors.passportNumber && (
                  <p className="mt-1 text-sm text-red-600">{errors.passportNumber}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Passport Expiry Date *
                </label>
                <Input
                  type="date"
                  value={formData.passportExpiry}
                  onChange={(e) => handleInputChange('passportExpiry', e.target.value)}
                  className={errors.passportExpiry ? 'border-red-500' : ''}
                />
                {errors.passportExpiry && (
                  <p className="mt-1 text-sm text-red-600">{errors.passportExpiry}</p>
                )}
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position/Job Title *
                </label>
                <Input
                  type="text"
                  value={formData.position}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  className={errors.position ? 'border-red-500' : ''}
                />
                {errors.position && (
                  <p className="mt-1 text-sm text-red-600">{errors.position}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department *
                </label>
                <select
                  value={formData.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.department ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Department</option>
                  <option value="drilling">Drilling</option>
                  <option value="production">Production</option>
                  <option value="engineering">Engineering</option>
                  <option value="geology">Geology</option>
                  <option value="safety">Safety</option>
                  <option value="environmental">Environmental</option>
                  <option value="operations">Operations</option>
                  <option value="maintenance">Maintenance</option>
                </select>
                {errors.department && (
                  <p className="mt-1 text-sm text-red-600">{errors.department}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Years of Experience *
                </label>
                <Input
                  type="number"
                  value={formData.yearsExperience}
                  onChange={(e) => handleInputChange('yearsExperience', e.target.value)}
                  className={errors.yearsExperience ? 'border-red-500' : ''}
                />
                {errors.yearsExperience && (
                  <p className="mt-1 text-sm text-red-600">{errors.yearsExperience}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Qualifications
                </label>
                <textarea
                  value={formData.qualifications}
                  onChange={(e) => handleInputChange('qualifications', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="List your relevant qualifications and certifications"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Previous Experience
                </label>
                <textarea
                  value={formData.previousExperience}
                  onChange={(e) => handleInputChange('previousExperience', e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your previous work experience relevant to this position"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Permit Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Start Date *
                </label>
                <Input
                  type="date"
                  value={formData.requestedStartDate}
                  onChange={(e) => handleInputChange('requestedStartDate', e.target.value)}
                  className={errors.requestedStartDate ? 'border-red-500' : ''}
                />
                {errors.requestedStartDate && (
                  <p className="mt-1 text-sm text-red-600">{errors.requestedStartDate}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Requested Duration *
                </label>
                <select
                  value={formData.requestedDuration}
                  onChange={(e) => handleInputChange('requestedDuration', e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.requestedDuration ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Duration</option>
                  <option value="6-months">6 Months</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                  <option value="3-years">3 Years</option>
                  <option value="other">Other</option>
                </select>
                {errors.requestedDuration && (
                  <p className="mt-1 text-sm text-red-600">{errors.requestedDuration}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location *
                </label>
                <Input
                  type="text"
                  value={formData.workLocation}
                  onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  className={errors.workLocation ? 'border-red-500' : ''}
                  placeholder="e.g., Offshore Platform, Onshore Facility"
                />
                {errors.workLocation && (
                  <p className="mt-1 text-sm text-red-600">{errors.workLocation}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  value={formData.projectDescription}
                  onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe the project and work to be performed"
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Document Upload</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Required Documents
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Please upload all required documents. Files should be in PDF format and not exceed 10MB each.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'passport', label: 'Passport Copy', required: true },
                { key: 'cv', label: 'Curriculum Vitae', required: true },
                { key: 'qualificationCertificates', label: 'Qualification Certificates', required: true },
                { key: 'medicalCertificate', label: 'Medical Certificate', required: true },
                { key: 'policeReport', label: 'Police Clearance Report', required: true },
                { key: 'companyLetter', label: 'Company Support Letter', required: true }
              ].map((doc) => (
                <div key={doc.key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {doc.label} {doc.required && '*'}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(doc.key, e.target.files?.[0] || null)}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {formData.documents[doc.key as keyof typeof formData.documents] && (
                    <p className="text-sm text-green-600">
                      ✓ File uploaded: {(formData.documents[doc.key as keyof typeof formData.documents] as unknown as File).name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Review & Submit</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900">Personal Information</h4>
                <p className="text-sm text-gray-600">
                  {formData.firstName} {formData.lastName} • {formData.nationality} • {formData.passportNumber}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Professional Details</h4>
                <p className="text-sm text-gray-600">
                  {formData.position} • {formData.department} • {formData.yearsExperience} years experience
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Permit Information</h4>
                <p className="text-sm text-gray-600">
                  Start: {formData.requestedStartDate} • Duration: {formData.requestedDuration} • Location: {formData.workLocation}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Documents</h4>
                <div className="text-sm text-gray-600">
                  {Object.entries(formData.documents).map(([key, file]) => (
                    <div key={key} className="flex items-center">
                      {file ? (
                        <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <ExclamationTriangleIcon className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <span className={file ? 'text-green-600' : 'text-red-600'}>
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <CheckCircleIcon className="h-5 w-5 text-blue-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Application Fee
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Regular Permit Application Fee: $2,500 USD</p>
                    <p>Payment will be processed after application review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Apply for Regular Permit"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress Steps */}
        <div className="bg-white shadow rounded-lg p-6">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.id} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                  <div className="flex items-center">
                    <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                      step.id < currentStep
                        ? 'bg-green-600'
                        : step.id === currentStep
                        ? 'bg-blue-600'
                        : 'bg-gray-300'
                    }`}>
                      {step.id < currentStep ? (
                        <CheckCircleIcon className="h-5 w-5 text-white" />
                      ) : (
                        <span className="text-white text-sm font-medium">{step.id}</span>
                      )}
                    </div>
                    <span className={`ml-4 text-sm font-medium ${
                      step.id <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-4 left-4 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form Content */}
        <div className="bg-white shadow rounded-lg p-6">
          {renderStepContent()}
          
          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}