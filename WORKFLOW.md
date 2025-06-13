# Upstream Tracking System - System Workflow Documentation

## Overview

The Petroleum Commission Offshore Tracking System (PC-OTS) is a comprehensive platform for managing oil and gas industry operations in Ghana. It handles company registration, permit applications, joint venture management, personnel tracking, local content compliance, and regulatory oversight.

## System Architecture

### Technology Stack
- **Backend**: Node.js with Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Frontend**: Next.js with TypeScript
- **Authentication**: JWT-based authentication
- **Notifications**: Multi-channel (In-app, Email, SMS)
- **File Storage**: Document management system
- **Deployment**: Docker containerization

### Core Components
- Authentication & Authorization System
- Company Registration & Management
- Permit Application & Review System
- Joint Venture (JV) Management
- Personnel & Immigration Tracking
- Local Content Compliance
- Document Management
- Payment Processing
- Audit & Compliance Monitoring
- Notification System

## User Roles & Permissions

### Administrative Roles
- **ADMIN**: System-wide administrative access
- **COMMISSION_ADMIN**: Petroleum Commission administrative functions
- **COMPLIANCE_OFFICER**: Regulatory compliance oversight
- **INSPECTOR**: Field inspections and compliance verification
- **IMMIGRATION_OFFICER**: Personnel and work permit management
- **JV_COORDINATOR**: Joint venture oversight and coordination
- **FINANCE_OFFICER**: Payment and financial management

### Company Roles
- **COMPANY_ADMIN**: Company-level administrative functions
- **PERSONNEL**: Basic company personnel access

## Core Workflows

### 1. User Registration & Authentication Workflow

#### Initial Registration
1. **User Registration**
   - User provides email, password, personal details
   - System validates email uniqueness
   - Password is hashed using bcrypt
   - User account created with specified role
   - Welcome notification sent via email and in-app

2. **Authentication Process**
   - User login with email/password
   - System validates credentials
   - JWT token generated (24-hour expiry)
   - User session established
   - Last login timestamp updated

3. **Role-Based Access Control**
   - Middleware validates JWT tokens
   - Role-based route protection
   - Company-specific data isolation
   - Administrative privilege escalation

### 2. Company Registration Workflow

#### Multi-Stage Registration Process
1. **Email Verification Stage**
   - Status: `PENDING_EMAIL_VERIFICATION`
   - User creates account and verifies email
   - System sends verification link

2. **Form Completion Stage**
   - Status: `PENDING_FORM_COMPLETION`
   - Company provides comprehensive information:
     - Basic company details (name, incorporation, address)
     - Corporate structure and shareholders
     - Directors and management team
     - Permit category (SPECIALIZED/GENERAL)
     - Preferred activities (max 2)
     - Financial capability documentation
     - Organizational structure
     - Staff details and expertise
     - Three-year development plans
     - Local content commitments
     - HSSE policy documentation

3. **Payment Processing**
   - Status: `PENDING_PAYMENT`
   - Registration fee calculation
   - Payment gateway integration
   - Payment confirmation

4. **Review and Approval**
   - Status: `SUBMITTED_FOR_REVIEW`
   - Administrative review process
   - Document verification
   - Compliance assessment
   - Status: `REQUIRES_CLARIFICATION` (if needed)
   - Final approval: `APPROVED` or `REJECTED`

### 3. Permit Application & Management Workflow

#### Permit Types
- **EXPLORATION**: Exploration permits
- **PRODUCTION**: Production permits
- **PERSONNEL**: Work permits (Regular and Rotator) and personnel authorization
- **INSTALLATION**: Equipment and installation permits
- **ENVIRONMENTAL**: Environmental compliance permits

#### Application Process (General Permits)
1. **Application Submission**
   - Company submits permit application
   - Required documentation upload
   - Application status: `DRAFT` → `SUBMITTED`
   - Automatic notification to reviewers

2. **Review Process**
   - Status: `UNDER_REVIEW`
   - Multi-stage review by different officers
   - Technical assessment
   - Compliance verification
   - Status: `REQUIRES_ADDITIONAL_INFO` (if needed)

3. **Decision Process**
   - Final review by authorized officers
   - Status: `APPROVED` or `REJECTED`
   - Permit issuance (if approved)
   - Notification to applicant
   - Audit trail maintenance

#### Expatriate Personnel Permit Workflow (Regular & Rotator)
1. **Application Submission by Company/Personnel**
   - Upstream company or registered expatriate personnel submits application for new/renewal of work permit.
   - Permit type specified (Regular/Rotator).
   - Required documentation uploaded (passport, qualifications, employment contract, etc.).
   - Application status: `SUBMITTED_TO_PC`.

2. **Petroleum Commission (PC) CEO Review**
   - Application routed to PC CEO or designated authority.
   - Review of application and supporting documents.
   - Status: `PENDING_PC_APPROVAL`.
   - PC CEO approves or requests more information.
   - If approved by PC CEO, status: `FORWARDED_TO_GIS`.
   - If rejected by PC CEO, status: `REJECTED_BY_PC` (with reason), notification to applicant.

3. **Ghana Immigration Service (GIS) Review**
   - Application automatically forwarded to GIS portal/system.
   - GIS officers review the application.
   - Status: `PENDING_GIS_APPROVAL`.
   - GIS approves or rejects with reason.
   - If approved by GIS, status: `APPROVED_BY_GIS`, permit issued/updated.
   - If rejected by GIS, status: `REJECTED_BY_GIS` (with reason).

4. **Notification & Payment**
   - Applicant (company/personnel) notified of final status (Approved/Rejected with reasons).
   - If approved, system prompts for payment of applicable fees.
   - Payment processed via integrated payment gateway.
   - Permit becomes active upon successful payment.

### 4. Joint Venture (JV) Management Workflow

#### JV Company Registration
1. **JV Application**
   - Company submits JV company details
   - Indigenous equity percentage (must total 100% with foreign equity)
   - Foreign equity percentage
   - Board resolution documentation
   - Equity agreement documentation

2. **Validation Process**
   - Equity percentage validation (must equal 100%)
   - Registration number uniqueness check
   - Document verification

3. **Approval and Notification**
   - JV company creation
   - Audit log entry
   - Notification to JV coordinators
   - Integration with parent company records

### 5. Personnel & Immigration Management Workflow

#### Personnel Registration (Local & Expatriate)
1. **Personnel Data Entry by Company**
   - Upstream company registers its personnel (both local and expatriate).
   - Personal information (name, email, phone, nationality, etc.).
   - Position, role, and employment details.
   - Distinction between Local and Expatriate personnel.
   - For Expatriates: Passport details, existing permit information (if any).

2. **Document Management**
   - Upload of relevant documents:
     - For Locals: National ID, CV, qualifications.
     - For Expats: Passport, CV, qualifications, employment contract, medical certificate, BOSIET certificate.
   - Secure storage and version control.
   - Expiry date tracking for relevant documents (passports, permits, certificates).

3. **Expatriate Permit Application/Renewal Access**
   - Registered expatriate personnel gain the ability to log in and apply for new work permits or renew existing ones directly through their portal.
   - Workflow follows the **Expatriate Personnel Permit Workflow** detailed in Section 3.

4. **Compliance Monitoring & Notifications**
   - Automated notifications for document/permit expiry (to personnel and company admin).
   - Renewal reminders.
   - Tracking of permit application status.
   - Oversight by Immigration Officers and PC officials.

### 6. Local Content Compliance Workflow

#### Local Content Planning
1. **Annual Plan Submission**
   - Companies submit local content plans
   - Indigenous participation targets
   - Local procurement commitments
   - Training and development programs
   - Community investment plans

2. **Performance Monitoring**
   - Quarterly performance reports
   - Achievement tracking against targets
   - Compliance assessment
   - Penalty calculation (if non-compliant)

3. **Reporting and Analytics**
   - Performance dashboards
   - Trend analysis
   - Industry benchmarking
   - Regulatory reporting

### 7. Document Management Workflow

#### Document Lifecycle
1. **Document Upload**
   - Secure file upload
   - Document type classification
   - Metadata capture
   - Version control

2. **Document Processing**
   - Virus scanning
   - Format validation
   - Storage optimization
   - Access control assignment

3. **Document Tracking**
   - Expiry date monitoring
   - Renewal notifications
   - Compliance status tracking
   - Audit trail maintenance

### 8. Payment Processing Workflow

#### Payment Types
- Company registration fees
- License application fees
- Permit application fees (including Expatriate Work Permits - Regular & Rotator)
- Permit renewal fees
- Compliance penalties
- Service charges

#### Payment Process
1. **Fee Calculation**
   - Service-based fee determination
   - Tax and surcharge calculation
   - Payment schedule generation

2. **Payment Gateway Integration**
   - Secure payment processing
   - Multiple payment methods
   - Transaction verification
   - Receipt generation

3. **Payment Reconciliation**
   - Payment confirmation
   - Account updating
   - Financial reporting
   - Audit trail maintenance

### 9. Inspection & Compliance Workflow

#### Inspection Planning
1. **Inspection Scheduling**
   - Risk-based inspection planning
   - Inspector assignment
   - Company notification
   - Preparation requirements

2. **Inspection Execution**
   - On-site inspection
   - Compliance assessment
   - Finding documentation
   - Evidence collection

3. **Follow-up Actions**
   - Inspection report generation
   - Non-compliance notifications
   - Corrective action requirements
   - Re-inspection scheduling

### 10. Notification System Workflow

#### Multi-Channel Notifications
1. **Notification Triggers**
   - Application status changes
   - Document expiry warnings
   - Compliance deadlines
   - System alerts

2. **Delivery Channels**
   - In-app notifications
   - Email notifications
   - SMS alerts (where configured)
   - Dashboard alerts

3. **Notification Management**
   - Read/unread status tracking
   - Notification history
   - User preferences
   - Delivery confirmation

## Data Flow Architecture

### Request Processing Flow
1. **Client Request** → **Authentication Middleware** → **Authorization Check** → **Route Handler**
2. **Database Query** → **Business Logic** → **Response Formatting** → **Client Response**
3. **Audit Logging** → **Notification Triggers** → **Background Processing**

### Database Relationships
- **Users** ↔ **Companies** (Many-to-One)
- **Companies** ↔ **Permits** (One-to-Many)
- **Companies** ↔ **Personnel** (One-to-Many)
- **Companies** ↔ **JV Companies** (One-to-Many)
- **Companies** ↔ **Local Content Plans** (One-to-Many)
- **Users** ↔ **Notifications** (One-to-Many)
- **All Entities** ↔ **Documents** (Polymorphic)
- **All Actions** ↔ **Audit Logs** (Tracking)

## Security & Compliance

### Security Measures
- JWT-based authentication with 24-hour expiry
- Role-based access control (RBAC)
- Password hashing with bcrypt
- Input validation and sanitization
- SQL injection prevention via Prisma ORM
- CORS configuration
- Audit logging for all actions

### Compliance Features
- Complete audit trail
- Document retention policies
- Data privacy protection
- Regulatory reporting
- Compliance monitoring dashboards
- Automated compliance checks

## Monitoring & Analytics

### System Monitoring
- Health check endpoints
- Database connection monitoring
- Error tracking and logging
- Performance metrics
- Uptime monitoring

### Business Analytics
- Application processing metrics
- Compliance performance tracking
- Financial reporting
- User activity analytics
- Industry trend analysis

## Integration Points

### External Systems
- Payment gateways
- Email service providers
- SMS service providers
- Document storage systems
- Government databases (potential)

### API Endpoints
- RESTful API design
- Standardized response formats
- Error handling
- Rate limiting
- API documentation

## Deployment & Operations

### Deployment Architecture
- Docker containerization
- Environment-based configuration
- Database migrations
- Automated deployments
- Health monitoring

### Operational Procedures
- Backup and recovery
- Database maintenance
- Security updates
- Performance optimization
- Disaster recovery

## Future Enhancements

### Planned Features
- Mobile application
- Advanced analytics dashboard
- AI-powered compliance monitoring
- Blockchain integration for document verification
- Enhanced reporting capabilities
- Real-time collaboration tools

### Scalability Considerations
- Microservices architecture migration
- Caching layer implementation
- Load balancing
- Database sharding
- CDN integration

---

*This workflow documentation provides a comprehensive overview of the Upstream Tracking System's operational processes and technical architecture. For specific implementation details, refer to the respective route files and service modules in the codebase.*