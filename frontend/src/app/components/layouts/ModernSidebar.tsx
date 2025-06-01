'use client';

import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  BellIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { handleLogout } from './DashboardMenus';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  children?: MenuItem[];
  badge?: string | number;
}

interface ModernSidebarProps {
  sidebarItems: MenuItem[];
  userRole: string;
  userName?: string;
  userInitials?: string;
  userAvatar?: string;
}

export default function ModernSidebar({
  sidebarItems,
  userRole,
  userName,
  userInitials,
  userAvatar
}: ModernSidebarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemName: string) => {
    setExpandedItems(prev => 
      prev.includes(itemName) 
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    );
  };

  const renderMenuItem = (item: MenuItem, depth = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.name);
    const paddingLeft = depth === 0 ? 'pl-4' : 'pl-8';
    
    return (
      <div key={item.name} className="mb-1">
        {hasChildren ? (
          <button
            onClick={() => toggleExpanded(item.name)}
            className={`group flex items-center justify-between w-full ${paddingLeft} pr-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              item.current 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
          >
            <div className="flex items-center">
              <item.icon 
                className={`mr-3 h-5 w-5 transition-colors ${
                  item.current ? 'text-white' : 'text-slate-400 group-hover:text-white'
                }`} 
                aria-hidden="true" 
              />
              <span className="truncate">{item.name}</span>
              {item.badge && (
                <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  item.current ? 'bg-blue-800 text-blue-100' : 'bg-red-100 text-red-800'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDownIcon className={`h-4 w-4 transition-transform ${
                  item.current ? 'text-white' : 'text-slate-400'
                }`} />
              ) : (
                <ChevronRightIcon className={`h-4 w-4 transition-transform ${
                  item.current ? 'text-white' : 'text-slate-400'
                }`} />
              )}
            </div>
          </button>
        ) : (
          <Link 
            href={item.href}
            className={`group flex items-center ${paddingLeft} pr-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
              item.current 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg' 
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <item.icon 
              className={`mr-3 h-5 w-5 transition-colors ${
                item.current ? 'text-white' : 'text-slate-400 group-hover:text-white'
              }`} 
              aria-hidden="true" 
            />
            <span className="truncate">{item.name}</span>
            {item.badge && (
              <span className={`ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                item.current ? 'bg-blue-800 text-blue-100' : 'bg-red-100 text-red-800'
              }`}>
                {item.badge}
              </span>
            )}
          </Link>
        )}
        
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderMenuItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo and Brand */}
      <div className="flex items-center justify-center px-4 py-6 border-b border-slate-700">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">PC</span>
          </div>
          <div className="ml-3">
            <h1 className="text-lg font-bold text-white">Petroleum</h1>
            <p className="text-sm text-slate-300">Commission</p>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="px-4 py-4 border-b border-slate-700">
        <div className="flex items-center">
          {userAvatar ? (
            <Image
              src={userAvatar}
              alt="User avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-slate-500 to-slate-700 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {userInitials || 'U'}
              </span>
            </div>
          )}
          <div className="ml-3 flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {userName || 'User'}
            </p>
            <p className="text-xs text-slate-300 truncate">
              {userRole.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
            </p>
          </div>
          <div className="flex items-center space-x-1">
            <button className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700">
              <BellIcon className="h-4 w-4" />
            </button>
            <button className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-700">
              <Cog6ToothIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      } as any} onMouseEnter={(e) => {
        e.currentTarget.style.scrollbarWidth = 'thin';
        (e.currentTarget.style as any).msOverflowStyle = 'auto';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.scrollbarWidth = 'none';
        (e.currentTarget.style as any).msOverflowStyle = 'none';
      }}>
        {sidebarItems.map((item) => renderMenuItem(item))}
      </nav>

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-slate-700">
        <button
          onClick={handleLogout}
          className="group flex items-center w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-200"
        >
          <ArrowRightOnRectangleIcon 
            className="mr-3 h-5 w-5 text-slate-400 group-hover:text-white" 
            aria-hidden="true" 
          />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 px-0" style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none'
                } as any} onMouseEnter={(e) => {
                  e.currentTarget.style.scrollbarWidth = 'thin';
                  (e.currentTarget.style as any).msOverflowStyle = 'auto';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.scrollbarWidth = 'none';
                  (e.currentTarget.style as any).msOverflowStyle = 'none';
                }}>
                  <SidebarContent />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 shadow-xl" style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        } as any} onMouseEnter={(e) => {
          e.currentTarget.style.scrollbarWidth = 'thin';
          (e.currentTarget.style as any).msOverflowStyle = 'auto';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.scrollbarWidth = 'none';
          (e.currentTarget.style as any).msOverflowStyle = 'none';
        }}>
          <SidebarContent />
        </div>
      </div>

      {/* Mobile menu button */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
          Dashboard
        </div>
      </div>
    </>
  );
}