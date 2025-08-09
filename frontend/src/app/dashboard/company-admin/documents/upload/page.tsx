'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  CloudArrowUpIcon,
  DocumentTextIcon,
  PhotoIcon,
  DocumentIcon,
  XMarkIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  category: string;
  status: 'uploading' | 'completed' | 'error';
  progress: number;
  file?: File;
}

const documentCategories = [
  { value: 'permit_application', label: 'Permit Application' },
  { value: 'compliance_report', label: 'Compliance Report' },
  { value: 'financial_statement', label: 'Financial Statement' },
  { value: 'medical_certificate', label: 'Medical Certificate' },
  { value: 'educational_certificate', label: 'Educational Certificate' },
  { value: 'passport_copy', label: 'Passport Copy' },
  { value: 'cv_resume', label: 'CV/Resume' },
  { value: 'contract_agreement', label: 'Contract/Agreement' },
  { value: 'other', label: 'Other' }
];

export default function UploadDocumentsPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('permit_application');
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (files: File[]) => {
    const newFiles: UploadedFile[] = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      category: selectedCategory,
      status: 'uploading',
      progress: 0,
      file
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload progress
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    const interval = setInterval(() => {
      setUploadedFiles(prev => 
        prev.map(file => {
          if (file.id === fileId) {
            const newProgress = Math.min(file.progress + Math.random() * 30, 100);
            const isCompleted = newProgress >= 100;
            return {
              ...file,
              progress: newProgress,
              status: isCompleted ? (Math.random() > 0.1 ? 'completed' : 'error') : 'uploading'
            };
          }
          return file;
        })
      );
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
    }, 3000);
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const retryUpload = (fileId: string) => {
    setUploadedFiles(prev => 
      prev.map(file => 
        file.id === fileId 
          ? { ...file, status: 'uploading', progress: 0 }
          : file
      )
    );
    simulateUpload(fileId);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <PhotoIcon className="h-8 w-8 text-blue-500" />;
    } else if (type.includes('pdf')) {
      return <DocumentIcon className="h-8 w-8 text-red-500" />;
    } else {
      return <DocumentTextIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  const completedFiles = uploadedFiles.filter(file => file.status === 'completed');
  const failedFiles = uploadedFiles.filter(file => file.status === 'error');
  const uploadingFiles = uploadedFiles.filter(file => file.status === 'uploading');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => router.back()}
              className="mr-4 p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Upload Documents</h1>
              <p className="text-gray-600 mt-1">Upload and manage your company documents</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Category Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Document Category</h2>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {documentCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Upload Zone */}
            <div className="bg-white rounded-lg shadow p-6">
              <div
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <CloudArrowUpIcon className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-lg font-medium text-gray-900">
                    Drop files here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Supports: PDF, DOC, DOCX, JPG, PNG (Max 10MB per file)
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Select Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
            </div>

            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="bg-white rounded-lg shadow">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Uploaded Files</h3>
                </div>
                <div className="divide-y divide-gray-200">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getFileIcon(file.type)}
                        </div>
                        <div className="ml-4 flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {file.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                {formatFileSize(file.size)} • {documentCategories.find(cat => cat.value === file.category)?.label}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {file.status === 'completed' && (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              )}
                              {file.status === 'error' && (
                                <div className="flex items-center space-x-2">
                                  <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
                                  <button
                                    onClick={() => retryUpload(file.id)}
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                  >
                                    Retry
                                  </button>
                                </div>
                              )}
                              <button
                                onClick={() => removeFile(file.id)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <XMarkIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                          {file.status === 'uploading' && (
                            <div className="mt-2">
                              <div className="bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${file.progress}%` }}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                Uploading... {Math.round(file.progress)}%
                              </p>
                            </div>
                          )}
                          {file.status === 'error' && (
                            <p className="text-xs text-red-600 mt-1">
                              Upload failed. Please try again.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upload Summary */}
          <div className="space-y-6">
            {/* Upload Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Files</span>
                  <span className="text-sm font-medium">{uploadedFiles.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="text-sm font-medium text-green-600">{completedFiles.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Uploading</span>
                  <span className="text-sm font-medium text-blue-600">{uploadingFiles.length}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Failed</span>
                  <span className="text-sm font-medium text-red-600">{failedFiles.length}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-900">Total Size</span>
                    <span className="text-sm font-medium">
                      {formatFileSize(uploadedFiles.reduce((sum, file) => sum + file.size, 0))}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Guidelines */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Guidelines</h3>
              
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                  <p>Maximum file size: 10MB per file</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                  <p>Supported formats: PDF, DOC, DOCX, JPG, PNG</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                  <p>Ensure documents are clear and readable</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                  <p>Select appropriate document category</p>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-1.5 w-1.5 bg-gray-400 rounded-full mt-2 mr-3"></div>
                  <p>All uploads are automatically scanned for security</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {completedFiles.length > 0 && (
              <div className="space-y-3">
                <button
                  onClick={() => router.push('/dashboard/company-admin/documents')}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  View All Documents
                </button>
                
                <button
                  onClick={() => setUploadedFiles([])}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Clear List
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}