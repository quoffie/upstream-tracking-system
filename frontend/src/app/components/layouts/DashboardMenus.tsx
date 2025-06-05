'use client';

import {
  UserIcon,
  BellIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  CalendarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  DocumentCheckIcon,
  ClockIcon,
  HeartIcon,
  TrophyIcon,
  GlobeAltIcon,
  PhoneIcon,
  InformationCircleIcon,
  ClipboardDocumentCheckIcon,
  ArrowPathIcon,
  FunnelIcon,
  DocumentMagnifyingGlassIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  ChartPieIcon,
  ShieldExclamationIcon,
  ComputerDesktopIcon,
  UserGroupIcon,
  KeyIcon,
  LockClosedIcon,
  ArrowDownTrayIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';

import { HomeIcon } from '../icons/DashboardIcons';

export interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  current: boolean;
  children?: MenuItem[];
}

// Common menu items for all roles (dashboard-specific only)
const getCommonMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Notifications & Alerts',
    href: '/dashboard/notifications',
    icon: BellIcon,
    current: pathname === '/dashboard/notifications'
  },
  {
    name: 'Profile & Settings',
    href: '/dashboard/profile',
    icon: UserIcon,
    current: pathname === '/dashboard/profile'
  },
  {
    name: 'Support/Help',
    href: '/dashboard/support',
    icon: QuestionMarkCircleIcon,
    current: pathname === '/dashboard/support'
  }
];

// Company Admin Menu Items
export const getCompanyAdminMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Dashboard (Home)',
    href: '/dashboard/company-admin',
    icon: Squares2X2Icon,
    current: pathname === '/dashboard/company-admin'
  },
  {
    name: 'My Applications',
    href: '/dashboard/company-admin/applications',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/company-admin/applications'),
    children: [
      {
        name: 'View All Applications',
        href: '/dashboard/company-admin/applications/all',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/applications/all'
      },
      {
        name: 'Application Status',
        href: '/dashboard/company-admin/applications/status',
        icon: ClockIcon,
        current: pathname === '/dashboard/company-admin/applications/status'
      },
      {
        name: 'Workflow Timeline',
        href: '/dashboard/company-admin/applications/timeline',
        icon: CalendarIcon,
        current: pathname === '/dashboard/company-admin/applications/timeline'
      }
    ]
  },
  {
    name: 'Permits',
    href: '/dashboard/company-admin/permits',
    icon: DocumentCheckIcon,
    current: pathname.startsWith('/dashboard/company-admin/permits'),
    children: [
      {
        name: 'Active Permits',
        href: '/dashboard/company-admin/permits/active',
        icon: CheckCircleIcon,
        current: pathname === '/dashboard/company-admin/permits/active'
      },
      {
        name: 'Expired Permits',
        href: '/dashboard/company-admin/permits/expired',
        icon: ExclamationTriangleIcon,
        current: pathname === '/dashboard/company-admin/permits/expired'
      },
      {
        name: 'Renew Permits',
        href: '/dashboard/company-admin/permits/renew',
        icon: ArrowPathIcon,
        current: pathname === '/dashboard/company-admin/permits/renew'
      }
    ]
  },
  {
    name: 'Personnel Management',
    href: '/dashboard/company-admin/personnel',
    icon: UsersIcon,
    current: pathname.startsWith('/dashboard/company-admin/personnel'),
    children: [
      {
        name: 'Add Personnel',
        href: '/dashboard/company-admin/personnel/add',
        icon: UserIcon,
        current: pathname === '/dashboard/company-admin/personnel/add'
      },
      {
        name: 'Manage Personnel',
        href: '/dashboard/company-admin/personnel/manage',
        icon: UsersIcon,
        current: pathname === '/dashboard/company-admin/personnel/manage'
      },
      {
        name: 'Bulk Upload',
        href: '/dashboard/company-admin/personnel/bulk-upload',
        icon: ArrowDownTrayIcon,
        current: pathname === '/dashboard/company-admin/personnel/bulk-upload'
      }
    ]
  },
  {
    name: 'Payments & Transactions',
    href: '/dashboard/company-admin/payments',
    icon: CurrencyDollarIcon,
    current: pathname.startsWith('/dashboard/company-admin/payments'),
    children: [
      {
        name: 'Make Payment',
        href: '/dashboard/company-admin/payments/make-payment',
        icon: CurrencyDollarIcon,
        current: pathname === '/dashboard/company-admin/payments/make-payment'
      },
      {
        name: 'Upload Receipt',
        href: '/dashboard/company-admin/payments/upload-receipt',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/payments/upload-receipt'
      },
      {
        name: 'Transaction History',
        href: '/dashboard/company-admin/payments/history',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/payments/history'
      },
      {
        name: 'Export Data',
        href: '/dashboard/company-admin/payments/export',
        icon: DocumentChartBarIcon,
        current: pathname === '/dashboard/company-admin/payments/export'
      }
    ]
  },
  {
    name: 'JV Compliance',
    href: '/dashboard/company-admin/jv-compliance',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/company-admin/jv-compliance'),
    children: [
      {
        name: 'Register JV Companies',
        href: '/dashboard/company-admin/jv-compliance/register',
        icon: BuildingOfficeIcon,
        current: pathname === '/dashboard/company-admin/jv-compliance/register'
      },
      {
        name: 'Track JV Status',
        href: '/dashboard/company-admin/jv-compliance/status',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/company-admin/jv-compliance/status'
      },
      {
        name: 'Upload Documents',
        href: '/dashboard/company-admin/jv-compliance/documents',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/jv-compliance/documents'
      }
    ]
  },
  {
    name: 'Local Content Reporting',
    href: '/dashboard/company-admin/local-content',
    icon: GlobeAltIcon,
    current: pathname.startsWith('/dashboard/company-admin/local-content'),
    children: [
      {
        name: 'Submit Plans',
        href: '/dashboard/company-admin/local-content/submit',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/local-content/submit'
      },
      {
        name: 'Performance Reports',
        href: '/dashboard/company-admin/local-content/reports',
        icon: ChartPieIcon,
        current: pathname === '/dashboard/company-admin/local-content/reports'
      },
      {
        name: 'Compliance Status',
        href: '/dashboard/company-admin/local-content/compliance',
        icon: ShieldCheckIcon,
        current: pathname === '/dashboard/company-admin/local-content/compliance'
      }
    ]
  },
  {
    name: 'Documents & Uploads',
    href: '/dashboard/company-admin/documents',
    icon: DocumentMagnifyingGlassIcon,
    current: pathname.startsWith('/dashboard/company-admin/documents'),
    children: [
      {
        name: 'Upload Documents',
        href: '/dashboard/company-admin/documents/upload',
        icon: ArrowDownTrayIcon,
        current: pathname === '/dashboard/company-admin/documents/upload'
      },
      {
        name: 'Document Status',
        href: '/dashboard/company-admin/documents/status',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/company-admin/documents/status'
      },
      {
        name: 'Version History',
        href: '/dashboard/company-admin/documents/history',
        icon: ClockIcon,
        current: pathname === '/dashboard/company-admin/documents/history'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
];

// Commission Admin (CEO) Menu Items
export const getCommissionAdminMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Financial Overview',
    href: '/dashboard/commission-admin/financial-overview',
    icon: CurrencyDollarIcon,
    current: pathname === '/dashboard/commission-admin/financial-overview'
  },
  {
    name: 'Top Companies',
    href: '/dashboard/commission-admin/companies',
    icon: BuildingOfficeIcon,
    current: pathname === '/dashboard/commission-admin/companies'
  },
  {
    name: 'Critical Issues',
    href: '/dashboard/commission-admin/critical-issues',
    icon: ExclamationTriangleIcon,
    current: pathname === '/dashboard/commission-admin/critical-issues'
  },
  {
    name: 'Executive Tools',
    href: '/dashboard/commission-admin/executive-tools',
    icon: CogIcon,
    current: pathname === '/dashboard/commission-admin/executive-tools'
  },
  {
    name: 'Approvals Queue',
    href: '/dashboard/commission-admin/approvals',
    icon: ClipboardDocumentCheckIcon,
    current: pathname.startsWith('/dashboard/commission-admin/approvals'),
    children: [
      {
        name: 'Company Registrations',
        href: '/dashboard/commission-admin/approvals/companies',
        icon: BuildingOfficeIcon,
        current: pathname === '/dashboard/commission-admin/approvals/companies'
      },
      {
        name: 'Regular Permits',
        href: '/dashboard/commission-admin/approvals/regular-permits',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/approvals/regular-permits'
      },
      {
        name: 'Rotator Permits',
        href: '/dashboard/commission-admin/approvals/rotator-permits',
        icon: ArrowPathIcon,
        current: pathname === '/dashboard/commission-admin/approvals/rotator-permits'
      },
      {
        name: 'JV Approvals',
        href: '/dashboard/commission-admin/approvals/jv-approvals',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/commission-admin/approvals/jv-approvals'
      },
      {
        name: 'Renewals',
        href: '/dashboard/commission-admin/approvals/renewals',
        icon: ClockIcon,
        current: pathname === '/dashboard/commission-admin/approvals/renewals'
      }
    ]
  },
  {
    name: 'Applications Tracker',
    href: '/dashboard/commission-admin/applications',
    icon: MagnifyingGlassIcon,
    current: pathname.startsWith('/dashboard/commission-admin/applications'),
    children: [
      {
        name: 'Search Applications',
        href: '/dashboard/commission-admin/applications/search',
        icon: FunnelIcon,
        current: pathname === '/dashboard/commission-admin/applications/search'
      },
      {
        name: 'Status Overview',
        href: '/dashboard/commission-admin/applications/status',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/applications/status'
      },
      {
        name: 'Document Review',
        href: '/dashboard/commission-admin/applications/documents',
        icon: DocumentMagnifyingGlassIcon,
        current: pathname === '/dashboard/commission-admin/applications/documents'
      }
    ]
  },
  {
    name: 'Workflow Status',
    href: '/dashboard/commission-admin/workflow',
    icon: Squares2X2Icon,
    current: pathname.startsWith('/dashboard/commission-admin/workflow'),
    children: [
      {
        name: 'Timeline View',
        href: '/dashboard/commission-admin/workflow/timeline',
        icon: ClockIcon,
        current: pathname === '/dashboard/commission-admin/workflow/timeline'
      },
      {
        name: 'Audit Trail',
        href: '/dashboard/commission-admin/workflow/audit',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/workflow/audit'
      },
      {
        name: 'Stage Analytics',
        href: '/dashboard/commission-admin/workflow/analytics',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/workflow/analytics'
      }
    ]
  },
  {
    name: 'Payments & Transactions',
    href: '/dashboard/commission-admin/payments',
    icon: CurrencyDollarIcon,
    current: pathname.startsWith('/dashboard/commission-admin/payments'),
    children: [
      {
        name: 'Payment Verification',
        href: '/dashboard/commission-admin/payments/verification',
        icon: CheckCircleIcon,
        current: pathname === '/dashboard/commission-admin/payments/verification'
      },
      {
        name: 'Financial Analytics',
        href: '/dashboard/commission-admin/payments/analytics',
        icon: ChartPieIcon,
        current: pathname === '/dashboard/commission-admin/payments/analytics'
      },
      {
        name: 'Transaction History',
        href: '/dashboard/commission-admin/payments/history',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/commission-admin/payments/history'
      },
      {
        name: 'Outstanding Payments',
        href: '/dashboard/commission-admin/payments/outstanding',
        icon: ExclamationTriangleIcon,
        current: pathname === '/dashboard/commission-admin/payments/outstanding'
      }
    ]
  },
  {
    name: 'Notifications & Escalations',
    href: '/dashboard/commission-admin/notifications',
    icon: BellIcon,
    current: pathname.startsWith('/dashboard/commission-admin/notifications'),
    children: [
      {
        name: 'Pending Approvals',
        href: '/dashboard/commission-admin/notifications/approvals',
        icon: ClockIcon,
        current: pathname === '/dashboard/commission-admin/notifications/approvals'
      },
      {
        name: 'Compliance Alerts',
        href: '/dashboard/commission-admin/notifications/compliance',
        icon: ShieldExclamationIcon,
        current: pathname === '/dashboard/commission-admin/notifications/compliance'
      },
      {
        name: 'System Updates',
        href: '/dashboard/commission-admin/notifications/system',
        icon: ComputerDesktopIcon,
        current: pathname === '/dashboard/commission-admin/notifications/system'
      },
      {
        name: 'Critical Issues',
        href: '/dashboard/commission-admin/notifications/critical',
        icon: ExclamationTriangleIcon,
        current: pathname === '/dashboard/commission-admin/notifications/critical'
      }
    ]
  },
  {
    name: 'Analytics & Reports',
    href: '/dashboard/commission-admin/analytics',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/commission-admin/analytics'),
    children: [
      {
        name: 'Application Throughput',
        href: '/dashboard/commission-admin/analytics/throughput',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/analytics/throughput'
      },
      {
        name: 'Approval Rates',
        href: '/dashboard/commission-admin/analytics/approval-rates',
        icon: ChartPieIcon,
        current: pathname === '/dashboard/commission-admin/analytics/approval-rates'
      },
      {
        name: 'Financial Performance',
        href: '/dashboard/commission-admin/analytics/financial',
        icon: CurrencyDollarIcon,
        current: pathname === '/dashboard/commission-admin/analytics/financial'
      },
      {
        name: 'Local Content Analytics',
        href: '/dashboard/commission-admin/analytics/local-content',
        icon: GlobeAltIcon,
        current: pathname === '/dashboard/commission-admin/analytics/local-content'
      },
      {
        name: 'Processing Times',
        href: '/dashboard/commission-admin/analytics/processing-times',
        icon: ClockIcon,
        current: pathname === '/dashboard/commission-admin/analytics/processing-times'
      }
    ]
  },
  {
    name: 'Reports',
    href: '/dashboard/commission-admin/reports',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/commission-admin/reports'),
    children: [
      {
         name: 'Executive Reports',
         href: '/dashboard/commission-admin/reports/executive',
         icon: DocumentChartBarIcon,
         current: pathname === '/dashboard/commission-admin/reports/executive'
       },
      {
        name: 'Financial Reports',
        href: '/dashboard/commission-admin/reports/financial',
        icon: CurrencyDollarIcon,
        current: pathname === '/dashboard/commission-admin/reports/financial'
      },
      {
        name: 'Compliance Reports',
        href: '/dashboard/commission-admin/reports/compliance',
        icon: ShieldCheckIcon,
        current: pathname === '/dashboard/commission-admin/reports/compliance'
      },
      {
        name: 'Custom Reports',
        href: '/dashboard/commission-admin/reports/custom',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/reports/custom'
      }
    ]
  },
  {
    name: 'Audit Logs',
    href: '/dashboard/commission-admin/audit',
    icon: DocumentMagnifyingGlassIcon,
    current: pathname.startsWith('/dashboard/commission-admin/audit'),
    children: [
      {
        name: 'System Actions',
        href: '/dashboard/commission-admin/audit/system',
        icon: ComputerDesktopIcon,
        current: pathname === '/dashboard/commission-admin/audit/system'
      },
      {
        name: 'User Activities',
        href: '/dashboard/commission-admin/audit/users',
        icon: UsersIcon,
        current: pathname === '/dashboard/commission-admin/audit/users'
      },
      {
        name: 'Approval History',
        href: '/dashboard/commission-admin/audit/approvals',
        icon: ClipboardDocumentCheckIcon,
        current: pathname === '/dashboard/commission-admin/audit/approvals'
      },
      {
        name: 'Export Logs',
        href: '/dashboard/commission-admin/audit/export',
        icon: ArrowDownTrayIcon,
        current: pathname === '/dashboard/commission-admin/audit/export'
      }
    ]
  },
  {
    name: 'User Management',
    href: '/dashboard/commission-admin/users',
    icon: UsersIcon,
    current: pathname.startsWith('/dashboard/commission-admin/users'),
    children: [
      {
        name: 'PC Staff Management',
        href: '/dashboard/commission-admin/users/staff',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/commission-admin/users/staff'
      },
      {
        name: 'Roles & Permissions',
        href: '/dashboard/commission-admin/users/roles',
        icon: KeyIcon,
        current: pathname === '/dashboard/commission-admin/users/roles'
      },
      {
        name: 'User Activity',
        href: '/dashboard/commission-admin/users/activity',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/users/activity'
      },
      {
        name: 'Password Management',
        href: '/dashboard/commission-admin/users/passwords',
        icon: LockClosedIcon,
        current: pathname === '/dashboard/commission-admin/users/passwords'
      }
    ]
  }
];

// JV Coordinator Menu Items
export const getJVCoordinatorMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'JV Formation',
    href: '/dashboard/jv-coordinator/formation',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/formation'),
    children: [
      {
        name: 'Submit JV Plan',
        href: '/dashboard/jv-coordinator/formation/submit',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/jv-coordinator/formation/submit'
      },
      {
        name: 'Equity Participation',
        href: '/dashboard/jv-coordinator/formation/equity',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/jv-coordinator/formation/equity'
      },
      {
        name: 'Board Resolution Upload',
        href: '/dashboard/jv-coordinator/formation/resolution',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/jv-coordinator/formation/resolution'
      }
    ]
  },
  {
    name: 'Renewal Tracker',
    href: '/dashboard/jv-coordinator/renewals',
    icon: ClockIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/renewals'),
    children: [
      {
        name: 'Permit Expiry Dates',
        href: '/dashboard/jv-coordinator/renewals/expiry',
        icon: CalendarIcon,
        current: pathname === '/dashboard/jv-coordinator/renewals/expiry'
      },
      {
        name: 'Renewal Requirements',
        href: '/dashboard/jv-coordinator/renewals/requirements',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/jv-coordinator/renewals/requirements'
      }
    ]
  },
  {
    name: 'Technology Transfer',
    href: '/dashboard/jv-coordinator/tech-transfer',
    icon: AcademicCapIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/tech-transfer'),
    children: [
      {
        name: 'Milestones Dashboard',
        href: '/dashboard/jv-coordinator/tech-transfer/milestones',
        icon: TrophyIcon,
        current: pathname === '/dashboard/jv-coordinator/tech-transfer/milestones'
      },
      {
        name: 'Training Records',
        href: '/dashboard/jv-coordinator/tech-transfer/training',
        icon: AcademicCapIcon,
        current: pathname === '/dashboard/jv-coordinator/tech-transfer/training'
      }
    ]
  },
  {
    name: 'Compliance Reports',
    href: '/dashboard/jv-coordinator/compliance',
    icon: ShieldCheckIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/compliance'),
    children: [
      {
        name: 'Equity Compliance',
        href: '/dashboard/jv-coordinator/compliance/equity',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/jv-coordinator/compliance/equity'
      },
      {
        name: 'Local Content Progress',
        href: '/dashboard/jv-coordinator/compliance/local-content',
        icon: GlobeAltIcon,
        current: pathname === '/dashboard/jv-coordinator/compliance/local-content'
      }
    ]
  }
];

// Compliance Officer Menu Items
export const getComplianceOfficerMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Local Content Audits',
    href: '/dashboard/reviewer/local-content',
    icon: GlobeAltIcon,
    current: pathname.startsWith('/dashboard/reviewer/local-content'),
    children: [
      {
        name: 'Training Budget Review',
        href: '/dashboard/reviewer/local-content/training',
        icon: AcademicCapIcon,
        current: pathname === '/dashboard/reviewer/local-content/training'
      },
      {
        name: 'Succession Plan Compliance',
        href: '/dashboard/reviewer/local-content/succession',
        icon: TrophyIcon,
        current: pathname === '/dashboard/reviewer/local-content/succession'
      },
      {
        name: 'Technology Transfer Reports',
        href: '/dashboard/reviewer/local-content/tech-transfer',
        icon: AcademicCapIcon,
        current: pathname === '/dashboard/reviewer/local-content/tech-transfer'
      }
    ]
  },
  {
    name: 'JV Audits',
    href: '/dashboard/reviewer/jv-audits',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/reviewer/jv-audits'),
    children: [
      {
        name: 'Equity Participation',
        href: '/dashboard/reviewer/jv-audits/equity',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/reviewer/jv-audits/equity'
      },
      {
        name: 'Technology Transfer Strategy',
        href: '/dashboard/reviewer/jv-audits/tech-strategy',
        icon: AcademicCapIcon,
        current: pathname === '/dashboard/reviewer/jv-audits/tech-strategy'
      }
    ]
  },
  {
    name: 'Penalties',
    href: '/dashboard/reviewer/penalties',
    icon: ExclamationTriangleIcon,
    current: pathname.startsWith('/dashboard/reviewer/penalties'),
    children: [
      {
        name: 'Issue Non-Compliance Alerts',
        href: '/dashboard/reviewer/penalties/alerts',
        icon: BellIcon,
        current: pathname === '/dashboard/reviewer/penalties/alerts'
      },
      {
        name: 'Track Sanctions',
        href: '/dashboard/reviewer/penalties/sanctions',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/reviewer/penalties/sanctions'
      }
    ]
  },
  {
    name: 'Reports',
    href: '/dashboard/reviewer/reports',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/reviewer/reports'),
    children: [
      {
        name: 'Local Content Spend Analysis',
        href: '/dashboard/reviewer/reports/spend-analysis',
        icon: CurrencyDollarIcon,
        current: pathname === '/dashboard/reviewer/reports/spend-analysis'
      },
      {
        name: 'Expatriate-to-Ghanaian Ratio',
        href: '/dashboard/reviewer/reports/expat-ratio',
        icon: UsersIcon,
        current: pathname === '/dashboard/reviewer/reports/expat-ratio'
      },
      {
        name: 'JV Compliance Overview',
        href: '/dashboard/reviewer/reports/jv-compliance',
        icon: BuildingOfficeIcon,
        current: pathname === '/dashboard/reviewer/reports/jv-compliance'
      }
    ]
  }
];

// Immigration Officer Menu Items
export const getImmigrationMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Permit Validation',
    href: '/dashboard/immigration/validation',
    icon: DocumentCheckIcon,
    current: pathname.startsWith('/dashboard/immigration/validation'),
    children: [
      {
        name: 'Check Work Permit Expiry',
        href: '/dashboard/immigration/validation/expiry',
        icon: ClockIcon,
        current: pathname === '/dashboard/immigration/validation/expiry'
      },
      {
        name: 'Flag Invalid Visas',
        href: '/dashboard/immigration/validation/invalid',
        icon: ExclamationTriangleIcon,
        current: pathname === '/dashboard/immigration/validation/invalid'
      }
    ]
  },
  {
    name: 'Personnel Tracking',
    href: '/dashboard/immigration/tracking',
    icon: UsersIcon,
    current: pathname.startsWith('/dashboard/immigration/tracking'),
    children: [
      {
        name: 'Expatriate Visa Status',
        href: '/dashboard/immigration/tracking/visa-status',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/immigration/tracking/visa-status'
      },
      {
        name: 'BOSIET Certificate Renewals',
        href: '/dashboard/immigration/tracking/bosiet',
        icon: HeartIcon,
        current: pathname === '/dashboard/immigration/tracking/bosiet'
      }
    ]
  },
  {
    name: 'Reports',
    href: '/dashboard/immigration/reports',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/immigration/reports'),
    children: [
      {
        name: 'Visa Compliance Stats',
        href: '/dashboard/immigration/reports/visa-compliance',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/immigration/reports/visa-compliance'
      },
      {
        name: 'Offshore Personnel Breakdown',
        href: '/dashboard/immigration/reports/offshore-breakdown',
        icon: UsersIcon,
        current: pathname === '/dashboard/immigration/reports/offshore-breakdown'
      }
    ]
  }
];

// Personnel Menu Items
export const getPersonnelMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Permit Status',
    href: '/dashboard/personnel/permits',
    icon: DocumentCheckIcon,
    current: pathname.startsWith('/dashboard/personnel/permits'),
    children: [
      {
        name: 'View Work Permit Details',
        href: '/dashboard/personnel/permits/details',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/personnel/permits/details'
      },
      {
        name: 'Renewal Reminders',
        href: '/dashboard/personnel/permits/renewals',
        icon: BellIcon,
        current: pathname === '/dashboard/personnel/permits/renewals'
      }
    ]
  },
  {
    name: 'Medical & Safety',
    href: '/dashboard/personnel/medical',
    icon: HeartIcon,
    current: pathname.startsWith('/dashboard/personnel/medical'),
    children: [
      {
        name: 'Upload Medical Certificates',
        href: '/dashboard/personnel/medical/upload',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/personnel/medical/upload'
      },
      {
        name: 'BOSIET Expiry Alerts',
        href: '/dashboard/personnel/medical/bosiet',
        icon: BellIcon,
        current: pathname === '/dashboard/personnel/medical/bosiet'
      }
    ]
  },
  {
    name: 'Training Records',
    href: '/dashboard/personnel/training',
    icon: AcademicCapIcon,
    current: pathname.startsWith('/dashboard/personnel/training'),
    children: [
      {
        name: 'Completed Courses',
        href: '/dashboard/personnel/training/completed',
        icon: TrophyIcon,
        current: pathname === '/dashboard/personnel/training/completed'
      },
      {
        name: 'Upcoming Training Sessions',
        href: '/dashboard/personnel/training/upcoming',
        icon: CalendarIcon,
        current: pathname === '/dashboard/personnel/training/upcoming'
      }
    ]
  },
  {
    name: 'Job Applications',
    href: '/dashboard/personnel/jobs',
    icon: BriefcaseIcon,
    current: pathname.startsWith('/dashboard/personnel/jobs'),
    children: [
      {
        name: 'Apply for Offshore Roles',
        href: '/dashboard/personnel/jobs/apply',
        icon: BriefcaseIcon,
        current: pathname === '/dashboard/personnel/jobs/apply'
      },
      {
        name: 'View Succession Opportunities',
        href: '/dashboard/personnel/jobs/succession',
        icon: TrophyIcon,
        current: pathname === '/dashboard/personnel/jobs/succession'
      }
    ]
  }
];

// Finance Officer Menu Items
export const getFinanceMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Financial Analytics',
    href: '/dashboard/finance/analytics',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/finance/analytics')
  },
  {
    name: 'Payment Processing',
    href: '/dashboard/finance/payments',
    icon: CurrencyDollarIcon,
    current: pathname.startsWith('/dashboard/finance/payments')
  },
  {
    name: 'Fee Management',
    href: '/dashboard/finance/fees',
    icon: CurrencyDollarIcon,
    current: pathname.startsWith('/dashboard/finance/fees')
  },
  {
    name: 'Financial Reports',
    href: '/dashboard/finance/reports',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/finance/reports')
  }
];

// Local Content Officer Menu Items
export const getLocalContentMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Local Content Plans',
    href: '/dashboard/local-content/plans',
    icon: GlobeAltIcon,
    current: pathname.startsWith('/dashboard/local-content/plans')
  },
  {
    name: 'Training Programs',
    href: '/dashboard/local-content/training',
    icon: AcademicCapIcon,
    current: pathname.startsWith('/dashboard/local-content/training')
  },
  {
    name: 'Succession Planning',
    href: '/dashboard/local-content/succession',
    icon: TrophyIcon,
    current: pathname.startsWith('/dashboard/local-content/succession')
  },
  {
    name: 'Compliance Monitoring',
    href: '/dashboard/local-content/compliance',
    icon: ShieldCheckIcon,
    current: pathname.startsWith('/dashboard/local-content/compliance')
  }
];

// Inspector Menu Items
export const getInspectorMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Field Inspections',
    href: '/dashboard/inspector/inspections',
    icon: MagnifyingGlassIcon,
    current: pathname.startsWith('/dashboard/inspector/inspections')
  },
  {
    name: 'Inspection Reports',
    href: '/dashboard/inspector/reports',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/inspector/reports')
  },
  {
    name: 'Compliance Checks',
    href: '/dashboard/inspector/compliance',
    icon: ShieldCheckIcon,
    current: pathname.startsWith('/dashboard/inspector/compliance')
  },
  {
    name: 'Schedule Management',
    href: '/dashboard/inspector/schedule',
    icon: CalendarIcon,
    current: pathname.startsWith('/dashboard/inspector/schedule')
  }
];

// Generic function to get menu items by role
export const getMenuItemsByRole = (role: string, pathname: string): MenuItem[] => {
  switch (role) {
    case 'COMPANY_ADMIN':
      return getCompanyAdminMenuItems(pathname);
    case 'COMMISSION_ADMIN':
    case 'ADMIN':
      return getCommissionAdminMenuItems(pathname);
    case 'JV_COORDINATOR':
      return getJVCoordinatorMenuItems(pathname);
    case 'COMPLIANCE_OFFICER':
      return getComplianceOfficerMenuItems(pathname);
    case 'IMMIGRATION_OFFICER':
      return getImmigrationMenuItems(pathname);
    case 'PERSONNEL':
      return getPersonnelMenuItems(pathname);
    case 'FINANCE_OFFICER':
      return getFinanceMenuItems(pathname);
    case 'LOCAL_CONTENT_OFFICER':
      return getLocalContentMenuItems(pathname);
    case 'INSPECTOR':
      return getInspectorMenuItems(pathname);
    default:
      return [];
  }
};

// Logout function
export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};