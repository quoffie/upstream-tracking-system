'use client';

import { ReactNode } from 'react';
import ModernSidebar from './ModernSidebar';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  children?: MenuItem[];
  badge?: string | number;
}

interface EnhancedDashboardLayoutProps {
  children: ReactNode;
  title: string;
  userRole: string;
  userName?: string;
  userInitials?: string;
  userAvatar?: string;
  sidebarItems: MenuItem[];
}

export default function EnhancedDashboardLayout({
  children,
  title,
  userRole,
  userName,
  userInitials,
  userAvatar,
  sidebarItems,
}: EnhancedDashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <ModernSidebar
        sidebarItems={sidebarItems}
        userRole={userRole}
        userName={userName}
        userInitials={userInitials}
        userAvatar={userAvatar}
      />

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Main content area */}
        <main className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}