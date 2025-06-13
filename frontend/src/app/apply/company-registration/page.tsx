'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Upload, FileText } from 'lucide-react';

interface FormData {
  // Company Information
  companyName: string;
  registrationNumber: string;
  dateOfIncorporation: string;
  registeredAddress: string;
  postalAddress: string;
  telephoneNumber: string;
  faxNumber: string;
  emailAddress: string;
  website: string;
  
  // Contact Person
  contactPersonName: string;
  contactPersonPosition: string;
  contactPersonPhone: string;
  contactPersonEmail: string;
  
  // Corporate Structure
  typeOfCompany: string;
  authorizedCapital: string;
  paidUpCapital: string;
  shareholderStructure: string;
  
  // Shareholders (simplified - in real implementation would be dynamic array)
  shareholderName1: string;
  shareholderNationality1: string;
  shareholderShares1: string;
  shareholderName2: string;
  shareholderNationality2: string;
  shareholderShares2: string;
  
  // Directors (simplified - in real implementation would be dynamic array)
  directorName1: string;
  directorNationality1: string;
  directorPosition1: string;
  directorName2: string;
  directorNationality2: string;
  directorPosition2: string;
  
  // Permit Category
  permitCategory: string;
  specificActivities: string;
  
  // Financial & Technical Competency
  financialCapability: string;
  technicalCompetency: string;
  staffingPlan: string;
  experienceRecord: string;
  
  // Plans and Programmes
  threeYearPlan: string;
  
  // Local Content
  localContentPlan: string;
  
  // Investments
  proposedInvestments: string;
  
  // Services
  servicesOffered: string;
  
  // Materials
  materialsEquipment: string;
  
  // HSSE
  hssePolicy: string;
  
  // Declarations
  declarationCompliance: boolean;
  declarationAccuracy: boolean;
  declarationUndertaking: boolean;
}

const steps = [
  { id: 1, title: 'Company Information', description: 'Basic company details' },
  { id: 2, title: 'Corporate Structure', description: 'Shareholders and directors' },
  { id: 3, title: 'Permit Category', description: 'Activities and permits' },
  { id: 4, title: 'Financial & Technical', description: 'Competency and capability' },
  { id: 5, title: 'Plans & Local Content', description: 'Strategic plans and local content' },
  { id: 6, title: 'HSSE & Declarations', description: 'Safety policies and declarations' },
];

export default function CompanyRegistrationPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    registrationNumber: '',
    dateOfIncorporation: '',
    registeredAddress: '',
    postalAddress: '',
    telephoneNumber: '',
    faxNumber: '',
    emailAddress: '',
    website: '',
    contactPersonName: '',
    contactPersonPosition: '',
    contactPersonPhone: '',
    contactPersonEmail: '',
    typeOfCompany: '',
    authorizedCapital: '',
    paidUpCapital: '',
    shareholderStructure: '',
    shareholderName1: '',
    shareholderNationality1: '',
    shareholderShares1: '',
    shareholderName2: '',
    shareholderNationality2: '',
    shareholderShares2: '',
    directorName1: '',
    directorNationality1: '',
    directorPosition1: '',
    directorName2: '',
    directorNationality2: '',
    directorPosition2: '',
    permitCategory: '',
    specificActivities: '',
    financialCapability: '',
    technicalCompetency: '',
    staffingPlan: '',
    experienceRecord: '',
    threeYearPlan: '',
    localContentPlan: '',
    proposedInvestments: '',
    servicesOffered: '',
    materialsEquipment: '',
    hssePolicy: '',
    declarationCompliance: false,
    declarationAccuracy: false,
    declarationUndertaking: false,
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // TODO: Implement API call to submit company registration
      console.log('Submitting company registration:', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or dashboard
      router.push('/dashboard/company-admin/applications?registration=success');
    } catch (error) {
      console.error('Error submitting registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="companyName">Company Name *</Label>
          <Input
            id="companyName"
            value={formData.companyName}
            onChange={(e) => updateFormData('companyName', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="registrationNumber">Registration Number *</Label>
          <Input
            id="registrationNumber"
            value={formData.registrationNumber}
            onChange={(e) => updateFormData('registrationNumber', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfIncorporation">Date of Incorporation *</Label>
          <Input
            id="dateOfIncorporation"
            type="date"
            value={formData.dateOfIncorporation}
            onChange={(e) => updateFormData('dateOfIncorporation', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="telephoneNumber">Telephone Number *</Label>
          <Input
            id="telephoneNumber"
            value={formData.telephoneNumber}
            onChange={(e) => updateFormData('telephoneNumber', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="faxNumber">Fax Number</Label>
          <Input
            id="faxNumber"
            value={formData.faxNumber}
            onChange={(e) => updateFormData('faxNumber', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="emailAddress">Email Address *</Label>
          <Input
            id="emailAddress"
            type="email"
            value={formData.emailAddress}
            onChange={(e) => updateFormData('emailAddress', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateFormData('website', e.target.value)}
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="registeredAddress">Registered Address *</Label>
          <Textarea
            id="registeredAddress"
            value={formData.registeredAddress}
            onChange={(e) => updateFormData('registeredAddress', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="postalAddress">Postal Address</Label>
          <Textarea
            id="postalAddress"
            value={formData.postalAddress}
            onChange={(e) => updateFormData('postalAddress', e.target.value)}
          />
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Contact Person</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="contactPersonName">Contact Person Name *</Label>
            <Input
              id="contactPersonName"
              value={formData.contactPersonName}
              onChange={(e) => updateFormData('contactPersonName', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPersonPosition">Position *</Label>
            <Input
              id="contactPersonPosition"
              value={formData.contactPersonPosition}
              onChange={(e) => updateFormData('contactPersonPosition', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPersonPhone">Phone Number *</Label>
            <Input
              id="contactPersonPhone"
              value={formData.contactPersonPhone}
              onChange={(e) => updateFormData('contactPersonPhone', e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="contactPersonEmail">Email Address *</Label>
            <Input
              id="contactPersonEmail"
              type="email"
              value={formData.contactPersonEmail}
              onChange={(e) => updateFormData('contactPersonEmail', e.target.value)}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="typeOfCompany">Type of Company *</Label>
          <Select value={formData.typeOfCompany} onValueChange={(value) => updateFormData('typeOfCompany', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select company type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="private_limited">Private Limited Company</SelectItem>
              <SelectItem value="public_limited">Public Limited Company</SelectItem>
              <SelectItem value="partnership">Partnership</SelectItem>
              <SelectItem value="sole_proprietorship">Sole Proprietorship</SelectItem>
              <SelectItem value="branch_office">Branch Office</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="authorizedCapital">Authorized Capital (USD) *</Label>
          <Input
            id="authorizedCapital"
            type="number"
            value={formData.authorizedCapital}
            onChange={(e) => updateFormData('authorizedCapital', e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="paidUpCapital">Paid-up Capital (USD) *</Label>
          <Input
            id="paidUpCapital"
            type="number"
            value={formData.paidUpCapital}
            onChange={(e) => updateFormData('paidUpCapital', e.target.value)}
            required
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="shareholderStructure">Shareholder Structure *</Label>
        <Textarea
          id="shareholderStructure"
          value={formData.shareholderStructure}
          onChange={(e) => updateFormData('shareholderStructure', e.target.value)}
          placeholder="Describe the ownership structure of the company"
          required
        />
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Major Shareholders</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shareholderName1">Shareholder 1 Name</Label>
              <Input
                id="shareholderName1"
                value={formData.shareholderName1}
                onChange={(e) => updateFormData('shareholderName1', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="shareholderNationality1">Nationality</Label>
              <Input
                id="shareholderNationality1"
                value={formData.shareholderNationality1}
                onChange={(e) => updateFormData('shareholderNationality1', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="shareholderShares1">Percentage of Shares</Label>
              <Input
                id="shareholderShares1"
                type="number"
                value={formData.shareholderShares1}
                onChange={(e) => updateFormData('shareholderShares1', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="shareholderName2">Shareholder 2 Name</Label>
              <Input
                id="shareholderName2"
                value={formData.shareholderName2}
                onChange={(e) => updateFormData('shareholderName2', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="shareholderNationality2">Nationality</Label>
              <Input
                id="shareholderNationality2"
                value={formData.shareholderNationality2}
                onChange={(e) => updateFormData('shareholderNationality2', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="shareholderShares2">Percentage of Shares</Label>
              <Input
                id="shareholderShares2"
                type="number"
                value={formData.shareholderShares2}
                onChange={(e) => updateFormData('shareholderShares2', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Directors</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="directorName1">Director 1 Name</Label>
              <Input
                id="directorName1"
                value={formData.directorName1}
                onChange={(e) => updateFormData('directorName1', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="directorNationality1">Nationality</Label>
              <Input
                id="directorNationality1"
                value={formData.directorNationality1}
                onChange={(e) => updateFormData('directorNationality1', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="directorPosition1">Position</Label>
              <Input
                id="directorPosition1"
                value={formData.directorPosition1}
                onChange={(e) => updateFormData('directorPosition1', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="directorName2">Director 2 Name</Label>
              <Input
                id="directorName2"
                value={formData.directorName2}
                onChange={(e) => updateFormData('directorName2', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="directorNationality2">Nationality</Label>
              <Input
                id="directorNationality2"
                value={formData.directorNationality2}
                onChange={(e) => updateFormData('directorNationality2', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="directorPosition2">Position</Label>
              <Input
                id="directorPosition2"
                value={formData.directorPosition2}
                onChange={(e) => updateFormData('directorPosition2', e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="permitCategory">Permit Category *</Label>
        <Select value={formData.permitCategory} onValueChange={(value) => updateFormData('permitCategory', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select permit category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="exploration">Exploration</SelectItem>
            <SelectItem value="development">Development</SelectItem>
            <SelectItem value="production">Production</SelectItem>
            <SelectItem value="transportation">Transportation</SelectItem>
            <SelectItem value="refining">Refining</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="service_provider">Service Provider</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="specificActivities">Specific Activities *</Label>
        <Textarea
          id="specificActivities"
          value={formData.specificActivities}
          onChange={(e) => updateFormData('specificActivities', e.target.value)}
          placeholder="Describe the specific activities your company will undertake"
          rows={4}
          required
        />
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-blue-900 mb-2">Required Documents</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Certificate of Incorporation</li>
          <li>• Memorandum and Articles of Association</li>
          <li>• Certificate of Commencement of Business</li>
          <li>• Tax Identification Number (TIN)</li>
          <li>• VAT Registration Certificate</li>
          <li>• Social Security Registration</li>
          <li>• Audited Financial Statements (last 3 years)</li>
        </ul>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="financialCapability">Financial Capability *</Label>
        <Textarea
          id="financialCapability"
          value={formData.financialCapability}
          onChange={(e) => updateFormData('financialCapability', e.target.value)}
          placeholder="Describe your company's financial capability and resources"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="technicalCompetency">Technical Competency *</Label>
        <Textarea
          id="technicalCompetency"
          value={formData.technicalCompetency}
          onChange={(e) => updateFormData('technicalCompetency', e.target.value)}
          placeholder="Describe your company's technical expertise and competencies"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="staffingPlan">Staffing Plan *</Label>
        <Textarea
          id="staffingPlan"
          value={formData.staffingPlan}
          onChange={(e) => updateFormData('staffingPlan', e.target.value)}
          placeholder="Describe your staffing plan including key personnel and organizational structure"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="experienceRecord">Experience Record *</Label>
        <Textarea
          id="experienceRecord"
          value={formData.experienceRecord}
          onChange={(e) => updateFormData('experienceRecord', e.target.value)}
          placeholder="Describe your company's relevant experience and track record"
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="threeYearPlan">Three-Year Business Plan *</Label>
        <Textarea
          id="threeYearPlan"
          value={formData.threeYearPlan}
          onChange={(e) => updateFormData('threeYearPlan', e.target.value)}
          placeholder="Provide a detailed three-year business plan including objectives, strategies, and milestones"
          rows={6}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="localContentPlan">Local Content Plan *</Label>
        <Textarea
          id="localContentPlan"
          value={formData.localContentPlan}
          onChange={(e) => updateFormData('localContentPlan', e.target.value)}
          placeholder="Describe your local content plan including employment of Ghanaians, use of local services, and technology transfer"
          rows={6}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="proposedInvestments">Proposed Investments *</Label>
        <Textarea
          id="proposedInvestments"
          value={formData.proposedInvestments}
          onChange={(e) => updateFormData('proposedInvestments', e.target.value)}
          placeholder="Detail your proposed investments in Ghana including amounts, timeline, and expected outcomes"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="servicesOffered">Services Offered *</Label>
        <Textarea
          id="servicesOffered"
          value={formData.servicesOffered}
          onChange={(e) => updateFormData('servicesOffered', e.target.value)}
          placeholder="Describe the services your company will offer"
          rows={4}
          required
        />
      </div>
      
      <div>
        <Label htmlFor="materialsEquipment">Materials and Equipment *</Label>
        <Textarea
          id="materialsEquipment"
          value={formData.materialsEquipment}
          onChange={(e) => updateFormData('materialsEquipment', e.target.value)}
          placeholder="List the materials and equipment your company will use or provide"
          rows={4}
          required
        />
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="hssePolicy">Health, Safety, Security & Environment (HSSE) Policy *</Label>
        <Textarea
          id="hssePolicy"
          value={formData.hssePolicy}
          onChange={(e) => updateFormData('hssePolicy', e.target.value)}
          placeholder="Describe your company's HSSE policy and procedures"
          rows={6}
          required
        />
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Declarations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="declarationCompliance"
              checked={formData.declarationCompliance}
              onCheckedChange={(checked) => updateFormData('declarationCompliance', checked as boolean)}
            />
            <Label htmlFor="declarationCompliance" className="text-sm leading-relaxed">
              I declare that the company will comply with all applicable laws, regulations, and guidelines of Ghana, including but not limited to the Petroleum (Exploration and Production) Act, Environmental Protection Agency regulations, and Labour Act.
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="declarationAccuracy"
              checked={formData.declarationAccuracy}
              onCheckedChange={(checked) => updateFormData('declarationAccuracy', checked as boolean)}
            />
            <Label htmlFor="declarationAccuracy" className="text-sm leading-relaxed">
              I declare that all information provided in this application is true, accurate, and complete to the best of my knowledge and belief.
            </Label>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="declarationUndertaking"
              checked={formData.declarationUndertaking}
              onCheckedChange={(checked) => updateFormData('declarationUndertaking', checked as boolean)}
            />
            <Label htmlFor="declarationUndertaking" className="text-sm leading-relaxed">
              I undertake to notify the Petroleum Commission of any material changes to the information provided in this application and to provide any additional information that may be required.
            </Label>
          </div>
        </div>
      </div>
      
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="text-sm font-semibold text-yellow-900 mb-2">Important Notice</h3>
        <p className="text-sm text-yellow-800">
          By submitting this application, you acknowledge that providing false or misleading information may result in the rejection of your application or revocation of any permit granted. The Petroleum Commission reserves the right to verify all information provided.
        </p>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.companyName && formData.registrationNumber && formData.dateOfIncorporation && 
               formData.registeredAddress && formData.telephoneNumber && formData.emailAddress &&
               formData.contactPersonName && formData.contactPersonPosition && formData.contactPersonPhone && formData.contactPersonEmail;
      case 2:
        return formData.typeOfCompany && formData.authorizedCapital && formData.paidUpCapital && formData.shareholderStructure;
      case 3:
        return formData.permitCategory && formData.specificActivities;
      case 4:
        return formData.financialCapability && formData.technicalCompetency && formData.staffingPlan && formData.experienceRecord;
      case 5:
        return formData.threeYearPlan && formData.localContentPlan && formData.proposedInvestments && 
               formData.servicesOffered && formData.materialsEquipment;
      case 6:
        return formData.hssePolicy && formData.declarationCompliance && formData.declarationAccuracy && formData.declarationUndertaking;
      default:
        return false;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Company Registration Application
          </h1>
          <p className="text-gray-600">
            Complete all sections to register your company with the Petroleum Commission of Ghana
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1]?.title}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Navigation */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  step.id === currentStep
                    ? 'bg-blue-100 text-blue-800'
                    : step.id < currentStep
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep - 1]?.title}</CardTitle>
            <CardDescription>{steps[currentStep - 1]?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderCurrentStep()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          {currentStep === steps.length ? (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid() || isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
              {!isSubmitting && <FileText className="h-4 w-4 ml-2" />}
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
            >
              Next
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}