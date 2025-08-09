'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  CreditCardIcon,
  BanknotesIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';

interface PaymentItem {
  id: string;
  type: string;
  description: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

const mockPaymentItems: PaymentItem[] = [
  {
    id: 'PAY-001',
    type: 'Regular Permit Fee',
    description: 'Work permit renewal for John Doe',
    amount: 1500,
    dueDate: '2024-01-15',
    status: 'overdue',
    priority: 'high'
  },
  {
    id: 'PAY-002',
    type: 'Rotator Permit Fee',
    description: 'New rotator permit for Jane Smith',
    amount: 2200,
    dueDate: '2024-01-20',
    status: 'pending',
    priority: 'medium'
  },
  {
    id: 'PAY-003',
    type: 'Annual Compliance Fee',
    description: 'Annual local content compliance fee',
    amount: 5000,
    dueDate: '2024-01-31',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'PAY-004',
    type: 'Processing Fee',
    description: 'Application processing fee for multiple permits',
    amount: 800,
    dueDate: '2024-02-05',
    status: 'pending',
    priority: 'low'
  }
];

export default function MakePaymentPage() {
  const router = useRouter();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'mobile_money' | 'card'>('bank_transfer');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleItemSelection = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectedTotal = mockPaymentItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.amount, 0);

  const handlePayment = async () => {
    if (selectedItems.length === 0) return;
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard/company-admin/payments');
      }, 2000);
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
          <p className="text-gray-600 mb-4">
            Your payment of GH₵{selectedTotal.toLocaleString()} has been processed successfully.
          </p>
          <p className="text-sm text-gray-500">
            Redirecting to payments dashboard...
          </p>
        </div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Make Payment</h1>
              <p className="text-gray-600 mt-1">Select items to pay and complete your payment</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Outstanding Payments</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Select the items you want to pay for
                </p>
              </div>
              
              <div className="divide-y divide-gray-200">
                {mockPaymentItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemSelection(item.id)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium text-gray-900">{item.type}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                              {item.priority}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarDaysIcon className="h-4 w-4 mr-1" />
                            Due: {new Date(item.dueDate).toLocaleDateString()}
                          </div>
                          <span className="text-lg font-semibold text-gray-900">
                            GH₵{item.amount.toLocaleString()}
                          </span>
                        </div>
                        {item.status === 'overdue' && (
                          <div className="flex items-center mt-2 text-red-600">
                            <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                            <span className="text-xs">Payment is overdue</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment Summary & Method */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Summary</h3>
              
              {selectedItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No items selected</p>
              ) : (
                <div className="space-y-3">
                  {mockPaymentItems
                    .filter(item => selectedItems.includes(item.id))
                    .map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-gray-600 truncate">{item.type}</span>
                        <span className="font-medium">GH₵{item.amount.toLocaleString()}</span>
                      </div>
                    ))
                  }
                  <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>GH₵{selectedTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Method</h3>
              
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === 'bank_transfer'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="ml-3 flex items-center">
                    <BanknotesIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Bank Transfer</span>
                  </div>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile_money"
                    checked={paymentMethod === 'mobile_money'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="ml-3 flex items-center">
                    <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Mobile Money</span>
                  </div>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as any)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                  />
                  <div className="ml-3 flex items-center">
                    <CreditCardIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-900">Credit/Debit Card</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Payment Button */}
            <button
              onClick={handlePayment}
              disabled={selectedItems.length === 0 || isProcessing}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Processing Payment...
                </div>
              ) : (
                `Pay GH₵${selectedTotal.toLocaleString()}`
              )}
            </button>
            
            {selectedItems.length === 0 && (
              <p className="text-xs text-gray-500 text-center">
                Please select at least one item to proceed with payment
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}