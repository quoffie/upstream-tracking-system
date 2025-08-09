'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import DashboardLayout from '../../../../../app/components/layouts/DashboardLayout';
import { getCompanyAdminMenuItems } from '../../../../../app/components/layouts/DashboardMenus';
import {
  DocumentTextIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  PhotoIcon,
  PaperClipIcon
} from '@heroicons/react/24/outline';

export default function SubmitApplicationPage() {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarItems = getCompanyAdminMenuItems(pathname);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Application Type
    applicationType: '',
    category: '',
    title: '',
    description: '',
    
    // Location Details
    region: '',
    district: '',
    coordinates: '',
    area: '',
    waterDepth: '',
    
    // Project Details
    projectName: '',
    projectDuration: '',
    startDate: '',
    endDate: '',
    estimatedCost: '',
    
    // Technical Details
    methodology: '',
    equipment: '',
    personnel: '',
    safetyMeasures: '',
    environmentalImpact: '',
    
    // Documents
    technicalReport: null,
    environmentalAssessment: null,
    safetyPlan: null,
    financialGuarantee: null,
    insuranceCertificate: null,
    companyProfile: null,
    additionalDocuments: []
  });

  const applicationTypes = [
    { value: 'drilling_permit', label: 'Drilling Permit', category: 'Exploration' },
    { value: 'survey_permit', label: 'Seismic Survey Permit', category: 'Exploration' },
    { value: 'exploration_license', label: 'Exploration License', category: 'Exploration' },
    { value: 'production_license', label: 'Production License', category: 'Production' },
    { value: 'eia_permit', label: 'Environmental Impact Assessment', category: 'Environmental' },
    { value: 'abandonment_permit', label: 'Well Abandonment Permit', category: 'Decommissioning' },
    { value: 'pipeline_permit', label: 'Pipeline Construction Permit', category: 'Infrastructure' },
    { value: 'facility_permit', label: 'Facility Construction Permit', category: 'Infrastructure' }
  ];

  const regions = [
    'Western Region',
    'Central Region',
    'Greater Accra',
    'Eastern Region',
    'Volta Region',
    'Ashanti Region',
    'Brong Ahafo',
    'Northern Region',
    'Upper East',
    'Upper West',
    'Offshore'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Application submitted:', formData);
    // Redirect to applications list
    router.push('/dashboard/company-admin/my-applications');
  };

  const steps = [
    { id: 1, name: 'Application Type', icon: DocumentTextIcon },
    { id: 2, name: 'Location Details', icon: MapPinIcon },
    { id: 3, name: 'Project Details', icon: CalendarIcon },
    { id: 4, name: 'Technical Details', icon: ClipboardDocumentListIcon },
    { id: 5, name: 'Documents', icon: PaperClipIcon }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Application Type *</label>
              <select
                name="applicationType"
                value={formData.applicationType}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select Application Type</option>
                {applicationTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            
            {formData.applicationType && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input
                  type="text"
                  name="category"
                  value={applicationTypes.find(t => t.value === formData.applicationType)?.category || ''}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-50"
                  readOnly
                />
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Application Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Offshore Drilling Permit - Block 3A"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                placeholder="Provide a detailed description of your application..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Region *</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select Region</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Coordinates (Lat, Long) *</label>
              <input
                type="text"
                name="coordinates"
                value={formData.coordinates}
                onChange={handleInputChange}
                placeholder="e.g., 5.6037° N, 0.1870° W"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Area (sq km) *</label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Water Depth (m)</label>
                <input
                  type="number"
                  name="waterDepth"
                  value={formData.waterDepth}
                  onChange={handleInputChange}
                  placeholder="For offshore applications"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Project Name *</label>
              <input
                type="text"
                name="projectName"
                value={formData.projectName}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Project Duration (months) *</label>
                <input
                  type="number"
                  name="projectDuration"
                  value={formData.projectDuration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End Date *</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Estimated Cost (USD) *</label>
              <input
                type="number"
                name="estimatedCost"
                value={formData.estimatedCost}
                onChange={handleInputChange}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Methodology *</label>
              <textarea
                name="methodology"
                value={formData.methodology}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the methodology and approach for this project..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Equipment *</label>
              <textarea
                name="equipment"
                value={formData.equipment}
                onChange={handleInputChange}
                rows={3}
                placeholder="List the equipment and technology to be used..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Personnel *</label>
              <textarea
                name="personnel"
                value={formData.personnel}
                onChange={handleInputChange}
                rows={3}
                placeholder="Describe the personnel and expertise involved..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Safety Measures *</label>
              <textarea
                name="safetyMeasures"
                value={formData.safetyMeasures}
                onChange={handleInputChange}
                rows={4}
                placeholder="Detail the safety measures and protocols..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Environmental Impact Assessment *</label>
              <textarea
                name="environmentalImpact"
                value={formData.environmentalImpact}
                onChange={handleInputChange}
                rows={4}
                placeholder="Describe the potential environmental impacts and mitigation measures..."
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Technical Report *</label>
                <input
                  type="file"
                  name="technicalReport"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Environmental Assessment *</label>
                <input
                  type="file"
                  name="environmentalAssessment"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Safety Plan *</label>
                <input
                  type="file"
                  name="safetyPlan"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Financial Guarantee *</label>
                <input
                  type="file"
                  name="financialGuarantee"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Insurance Certificate *</label>
                <input
                  type="file"
                  name="insuranceCertificate"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Company Profile *</label>
                <input
                  type="file"
                  name="companyProfile"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  required
                />
              </div>
            </div>
            
            <div className="border-t pt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4">Additional Documents (Optional)</h4>
              <p className="text-sm text-gray-500 mb-4">
                Upload any additional supporting documents such as maps, diagrams, certificates, etc.
              </p>
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg"
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      title="Submit New Application"
      userRole="Company Admin"
      userName="Acme Corporation"
      userInitials="AC"
      sidebarItems={sidebarItems}
    >
      <div className="max-w-4xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
                  <div className="flex items-center">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                      step.id < currentStep
                        ? 'bg-blue-600'
                        : step.id === currentStep
                        ? 'border-2 border-blue-600 bg-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}>
                      <step.icon className={`h-6 w-6 ${
                        step.id < currentStep
                          ? 'text-white'
                          : step.id === currentStep
                          ? 'text-blue-600'
                          : 'text-gray-300'
                      }`} />
                    </div>
                    <span className={`ml-4 text-sm font-medium ${
                      step.id <= currentStep ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                  {stepIdx !== steps.length - 1 && (
                    <div className="absolute top-5 left-5 -ml-px mt-0.5 h-full w-0.5 bg-gray-300" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Form */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Step {currentStep}: {steps[currentStep - 1].name}
            </h3>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-6">
              {renderStepContent()}
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard/company-admin/my-applications')}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}