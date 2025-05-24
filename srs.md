Below is a **regenerated and highly detailed SRS.md** for your Petroleum Commission Offshore Tracking System (PC-OTS) project, including development considerations for your local Docker environment. This SRS answers the three workflow questions, includes clear tables for both Regular and Rotator Permit application forms, specifies technical, data, and process requirements, and maps all logical steps and system flows from start to finish.

---

```markdown
# Software Requirements Specification (SRS)
## Petroleum Commission Offshore Tracking System (PC-OTS)

---

## 1. Introduction

PC-OTS is a full-stack web application built for the Petroleum Commission of Ghana to digitize and enforce all regulatory, compliance, and permit management workflows for companies, personnel, JV partners, and PC staff in the upstream petroleum sector.

---

## 2. System Goals

- Eliminate incomplete or non-compliant applications via digital validation and workflow.
- Streamline, automate, and track company, JV, personnel, and permit registrations, renewals, approvals, and compliance.
- Provide dashboards, charts, and analytics for all user roles.
- Enable full audit and regulatory traceability.
- Run reliably in a Docker-based local or production environment.

---

## 3. Tech Stack

- **Frontend:** Next.js (TypeScript), Tailwind CSS, Recharts/Chart.js
- **Backend:** Node.js (Express.js), REST API
- **Database:** PostgreSQL (via Docker container)
- **ORM:** Drizzle ORM or Prisma
- **File Storage:** Local (for dev) or AWS S3 (for prod), via Docker volume
- **Authentication:** JWT, Role-based access, optional 2FA
- **Notifications:** Email (SMTP server/SendGrid), SMS gateway
- **Audit Logging:** Backend logging to database
- **CI/CD:** Docker Compose, GitHub Actions, local dev via Docker Desktop

---

## 4. Main System Components

### 4.1. Company Registration & Renewal

- **Multi-step form for all regulatory fields (see 8.1 Table)**
- Digital checklist for document uploads (PDF/JPG/PNG, ≤2MB)
- Auto-blocks submission if any required info is missing
- Built-in validation for Ghanaian equity, category/activity, document expiry
- Submission triggers review workflow with status tracking
- Applicant dashboard shows all applications, status, deadlines

---

### 4.2. Personnel & Permit Management

- Personnel registration with full bio-data and employment details
- Permit application forms for **Regular** and **Rotator** permits
- Document upload (passport, contract, medical, BOSIET, police, visa)
- Expat-specific fields shown conditionally
- Certificate expiry validation (auto-flag if near expiry)
- Status and permit tracking for each staff member

---

### 4.3. JV Company Registration & Compliance

- JV registration form, equity validation, board docs, tech transfer plan
- System enforces 10% minimum Ghanaian equity, JV compliance
- Dashboards for ongoing JV status, contract tracking

---

### 4.4. Local Content Plan & Performance Reporting

- Multi-section forms for LC Plan (employment, training, succession, R&D, insurance, financial, legal, indigenous bank)
- LC Performance Report form for annual/quarterly submissions
- Inline data entry tables and evidence upload

---

### 4.5. Workflow & Status Tracking

- Queue-based workflow for PC staff: Reviewer → Local Content → Compliance → Finance → Immigration
- Statuses: Draft, Submitted, Under Review, Returned, Approved, Rejected, Payment Pending, Permit Issued
- Audit trail for all actions
- Role-based dashboard queues

---

### 4.6. Dashboards, Analytics & Charts

- Real-time cards, charts, and stats for all users:
    - Permit/application status
    - Renewal and expiry alerts
    - Ghanaian/expat staff ratio
    - Fees collected, outstanding, fines
    - JV compliance indicators

---

## 5. Landing Page & UI/UX

- Hero section: Ghana flag/PC logo, mission, quick stats (total companies, permits issued, Ghanaian ownership %)
- Main menu: Home, About, Contact, Regulatory Docs, Login/Register, FAQ/Support
- Quick search for public info
- Footer: PC contacts, privacy, site map, legal

---

## 6. User Roles & Menus

### 6.1. Company Admin Dashboard

- My Applications
- Permits (Active/Expired)
- Personnel Management
- JV Compliance
- Local Content Reporting
- Notifications
- Documents/Uploads

### 6.2. PC Staff Dashboards

- Pending Applications (by type)
- Review Queues (Local Content, Compliance, Finance, Immigration)
- Reports/Analytics
- Compliance Alerts
- Audit Logs

### 6.3. Personnel Dashboard

- My Permit Status
- Expiry/Upload Reminders
- Application History

### 6.4. JV Dashboard

- JV Registration Status
- Ghanaian Equity Tracker
- Contracts/Tech Transfer

---

## 7. Data Models & Schemas

### 7.1. Entity Relationship Diagram (ERD)

```

Company

* id, legal\_name, reg\_number, TIN, address, contact, permit\_no, is\_jv, local\_equity, status

Personnel

* id, company\_id, full\_name, dob, gender, nationality, id\_no, id\_expiry, email, phone, position, is\_rotator, employment\_status, photo\_url, status

Permit

* id, company\_id, personnel\_id, type, category, activities, start\_date, end\_date, status

JVCompany

* id, non\_indig\_company\_id, indig\_company\_id, equity\_split, board\_res\_url, tech\_transfer\_url, status

LCPlan

* id, company\_id, year, employment\_json, training\_json, succession\_json, RnD\_json, insurance\_json, legal\_json, financial\_json, indigenous\_bank\_json, attachments

LCPerformance

* id, company\_id, year, localization\_json, supply\_chain\_json, investments\_json, spend\_json, contracts\_json, appendices\_json, declaration

Document

* id, application\_id, type, url, uploaded\_by, upload\_date, expiry\_date, version

User

* id, name, email, role, company\_id, last\_login

AuditLog

* id, entity\_type, entity\_id, action, performed\_by, timestamp, notes

````

---

## 8. Forms & Application Tables

### 8.1. Company Registration (Permit) Application

| Section        | Field Name/Type                                            | Validation                            |
|----------------|-----------------------------------------------------------|---------------------------------------|
| Corporate      | Name, Date/Place Inc., Reg No, TIN, Legal Structure       | Required, Format, Uniqueness          |
| Contacts       | Address, Phone, Email, Contact Person                     | Required, Email format, Phone format  |
| Ownership      | Shareholders, %, Nationality                              | Required, ≥10% Ghanaian for JV        |
| Management     | Directors, Org Chart, Management List                     | Required                              |
| Activities     | Category (Spec/Gen), Max 2 Activities, Description        | Enforced limit, Must match master     |
| Financials     | Audited Reports, Funding Source                           | Required, Upload PDF                  |
| Technical      | Staff List (Name, Gender, Position, Nationality), Expertise | Required                              |
| Equipment      | Source of equipment/facilities                            | Required                              |
| Experience     | Past contracts, locations, global/Ghana ops               | Optional for new companies            |
| Plans          | Org Dev, Training, Tech Transfer, CSR, Budget             | Required                              |
| Local Content  | Ghanaian % ownership, Employment, Infra, Service values   | Required                              |
| HSSE           | Policy & Objectives (Upload)                              | Required                              |
| Attachments    | All docs per checklist                                    | Block if missing/invalid              |
| Declaration    | Digital signature                                         | Required                              |

---

### 8.2. Personnel Permit (Regular & Rotator) Application Form

#### 8.2.1. Regular Permit Table

| Field Name                | Type           | Validation        |
|---------------------------|----------------|-------------------|
| Full Name                 | Text           | Required          |
| Gender                    | Dropdown       | Required          |
| Date of Birth             | Date           | Required          |
| Nationality               | Dropdown       | Required          |
| Passport/ID Number        | Text           | Required          |
| Passport/ID Expiry Date   | Date           | Required          |
| Photo                     | File Upload    | JPG/PNG, ≤2MB     |
| Position/Job Title        | Text           | Required          |
| Employer Name             | Text           | Required          |
| Employer Address          | Text           | Required          |
| Employment Status         | Dropdown       | Local/Expat       |
| Work Permit Number        | Text           | Required if Expat |
| Work Permit Expiry Date   | Date           | Required if Expat |
| Contract Upload           | File Upload    | PDF/JPG, ≤2MB     |
| Medical Certificate       | File Upload    | PDF/JPG, ≤2MB     |
| BOSIET Certificate        | File Upload    | PDF/JPG, ≤2MB     |
| Police Report             | File Upload    | PDF/JPG, ≤2MB     |
| Entry Point               | Dropdown/Text  | Optional          |
| Comments                  | Textarea       | Optional          |
| Declaration               | Checkbox       | Must be checked   |

#### 8.2.2. Rotator Permit Table

| Field Name                | Type           | Validation        |
|---------------------------|----------------|-------------------|
| Full Name                 | Text           | Required          |
| Gender                    | Dropdown       | Required          |
| Date of Birth             | Date           | Required          |
| Nationality               | Dropdown       | Required          |
| Passport/ID Number        | Text           | Required          |
| Passport/ID Expiry Date   | Date           | Required          |
| Photo                     | File Upload    | JPG/PNG, ≤2MB     |
| Position/Job Title        | Text           | Required          |
| Employer Name             | Text           | Required          |
| Employer Address          | Text           | Required          |
| Employment Status         | Dropdown       | Local/Expat       |
| Rotator Status            | Checkbox       | Must be checked   |
| Work Permit Number        | Text           | Required if Expat |
| Work Permit Expiry Date   | Date           | Required if Expat |
| Contract Upload           | File Upload    | PDF/JPG, ≤2MB     |
| Medical Certificate       | File Upload    | PDF/JPG, ≤2MB     |
| BOSIET Certificate        | File Upload    | PDF/JPG, ≤2MB     |
| Police Report             | File Upload    | PDF/JPG, ≤2MB     |
| Entry Point               | Dropdown/Text  | Optional          |
| Comments                  | Textarea       | Optional          |
| Declaration               | Checkbox       | Must be checked   |

---

### 8.3. Application Checklist Table (All Types)

| Doc Name                        | Required/Optional | Who Uploads | Validation |
|---------------------------------|-------------------|-------------|------------|
| Cover Letter                    | Required          | Admin       | PDF/JPG    |
| Application Form                | Required          | System      | Generated  |
| Certificate of Incorporation     | Required          | Admin       | PDF/JPG    |
| Cert. to Commence Business      | Required          | Admin       | PDF/JPG    |
| Audited Financial Reports       | Required          | Admin       | PDF/JPG    |
| Tax Clearance                   | Required*         | Admin       | PDF/JPG    |
| VAT Certificate                 | Required*         | Admin       | PDF/JPG    |
| SSNIT Clearance                 | Required*         | Admin       | PDF/JPG    |
| Company Regulations             | Required          | Admin       | PDF/JPG    |
| HSSE Policy                     | Required          | Admin       | PDF/JPG    |
| Regulatory Permits (EPA, etc)   | Conditional       | Admin       | PDF/JPG    |
| Personnel Docs (Medical, BOSIET, etc) | Required    | Admin       | PDF/JPG    |

*\* Not required for newly registered external companies*

---

## 9. Workflow Processes

### 9.1. Permit Application (Regular/Rotator)

1. **Applicant fills all fields, uploads docs**
2. **System runs validation checks** (block on errors, required fields, file types/sizes, expiry dates)
3. **Applicant reviews application summary and confirms declaration**
4. **Submit:** Status is "Submitted"
5. **PC Reviewer checks completeness; routes to relevant officers**
6. **Compliance/Immigration reviews for permit/expat/medical/BOSIET**
7. **Finance Officer checks if fees required (for new, renewal, etc.)**
8. **Decision:** Approve, Reject (with reason), or Return for correction
9. **If approved:** Permit generated as PDF; dashboard updated, applicant notified
10. **If returned:** Status set to "Returned"; applicant must correct and resubmit

---

### 9.2. Company/JV Registration

1. Applicant fills out company/JV registration form
2. Uploads all checklist documents
3. System validates equity %, category/activity selection
4. Submit; workflow proceeds through PC queues as above
5. Statuses and audit logs tracked at every step

---

### 9.3. Local Content Plan/Performance

1. Company fills out LC plan or performance form (with tables, appendices)
2. Uploads supporting docs (training, contracts, spend)
3. Local Content officer reviews, returns, or approves

---

## 10. Audit Logging

- All user actions (login, submit, review, approve, upload, etc.) recorded with timestamp, user, entity, action, and status
- Immutable logs for compliance review

---

## 11. Security & Compliance

- All sensitive data encrypted (at rest, in transit)
- Access control by user role and assigned queue
- Expiry reminders and compliance alerts via email/SMS
- Audit logs for all submissions and actions

---

## 12. Docker Dev Environment

- All services (backend, frontend, PostgreSQL, file storage) defined in `docker-compose.yml`
- Bind mounts/volumes for file uploads in local
- `.env` for secrets and service configuration
- SMTP or Mailhog container for email testing in dev
- Local file store; switch to S3 for production

---

## 13. Diagrams

### 13.1. Workflow

```plaintext
Applicant → [Form Entry + Upload] → [Validation] → [Submit]
  → [PC Reviewer] → [Compliance/Immigration/Finance/LC] → [Decision: Approve/Reject/Return]
  → [Permit Issued] → [Applicant Notified]
````

### 13.2. ERD

Company
  - id (PK)
  - legal_name
  - reg_number
  - TIN
  - address
  - contact_info
  - pc_permit_number
  - is_jv
  - local_equity_percent
  - logo_url
  - status

Personnel
  - id (PK)
  - company_id (FK)
  - full_name
  - dob
  - gender
  - nationality
  - id/passport_number
  - id_expiry
  - email
  - phone
  - position
  - employment_status
  - is_rotator
  - medical_cert_url
  - medical_cert_expiry
  - work_permit_url
  - work_permit_expiry
  - photo_url
  - status

Permit
  - id (PK)
  - company_id (FK)
  - personnel_id (FK, nullable)
  - type (company/personnel/rotator)
  - category (specialized/general)
  - activities (json)
  - start_date
  - end_date
  - status

JVCompany
  - id (PK)
  - non_indig_company_id (FK)
  - indig_company_id (FK)
  - equity_split
  - board_resolutions_url
  - tech_transfer_plan_url
  - status

LCPlan
  - id (PK)
  - company_id (FK)
  - year
  - employment_plan (json)
  - training_plan (json)
  - succession_plan (json)
  - RnD_plan (json)
  - tech_transfer (json)
  - insurance_plan (json)
  - legal_services (json)
  - financial_services (json)
  - indigenous_bank (json)
  - attachments (json)

LCPerformanceReport
  - id (PK)
  - company_id (FK)
  - year
  - localization (json)
  - supply_chain (json)
  - investments (json)
  - spend_breakdown (json)
  - contracts (json)
  - appendices (json)
  - declaration

Document
  - id (PK)
  - application_id (FK)
  - type
  - url
  - uploaded_by
  - upload_date
  - expiry_date
  - version

User
  - id (PK)
  - name
  - email
  - role (enum)
  - company_id (FK, nullable)
  - last_login

AuditLog
  - id (PK)
  - entity_type
  - entity_id
  - action
  - performed_by
  - timestamp
  - notes


---

## 14. Charts & Analytics

14. Charts & Analytics
These charts and stats are recommended for dashboards in the PC-OTS for real-time insights and monitoring:

Applications by Status/Category
Pie or bar chart showing counts of: Draft, Submitted, Under Review, Returned, Approved, Rejected, Payment Pending, Permit Issued, by category (Specialized, General, JV).

Permit Expiries
Timeline (Gantt or line chart) displaying upcoming permit expiries, highlighting those expiring soon or overdue.

Ghanaian vs. Expatriate Staff Ratio
Pie/bar chart showing proportion of Ghanaian to expatriate staff for each company and for sector aggregates.

Fees, Fines, and Outstanding Payments
Bar or line charts showing total fees invoiced, fees collected, fines imposed, outstanding payments, over selectable periods.

Compliance/Local Content Rates
Pie/bar chart indicating percentage of companies compliant with local content requirements, or meeting key employment/training targets.

Renewals and Late Submissions
Line/bar chart tracking number and rate of on-time versus late renewals per month/quarter.

Officer Workloads
Table or chart showing number of applications/permits assigned and processed per officer or department.

Audit & Activity Logs
Table of recent critical events and compliance actions, filterable by entity, officer, or status.

---

## 15. Answers to Key Questions

### Q1: What UI/UX features and workflow checks would best minimize application rejections and ensure data completeness?

* Multi-step forms with in-line validation and mandatory field enforcement
* Digital checklist with upload validation and file type/size checks
* Auto-block submission if mandatory fields or uploads are missing
* Conditional logic for expat/rotator fields
* Summary review screen before final submit
* Error messaging that directs user to specific missing items

---

### Q2: How should the system escalate compliance alerts or late renewal cases to the correct PC officer(s)?

* Automated status tracking flags late renewals or compliance issues
* Triggers dashboard badges and in-app/email/SMS alerts to responsible officer’s queue (Compliance, Local Content, or Reviewer)
* Escalation protocol if alert not acknowledged within set time (e.g., Supervisor or Admin notified)

---

### Q3: What are the ideal KPIs to monitor for ongoing regulatory effectiveness and system performance?

* % of applications submitted without errors or returns
* Avg. time from submission to approval
* Number and % of applications returned for correction
* On-time renewal/compliance report submission rates
* Ghanaian vs. expatriate staff ratios
* Total fees/fines collected vs. outstanding
* % of applications reviewed and decided within SLA

---

**End of SRS**

```

---

This file structure is ready for direct implementation and dev handoff. If you need the file in a downloadable format or want diagrams as image files, specify your preference.

**Q1**

What else should be included in the dev environment to make onboarding faster for new engineers?

  
**Q2**

How can automated testing be set up for every form and workflow in the Dockerized setup?


**Q3**

What data migration or import strategies would you recommend for onboarding legacy permit and personnel data into the new system?

```
