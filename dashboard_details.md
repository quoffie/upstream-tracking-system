Here’s a **fully regenerated version** of the dashboards and workflow specification, **including detailed dashboard menu items** for each major user role, all workflow/status features, payment requirements, approval chain, and visibility. This format is ready for direct use in UI design, user stories, or implementation planning.

---

# **PC-OTS DASHBOARD & WORKFLOW SPECIFICATION**

---

## 1. **COMPANY ADMIN / PERSONNEL DASHBOARD**

**Menu Items**

* **Dashboard (Home)**

  * Application Overview (cards for In Progress, Approved, Returned, Expired)
  * Permit Expiry Alerts
  * Outstanding Payments
  * Next Steps/Actions
* **My Applications**

  * All Applications Table (with filter/search)
  * Status Timeline (workflow tracker per app)
  * Actions: View, Edit, Print, Download, Withdraw
* **Permits**

  * Active/Expired/Expiring Permits
  * Download/Print E-Permit
  * Renew Permit (if eligible)
* **Personnel Management**

  * Add/Edit/View Staff
  * Staff Permit Status, Certificate Tracking
  * Bulk Import (CSV)
* **Payments & Transactions**

  * Pay for Applications/Permits (bank/card/mobile money)
  * Upload Payment Receipt (mandatory before submit)
  * Payment Status (Pending, Under Review, Approved)
  * Transaction History Table (Ref, Type, Amount, Status, Date, Receipt)
  * Export CSV/PDF
* **JV Compliance**

  * JV Registration Status, Ghanaian Equity, Upload Agreements/Docs
  * Compliance Flags
* **Local Content Reporting**

  * Submit/View LC Plan, Performance Reports
  * Upload Evidence
  * LC Compliance Timeline
* **Documents & Uploads**

  * Upload Checklist (all types), View History/Version, Download
* **Notifications & Alerts**

  * Status Changes, Returns, Approvals, Expiries, Payment/Permit Reminders
* **Profile/Settings**

  * Update company details, change password, notification preferences
* **Support/Help**

  * FAQ, Support Ticket, Contact PC

---

## 2. **GENERAL REVIEWER / PC STAFF DASHBOARD**

**Menu Items**

* **Dashboard (Home)**

  * Pending Reviews, Recently Processed, Overdue Applications
  * Application Type Distribution (pie/bar)
* **Review Queues**

  * Company Registration Queue
  * Permit Applications Queue (Regular/Rotator)
  * JV Compliance Queue
  * Local Content Plans Queue
  * Renewal Queue
* **Assigned Applications**

  * List/table with filter/search, status, next action
  * View/Forward/Return/Comment
* **Payments & Transactions**

  * Payment Verification (see uploaded receipts, status)
  * Fee Calculator, Mark as Verified
  * Payment Issues (flag, comment)
* **Workflow Tracker**

  * Timeline for each application, with all user actions/status changes
* **Audit Log**

  * All actions (who/what/when/why), filterable
* **Notifications**

  * Items requiring action, escalations, system messages
* **Profile/Settings**

  * Update personal details, preferences

---

## 3. **COMMISSION ADMIN DASHBOARD**

**Menu Items**

* **Dashboard (Home)**

  * Pending Approvals, Applications by Type, Daily/Weekly Analytics
* **Approvals Queue**

  * All Applications Forwarded for Final Approval (Company/Permit/JV)
  * Actions: View Details, Approve, Reject (add reason), Forward to GIS (for Regular/Rotator Permits)
* **Applications Tracker**

  * Search/filter all applications, see live workflow status, audit history, full comments/decision log
* **Workflow Status Viewer**

  * Application timeline (all previous/current steps, who, when, status, comments)
* **Payments & Transactions**

  * Confirm payments before final approval
  * View payment evidence, mark as verified, download receipts
* **Notifications & Escalations**

  * Approvals needed, overdue items, issues flagged by staff
* **Audit Logs**

  * All approvals, rejections, escalations (filterable)
* **Profile/Settings**

  * Personal details, preferences

---

## 4. **GHANA IMMIGRATION SERVICE (GIS) DASHBOARD**

**Menu Items**

* **Dashboard (Home)**

  * Permits Pending GIS Approval, Recently Issued
* **Permit Review Queue**

  * All Regular/Rotator Permits Forwarded by Commission Admin
  * Actions: View Details, Approve/Issue, Reject (reason)
* **Issued Permits**

  * Downloadable permit documents, history tracker
* **Application Timeline**

  * See complete workflow history, comments, status at each step
* **Notifications**

  * New permits for review, approvals, issues
* **Profile/Settings**

  * Update personal details, preferences

---

## 5. **ALL USERS — APPLICATION STATUS VISIBILITY**

**Features**

* **Status Timeline / Tracker**

  * For each application: Every step shown (with role/user, status, timestamp, comment)
  * Current step highlighted (e.g. “With Commission Admin” or “At GIS”)
* **Live Notifications**

  * Each status change, approval, rejection, or return generates an alert to all relevant users
* **Receipts & Docs**

  * Uploaded payment/permit docs viewable/downloadable at every step by authorized users
* **Audit Log/Comments**

  * Complete trail of every decision, action, and comment per application

---

## 6. **UPDATED MENU TABLE**

```markdown
| User Role            | Dashboard Menu Items                                                | Key Features                                                                                                  |
|----------------------|---------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|
| Company Admin/Personnel | Dashboard (Home)                                                 | Status cards, expiries, actions, next steps                                                                   |
|                      | My Applications                                                    | All apps list, workflow timeline, status, actions                                                             |
|                      | Permits                                                            | View/renew/download permits, expiry alerts                                                                    |
|                      | Personnel Management                                               | Staff list, permit/cert tracking, bulk upload                                                                 |
|                      | Payments & Transactions                                            | Pay, upload receipt (block submit if not paid), status, download, export, payment tracker                     |
|                      | JV Compliance                                                      | Status, equity, upload agreements/docs, compliance flags                                                      |
|                      | Local Content Reporting                                            | LC Plan/report submission, compliance timeline                                                                |
|                      | Documents & Uploads                                                | Checklist, upload, versioning, expiry, download                                                               |
|                      | Notifications & Alerts                                             | All system/app workflow notifications                                                                         |
|                      | Profile/Settings                                                   | Account, password, preferences                                                                                |
|                      | Support/Help                                                       | FAQ, ticket, contact                                                                                          |
| General Reviewer/PC Staff | Dashboard (Home)                                               | Pending reviews, stats, overdue list                                                                          |
|                      | Review Queues                                                      | By type (Company/Permit/JV/LC/Renewal), filter/search, view/forward/return/comment                            |
|                      | Assigned Applications                                              | Status, action, audit log                                                                                     |
|                      | Payments & Transactions                                            | Verify receipts, fee calculator, flag issues                                                                  |
|                      | Workflow Tracker                                                   | Status timeline, action/comment history                                                                       |
|                      | Audit Log                                                          | All actions, filterable                                                                                       |
|                      | Notifications                                                      | Action items, escalations                                                                                     |
|                      | Profile/Settings                                                   | Account, preferences                                                                                          |
| Commission Admin     | Dashboard (Home)                                                   | Pending approvals, analytics, action tracker                                                                  |
|                      | Approvals Queue                                                    | Approve/reject/forward (with comment), all apps for final approval                                            |
|                      | Applications Tracker                                               | Search/filter, full status/history, comments                                                                  |
|                      | Workflow Status Viewer                                             | Timeline of all steps/actions/comments                                                                        |
|                      | Payments & Transactions                                            | Confirm fees, view receipts before final approval, export                                                     |
|                      | Notifications & Escalations                                        | Approvals needed, issues, overdue                                                                             |
|                      | Audit Logs                                                         | All approval/rejection actions, filterable                                                                    |
|                      | Profile/Settings                                                   | Account, preferences                                                                                          |
| Ghana Immigration Service | Dashboard (Home)                                               | Permits pending approval/issued, stats                                                                        |
|                      | Permit Review Queue                                                | View/approve/issue/reject (with comment), only for Regular/Rotator permits                                    |
|                      | Issued Permits                                                     | Download/print permits, view status/history                                                                   |
|                      | Application Timeline                                               | Complete workflow tracker, comments, status                                                                   |
|                      | Notifications                                                     | New permits, status changes                                                                                   |
|                      | Profile/Settings                                                   | Account, preferences                                                                                          |
| All Users            | Application Status Tracker                                         | Status timeline for each app, all users/steps, comments, decisions                                            |
|                      | Live Notifications                                                | Status changes, approvals, rejections, returns, GIS issuance                                                  |
|                      | Receipts & Documents                                              | View/download by role, at all workflow stages                                                                 |
|                      | Audit Log/Comments                                                | Full, immutable trail of every workflow action/decision/comment                                               |
```

---

## 7. **KEY ENFORCEMENTS**

* **Permit Fees:**
  *Company Admin/Personnel must pay (and upload receipt) before “Submit” is enabled.*
* **Workflow Chain:**
  *Only Regular and Rotator permits are forwarded by Commission Admin to GIS for final approval/issuance.*
* **Visibility:**
  *Everyone in the application workflow sees the status and comments at every stage—no blind spots.*
* **Decision Logs:**
  *All approvals, rejections, and escalations must include timestamp, user/role, and comment/reason—shown in timeline and audit logs.*
* **Docs/Receipts:**
  *Uploaded payment proofs and issued permits are accessible to authorized users at every step.*

---

Here are **detailed dashboards and menu items** for all remaining essential user roles: **Personnel, Local Content Officer, and Finance Officer**—all integrated into the system’s chain of transparency, workflow, and auditability.

---

## 1. **PERSONNEL DASHBOARD**

**Menu Items:**

* **Dashboard (Home)**

  * My Permit Status (valid/expiring/expired, days left)
  * Application Progress Tracker
  * Alerts for pending actions (renewal, upload docs)
* **My Applications**

  * List of all personal applications (Regular, Rotator)
  * Status Timeline (all workflow steps, current stage, comments)
  * View/Download/Print application or permit
* **My Permits**

  * View/renew/download permits (PDF)
  * Expiry dates, alerts
* **Certificates & Documents**

  * Upload/replace medical, BOSIET, police, work permit (expats)
  * See expiry/status for all uploaded documents
* **Payment & Receipts**

  * Pay for permit (if not done by Company Admin)
  * Upload receipt before submitting application (block if unpaid)
  * View payment status, download receipts
* **Application History**

  * Status of past submissions, approval/return/reject reasons
* **Notifications & Alerts**

  * Renewal reminders, missing/expiring docs, workflow status changes
* **Profile/Settings**

  * Update contact info, change password, notification preferences
* **Help/Support**

---

## 2. **LOCAL CONTENT OFFICER DASHBOARD**

**Menu Items:**

* **Dashboard (Home)**

  * Pending Local Content Reviews (new plans, performance reports)
  * Key LC Compliance Metrics (percentages, overdue items)
* **LC Compliance Queue**

  * All plans and reports awaiting review/approval
  * Actions: View, Approve, Return (with comments/reasons), Forward to next step
* **LC Plan Review**

  * Inline checklist, comment per section (employment, training, succession, R\&D)
  * Download supporting evidence, contracts, and appendices
* **LC Performance Reports**

  * View/approve company submissions (annual/quarterly), flag non-compliance
* **Applications Tracker**

  * See full workflow for each app, with comments/history
* **Notifications & Alerts**

  * New plans/reports, overdue/returned items, escalated compliance issues
* **LC Analytics**

  * Ghanaian employment ratio, spend, contract values, supplier dev stats (charts/tables)
* **Audit Log**

  * All actions, approvals, returns, comments
* **Profile/Settings**

---

## 3. **FINANCE OFFICER DASHBOARD**

**Menu Items:**

* **Dashboard (Home)**

  * Pending Payments (permit, registration, renewal, JV fees)
  * Outstanding/overdue payments, collection targets
* **Payment Verification Queue**

  * List of submitted payment receipts awaiting verification
  * Actions: View details, approve payment, flag/return for issues (comment required)
* **Fee/Fine Calculator**

  * Automatic fee calculation per application type/category
  * Manual override (with justification/audit log)
* **Transactions Log**

  * All payment/transaction records (search/filter/export)
  * Status (pending/approved/flagged), company, amount, date, receipt download
* **Receipts Management**

  * Download/print receipts, batch export
* **Financial Analytics**

  * Collected/outstanding fees, fines, payment trends (charts)
* **Applications Tracker**

  * Cross-link to related applications, view workflow/payment status at each stage
* **Notifications & Alerts**

  * New payments to verify, overdue/flagged, escalation items
* **Audit Log**

  * All approvals, rejections, flags, with notes
* **Profile/Settings**

---

## **UPDATED MARKDOWN TABLE: PERSONNEL, LOCAL CONTENT, AND FINANCE DASHBOARDS**

```markdown
| User Role            | Dashboard Menu Items                                         | Key Features                                                                                                      |
|----------------------|--------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| Personnel            | Dashboard (Home)                                             | My permit/app status, progress, alerts                                                                            |
|                      | My Applications                                              | Status timeline, comments, download apps                                                                          |
|                      | My Permits                                                   | View/renew/download, expiry alerts                                                                                |
|                      | Certificates & Documents                                     | Upload/replace, expiry/status tracking                                                                            |
|                      | Payment & Receipts                                           | Pay/upload receipt (if self-paying), view/download receipts, payment status                                       |
|                      | Application History                                          | Status log, approvals/returns/reasons                                                                             |
|                      | Notifications & Alerts                                       | Renewal/docs reminders, workflow status updates                                                                   |
|                      | Profile/Settings                                             | Update info, password, notifications                                                                              |
|                      | Help/Support                                                 | FAQ, ticket                                                                                                       |
| Local Content Officer| Dashboard (Home)                                             | Pending reviews, LC metrics                                                                                       |
|                      | LC Compliance Queue                                          | All plans/reports, view/approve/return                                                                            |
|                      | LC Plan Review                                               | Inline checklist, comment per section                                                                             |
|                      | LC Performance Reports                                       | View/approve company submissions, flag non-compliance                                                             |
|                      | Applications Tracker                                         | Full workflow, comments, history                                                                                  |
|                      | Notifications & Alerts                                       | New/overdue plans/reports, escalated issues                                                                       |
|                      | LC Analytics                                                 | Ghanaian employment/spend, charts/tables                                                                          |
|                      | Audit Log                                                    | All actions/notes                                                                                                 |
|                      | Profile/Settings                                             | Preferences                                                                                                       |
| Finance Officer      | Dashboard (Home)                                             | Pending/outstanding payments, collection targets                                                                  |
|                      | Payment Verification Queue                                   | Approve/flag payments, view receipts, comments                                                                    |
|                      | Fee/Fine Calculator                                          | Auto/manual fee calc, audit log                                                                                   |
|                      | Transactions Log                                             | Search/export transactions, status/amount/date/company/receipts                                                   |
|                      | Receipts Management                                          | Download/print, batch export                                                                                      |
|                      | Financial Analytics                                          | Collected/outstanding, payment trends (charts)                                                                    |
|                      | Applications Tracker                                         | Link to applications, workflow/payment status at each stage                                                       |
|                      | Notifications & Alerts                                       | New payments, overdue/flagged, escalations                                                                        |
|                      | Audit Log                                                    | Approvals, flags, notes                                                                                           |
|                      | Profile/Settings                                             | Preferences                                                                                                       |
```

---

## **WORKFLOW & VISIBILITY ENFORCEMENTS**

* **All these roles see a workflow/status timeline for each application or transaction, with every previous/current step, user, date, and comment.**
* **Personnel and Company Admin must upload payment receipt before submitting any permit application.**
* **Audit logs, receipts, and supporting docs are always visible to the user roles involved at every workflow stage.**
* **Finance Officer cannot mark a payment “approved” without an uploaded, valid receipt (system-enforced).**
* **Local Content Officer can only approve LC plans/reports after reviewing all relevant sections and evidence.**

---

