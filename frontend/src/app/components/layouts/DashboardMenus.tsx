import {
  Squares2X2Icon,
  BuildingOfficeIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentCheckIcon,
  BriefcaseIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  ExclamationTriangleIcon,
  CogIcon,
  ArrowPathIcon,
  ClockIcon,
  DocumentCheckIcon,
  BellIcon,
  HeartIcon,
  AcademicCapIcon,
  TrophyIcon,
  CalendarIcon,
  UsersIcon,
  ArrowDownTrayIcon,
  ShieldExclamationIcon,
  ChartBarIcon,
  GlobeAltIcon,
  MagnifyingGlassIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

// Common menu items that appear in multiple roles
const getCommonMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: BellIcon,
    current: pathname === '/dashboard/notifications'
  },
  {
    name: 'Profile Settings',
    href: '/dashboard/profile',
    icon: CogIcon,
    current: pathname === '/dashboard/profile'
  }
];

// Define the MenuItem interface
export interface MenuItem {
  name: string;
  href: string;
  icon: any;
  current: boolean;
  children?: MenuItem[];
  badge?: string;
}

// Company Admin Menu Items
export const getCompanyAdminMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Dashboard (Home)',
    href: '/dashboard/company-admin',
    icon: Squares2X2Icon,
    current: pathname === '/dashboard/company-admin'
  },
  {
    name: 'Company Registration',
    href: '/dashboard/company-admin/company-registration',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/company-admin/company-registration'),
    children: [
      {
        name: 'New Registration',
        href: '/dashboard/company-admin/company-registration/new',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/company-registration/new'
      },
      {
        name: 'View My Registrations',
        href: '/dashboard/company-admin/company-registration/view',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/company-registration/view'
      }
    ]
  },
  {
    name: 'Applications',
    href: '/dashboard/company-admin/applications',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/company-admin/applications'),
    children: [
      {
        name: 'Submit New Application',
        href: '/dashboard/company-admin/applications/new',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/applications/new'
      },
      {
        name: 'View All Applications',
        href: '/dashboard/company-admin/applications/all',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/applications/all'
      },
      {
        name: 'Regular Applications',
        href: '/dashboard/company-admin/applications/regular',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/company-admin/applications/regular'
      },
      {
        name: 'Rotator Applications',
        href: '/dashboard/company-admin/applications/rotator',
        icon: ArrowPathIcon,
        current: pathname === '/dashboard/company-admin/applications/rotator'
      }
    ]
  },
  {
    name: 'Permits',
    href: '/dashboard/company-admin/permits',
    icon: ClipboardDocumentCheckIcon,
    current: pathname.startsWith('/dashboard/company-admin/permits'),
    children: [
      {
        name: 'Apply for Regular Permit',
        href: '/dashboard/company-admin/permits/apply-regular',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/permits/apply-regular'
      },
      {
        name: 'Apply for Rotator Permit',
        href: '/dashboard/company-admin/permits/apply-rotator',
        icon: ArrowPathIcon,
        current: pathname === '/dashboard/company-admin/permits/apply-rotator'
      },
      {
        name: 'View My Permits',
        href: '/dashboard/company-admin/permits/view',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/permits/view'
      }
    ]
  },
  {
    name: 'Personnel',
    href: '/dashboard/company-admin/personnel',
    icon: UserGroupIcon,
    current: pathname.startsWith('/dashboard/company-admin/personnel'),
    children: [
      {
        name: 'Add New Personnel',
        href: '/dashboard/company-admin/personnel/add',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/company-admin/personnel/add'
      },
      {
        name: 'View Personnel',
        href: '/dashboard/company-admin/personnel/view',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/personnel/view'
      }
    ]
  },
  {
    name: 'My Applications',
    href: '/dashboard/company-admin/my-applications',
    icon: ClipboardDocumentListIcon,
    current: pathname.startsWith('/dashboard/company-admin/my-applications'),
    children: [
      {
        name: 'Submit Application',
        href: '/dashboard/company-admin/my-applications/submit',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/company-admin/my-applications/submit'
      },
      {
        name: 'View Applications',
        href: '/dashboard/company-admin/my-applications/view',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/company-admin/my-applications/view'
      }
    ]
  },
  {
    name: 'Joint Ventures',
    href: '/dashboard/company-admin/joint-ventures',
    icon: UserGroupIcon,
    current: pathname === '/dashboard/company-admin/joint-ventures'
  },
  {
    name: 'Local Content',
    href: '/dashboard/company-admin/local-content',
    icon: GlobeAltIcon,
    current: pathname === '/dashboard/company-admin/local-content'
  },
  {
    name: 'Payments',
    href: '/dashboard/company-admin/payments',
    icon: CurrencyDollarIcon,
    current: pathname === '/dashboard/company-admin/payments'
  },
  {
    name: 'Documents',
    href: '/dashboard/company-admin/documents',
    icon: DocumentTextIcon,
    current: pathname === '/dashboard/company-admin/documents'
  },
  {
    name: 'Analytics',
    href: '/dashboard/company-admin/analytics',
    icon: ChartBarIcon,
    current: pathname === '/dashboard/company-admin/analytics'
  },
  {
    name: 'Compliance',
    href: '/dashboard/company-admin/compliance',
    icon: ShieldCheckIcon,
    current: pathname === '/dashboard/company-admin/compliance'
  },
  {
    name: 'Financials',
    href: '/dashboard/company-admin/financials',
    icon: CurrencyDollarIcon,
    current: pathname === '/dashboard/company-admin/financials'
  },
  ...getCommonMenuItems(pathname)
];

// PC Staff Menu Items
export const getPCStaffMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Dashboard (Home)',
    href: '/dashboard/pc-staff',
    icon: Squares2X2Icon,
    current: pathname === '/dashboard/pc-staff'
  },
  {
    name: 'Company Registrations',
    href: '/dashboard/pc-staff/company-registrations',
    icon: BuildingOfficeIcon,
    current: pathname.startsWith('/dashboard/pc-staff/company-registrations'),
    children: [
      {
        name: 'Review New Applications',
        href: '/dashboard/pc-staff/company-registrations/review-new',
        icon: DocumentMagnifyingGlassIcon,
        current: pathname === '/dashboard/pc-staff/company-registrations/review-new'
      },
      {
        name: 'All Company Registrations',
        href: '/dashboard/pc-staff/company-registrations/all',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/pc-staff/company-registrations/all'
      }
    ]
  },
  {
    name: 'Permit Applications',
    href: '/dashboard/pc-staff/permit-applications',
    icon: ClipboardDocumentCheckIcon,
    current: pathname.startsWith('/dashboard/pc-staff/permit-applications'),
    children: [
      {
        name: 'Review Regular Permits',
        href: '/dashboard/pc-staff/permit-applications/review-regular',
        icon: DocumentMagnifyingGlassIcon,
        current: pathname === '/dashboard/pc-staff/permit-applications/review-regular'
      },
      {
        name: 'Review Rotator Permits',
        href: '/dashboard/pc-staff/permit-applications/review-rotator',
        icon: ArrowPathIcon,
        current: pathname === '/dashboard/pc-staff/permit-applications/review-rotator'
      },
      {
        name: 'All Permit Applications',
        href: '/dashboard/pc-staff/permit-applications/all',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/pc-staff/permit-applications/all'
      }
    ]
  },
  {
    name: 'Personnel Management',
    href: '/dashboard/pc-staff/personnel',
    icon: UserGroupIcon,
    current: pathname.startsWith('/dashboard/pc-staff/personnel'),
    children: [
      {
        name: 'Review Personnel Applications',
        href: '/dashboard/pc-staff/personnel/review',
        icon: DocumentMagnifyingGlassIcon,
        current: pathname === '/dashboard/pc-staff/personnel/review'
      },
      {
        name: 'All Personnel Records',
        href: '/dashboard/pc-staff/personnel/all',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/pc-staff/personnel/all'
      }
    ]
  },
  {
    name: 'Document Review',
    href: '/dashboard/pc-staff/documents',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/pc-staff/documents'),
    children: [
      {
        name: 'Pending Document Reviews',
        href: '/dashboard/pc-staff/documents/pending',
        icon: ClockIcon,
        current: pathname === '/dashboard/pc-staff/documents/pending'
      },
      {
        name: 'All Documents',
        href: '/dashboard/pc-staff/documents/all',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/pc-staff/documents/all'
      }
    ]
  },
  {
    name: 'Reports & Analytics',
    href: '/dashboard/pc-staff/reports',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/pc-staff/reports'),
    children: [
      {
        name: 'Application Statistics',
        href: '/dashboard/pc-staff/reports/statistics',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/pc-staff/reports/statistics'
      },
      {
        name: 'Processing Times',
        href: '/dashboard/pc-staff/reports/processing-times',
        icon: ClockIcon,
        current: pathname === '/dashboard/pc-staff/reports/processing-times'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
];

// Commission Admin Menu Items
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
    name: 'System Management',
    href: '/dashboard/commission-admin/system',
    icon: CogIcon,
    current: pathname.startsWith('/dashboard/commission-admin/system'),
    children: [
      {
        name: 'User Management',
        href: '/dashboard/commission-admin/system/users',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/commission-admin/system/users'
      },
      {
        name: 'System Settings',
        href: '/dashboard/commission-admin/system/settings',
        icon: CogIcon,
        current: pathname === '/dashboard/commission-admin/system/settings'
      },
      {
        name: 'Audit Logs',
        href: '/dashboard/commission-admin/system/audit',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/system/audit'
      }
    ]
  },
  {
    name: 'Financial Management',
    href: '/dashboard/commission-admin/financial',
    icon: CurrencyDollarIcon,
    current: pathname.startsWith('/dashboard/commission-admin/financial'),
    children: [
      {
        name: 'Revenue Reports',
        href: '/dashboard/commission-admin/financial/revenue',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/financial/revenue'
      },
      {
        name: 'Payment Processing',
        href: '/dashboard/commission-admin/financial/payments',
        icon: CurrencyDollarIcon,
        current: pathname === '/dashboard/commission-admin/financial/payments'
      },
      {
        name: 'Fee Structure',
        href: '/dashboard/commission-admin/financial/fees',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/financial/fees'
      }
    ]
  },
  {
    name: 'Compliance Oversight',
    href: '/dashboard/commission-admin/compliance',
    icon: ShieldCheckIcon,
    current: pathname.startsWith('/dashboard/commission-admin/compliance'),
    children: [
      {
        name: 'Local Content Monitoring',
        href: '/dashboard/commission-admin/compliance/local-content',
        icon: GlobeAltIcon,
        current: pathname === '/dashboard/commission-admin/compliance/local-content'
      },
      {
        name: 'JV Compliance',
        href: '/dashboard/commission-admin/compliance/jv',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/commission-admin/compliance/jv'
      },
      {
        name: 'Inspection Reports',
        href: '/dashboard/commission-admin/compliance/inspections',
        icon: MagnifyingGlassIcon,
        current: pathname === '/dashboard/commission-admin/compliance/inspections'
      }
    ]
  },
  {
    name: 'Strategic Analytics',
    href: '/dashboard/commission-admin/analytics',
    icon: ChartBarIcon,
    current: pathname.startsWith('/dashboard/commission-admin/analytics'),
    children: [
      {
        name: 'Industry Trends',
        href: '/dashboard/commission-admin/analytics/trends',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/commission-admin/analytics/trends'
      },
      {
        name: 'Performance Metrics',
        href: '/dashboard/commission-admin/analytics/performance',
        icon: TrophyIcon,
        current: pathname === '/dashboard/commission-admin/analytics/performance'
      },
      {
        name: 'Regulatory Impact',
        href: '/dashboard/commission-admin/analytics/regulatory',
        icon: ShieldCheckIcon,
        current: pathname === '/dashboard/commission-admin/analytics/regulatory'
      }
    ]
  },
  {
    name: 'Communication Center',
    href: '/dashboard/commission-admin/communication',
    icon: BellIcon,
    current: pathname.startsWith('/dashboard/commission-admin/communication'),
    children: [
      {
        name: 'Broadcast Announcements',
        href: '/dashboard/commission-admin/communication/announcements',
        icon: BellIcon,
        current: pathname === '/dashboard/commission-admin/communication/announcements'
      },
      {
        name: 'Stakeholder Updates',
        href: '/dashboard/commission-admin/communication/updates',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/commission-admin/communication/updates'
      },
      {
        name: 'Emergency Alerts',
        href: '/dashboard/commission-admin/communication/alerts',
        icon: ExclamationTriangleIcon,
        current: pathname === '/dashboard/commission-admin/communication/alerts'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
];

// Personnel Menu Items
export const getPersonnelMenuItems = (pathname: string): MenuItem[] => [
  {
    name: 'Dashboard (Home)',
    href: '/dashboard/personnel',
    icon: Squares2X2Icon,
    current: pathname === '/dashboard/personnel'
  },
  {
    name: 'My Permit Applications',
    href: '/dashboard/personnel/permit-applications',
    icon: DocumentCheckIcon,
    current: pathname.startsWith('/dashboard/personnel/permit-applications'),
    children: [
      {
        name: 'Apply for Work Permit',
        href: '/dashboard/personnel/permit-applications/apply-work-permit',
        icon: BriefcaseIcon,
        current: pathname === '/dashboard/personnel/permit-applications/apply-work-permit'
      },
      {
        name: 'View My Permits',
        href: '/dashboard/personnel/permit-applications/view-my-permits',
        icon: ClipboardDocumentCheckIcon,
        current: pathname === '/dashboard/personnel/permit-applications/view-my-permits'
      },
      {
        name: 'Renewal Reminders',
        href: '/dashboard/personnel/permit-applications/renewal-reminders',
        icon: BellIcon,
        current: pathname === '/dashboard/personnel/permit-applications/renewal-reminders'
      }
    ]
  },
  {
    name: 'Medical & Safety',
    href: '/dashboard/personnel/medical-safety',
    icon: HeartIcon,
    current: pathname.startsWith('/dashboard/personnel/medical-safety'),
    children: [
      {
        name: 'Upload Medical Certificates',
        href: '/dashboard/personnel/medical-safety/upload-medical',
        icon: ArrowDownTrayIcon,
        current: pathname === '/dashboard/personnel/medical-safety/upload-medical'
      },
      {
        name: 'BOSIET Expiry Alerts',
        href: '/dashboard/personnel/medical-safety/bosiet-alerts',
        icon: ShieldExclamationIcon,
        current: pathname === '/dashboard/personnel/medical-safety/bosiet-alerts'
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
        name: 'Upcoming Training',
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
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/personnel/jobs/apply'
      },
      {
        name: 'View Succession Opportunities',
        href: '/dashboard/personnel/jobs/succession',
        icon: UsersIcon,
        current: pathname === '/dashboard/personnel/jobs/succession'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
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
    name: 'JV Management',
    href: '/dashboard/jv-coordinator/management',
    icon: UserGroupIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/management'),
    children: [
      {
        name: 'Partner Coordination',
        href: '/dashboard/jv-coordinator/management/partners',
        icon: UserGroupIcon,
        current: pathname === '/dashboard/jv-coordinator/management/partners'
      },
      {
        name: 'Compliance Monitoring',
        href: '/dashboard/jv-coordinator/management/compliance',
        icon: ShieldCheckIcon,
        current: pathname === '/dashboard/jv-coordinator/management/compliance'
      }
    ]
  },
  {
    name: 'Local Content Coordination',
    href: '/dashboard/jv-coordinator/local-content',
    icon: GlobeAltIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/local-content'),
    children: [
      {
        name: 'Training Programs',
        href: '/dashboard/jv-coordinator/local-content/training',
        icon: AcademicCapIcon,
        current: pathname === '/dashboard/jv-coordinator/local-content/training'
      },
      {
        name: 'Technology Transfer',
        href: '/dashboard/jv-coordinator/local-content/tech-transfer',
        icon: CogIcon,
        current: pathname === '/dashboard/jv-coordinator/local-content/tech-transfer'
      }
    ]
  },
  {
    name: 'Reports & Documentation',
    href: '/dashboard/jv-coordinator/reports',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/jv-coordinator/reports'),
    children: [
      {
        name: 'JV Performance Reports',
        href: '/dashboard/jv-coordinator/reports/performance',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/jv-coordinator/reports/performance'
      },
      {
        name: 'Compliance Documentation',
        href: '/dashboard/jv-coordinator/reports/compliance',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/jv-coordinator/reports/compliance'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
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
    name: 'JV Compliance Review',
    href: '/dashboard/reviewer/jv-compliance',
    icon: UserGroupIcon,
    current: pathname.startsWith('/dashboard/reviewer/jv-compliance'),
    children: [
      {
        name: 'Equity Verification',
        href: '/dashboard/reviewer/jv-compliance/equity',
        icon: ChartBarIcon,
        current: pathname === '/dashboard/reviewer/jv-compliance/equity'
      },
      {
        name: 'Board Resolution Review',
        href: '/dashboard/reviewer/jv-compliance/resolutions',
        icon: DocumentCheckIcon,
        current: pathname === '/dashboard/reviewer/jv-compliance/resolutions'
      }
    ]
  },
  {
    name: 'Inspection Coordination',
    href: '/dashboard/reviewer/inspections',
    icon: MagnifyingGlassIcon,
    current: pathname.startsWith('/dashboard/reviewer/inspections'),
    children: [
      {
        name: 'Schedule Inspections',
        href: '/dashboard/reviewer/inspections/schedule',
        icon: CalendarIcon,
        current: pathname === '/dashboard/reviewer/inspections/schedule'
      },
      {
        name: 'Review Inspection Reports',
        href: '/dashboard/reviewer/inspections/reports',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/reviewer/inspections/reports'
      }
    ]
  },
  {
    name: 'Compliance Reports',
    href: '/dashboard/reviewer/reports',
    icon: DocumentTextIcon,
    current: pathname.startsWith('/dashboard/reviewer/reports'),
    children: [
      {
        name: 'Generate Compliance Reports',
        href: '/dashboard/reviewer/reports/generate',
        icon: DocumentTextIcon,
        current: pathname === '/dashboard/reviewer/reports/generate'
      },
      {
        name: 'View Historical Reports',
        href: '/dashboard/reviewer/reports/history',
        icon: ClipboardDocumentListIcon,
        current: pathname === '/dashboard/reviewer/reports/history'
      }
    ]
  },
  ...getCommonMenuItems(pathname)
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

// Function to get menu items based on role
export const getMenuItemsByRole = (role: string, pathname: string): MenuItem[] => {
  switch (role.toLowerCase()) {
    case 'company admin':
    case 'company_admin':
      return getCompanyAdminMenuItems(pathname);
    case 'pc staff':
    case 'pc_staff':
      return getPCStaffMenuItems(pathname);
    case 'jv coordinator':
    case 'jv_coordinator':
      return getJVCoordinatorMenuItems(pathname);
    case 'compliance officer':
    case 'compliance_officer':
      return getComplianceOfficerMenuItems(pathname);
    case 'immigration officer':
    case 'immigration_officer':
      return getImmigrationMenuItems(pathname);
    case 'personnel':
      return getPersonnelMenuItems(pathname);
    case 'commission admin':
    case 'commission_admin':
    case 'ceo':
      return getCommissionAdminMenuItems(pathname);
    default:
      return [];
  }
};

// Logout function
export const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/auth/login';
};