'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { DocumentTextIcon, CloudArrowUpIcon, CheckCircleIcon, ExclamationTriangleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

interface Partner {
  id: string;
  name: string;
  country: string;
  equityShare: number;
  role: string;
}

interface FormData {
  jvName: string;
  sector: string;
  description: string;
  estimatedValue: string;
  projectDuration: string;
  operatingCountry: string;
  partners: Partner[];
  documents: File[];
  termsAccepted: boolean;
}

const initialFormData: FormData = {
  jvName: '',
  sector: '',
  description: '',
  estimatedValue: '',
  projectDuration: '',
  operatingCountry: 'Ghana',
  partners: [{ id: '1', name: '', country: 'Ghana', equityShare: 0, role: 'Lead Partner' }],
  documents: [],
  termsAccepted: false
};

export default function SubmitJVPlanPage() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      name: '',
      country: 'Ghana',
      equityShare: 0,
      role: 'Partner'
    };
    setFormData(prev => ({
      ...prev,
      partners: [...prev.partners, newPartner]
    }));
  };

  const removePartner = (id: string) => {
    if (formData.partners.length > 1) {
      setFormData(prev => ({
        ...prev,
        partners: prev.partners.filter(p => p.id !== id)
      }));
    }
  };

  const updatePartner = (id: string, field: keyof Partner, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      partners: prev.partners.map(p => 
        p.id === id ? { ...p, [field]: value } : p
      )
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      documents: [...prev.documents, ...files]
    }));
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.jvName.trim()) newErrors.jvName = 'JV name is required';
        if (!formData.sector) newErrors.sector = 'Sector is required';
        if (!formData.description.trim()) newErrors.description = 'Description is required';
        if (!formData.estimatedValue) newErrors.estimatedValue = 'Estimated value is required';
        break;
      case 2:
        const totalEquity = formData.partners.reduce((sum, p) => sum + p.equityShare, 0);
        if (totalEquity !== 100) newErrors.equity = 'Total equity must equal 100%';
        formData.partners.forEach((partner, index) => {
          if (!partner.name.trim()) newErrors[`partner_${index}_name`] = 'Partner name is required';
          if (partner.equityShare <= 0) newErrors[`partner_${index}_equity`] = 'Equity share must be greater than 0';
        });
        break;
      case 3:
        if (formData.documents.length === 0) newErrors.documents = 'At least one document is required';
        break;
      case 4:
        if (!formData.termsAccepted) newErrors.terms = 'You must accept the terms and conditions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('JV Plan submitted successfully!');
      // Reset form or redirect
      setFormData(initialFormData);
      setCurrentStep(1);
    } catch (error) {
      toast.error('Failed to submit JV Plan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Submit JV Formation Plan</h1>
        <p className="text-gray-600 mt-2">Create and submit a new joint venture formation plan</p>
      </div>

      {/* Progress Bar */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex justify-between mt-4 text-xs text-gray-500">
            <span className={currentStep >= 1 ? 'text-blue-600 font-medium' : ''}>Basic Info</span>
            <span className={currentStep >= 2 ? 'text-blue-600 font-medium' : ''}>Partners</span>
            <span className={currentStep >= 3 ? 'text-blue-600 font-medium' : ''}>Documents</span>
            <span className={currentStep >= 4 ? 'text-blue-600 font-medium' : ''}>Review</span>
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5" />
            {currentStep === 1 && 'Basic Information'}
            {currentStep === 2 && 'Partner Details'}
            {currentStep === 3 && 'Document Upload'}
            {currentStep === 4 && 'Review & Submit'}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && 'Provide basic information about the joint venture'}
            {currentStep === 2 && 'Add partner companies and their equity shares'}
            {currentStep === 3 && 'Upload required documents and agreements'}
            {currentStep === 4 && 'Review all information before submission'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="jv-name">Joint Venture Name *</Label>
                  <Input
                    id="jv-name"
                    value={formData.jvName}
                    onChange={(e) => setFormData(prev => ({ ...prev, jvName: e.target.value }))}
                    placeholder="Enter JV name"
                    className={errors.jvName ? 'border-red-500' : ''}
                  />
                  {errors.jvName && <p className="text-sm text-red-500 mt-1">{errors.jvName}</p>}
                </div>
                <div>
                  <Label htmlFor="sector">Sector *</Label>
                  <Select value={formData.sector} onValueChange={(value) => setFormData(prev => ({ ...prev, sector: value }))}>
                    <SelectTrigger className={errors.sector ? 'border-red-500' : ''}>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upstream">Upstream</SelectItem>
                      <SelectItem value="midstream">Midstream</SelectItem>
                      <SelectItem value="downstream">Downstream</SelectItem>
                      <SelectItem value="renewable">Renewable Energy</SelectItem>
                      <SelectItem value="petrochemical">Petrochemical</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.sector && <p className="text-sm text-red-500 mt-1">{errors.sector}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimated-value">Estimated Value (USD) *</Label>
                  <Input
                    id="estimated-value"
                    type="number"
                    value={formData.estimatedValue}
                    onChange={(e) => setFormData(prev => ({ ...prev, estimatedValue: e.target.value }))}
                    placeholder="Enter estimated value"
                    className={errors.estimatedValue ? 'border-red-500' : ''}
                  />
                  {errors.estimatedValue && <p className="text-sm text-red-500 mt-1">{errors.estimatedValue}</p>}
                </div>
                <div>
                  <Label htmlFor="duration">Project Duration (Years)</Label>
                  <Input
                    id="duration"
                    type="number"
                    value={formData.projectDuration}
                    onChange={(e) => setFormData(prev => ({ ...prev, projectDuration: e.target.value }))}
                    placeholder="Enter duration"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the joint venture project"
                  rows={4}
                  className={errors.description ? 'border-red-500' : ''}
                />
                {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
              </div>
            </div>
          )}

          {/* Step 2: Partners */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Partner Companies</h3>
                <Button onClick={addPartner} variant="outline" size="sm" className="flex items-center gap-1">
                  <PlusIcon className="h-4 w-4" />
                  Add Partner
                </Button>
              </div>
              {errors.equity && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-red-600">{errors.equity}</p>
                </div>
              )}
              <div className="space-y-4">
                {formData.partners.map((partner, index) => (
                  <Card key={partner.id} className="p-4">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium">Partner {index + 1}</h4>
                      {formData.partners.length > 1 && (
                        <Button
                          onClick={() => removePartner(partner.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <Label>Company Name *</Label>
                        <Input
                          value={partner.name}
                          onChange={(e) => updatePartner(partner.id, 'name', e.target.value)}
                          placeholder="Enter company name"
                          className={errors[`partner_${index}_name`] ? 'border-red-500' : ''}
                        />
                        {errors[`partner_${index}_name`] && (
                          <p className="text-sm text-red-500 mt-1">{errors[`partner_${index}_name`]}</p>
                        )}
                      </div>
                      <div>
                        <Label>Country</Label>
                        <Select value={partner.country} onValueChange={(value) => updatePartner(partner.id, 'country', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ghana">Ghana</SelectItem>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="UK">United Kingdom</SelectItem>
                            <SelectItem value="USA">United States</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Norway">Norway</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Equity Share (%) *</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={partner.equityShare}
                          onChange={(e) => updatePartner(partner.id, 'equityShare', parseFloat(e.target.value) || 0)}
                          placeholder="0"
                          className={errors[`partner_${index}_equity`] ? 'border-red-500' : ''}
                        />
                        {errors[`partner_${index}_equity`] && (
                          <p className="text-sm text-red-500 mt-1">{errors[`partner_${index}_equity`]}</p>
                        )}
                      </div>
                      <div>
                        <Label>Role</Label>
                        <Select value={partner.role} onValueChange={(value) => updatePartner(partner.id, 'role', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Lead Partner">Lead Partner</SelectItem>
                            <SelectItem value="Operating Partner">Operating Partner</SelectItem>
                            <SelectItem value="Financial Partner">Financial Partner</SelectItem>
                            <SelectItem value="Technical Partner">Technical Partner</SelectItem>
                            <SelectItem value="Partner">Partner</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              <div className="bg-blue-50 p-4 rounded-md">
                <p className="text-sm text-blue-800">
                  <strong>Total Equity:</strong> {formData.partners.reduce((sum, p) => sum + p.equityShare, 0)}%
                  {formData.partners.reduce((sum, p) => sum + p.equityShare, 0) !== 100 && (
                    <span className="text-red-600 ml-2">(Must equal 100%)</span>
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="documents">Upload Documents *</Label>
                <div className="mt-2">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 10MB each)</p>
                    </div>
                    <input
                      id="documents"
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {errors.documents && <p className="text-sm text-red-500 mt-1">{errors.documents}</p>}
              </div>
              {formData.documents.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Uploaded Documents</h4>
                  <div className="space-y-2">
                    {formData.documents.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div className="flex items-center gap-2">
                          <DocumentTextIcon className="h-5 w-5 text-gray-500" />
                          <div>
                            <p className="text-sm font-medium">{file.name}</p>
                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeDocument(index)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className="bg-yellow-50 p-4 rounded-md">
                <h4 className="font-medium text-yellow-800 mb-2">Required Documents:</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Joint Venture Agreement</li>
                  <li>• Board Resolutions from all partners</li>
                  <li>• Financial statements of partners</li>
                  <li>• Technical capability certificates</li>
                  <li>• Environmental impact assessment</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircleIcon className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">Ready to Submit</h4>
                </div>
                <p className="text-sm text-green-700">Please review all information before submitting your JV formation plan.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Basic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm font-medium text-gray-500">JV Name</p>
                      <p className="text-sm">{formData.jvName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Sector</p>
                      <p className="text-sm capitalize">{formData.sector}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Estimated Value</p>
                      <p className="text-sm">${parseInt(formData.estimatedValue).toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Partners ({formData.partners.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {formData.partners.map((partner, index) => (
                        <div key={partner.id} className="flex justify-between text-sm">
                          <span>{partner.name}</span>
                          <span className="font-medium">{partner.equityShare}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Documents ({formData.documents.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {formData.documents.map((file, index) => (
                      <p key={index} className="text-sm text-gray-600">• {file.name}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked as boolean }))}
                />
                <Label htmlFor="terms" className="text-sm">
                  I accept the terms and conditions and confirm that all information provided is accurate
                </Label>
              </div>
              {errors.terms && <p className="text-sm text-red-500">{errors.terms}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          onClick={prevStep}
          variant="outline"
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        <div className="flex gap-2">
          {currentStep < totalSteps ? (
            <Button onClick={nextStep}>
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Plan'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}