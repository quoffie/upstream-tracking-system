'use client';

import { useState } from 'react';
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
  ArrowPathIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function ApplyRotatorPermitPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  
  const [currentStep, setCurrentStep] = useState(1);
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
    previousRotatorExperience: '',
    
    // Rotator Permit Details
    permitType: 'rotator',
    rotationSchedule: '',
    workDaysOn: '',
    workDaysOff: '',
    requestedStartDate: '',
    contractDuration: '',
    workLocation: '',
    projectDescription: '',
    emergencyContact: '',
    emergencyContactPhone: '',
    
    // Company Information
    companyName: '',
    companyRegistration: '',
    supervisorName: '',
    supervisorEmail: '',
    
    // Health & Safety
    medicalFitness: '',
    safetyTraining: '',
    emergencyResponse: '',
    
    // Documents
    documents: {
      passport: null,
      cv: null,
      qualificationCertificates: null,
      medicalCertificate: null,
      safetyTrainingCertificate: null,
      policeReport: null,
      companyLetter: null,
      rotatorExperienceLetter: null
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: 'Personal Information', icon: UserIcon },
    { id: 2, name: 'Professional Details', icon: BriefcaseIcon },
    { id: 3, name: 'Rotator Schedule', icon: ArrowPathIcon },
    { id: 4, name: 'Health & Safety', icon: ExclamationTriangleIcon },
    { id: 5, name: 'Documents Upload', icon: DocumentTextIcon },
    { id: 6, name: 'Review & Submit', icon: CheckCircleIcon }
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
        if (!formData.rotationSchedule) newErrors.rotationSchedule = 'Rotation schedule is required';
        if (!formData.workDaysOn) newErrors.workDaysOn = 'Work days on is required';
        if (!formData.workDaysOff) newErrors.workDaysOff = 'Work days off is required';
        if (!formData.requestedStartDate) newErrors.requestedStartDate = 'Start date is required';
        break;
      case 4:
        if (!formData.medicalFitness) newErrors.medicalFitness = 'Medical fitness declaration is required';
        if (!formData.safetyTraining) newErrors.safetyTraining = 'Safety training information is required';
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
                  Previous Rotator Experience
                </label>
                <textarea
                  value={formData.previousRotatorExperience}
                  onChange={(e) => handleInputChange('previousRotatorExperience', e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe your previous rotator work experience, including rotation schedules and offshore/remote work"
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Rotator Schedule Information</h3>
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex">
                <ArrowPathIcon className="h-5 w-5 text-blue-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Rotator Work Schedule
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Rotator permits are for personnel who work on a rotation basis (e.g., 28 days on, 28 days off).</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rotation Schedule *
                </label>
                <select
                  value={formData.rotationSchedule}
                  onChange={(e) => handleInputChange('rotationSchedule', e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.rotationSchedule ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Rotation Schedule</option>
                  <option value="14-14">14 days on / 14 days off</option>
                  <option value="21-21">21 days on / 21 days off</option>
                  <option value="28-28">28 days on / 28 days off</option>
                  <option value="42-42">42 days on / 42 days off</option>
                  <option value="custom">Custom Schedule</option>
                </select>
                {errors.rotationSchedule && (
                  <p className="mt-1 text-sm text-red-600">{errors.rotationSchedule}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Days On *
                </label>
                <Input
                  type="number"
                  value={formData.workDaysOn}
                  onChange={(e) => handleInputChange('workDaysOn', e.target.value)}
                  className={errors.workDaysOn ? 'border-red-500' : ''}
                  placeholder="e.g., 28"
                />
                {errors.workDaysOn && (
                  <p className="mt-1 text-sm text-red-600">{errors.workDaysOn}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Days Off *
                </label>
                <Input
                  type="number"
                  value={formData.workDaysOff}
                  onChange={(e) => handleInputChange('workDaysOff', e.target.value)}
                  className={errors.workDaysOff ? 'border-red-500' : ''}
                  placeholder="e.g., 28"
                />
                {errors.workDaysOff && (
                  <p className="mt-1 text-sm text-red-600">{errors.workDaysOff}</p>
                )}
              </div>
              
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
                  Contract Duration
                </label>
                <select
                  value={formData.contractDuration}
                  onChange={(e) => handleInputChange('contractDuration', e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Select Duration</option>
                  <option value="1-year">1 Year</option>
                  <option value="2-years">2 Years</option>
                  <option value="3-years">3 Years</option>
                  <option value="indefinite">Indefinite</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Location
                </label>
                <Input
                  type="text"
                  value={formData.workLocation}
                  onChange={(e) => handleInputChange('workLocation', e.target.value)}
                  placeholder="e.g., Offshore Platform, Remote Site"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Name
                </label>
                <Input
                  type="text"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  placeholder="Full name of emergency contact"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact Phone
                </label>
                <Input
                  type="tel"
                  value={formData.emergencyContactPhone}
                  onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                  placeholder="Phone number with country code"
                />
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
                  placeholder="Describe the project and rotator work to be performed"
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Health & Safety Requirements</h3>
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    Important Health & Safety Requirements
                  </h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>Rotator personnel must meet enhanced health and safety standards due to remote work conditions.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Medical Fitness Declaration *
                </label>
                <select
                  value={formData.medicalFitness}
                  onChange={(e) => handleInputChange('medicalFitness', e.target.value)}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.medicalFitness ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select Medical Fitness Status</option>
                  <option value="fit-for-duty">Fit for Duty</option>
                  <option value="fit-with-restrictions">Fit with Restrictions</option>
                  <option value="pending-medical">Pending Medical Examination</option>
                </select>
                {errors.medicalFitness && (
                  <p className="mt-1 text-sm text-red-600">{errors.medicalFitness}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Safety Training Certifications *
                </label>
                <textarea
                  value={formData.safetyTraining}
                  onChange={(e) => handleInputChange('safetyTraining', e.target.value)}
                  rows={4}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.safetyTraining ? 'border-red-500' : ''
                  }`}
                  placeholder="List all safety training certifications (e.g., BOSIET, HUET, H2S, First Aid, etc.)"
                />
                {errors.safetyTraining && (
                  <p className="mt-1 text-sm text-red-600">{errors.safetyTraining}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Emergency Response Training
                </label>
                <textarea
                  value={formData.emergencyResponse}
                  onChange={(e) => handleInputChange('emergencyResponse', e.target.value)}
                  rows={3}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Describe emergency response training and certifications"
                />
              </div>
            </div>
          </div>
        );
        
      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Document Upload</h3>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Required Documents for Rotator Permit
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Additional documents are required for rotator permits. Files should be in PDF format and not exceed 10MB each.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { key: 'passport', label: 'Passport Copy', required: true },
                { key: 'cv', label: 'Curriculum Vitae', required: true },
                { key: 'qualificationCertificates', label: 'Qualification Certificates', required: true },
                { key: 'medicalCertificate', label: 'Medical Certificate (Offshore/Remote)', required: true },
                { key: 'safetyTrainingCertificate', label: 'Safety Training Certificates', required: true },
                { key: 'policeReport', label: 'Police Clearance Report', required: true },
                { key: 'companyLetter', label: 'Company Support Letter', required: true },
                { key: 'rotatorExperienceLetter', label: 'Previous Rotator Experience Letter', required: false }
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
        
      case 6:
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
                <h4 className="font-medium text-gray-900">Rotator Schedule</h4>
                <p className="text-sm text-gray-600">
                  {formData.rotationSchedule} • {formData.workDaysOn} days on / {formData.workDaysOff} days off
                </p>
                <p className="text-sm text-gray-600">
                  Start: {formData.requestedStartDate} • Duration: {formData.contractDuration}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900">Health & Safety</h4>
                <p className="text-sm text-gray-600">
                  Medical Fitness: {formData.medicalFitness}
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
                    <p>Rotator Permit Application Fee: $3,000 USD</p>
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
      title="Apply for Rotator Permit"
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