'use client';

import { ReactNode, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  userRole: string;
  userName?: string;
  userInitials?: string;
  sidebarItems: {
    name: string;
    href: string;
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    current: boolean;
  }[];
}

export default function DashboardLayout({
  children,
  title,
  userRole,
  userName = '',
  userInitials = '',
  sidebarItems
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white shadow-md h-screen sticky top-0 hidden md:block">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-blue-800">{title}</h2>
          </div>
          <nav className="mt-4">
            <ul>
              {sidebarItems.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href}
                    className={`flex items-center w-full px-4 py-3 ${item.current ? 'bg-blue-100 text-blue-800 border-r-4 border-blue-800' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    <item.icon className="h-5 w-5 mr-3" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Mobile sidebar */}
        <div className="md:hidden">
          <div className="fixed inset-0 z-40 flex">
            <div
              className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
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
                <nav className="mt-5 px-2 space-y-1">
                  {sidebarItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${item.current ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                    >
                      <item.icon
                        className={`mr-4 flex-shrink-0 h-6 w-6 ${item.current ? 'text-blue-800' : 'text-gray-400 group-hover:text-gray-500'}`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile top bar */}
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-white">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
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
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}