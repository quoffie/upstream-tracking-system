-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'COMPANY_ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER', 'JV_COORDINATOR', 'PERSONNEL', 'FINANCE_OFFICER');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'REQUIRES_ADDITIONAL_INFO', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PermitType" AS ENUM ('EXPLORATION', 'PRODUCTION', 'PERSONNEL', 'INSTALLATION', 'ENVIRONMENTAL');

-- CreateEnum
CREATE TYPE "CompanyCategory" AS ENUM ('SPECIALIZED', 'GENERAL');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('IN_APP', 'EMAIL', 'SMS');

-- CreateEnum
CREATE TYPE "CompanyRegistrationStatus" AS ENUM ('PENDING_EMAIL_VERIFICATION', 'PENDING_FORM_COMPLETION', 'PENDING_PAYMENT', 'SUBMITTED_FOR_REVIEW', 'REQUIRES_CLARIFICATION', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "phone" TEXT,
    "profilePicture" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastLogin" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyRegistration" (
    "id" TEXT NOT NULL,
    "status" "CompanyRegistrationStatus" NOT NULL DEFAULT 'PENDING_EMAIL_VERIFICATION',
    "companyName" TEXT NOT NULL,
    "incorporationDate" TIMESTAMP(3) NOT NULL,
    "incorporationPlace" TEXT NOT NULL,
    "postalAddress" TEXT NOT NULL,
    "companyEmail" TEXT NOT NULL,
    "website" TEXT,
    "contactPersonName" TEXT NOT NULL,
    "contactPersonMobile" TEXT NOT NULL,
    "subsidiaryOrAffiliateName" TEXT,
    "parentCompanyNationality" TEXT,
    "corporateStructureDetails" JSONB,
    "shareholders" JSONB NOT NULL,
    "holdingCompanyShareholders" JSONB,
    "directorsAndManagement" JSONB NOT NULL,
    "permitCategory" "CompanyCategory" NOT NULL,
    "preferredActivities" TEXT[],
    "activityDescription" TEXT NOT NULL,
    "financialCapabilityInfo" JSONB NOT NULL,
    "fundingSourcesGhana" TEXT NOT NULL,
    "organizationalChartPath" TEXT,
    "staffDetails" JSONB NOT NULL,
    "expertiseSourcing" TEXT NOT NULL,
    "equipmentSources" TEXT NOT NULL,
    "pastPetroleumExperience" TEXT,
    "globalOperations" TEXT,
    "ghanaContractsAndInvestments" TEXT,
    "threeYearPlanOrgDev" JSONB NOT NULL,
    "threeYearPlanTechTransfer" JSONB NOT NULL,
    "threeYearPlanTraining" JSONB NOT NULL,
    "threeYearPlanCSR" JSONB NOT NULL,
    "ghanaianOwnershipPercentage" DOUBLE PRECISION,
    "employmentDetailsLocalContent" TEXT,
    "infrastructuralInvestmentsGhana" DOUBLE PRECISION,
    "servicesToApplicantLast12Months" JSONB,
    "servicesByApplicantLast12Months" JSONB,
    "rawMaterialsUtilized" TEXT,
    "ghanaianFinishedGoodsUtilized" TEXT,
    "hssePolicyDocPath" TEXT,
    "miscellaneousInfo" TEXT,
    "declarationName" TEXT NOT NULL,
    "declarationPosition" TEXT NOT NULL,
    "declarationDate" TIMESTAMP(3) NOT NULL,
    "adminReviewComments" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "approvedCompanyId" TEXT,

    CONSTRAINT "CompanyRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "incorporationDate" TIMESTAMP(3) NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "website" TEXT,
    "category" "CompanyCategory" NOT NULL,
    "specialization" TEXT[],
    "isIndigenous" BOOLEAN NOT NULL DEFAULT false,
    "indigenousOwnershipPct" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JVCompany" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "indigenousEquity" DOUBLE PRECISION NOT NULL,
    "foreignEquity" DOUBLE PRECISION NOT NULL,
    "boardResolutionDoc" TEXT,
    "equityAgreementDoc" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "JVCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personnel" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "isExpatriate" BOOLEAN NOT NULL DEFAULT false,
    "passportNumber" TEXT,
    "workPermitNumber" TEXT,
    "workPermitExpiry" TIMESTAMP(3),
    "medicalCertExpiry" TIMESTAMP(3),
    "bosietCertExpiry" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Personnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permit" (
    "id" TEXT NOT NULL,
    "permitNumber" TEXT NOT NULL,
    "permitType" "PermitType" NOT NULL,
    "applicationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "issueDate" TIMESTAMP(3),
    "expiryDate" TIMESTAMP(3),
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "projectName" TEXT,
    "projectDescription" TEXT,
    "localContentPlan" TEXT,
    "rejectionReason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "Permit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LCPlan" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "trainingBudget" DOUBLE PRECISION NOT NULL,
    "localEmploymentTarget" DOUBLE PRECISION NOT NULL,
    "localProcurementTarget" DOUBLE PRECISION NOT NULL,
    "successionPlanDoc" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "LCPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LCPerformanceReport" (
    "id" TEXT NOT NULL,
    "reportingPeriod" TEXT NOT NULL,
    "actualTrainingSpend" DOUBLE PRECISION NOT NULL,
    "actualLocalEmployment" DOUBLE PRECISION NOT NULL,
    "actualLocalProcurement" DOUBLE PRECISION NOT NULL,
    "challenges" TEXT,
    "mitigationMeasures" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "LCPerformanceReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "description" TEXT,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "companyId" TEXT,
    "companyRegistrationId" TEXT,
    "personnelId" TEXT,
    "permitId" TEXT,
    "jvCompanyId" TEXT,
    "lcPlanId" TEXT,
    "lcReportId" TEXT,
    "inspectionId" TEXT,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "sentById" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'GHS',
    "paymentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentReference" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyRegistrationId" TEXT,
    "permitId" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inspection" (
    "id" TEXT NOT NULL,
    "inspectionDate" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "inspectionType" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "findings" TEXT,
    "recommendations" TEXT,
    "followUpRequired" BOOLEAN NOT NULL DEFAULT false,
    "followUpDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyRegistrationId" TEXT,
    "permitId" TEXT NOT NULL,

    CONSTRAINT "Inspection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "oldValues" JSONB,
    "newValues" JSONB,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PersonnelPermits" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRegistration_userId_key" ON "CompanyRegistration"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyRegistration_approvedCompanyId_key" ON "CompanyRegistration"("approvedCompanyId");

-- CreateIndex
CREATE UNIQUE INDEX "Company_registrationNumber_key" ON "Company"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "JVCompany_registrationNumber_key" ON "JVCompany"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Personnel_email_key" ON "Personnel"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Personnel_userId_key" ON "Personnel"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Permit_permitNumber_key" ON "Permit"("permitNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_paymentReference_key" ON "Payment"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_companyRegistrationId_key" ON "Payment"("companyRegistrationId");

-- CreateIndex
CREATE UNIQUE INDEX "_PersonnelPermits_AB_unique" ON "_PersonnelPermits"("A", "B");

-- CreateIndex
CREATE INDEX "_PersonnelPermits_B_index" ON "_PersonnelPermits"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRegistration" ADD CONSTRAINT "CompanyRegistration_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyRegistration" ADD CONSTRAINT "CompanyRegistration_approvedCompanyId_fkey" FOREIGN KEY ("approvedCompanyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JVCompany" ADD CONSTRAINT "JVCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Permit" ADD CONSTRAINT "Permit_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LCPlan" ADD CONSTRAINT "LCPlan_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LCPerformanceReport" ADD CONSTRAINT "LCPerformanceReport_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_companyRegistrationId_fkey" FOREIGN KEY ("companyRegistrationId") REFERENCES "CompanyRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_personnelId_fkey" FOREIGN KEY ("personnelId") REFERENCES "Personnel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "Permit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_jvCompanyId_fkey" FOREIGN KEY ("jvCompanyId") REFERENCES "JVCompany"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lcPlanId_fkey" FOREIGN KEY ("lcPlanId") REFERENCES "LCPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_lcReportId_fkey" FOREIGN KEY ("lcReportId") REFERENCES "LCPerformanceReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_inspectionId_fkey" FOREIGN KEY ("inspectionId") REFERENCES "Inspection"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_companyRegistrationId_fkey" FOREIGN KEY ("companyRegistrationId") REFERENCES "CompanyRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "Permit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_companyRegistrationId_fkey" FOREIGN KEY ("companyRegistrationId") REFERENCES "CompanyRegistration"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inspection" ADD CONSTRAINT "Inspection_permitId_fkey" FOREIGN KEY ("permitId") REFERENCES "Permit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonnelPermits" ADD CONSTRAINT "_PersonnelPermits_A_fkey" FOREIGN KEY ("A") REFERENCES "Permit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PersonnelPermits" ADD CONSTRAINT "_PersonnelPermits_B_fkey" FOREIGN KEY ("B") REFERENCES "Personnel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
