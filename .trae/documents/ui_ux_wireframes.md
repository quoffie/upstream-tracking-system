# UI/UX Wireframes & Design Specifications
## Petroleum Commission Offshore Tracking System (PC-OTS)

## 1. Design System Overview

### 1.1 Color Palette
```css
/* Primary Colors - Ghana Flag Inspired */
--primary-red: #CE1126;      /* Ghana flag red */
--primary-gold: #FCD116;     /* Ghana flag gold */
--primary-green: #006B3F;    /* Ghana flag green */
--primary-blue: #002F6C;     /* PC institutional blue */

/* Secondary Colors */
--secondary-gray-50: #F8F9FA;
--secondary-gray-100: #E9ECEF;
--secondary-gray-200: #DEE2E6;
--secondary-gray-300: #CED4DA;
--secondary-gray-400: #ADB5BD;
--secondary-gray-500: #6C757D;
--secondary-gray-600: #495057;
--secondary-gray-700: #343A40;
--secondary-gray-800: #212529;
--secondary-gray-900: #000000;

/* Status Colors */
--status-success: #28A745;
--status-warning: #FFC107;
--status-danger: #DC3545;
--status-info: #17A2B8;

/* Background Colors */
--bg-primary: #FFFFFF;
--bg-secondary: #F8F9FA;
--bg-accent: #E3F2FD;
```

### 1.2 Typography
```css
/* Font Family */
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Font Sizes */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
--text-4xl: 2.25rem;   /* 36px */

/* Font Weights */
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### 1.3 Component Specifications

#### Buttons
```css
/* Primary Button */
.btn-primary {
  background: var(--primary-blue);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: var(--font-medium);
  transition: all 0.2s ease;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}

/* Success Button */
.btn-success {
  background: var(--status-success);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
}
```

#### Cards
```css
.card {
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border: 1px solid var(--secondary-gray-200);
}

.card-header {
  border-bottom: 1px solid var(--secondary-gray-200);
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
```

## 2. Page Wireframes

### 2.1 Landing Page

```
┌─────────────────────────────────────────────────────────────────┐
│ [🇬🇭 PC Logo] Petroleum Commission Ghana        [Login] [Register] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│           GHANA PETROLEUM COMMISSION                            │
│         OFFSHORE TRACKING SYSTEM                               │
│                                                                 │
│    Streamlining Ghana's Upstream Petroleum Regulation          │
│                                                                 │
│  [📊 1,250 Companies] [📋 3,420 Permits] [🇬🇭 65% Local Content] │
│                                                                 │
│              [Get Started] [Learn More]                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Quick Search: [Search companies, permits, personnel...] [🔍]    │
├─────────────────────────────────────────────────────────────────┤
│ Services                                                        │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 🏢 Company  │ │ 👤 Personnel│ │ 📄 Permits  │ │ 🤝 Joint    │ │
│ │ Registration│ │ Management  │ │ Application │ │ Ventures    │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Footer: Contact | Documents | FAQ | Support                    │
└─────────────────────────────────────────────────────────────────┘
```

**Key Components:**
- **Header Navigation**: PC logo, main navigation, authentication buttons
- **Hero Section**: Mission statement, key statistics, call-to-action buttons
- **Quick Search**: Public search functionality for transparency
- **Service Cards**: Visual representation of main services
- **Footer**: Additional links and contact information

### 2.2 Authentication Pages

#### Login Page
```
┌─────────────────────────────────────────────────────────────────┐
│ [🇬🇭 PC Logo] ← Back to Home                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                    Welcome Back                                 │
│              Sign in to your account                           │
│                                                                 │
│    ┌─────────────────────────────────────────────────────┐     │
│    │ Email Address                                       │     │
│    │ [email@example.com                              ] │     │
│    │                                                     │     │
│    │ Password                                            │     │
│    │ [••••••••••••••••••••••••••••••••••••••••••••] │     │
│    │                                                     │     │
│    │ ☐ Remember me          Forgot password?            │     │
│    │                                                     │     │
│    │              [Sign In]                             │     │
│    │                                                     │     │
│    │ Don't have an account? Register here               │     │
│    └─────────────────────────────────────────────────────┘     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

#### Registration Page
```
┌─────────────────────────────────────────────────────────────────┐
│ [🇬🇭 PC Logo] ← Back to Home                                    │
├─────────────────────────────────────────────────────────────────┤
│                Create Your Account                              │
│                                                                 │
│ Step 1 of 2: Personal Information                              │
│ ████████████████████████████████████████████████████████████    │
│                                                                 │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ First Name                    Last Name                    │ │
│ │ [John                    ] [Doe                        ] │ │
│ │                                                             │ │
│ │ Email Address                                               │ │
│ │ [john.doe@company.com                                   ] │ │
│ │                                                             │ │
│ │ Password                      Confirm Password             │ │
│ │ [••••••••••••••••••••••] [••••••••••••••••••••••••] │ │
│ │                                                             │ │
│ │ Account Type                                                │ │
│ │ ○ Company Administrator  ○ Personnel                       │ │
│ │                                                             │ │
│ │ Company (if applicable)                                     │ │
│ │ [Select Company                                         ▼] │ │
│ │                                                             │ │
│ │              [Continue]                                     │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Dashboard Layouts

#### Company Admin Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│ [🇬🇭 PC] Dashboard | Applications | Personnel | Reports [👤 John] │
├─────────────────────────────────────────────────────────────────┤
│ Welcome back, Acme Petroleum Ltd.                    🔔 (3)      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📋 Active   │ │ 👥 Personnel│ │ 💰 Pending  │ │ ⏰ Expiring │ │
│ │ Applications│ │ Count       │ │ Payments    │ │ Documents   │ │
│ │     12      │ │     45      │ │   GHS 2,500 │ │      8      │ │
│ │ +2 this week│ │ +3 new      │ │ 3 invoices  │ │ Next 30 days│ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Recent Applications                          [View All]         │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ APP-2024-001 | John Smith Regular Permit | Under Review   │ │
│ │ APP-2024-002 | Jane Doe Rotator Permit   | Approved      │ │
│ │ APP-2024-003 | Bob Wilson Regular Permit | Payment Pending│ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Application Status Overview          Personnel by Type          │
│ ┌─────────────────────────┐         ┌─────────────────────────┐ │
│ │     📊 Pie Chart        │         │     📊 Bar Chart        │ │
│ │   Submitted: 40%        │         │   Local: 75%            │ │
│ │   Under Review: 30%     │         │   Expatriate: 25%       │ │
│ │   Approved: 25%         │         │                         │ │
│ │   Rejected: 5%          │         │                         │ │
│ └─────────────────────────┘         └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### PC Staff Dashboard
```
┌─────────────────────────────────────────────────────────────────┐
│ [🇬🇭 PC] Review Queue | Analytics | Reports | Admin [👤 Officer] │
├─────────────────────────────────────────────────────────────────┤
│ Review Dashboard - Compliance Officer                 🔔 (7)     │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📋 Pending  │ │ ⏰ Overdue  │ │ ✅ Completed│ │ 🚨 Escalated│ │
│ │ Reviews     │ │ Reviews     │ │ Today       │ │ Cases       │ │
│ │     28      │ │      5      │ │     15      │ │      3      │ │
│ │ +8 today    │ │ Action req. │ │ Target: 20  │ │ Urgent      │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Priority Review Queue                        [Filter ▼] [Sort ▼]│
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🔴 HIGH | APP-2024-045 | Acme Ltd | Regular Permit | 5 days │ │
│ │ 🟡 MED  | APP-2024-046 | XYZ Corp | Rotator Permit | 3 days │ │
│ │ 🟢 LOW  | APP-2024-047 | ABC Inc  | Regular Permit | 1 day  │ │
│ │                                              [Review] [Assign]│ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Review Performance                   Application Trends         │
│ ┌─────────────────────────┐         ┌─────────────────────────┐ │
│ │     📊 Line Chart       │         │     📊 Area Chart       │ │
│ │   This Week: 85%        │         │   Monthly Growth: +12%  │ │
│ │   Target: 90%           │         │   Peak: March           │ │
│ │   Avg Time: 2.3 days    │         │                         │ │
│ └─────────────────────────┘         └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.4 Company Registration Flow

#### Step 1: Corporate Structure
```
┌─────────────────────────────────────────────────────────────────┐
│ Company Registration - Step 1 of 6: Corporate Structure        │
│ ████████████████                                                │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Company Information                                         │ │
│ │                                                             │ │
│ │ Company Name *                                              │ │
│ │ [Acme Petroleum Limited                                 ] │ │
│ │                                                             │ │
│ │ Registration Number *        Incorporation Country *        │ │
│ │ [REG-123456789          ] [Ghana                       ▼] │ │
│ │                                                             │ │
│ │ Business Address *                                          │ │
│ │ [123 Independence Avenue, Accra, Ghana              ] │ │
│ │                                                             │ │
│ │ Contact Information                                         │ │
│ │ Email *                          Phone *                   │ │
│ │ [info@acme.com.gh           ] [+233-123-456789        ] │ │
│ │                                                             │ │
│ │ Permit Category *                                           │ │
│ │ ○ Specialized Services    ○ General Services               │ │
│ │                                                             │ │
│ │ Subsidiaries/Affiliates                                     │ │
│ │ [+ Add Subsidiary]                                          │ │
│ │                                                             │ │
│ │                    [Save Draft] [Continue]                 │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Step 2: Ownership & Management
```
┌─────────────────────────────────────────────────────────────────┐
│ Company Registration - Step 2 of 6: Ownership & Management     │
│ ████████████████████████████████                                │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Shareholders Information                                    │ │
│ │                                                             │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Shareholder 1                                           │ │ │
│ │ │ Name: [John Doe                                     ] │ │ │
│ │ │ Nationality: [Ghanaian                             ▼] │ │ │
│ │ │ Equity %: [25.0                                    ] │ │ │
│ │ │ Type: ○ Individual  ○ Corporate                     │ │ │
│ │ │                                            [Remove] │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │ [+ Add Shareholder]                                         │ │
│ │                                                             │ │
│ │ Total Equity: 100.0% ✅                                     │ │
│ │ Ghanaian Ownership: 65.0% ✅                                │ │
│ │                                                             │ │
│ │ Board of Directors                                          │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Chairman: [Jane Smith                               ] │ │ │
│ │ │ Managing Director: [John Doe                        ] │ │ │
│ │ │ [+ Add Director]                                    │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │                                                             │ │
│ │                    [Previous] [Save Draft] [Continue]      │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.5 Permit Application Interface

#### Regular Permit Application
```
┌─────────────────────────────────────────────────────────────────┐
│ Regular Permit Application - Personnel: John Smith             │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Personal Information                                        │ │
│ │                                                             │ │
│ │ Full Name *                      Passport Number *          │ │
│ │ [John Smith                 ] [P123456789              ] │ │
│ │                                                             │ │
│ │ Nationality *                    Date of Birth *            │ │
│ │ [British                   ▼] [1985-06-15              ] │ │
│ │                                                             │ │
│ │ Position/Role *                                             │ │
│ │ [Drilling Engineer                                      ] │ │
│ │                                                             │ │
│ │ Employment Details                                          │ │
│ │ Contract Start Date *            Contract End Date *        │ │
│ │ [2024-01-15                ] [2025-01-14               ] │ │
│ │                                                             │ │
│ │ Salary (USD) *                   Accommodation *            │ │
│ │ [75,000                    ] [Company Provided        ▼] │ │
│ │                                                             │ │
│ │ Required Documents                                          │ │
│ │ ☐ Passport Copy              📎 [Upload] [passport.pdf]    │ │
│ │ ☐ Medical Certificate        📎 [Upload] [medical.pdf]     │ │
│ │ ☐ BOSIET Certificate         📎 [Upload] [bosiet.pdf]      │ │
│ │ ☐ Police Clearance           📎 [Upload] [police.pdf]      │ │
│ │ ☐ CV/Resume                  📎 [Upload] [cv.pdf]          │ │
│ │                                                             │ │
│ │ Payment Information                                         │ │
│ │ Application Fee: GHS 500.00                                 │ │
│ │ Payment Receipt: 📎 [Upload Receipt] [receipt.pdf]         │ │
│ │                                                             │ │
│ │              [Save Draft] [Submit Application]             │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.6 Status Tracking Interface

#### Application Status Timeline
```
┌─────────────────────────────────────────────────────────────────┐
│ Application Status: APP-2024-001 - John Smith Regular Permit   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Current Status: Under PC Review                             │ │
│ │ Estimated Completion: 5-7 business days                    │ │
│ │ Last Updated: 2024-01-15 14:30 GMT                         │ │
│ └─────────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Application Timeline                                            │
│                                                                 │
│ ✅ 2024-01-10 09:00  Application Submitted                     │
│    │ All required documents uploaded                            │
│    │ Payment confirmed: GHS 500.00                             │
│    │                                                            │
│ ✅ 2024-01-11 10:30  Initial Review Completed                  │
│    │ Documents verified by PC Staff                            │
│    │ Application forwarded to technical review                 │
│    │                                                            │
│ 🔄 2024-01-15 14:30  Technical Review in Progress              │
│    │ Reviewing employment contract and qualifications          │
│    │ Estimated completion: 2024-01-17                          │
│    │                                                            │
│ ⏳ Pending: Commission Admin Approval                          │
│    │ Final approval by Commission Administrator                │
│    │                                                            │
│ ⏳ Pending: GIS Processing                                      │
│    │ Ghana Immigration Service final approval                  │
│    │                                                            │
│ ⏳ Pending: Permit Issuance                                    │
│    │ Physical permit generation and delivery                   │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ Comments & Communications                                       │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 2024-01-15 PC Officer: Technical review in progress.       │ │
│ │ All documents are in order. Expected completion by EOD.    │ │
│ │                                                             │ │
│ │ 2024-01-11 System: Application passed initial screening.   │ │
│ │ Forwarded to technical review team.                        │ │
│ └─────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Download Application] [Contact Support] [Print Status]        │
└─────────────────────────────────────────────────────────────────┘
```

### 2.7 Payment Processing Interface

#### Payment Gateway Integration
```
┌─────────────────────────────────────────────────────────────────┐
│ Payment Processing - Application Fee                           │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Payment Summary                                             │ │
│ │                                                             │ │
│ │ Service: Regular Permit Application                         │ │
│ │ Application ID: APP-2024-001                                │ │
│ │ Applicant: John Smith                                       │ │
│ │                                                             │ │
│ │ Fee Breakdown:                                              │ │
│ │ Application Fee:           GHS 450.00                       │ │
│ │ Processing Fee:            GHS  50.00                       │ │
│ │ ─────────────────────────────────                          │ │
│ │ Total Amount:              GHS 500.00                       │ │
│ │                                                             │ │
│ │ Payment Method                                              │ │
│ │ ○ Mobile Money (MTN/Vodafone/AirtelTigo)                   │ │
│ │ ○ Bank Transfer                                             │ │
│ │ ○ Credit/Debit Card                                         │ │
│ │                                                             │ │
│ │ Mobile Money Details                                        │ │
│ │ Network: [MTN                                          ▼] │ │
│ │ Phone: [0244-123-456                                   ] │ │
│ │                                                             │ │
│ │ ⚠️  Important: Keep your payment receipt for records       │ │
│ │                                                             │ │
│ │                    [Cancel] [Proceed to Pay]               │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 2.8 Analytics Dashboard

#### System Analytics Overview
```
┌─────────────────────────────────────────────────────────────────┐
│ Analytics Dashboard - System Overview                          │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📊 Total    │ │ 📈 Monthly  │ │ ⏱️  Avg     │ │ 💰 Revenue  │ │
│ │ Applications│ │ Growth      │ │ Processing  │ │ This Month  │ │
│ │   3,420     │ │   +12.5%    │ │   2.3 days  │ │ GHS 125,000 │ │
│ │ +45 today   │ │ vs last mon │ │ Target: 3d  │ │ +8% vs last │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ Application Status Distribution          Processing Time Trends  │
│ ┌─────────────────────────┐             ┌─────────────────────────┐│
│ │     📊 Donut Chart      │             │     📊 Line Chart       ││
│ │                         │             │                         ││
│ │   Approved: 65%         │             │   Jan: 2.8 days         ││
│ │   Under Review: 20%     │             │   Feb: 2.5 days         ││
│ │   Submitted: 10%        │             │   Mar: 2.1 days         ││
│ │   Rejected: 5%          │             │   Target: 3.0 days      ││
│ │                         │             │                         ││
│ └─────────────────────────┘             └─────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ Local Content Compliance                Revenue by Service Type   │
│ ┌─────────────────────────┐             ┌─────────────────────────┐│
│ │     📊 Bar Chart        │             │     📊 Pie Chart        ││
│ │                         │             │                         ││
│ │   Employment: 78%       │             │   Permits: 45%          ││
│ │   Training: 65%         │             │   Company Reg: 30%      ││
│ │   Investment: 82%       │             │   JV Reg: 15%           ││
│ │   Target: 70%           │             │   LC Reports: 10%       ││
│ │                         │             │                         ││
│ └─────────────────────────┘             └─────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ Recent Activity Feed                                            │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ 🟢 14:30 - APP-2024-045 approved by Commission Admin       │ │
│ │ 🟡 14:25 - Payment received for APP-2024-046               │ │
│ │ 🔵 14:20 - New company registration: XYZ Petroleum         │ │
│ │ 🟢 14:15 - APP-2024-044 permit issued by GIS               │ │
│ │ 🟡 14:10 - Document uploaded for APP-2024-047              │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Mobile Responsive Design

### 3.1 Mobile Navigation
```
┌─────────────────────┐
│ [☰] PC-OTS   [🔔] │
├─────────────────────┤
│                     │
│ ┌─────────────────┐ │
│ │ 📋 Applications │ │
│ │       12        │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 👥 Personnel    │ │
│ │       45        │ │
│ └─────────────────┘ │
│                     │
│ ┌─────────────────┐ │
│ │ 💰 Payments     │ │
│ │   GHS 2,500     │ │
│ └─────────────────┘ │
│                     │
│ Recent Activity     │
│ ┌─────────────────┐ │
│ │ APP-2024-001    │ │
│ │ Under Review    │ │
│ │ 2 days ago      │ │
│ └─────────────────┘ │
│                     │
└─────────────────────┘
```

### 3.2 Mobile Form Layout
```
┌─────────────────────┐
│ ← Regular Permit    │
├─────────────────────┤
│ Step 1 of 3         │
│ ████████            │
│                     │
│ Personal Info       │
│                     │
│ Full Name *         │
│ ┌─────────────────┐ │
│ │ John Smith      │ │
│ └─────────────────┘ │
│                     │
│ Passport Number *   │
│ ┌─────────────────┐ │
│ │ P123456789      │ │
│ └─────────────────┘ │
│                     │
│ Nationality *       │
│ ┌─────────────────┐ │
│ │ British       ▼ │ │
│ └─────────────────┘ │
│                     │
│ Date of Birth *     │
│ ┌─────────────────┐ │
│ │ 1985-06-15      │ │
│ └─────────────────┘ │
│                     │
│ [Save] [Continue]   │
│                     │
└─────────────────────┘
```

## 4. Component Library

### 4.1 Form Components

#### Input Field
```jsx
<div className="form-group">
  <label className="form-label required">
    Company Name
  </label>
  <input 
    type="text" 
    className="form-input"
    placeholder="Enter company name"
    required
  />
  <span className="form-error">This field is required</span>
</div>
```

#### File Upload
```jsx
<div className="upload-zone">
  <div className="upload-area">
    <FileIcon className="upload-icon" />
    <p>Drag and drop files here or click to browse</p>
    <button className="btn-secondary">Choose Files</button>
  </div>
  <div className="file-list">
    <div className="file-item">
      <FileIcon />
      <span>passport.pdf</span>
      <button className="btn-remove">×</button>
    </div>
  </div>
</div>
```

### 4.2 Status Components

#### Status Badge
```jsx
<span className="status-badge status-approved">
  ✅ Approved
</span>
<span className="status-badge status-pending">
  ⏳ Pending
</span>
<span className="status-badge status-rejected">
  ❌ Rejected
</span>
```

#### Progress Indicator
```jsx
<div className="progress-steps">
  <div className="step completed">
    <div className="step-number">1</div>
    <div className="step-label">Submitted</div>
  </div>
  <div className="step active">
    <div className="step-number">2</div>
    <div className="step-label">Review</div>
  </div>
  <div className="step pending">
    <div className="step-number">3</div>
    <div className="step-label">Approval</div>
  </div>
</div>
```

### 4.3 Data Display Components

#### Data Table
```jsx
<div className="data-table">
  <table>
    <thead>
      <tr>
        <th>Application ID</th>
        <th>Applicant</th>
        <th>Type</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>APP-2024-001</td>
        <td>John Smith</td>
        <td>Regular Permit</td>
        <td><span className="status-badge status-pending">Under Review</span></td>
        <td>
          <button className="btn-sm btn-primary">Review</button>
          <button className="btn-sm btn-secondary">View</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

#### Chart Container
```jsx
<div className="chart-container">
  <div className="chart-header">
    <h3>Application Status Distribution</h3>
    <div className="chart-controls">
      <select className="chart-filter">
        <option>Last 30 days</option>
        <option>Last 90 days</option>
        <option>This year</option>
      </select>
    </div>
  </div>
  <div className="chart-content">
    {/* Recharts component */}
  </div>
</div>
```

## 5. Sidebar Navigation & Quick Actions

### 5.1 Sidebar Navigation Structure

#### Desktop Sidebar Layout
```
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────────────────┐ ┌─────────────────────────────────────────┐ │
│ │ [🇬🇭 PC Logo]   │ │ Main Content Area                       │ │
│ │ Petroleum       │ │                                         │ │
│ │ Commission      │ │                                         │ │
│ │                 │ │                                         │ │
│ │ 👤 John Doe     │ │                                         │ │
│ │ Company Admin   │ │                                         │ │
│ │ ─────────────── │ │                                         │ │
│ │                 │ │                                         │ │
│ │ 🏠 Dashboard    │ │                                         │ │
│ │ 🏢 Company      │ │                                         │ │
│ │   ▼ Registration│ │                                         │ │
│ │     • View      │ │                                         │ │
│ │     • Update    │ │                                         │ │
│ │ 📋 Applications │ │                                         │ │
│ │   ▼ Permits     │ │                                         │ │
│ │     • Regular   │ │                                         │ │
│ │     • Rotator   │ │                                         │ │
│ │ 👥 Personnel    │ │                                         │ │
│ │ 💰 Payments     │ │                                         │ │
│ │ 📊 Analytics    │ │                                         │ │
│ │ 🔔 Notifications│ │                                         │ │
│ │ ⚙️  Settings     │ │                                         │ │
│ │ 🚪 Logout       │ │                                         │ │
│ └─────────────────┘ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### Mobile Responsive Navigation
```
┌─────────────────────┐
│ [☰] PC-OTS   [🔔]  │ ← Top Navigation Bar
├─────────────────────┤
│                     │
│ Main Content        │
│                     │
│                     │
└─────────────────────┘

[Hamburger Menu Expanded]
┌─────────────────────┐
│ [×] PC-OTS   [🔔]  │
├─────────────────────┤
│ 👤 John Doe         │
│ Company Admin       │
│ ─────────────────── │
│ 🏠 Dashboard        │
│ 🏢 Company          │
│ 📋 Applications     │
│ 👥 Personnel        │
│ 💰 Payments         │
│ 📊 Analytics        │
│ 🔔 Notifications    │
│ ⚙️  Settings         │
│ 🚪 Logout           │
└─────────────────────┘
```

### 5.2 Role-Specific Menu Hierarchies

#### Company Admin Menu Structure
```
🏠 Dashboard
🏢 Company Registration
   ├── View Registration
   ├── Update Information
   └── Compliance Status
📋 Applications
   ├── Permit Applications
   │   ├── Regular Permits
   │   ├── Rotator Permits
   │   └── Special Permits
   ├── Joint Venture Applications
   └── Application History
👥 Personnel Management
   ├── Active Personnel
   ├── Add New Personnel
   ├── Training Records
   └── Medical/Safety Records
💰 Payments & Billing
   ├── Outstanding Payments
   ├── Payment History
   ├── Invoices
   └── Financial Reports
📊 Analytics & Reports
   ├── Application Analytics
   ├── Personnel Analytics
   ├── Compliance Reports
   └── Local Content Reports
🔔 Notifications (Badge: 3)
⚙️  Profile Settings
🚪 Logout
```

#### PC Staff Menu Structure
```
🏠 Dashboard
📋 Review Queue
   ├── Pending Applications
   ├── Assigned Reviews
   └── Completed Reviews
🏢 Company Registrations
   ├── Pending Registrations
   ├── Approved Companies
   └── Registration Analytics
👥 Personnel Reviews
   ├── Permit Applications
   ├── Medical Clearances
   └── Training Verifications
📄 Document Management
   ├── Uploaded Documents
   ├── Document Templates
   └── Compliance Documents
📊 Reports & Analytics
   ├── Processing Times
   ├── Approval Rates
   └── System Performance
🔔 Notifications (Badge: 7)
⚙️  Profile Settings
🚪 Logout
```

#### Commission Admin Menu Structure
```
🏠 Dashboard
💰 Financial Management
   ├── Revenue Analytics
   ├── Payment Processing
   ├── Fee Structure
   └── Financial Reports
📊 System Analytics
   ├── Application Trends
   ├── Processing Performance
   ├── User Activity
   └── System Health
🏛️  Compliance & Audit
   ├── Audit Trails
   ├── Compliance Reports
   ├── Policy Management
   └── Risk Assessment
👥 User Management
   ├── Staff Accounts
   ├── Company Accounts
   ├── Role Management
   └── Access Control
⚙️  System Configuration
   ├── Application Settings
   ├── Workflow Configuration
   ├── Integration Settings
   └── Backup & Recovery
🔔 Notifications (Badge: 2)
⚙️  Profile Settings
🚪 Logout
```

#### Personnel Menu Structure
```
🏠 Dashboard
📋 My Applications
   ├── Active Applications
   ├── Application History
   └── Submit New Application
🏥 Medical & Safety
   ├── Medical Certificates
   ├── Safety Training
   ├── BOSIET Certification
   └── Emergency Contacts
🎓 Training & Certification
   ├── Training Records
   ├── Certification Status
   ├── Upcoming Training
   └── Training Calendar
💼 Job Applications
   ├── Available Positions
   ├── My Applications
   └── Job Alerts
🔔 Notifications (Badge: 1)
⚙️  Profile Settings
🚪 Logout
```

### 5.3 Quick Action Buttons Layout

#### Company Admin Quick Actions
```
┌─────────────────────────────────────────────────────────────────┐
│ Quick Actions                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📋 New      │ │ 🎫 Apply    │ │ 👤 Add      │ │ 💳 Make     │ │
│ │ Application │ │ Permit      │ │ Personnel   │ │ Payment     │ │
│ │             │ │             │ │             │ │             │ │
│ │ [Submit]    │ │ [Apply]     │ │ [Add]       │ │ [Pay]       │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📎 Upload   │ │ 📊 View     │ │ 🔄 Sync     │ │ 📞 Contact  │ │
│ │ Documents   │ │ Reports     │ │ Data        │ │ Support     │ │
│ │             │ │             │ │             │ │             │ │
│ │ [Upload]    │ │ [View]      │ │ [Sync]      │ │ [Contact]   │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

#### PC Staff Quick Actions
```
┌─────────────────────────────────────────────────────────────────┐
│ Quick Actions                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📋 Review   │ │ ✅ Approve  │ │ ❌ Reject   │ │ 📝 Add      │ │
│ │ Application │ │ Application │ │ Application │ │ Comment     │ │
│ │             │ │             │ │             │ │             │ │
│ │ [Review]    │ │ [Approve]   │ │ [Reject]    │ │ [Comment]   │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
│                                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ │
│ │ 📊 Generate │ │ 🔍 Search   │ │ 📤 Export   │ │ 🔔 Send     │ │
│ │ Report      │ │ Records     │ │ Data        │ │ Notification│ │
│ │             │ │             │ │             │ │             │ │
│ │ [Generate]  │ │ [Search]    │ │ [Export]    │ │ [Send]      │ │
│ └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 5.4 Visual Design Specifications

#### Sidebar Styling
```css
/* Sidebar Container */
.sidebar {
  width: 280px;
  background: linear-gradient(180deg, #002F6C 0%, #1E40AF 100%);
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  transition: transform 0.3s ease;
}

/* Sidebar Header */
.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 47, 108, 0.8);
}

/* User Profile Section */
.sidebar-user {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary-gold);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--primary-blue);
}

/* Menu Items */
.sidebar-menu {
  padding: 1rem 0;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.menu-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-left-color: var(--primary-gold);
}

.menu-item.active {
  background: rgba(252, 209, 22, 0.2);
  color: var(--primary-gold);
  border-left-color: var(--primary-gold);
  font-weight: 600;
}

/* Submenu */
.submenu {
  background: rgba(0, 0, 0, 0.2);
  padding-left: 3rem;
}

.submenu-item {
  padding: 0.5rem 1.5rem;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
}

/* Notification Badge */
.notification-badge {
  background: var(--status-danger);
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}
```

#### Quick Action Button Styling
```css
/* Quick Actions Container */
.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-secondary);
  border-radius: 0.75rem;
  margin-bottom: 2rem;
}

/* Quick Action Button */
.quick-action-btn {
  background: white;
  border: 2px solid var(--secondary-gray-200);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
  text-decoration: none;
  color: var(--secondary-gray-700);
}

.quick-action-btn:hover {
  border-color: var(--primary-blue);
  box-shadow: 0 4px 12px rgba(0, 47, 108, 0.1);
  transform: translateY(-2px);
}

.quick-action-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}

.quick-action-title {
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: var(--primary-blue);
}

.quick-action-desc {
  font-size: 0.875rem;
  color: var(--secondary-gray-500);
  margin-bottom: 1rem;
}

.quick-action-button {
  background: var(--primary-blue);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: background 0.2s ease;
}

.quick-action-button:hover {
  background: var(--primary-red);
}
```

### 5.5 Interactive States & Behaviors

#### Navigation States
- **Default State**: Menu items with subtle transparency
- **Hover State**: Background highlight with gold accent border
- **Active State**: Gold background tint with bold text
- **Focus State**: Keyboard focus with outline for accessibility
- **Disabled State**: Reduced opacity for unavailable options

#### Responsive Breakpoints
```css
/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .sidebar {
    position: fixed;
    transform: translateX(0);
  }
  .main-content {
    margin-left: 280px;
  }
}

/* Tablet (768px - 1023px) */
@media (max-width: 1023px) {
  .sidebar {
    transform: translateX(-100%);
  }
  .sidebar.open {
    transform: translateX(0);
  }
  .main-content {
    margin-left: 0;
  }
}

/* Mobile (< 768px) */
@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    transform: translateX(-100%);
  }
  .quick-actions {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 1rem;
  }
  .quick-action-btn {
    padding: 1rem;
  }
}
```

### 5.6 Icon Specifications

#### Icon Library
- **Home**: 🏠 (Dashboard)
- **Company**: 🏢 (Company Registration)
- **Applications**: 📋 (Permit Applications)
- **Personnel**: 👥 (Personnel Management)
- **Payments**: 💰 (Financial Operations)
- **Analytics**: 📊 (Reports & Analytics)
- **Notifications**: 🔔 (System Notifications)
- **Settings**: ⚙️ (Configuration)
- **Logout**: 🚪 (Sign Out)
- **Documents**: 📄 (Document Management)
- **Approval**: ✅ (Approval Actions)
- **Rejection**: ❌ (Rejection Actions)
- **Review**: 🔍 (Review Process)
- **Upload**: 📎 (File Upload)
- **Export**: 📤 (Data Export)
- **Support**: 📞 (Help & Support)

#### Icon Usage Guidelines
- **Size**: 20px for menu items, 32px for quick actions
- **Color**: White/gold for sidebar, blue for main content
- **Spacing**: 12px gap between icon and text
- **Accessibility**: Alt text for screen readers
- **Consistency**: Same icon for same function across all interfaces

## 6. Accessibility & Usability

### 6.1 Accessibility Features
- **WCAG 2.1 AA Compliance**: All components meet accessibility standards
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Minimum 4.5:1 contrast ratio for all text
- **Focus Indicators**: Clear visual focus indicators for all interactive elements

### 6.2 Usability Enhancements
- **Progressive Disclosure**: Complex forms broken into manageable steps
- **Inline Validation**: Real-time feedback on form inputs
- **Auto-save**: Automatic saving of form progress
- **Contextual Help**: Tooltips and help text for complex fields
- **Error Prevention**: Clear validation rules and error messages

### 6.3 Performance Considerations
- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: JavaScript bundles split by route
- **Caching Strategy**: Aggressive caching for static assets
- **Optimized Images**: WebP format with fallbacks
- **Minimal Bundle Size**: Tree shaking and dead code elimination

This comprehensive UI/UX wireframe document provides the foundation for implementing a user-friendly, accessible, and efficient interface for the Petroleum Commission Offshore Tracking System, with detailed specifications for sidebar navigation and quick action functionality.
