'use client';

import React, { useState } from 'react';
import DashboardLayout from '../../../../components/layouts/DashboardLayout';
import { FileTextIcon, DocumentIcon, ProfileIcon, PaymentIcon, ApplicationIcon, HomeIcon, RefreshCwIcon, PermitIcon, PersonnelIcon, ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from '../../../../components/icons/DashboardIcons';

// Define the SidebarNavItem interface
interface SidebarNavItem {
  name: string;
  href: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
  current: boolean;
}

// Define the structure for form data
interface RotatorPermitFormData {
  // Section 1: Personal Details
  fullName: string;
  gender: string;
  dob: string;
  nationality: string;
  passportNumber: string;
  passportIssueDate: string;
  passportExpiryDate: string;
  placeOfBirth: string;
  photo?: File | null;
  passportCopy?: File | null;

  // Section 2: Employment Details
  employerName: string;
  employerBusinessNature: string;
  employerAddress: string;
  employerPhone: string;
  employerEmail: string;
  jobTitleInCompany: string;
  jobDescription?: string;
  employmentContractCopy?: File | null;

  // Section 3: Rotator Status & Work Permit Details
  isNewApplication: boolean; // New or Renewal
  previousPermitNumber?: string; // If renewal
  intendedRotationCycle: string; // e.g., 28/28, 60/30
  expectedStartDate: string;
  durationOfAssignment: string; // e.g., 12 months
  workPermitCopyPrevious?: File | null; // If renewal
  relevantCertificates?: File | null; // e.g., BOSIET, HUET

  // Section 4: Entry & Assignment Details
  pointOfEntry: string;
  offshoreInstallationName?: string;
  onshoreLocationName?: string;
  comments?: string;

  // Section 5: Supporting Documents
  companyRegistrationCertCopy?: File | null;
  taxClearanceCertCopy?: File | null;
  letterOfIntentCopy?: File | null; // From operator/main contractor
  cvCopy?: File | null;

  // Section 6: Declaration
  declarationAccepted: boolean;
  signature?: string; // Or File for digital signature image
  dateOfDeclaration: string;

  // Section 7: Payment
  paymentMethod: string;
  transactionId?: string;
  paymentReceipt?: File | null;

  // Section 8: Additional Documents (Optional)
  otherSupportingDocs?: File[] | null;
}

const initialFormData: RotatorPermitFormData = {
  // Initialize with default/empty values
  fullName: '',
  gender: '',
  dob: '',
  nationality: '',
  passportNumber: '',
  passportIssueDate: '',
  passportExpiryDate: '',
  placeOfBirth: '',
  photo: null,
  passportCopy: null,

  employerName: '',
  employerBusinessNature: '',
  employerAddress: '',
  employerPhone: '',
  employerEmail: '',
  jobTitleInCompany: '',
  employmentContractCopy: null,

  isNewApplication: true,
  intendedRotationCycle: '',
  expectedStartDate: '',
  durationOfAssignment: '',
  relevantCertificates: null,

  pointOfEntry: '',

  declarationAccepted: false,
  dateOfDeclaration: '',

  paymentMethod: '',
};

const steps = [
  { id: 1, name: 'Personal Details' },
  { id: 2, name: 'Employment Details' },
  { id: 3, name: 'Rotator Status & Permit' },
  { id: 4, name: 'Entry & Assignment' },
  { id: 5, name: 'Supporting Documents' },
  { id: 6, name: 'Declaration' },
  { id: 7, name: 'Payment' },
  { id: 8, name: 'Review & Submit' },
];

const RotatorPermitApplicationPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RotatorPermitFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof RotatorPermitFormData, string>>>({});

  const sidebarItems: SidebarNavItem[] = [
    { name: 'Dashboard', href: '/dashboard/company-admin', icon: HomeIcon, current: false },
    { name: 'My Applications', href: '/dashboard/company-admin/applications', icon: FileTextIcon, current: true },
    { name: 'Permits', href: '/dashboard/company-admin/permits', icon: PermitIcon, current: false },
    { name: 'Personnel', href: '/dashboard/company-admin/personnel', icon: PersonnelIcon, current: false },
    { name: 'Company Profile', href: '/dashboard/company-admin/profile', icon: ProfileIcon, current: false },
    { name: 'Billing', href: '/dashboard/company-admin/billing', icon: PaymentIcon, current: false },
  ];

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    if (errors[name as keyof RotatorPermitFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateStep = (): boolean => {
    const newErrors: Partial<Record<keyof RotatorPermitFormData, string>> = {};
    // Basic validation, expand as needed
    if (currentStep === 1) {
      if (!formData.fullName) newErrors.fullName = 'Full name is required.';
      if (!formData.nationality) newErrors.nationality = 'Nationality is required.';
      if (!formData.passportNumber) newErrors.passportNumber = 'Passport number is required.';
    }
    // Add validations for other steps

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (currentStep < steps.length) {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep()) {
      // Final validation for all fields if needed
      console.log('Rotator Form submitted:', formData);
      // TODO: API call to submit form data
      alert('Rotator Application submitted successfully!'); // Placeholder
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Section 1: Personal Details</h3>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
            </div>
            {/* ... other fields for step 1 ... */}
            <div className="mb-4">
              <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">Nationality</label>
              <input type="text" name="nationality" id="nationality" value={formData.nationality} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.nationality && <p className="text-red-500 text-xs mt-1">{errors.nationality}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">Passport Number</label>
              <input type="text" name="passportNumber" id="passportNumber" value={formData.passportNumber} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
              {errors.passportNumber && <p className="text-red-500 text-xs mt-1">{errors.passportNumber}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Applicant's Photograph</label>
              <input type="file" name="photo" id="photo" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
            </div>
          </div>
        );
      case 2: return <div>Section 2: Employment Details Content...</div>;
      case 3: return <div>Section 3: Rotator Status & Work Permit Details Content...</div>;
      case 4: return <div>Section 4: Entry & Assignment Details Content...</div>;
      case 5: return <div>Section 5: Supporting Documents Content...</div>;
      case 6: return <div>Section 6: Declaration Content...</div>;
      case 7: return <div>Section 7: Payment Content...</div>;
      case 8:
        return (
          <div>
            <h3 className="text-lg font-semibold mb-4">Review Your Application</h3>
            <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        );
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <DashboardLayout
      sidebarItems={sidebarItems}
      title="Apply for Rotator Permit"
      userRole="Company Admin"
    >
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="mb-8">
          <div className="flex justify-between mb-1">
            {steps.map((step, index) => (
              <div key={step.id} className={`text-sm ${index + 1 <= currentStep ? 'text-indigo-600 font-semibold' : 'text-gray-500'}`}>
                {step.name}
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${(currentStep / steps.length) * 100}%` }}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStepContent()}

          <div className="mt-8 pt-5">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                <ChevronLeftIcon className="inline h-5 w-5 mr-2" /> Previous
              </button>
              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next <ChevronRightIcon className="inline h-5 w-5 ml-2" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  <CheckCircleIcon className="inline h-5 w-5 mr-2" /> Submit Application
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default RotatorPermitApplicationPage;