'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronDownIcon, ChevronRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { handleLogout } from './DashboardMenus';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  children?: MenuItem[];
}

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userRole: string;
  userName?: string;
  userInitials?: string;
  sidebarItems: MenuItem[];
}

export default function DashboardLayout({
  children,
  title,
  userRole,
  userName,
  userInitials,
  sidebarItems,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Toggle expanded state for menu items with children
  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  // Render menu item with optional children
  const renderMenuItem = (item: MenuItem, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    
    return (
      <div key={item.name}>
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`flex items-center justify-between w-full px-4 py-3 text-left ${
              item.current ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <div className="flex items-center">
              <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
              {item.name}
            </div>
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </button>
        ) : (
          <Link 
            href={item.href}
            className={`flex items-center w-full px-4 py-3 ${
              item.current ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'
            }`}
            onClick={isMobile ? () => setSidebarOpen(false) : undefined}
          >
            <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
            {item.name}
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="bg-gray-50">
            {item.children!.map((child) => (
              <Link
                key={child.name}
                href={child.href}
                className={`flex items-center w-full px-8 py-2 text-sm ${
                  child.current ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
                onClick={isMobile ? () => setSidebarOpen(false) : undefined}
              >
                <child.icon className="h-4 w-4 mr-2" aria-hidden="true" />
                {child.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Debug: Log sidebar items in DashboardLayout
  console.log('DashboardLayout received sidebarItems:', sidebarItems);
  console.log('Number of sidebar items:', sidebarItems?.length);
  console.log('First sidebar item:', sidebarItems?.[0]);
  
  // Fallback if no sidebar items
  if (!sidebarItems || sidebarItems.length === 0) {
    console.warn('No sidebar items provided to DashboardLayout');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-blue-800 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <div className="relative h-12 w-32">
              <Image 
                src="/images/pc-ghana-logo.svg" 
                alt="Petroleum Commission Ghana Logo" 
                fill
                className="object-contain"
              />
            </div>
            <h1 className="text-xl font-bold hidden md:block">Upstream Tracking System</h1>
          </div>
          
          <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-white hover:text-gold-500">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gold-600 flex items-center justify-center text-white font-bold">
                  {userInitials}
                </div>
                <span className="hidden md:block">{userName || userRole}</span>
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-white hover:text-gold-500 transition-colors"
                title="Logout"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                <span className="hidden lg:block">Logout</span>
              </button>
            </div>
        </div>
      </nav>

      {/* Mobile sidebar overlay */}
      <div className={`fixed inset-0 z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div
          className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setSidebarOpen(false)}
        />
        <div
          className={`relative flex-1 flex flex-col max-w-xs w-full bg-white transition ease-in-out duration-300 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <svg
                className="h-6 w-6 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <div className="relative h-8 w-24">
                <Image
                  src="/images/pc-ghana-logo.svg"
                  alt="Petroleum Commission Ghana Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <nav className="mt-5 space-y-1">
              {sidebarItems.map((item) => renderMenuItem(item, true))}
              
              {/* Logout button for mobile */}
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                Logout
              </button>
            </nav>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 hidden md:block relative">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
          </div>
          <nav className="mt-4 flex-1 overflow-y-auto">
            <div className="space-y-1">
              {sidebarItems.map((item) => renderMenuItem(item))}
            </div>
            
            {/* Logout button at bottom of sidebar */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <button
                onClick={handleLogout}
                className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-3" aria-hidden="true" />
                Logout
              </button>
            </div>
          </nav>
        </aside>

        {/* Main content area */}
        <div className="flex-1 flex flex-col">
          {/* Mobile hamburger menu */}
          <div className="md:hidden bg-white shadow-sm border-b border-gray-200">
            <div className="px-4 py-2 flex items-center justify-between">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-lg font-semibold text-blue-800">{title}</h1>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gold-600 flex items-center justify-center text-white font-bold text-sm">
                  {userInitials}
                </div>
              </div>
            </div>
          </div>

          {/* Main content */}
          <main className="flex-1 p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}