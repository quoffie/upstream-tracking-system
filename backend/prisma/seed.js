const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');
  
  // Clear existing data
  await clearDatabase();
  
  // Create all user types
  console.log('Creating users...');
  
  // Create a simple test user first
  const hashedPassword = await bcrypt.hash('test123', 10);
  const testUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      firstName: 'Test',
      lastName: 'User',
      role: 'ADMIN'
    }
  });
  
  // Create all other user types
  const adminUser = await createAdminUser();
  const commissionAdminUser = await createCommissionAdminUser();
  const reviewerUser = await createReviewerUser();
  const immigrationOfficerUser = await createImmigrationOfficerUser();
  const localContentOfficerUser = await createLocalContentOfficerUser();
  const financeOfficerUser = await createFinanceOfficerUser();
  const complianceOfficerUser = await createComplianceOfficerUser();
  const jvCoordinatorUser = await createJVCoordinatorUser();
  
  // Create company admin users
  const companyAdmin1 = await createCompanyAdminUser('company-admin@acme.com', 'Company@123', 'Acme', 'Manager');
  const companyAdmin2 = await createCompanyAdminUser('company-admin@global.com', 'Company@123', 'Global', 'Manager');
  const companyAdmin3 = await createCompanyAdminUser('company-admin@tech.com', 'Company@123', 'Tech', 'Manager');
  
  // Create personnel user
  const personnelUser = await createPersonnelUser();
  
  console.log('\n✅ Database seeding completed successfully!');
  console.log('\n📋 Demo User Credentials:');
  console.log('Test User: test@example.com / test123');
  console.log('System Admin: admin@pc-ghana.gov.gh / Admin@123');
  console.log('Commission Admin: commission-admin@pc-ghana.gov.gh / Commission@123');
  console.log('Company Admin (Acme): company-admin@acme.com / Company@123');
  console.log('Company Admin (Global): company-admin@global.com / Company@123');
  console.log('Company Admin (Tech): company-admin@tech.com / Company@123');
  console.log('Reviewer: reviewer@pc-ghana.gov.gh / Reviewer@123');
  console.log('Immigration Officer: officer@immigration.gov.gh / Immigration@123');
  console.log('Personnel: personnel@acmeoil.com / Personnel@123');
  console.log('Local Content Officer: lc-officer@pc-ghana.gov.gh / LocalContent@123');
  console.log('Finance Officer: finance@pc-ghana.gov.gh / Finance@123');
  console.log('Compliance Officer: compliance@pc-ghana.gov.gh / Compliance@123');
  console.log('JV Coordinator: jv-coordinator@pc-ghana.gov.gh / JVCoord@123');
}

async function clearDatabase() {
  try {
    console.log('Clearing existing data...');
    
    // Only clear the users table since that's what exists
    await prisma.user.deleteMany({});
    
    console.log('Database cleared successfully');
  } catch (error) {
    console.log('Error clearing database:', error.message);
    console.log('Continuing with seed...');
  }
}

async function createCompany(name, regNumber, category) {
  return await prisma.company.create({
    data: {
      name,
      registrationNumber: regNumber,
      incorporationDate: new Date('2020-01-01'),
      address: '123 Energy Avenue, Accra, Ghana',
      email: `info@${name.toLowerCase().replace(/\s+/g, '')}.com`,
      phone: '+233 20 123 4567',
      website: `https://www.${name.toLowerCase().replace(/\s+/g, '')}.com`,
      category,
      specialization: category === 'SPECIALIZED' ? ['Drilling', 'Exploration'] : ['Support Services', 'Logistics'],
      isIndigenous: Math.random() > 0.5,
      indigenousOwnershipPct: Math.random() > 0.5 ? 51 + Math.floor(Math.random() * 49) : null,
    },
  });
}

async function createAdminUser() {
  const hashedPassword = await bcrypt.hash('Admin@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'admin@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'System',
      lastName: 'Administrator',
      role: 'ADMIN',
    },
  });
}

// Company admin users will be created after companies table is available

async function createReviewerUser() {
  const hashedPassword = await bcrypt.hash('Reviewer@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'reviewer@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'General',
      lastName: 'Reviewer',
      role: 'COMPLIANCE_OFFICER',
    },
  });
}

async function createImmigrationOfficerUser() {
  const hashedPassword = await bcrypt.hash('Immigration@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'officer@immigration.gov.gh',
      password: hashedPassword,
      firstName: 'Immigration',
      lastName: 'Officer',
      role: 'IMMIGRATION_OFFICER',
    },
  });
}

// Personnel users will be created after companies and personnel tables are available

async function createLocalContentOfficerUser() {
  const hashedPassword = await bcrypt.hash('LocalContent@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'lc-officer@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'Local Content',
      lastName: 'Officer',
      role: 'COMPLIANCE_OFFICER',
    },
  });
}

async function createFinanceOfficerUser() {
  const hashedPassword = await bcrypt.hash('Finance@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'finance@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'Finance',
      lastName: 'Officer',
      role: 'FINANCE_OFFICER',
    },
  });
}

async function createComplianceOfficerUser() {
  const hashedPassword = await bcrypt.hash('Compliance@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'compliance@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'Compliance',
      lastName: 'Officer',
      role: 'COMPLIANCE_OFFICER',
    },
  });
}

async function createJVCoordinatorUser() {
  const hashedPassword = await bcrypt.hash('JVCoord@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'jv-coordinator@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'JV',
      lastName: 'Coordinator',
      role: 'JV_COORDINATOR',
    },
  });
}

async function createCommissionAdminUser() {
  const hashedPassword = await bcrypt.hash('Commission@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'commission-admin@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'Commission',
      lastName: 'Administrator',
      role: 'COMMISSION_ADMIN',
    },
  });
}

async function createCompanyAdminUser(email, password, firstName, lastName) {
  const hashedPassword = await bcrypt.hash(password, 12);
  
  return await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role: 'COMPANY_ADMIN',
    },
  });
}

async function createPersonnelUser() {
  const hashedPassword = await bcrypt.hash('Personnel@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'personnel@acmeoil.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Engineer',
      role: 'PERSONNEL',
    },
  });
}

async function createInspectorUser() {
  const hashedPassword = await bcrypt.hash('Inspector@123', 12);
  
  return await prisma.user.create({
    data: {
      email: 'inspector@pc-ghana.gov.gh',
      password: hashedPassword,
      firstName: 'Field',
      lastName: 'Inspector',
      role: 'INSPECTOR',
    },
  });
}

async function createAdditionalPersonnel(companies) {
  const personnelData = [
    {
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@acmeoil.com',
      phone: '+233 20 111 2222',
      nationality: 'American',
      position: 'Geologist',
      isExpatriate: true,
      companyId: companies[0].id,
    },
    {
      firstName: 'Kwame',
      lastName: 'Asante',
      email: 'kwame.asante@acmeoil.com',
      phone: '+233 20 333 4444',
      nationality: 'Ghanaian',
      position: 'Safety Officer',
      isExpatriate: false,
      companyId: companies[0].id,
    },
    {
      firstName: 'Maria',
      lastName: 'Rodriguez',
      email: 'maria.rodriguez@globalenergy.com',
      phone: '+233 20 555 6666',
      nationality: 'Spanish',
      position: 'Project Manager',
      isExpatriate: true,
      companyId: companies[1].id,
    },
    {
      firstName: 'Ama',
      lastName: 'Osei',
      email: 'ama.osei@globalenergy.com',
      phone: '+233 20 777 8888',
      nationality: 'Ghanaian',
      position: 'Environmental Specialist',
      isExpatriate: false,
      companyId: companies[1].id,
    },
    {
      firstName: 'David',
      lastName: 'Chen',
      email: 'david.chen@techdrill.com',
      phone: '+233 20 999 0000',
      nationality: 'Chinese',
      position: 'Technical Director',
      isExpatriate: true,
      companyId: companies[2].id,
    },
  ];

  for (const person of personnelData) {
    await prisma.personnel.create({
      data: person,
    });
  }
}

async function createJVCompanies(companies) {
  const jvData = [
    {
      name: 'Acme-Global Joint Venture',
      registrationNumber: 'JV-2024-001',
      description: 'Joint venture for offshore drilling operations',
      equityPercentage: 60.0,
      localContentCommitment: 45.0,
      status: 'ACTIVE',
      companyId: companies[0].id,
    },
    {
      name: 'Global-Tech Partnership',
      registrationNumber: 'JV-2024-002',
      description: 'Technology sharing partnership for enhanced drilling',
      equityPercentage: 55.0,
      localContentCommitment: 40.0,
      status: 'PENDING',
      companyId: companies[1].id,
    },
  ];

  const jvCompanies = [];
  for (const jv of jvData) {
    const jvCompany = await prisma.jVCompany.create({
      data: jv,
    });
    jvCompanies.push(jvCompany);
  }
  return jvCompanies;
}

async function createCompanyRegistrations() {
  const registrations = [
    {
      companyName: 'New Horizon Energy',
      registrationNumber: 'REG-2024-001',
      businessType: 'Oil & Gas Exploration',
      incorporationDate: new Date('2024-01-15'),
      registeredAddress: '123 Independence Avenue, Accra',
      contactEmail: 'info@newhorizon.com',
      contactPhone: '+233 30 123 4567',
      authorizedCapital: 5000000.00,
      paidUpCapital: 2500000.00,
      status: 'PENDING',
    },
    {
      companyName: 'Atlantic Drilling Corp',
      registrationNumber: 'REG-2024-002',
      businessType: 'Drilling Services',
      incorporationDate: new Date('2024-02-20'),
      registeredAddress: '456 Liberation Road, Tema',
      contactEmail: 'contact@atlanticdrilling.com',
      contactPhone: '+233 30 987 6543',
      authorizedCapital: 3000000.00,
      paidUpCapital: 1500000.00,
      status: 'APPROVED',
    },
  ];

  for (const reg of registrations) {
    await prisma.companyRegistration.create({
      data: reg,
    });
  }
}

async function createPermits(companies) {
  const permits = [
    {
      permitNumber: 'PERM-2024-001',
      permitType: 'EXPLORATION',
      title: 'Offshore Block A Exploration',
      description: 'Exploration permit for offshore block A covering 2000 sq km',
      applicationDate: new Date('2024-01-10'),
      approvalDate: new Date('2024-02-15'),
      expiryDate: new Date('2026-02-15'),
      status: 'APPROVED',
      companyId: companies[0].id,
    },
    {
      permitNumber: 'PERM-2024-002',
      permitType: 'PRODUCTION',
      title: 'Jubilee Field Production',
      description: 'Production permit for Jubilee oil field',
      applicationDate: new Date('2024-02-01'),
      approvalDate: null,
      expiryDate: new Date('2029-02-01'),
      status: 'PENDING',
      companyId: companies[1].id,
    },
    {
      permitNumber: 'PERM-2024-003',
      permitType: 'DEVELOPMENT',
      title: 'TEN Field Development',
      description: 'Development permit for TEN oil field infrastructure',
      applicationDate: new Date('2024-03-01'),
      approvalDate: new Date('2024-04-10'),
      expiryDate: new Date('2027-04-10'),
      status: 'APPROVED',
      companyId: companies[2].id,
    },
  ];

  const createdPermits = [];
  for (const permit of permits) {
    const createdPermit = await prisma.permit.create({
      data: permit,
    });
    createdPermits.push(createdPermit);
  }
  return createdPermits;
}

async function createLocalContentPlans(companies) {
  const plans = [
    {
      title: 'Acme Local Content Plan 2024',
      description: 'Comprehensive local content development plan for offshore operations',
      targetLocalContent: 45.0,
      employmentTargets: 150,
      trainingPrograms: 'Technical training for 50 local engineers',
      procurementTargets: 'Source 60% of non-technical services locally',
      technologyTransfer: 'Establish local R&D center',
      status: 'APPROVED',
      submissionDate: new Date('2024-01-20'),
      approvalDate: new Date('2024-02-25'),
      companyId: companies[0].id,
    },
    {
      title: 'Global Energy Local Content Strategy',
      description: 'Strategic plan for maximizing local participation',
      targetLocalContent: 40.0,
      employmentTargets: 120,
      trainingPrograms: 'Skills development for 40 technicians',
      procurementTargets: 'Local sourcing of 55% support services',
      technologyTransfer: 'Knowledge transfer partnerships with universities',
      status: 'PENDING',
      submissionDate: new Date('2024-03-01'),
      approvalDate: null,
      companyId: companies[1].id,
    },
  ];

  for (const plan of plans) {
    await prisma.lCPlan.create({
      data: plan,
    });
  }
}

async function createPerformanceReports(companies) {
  const reports = [
    {
      reportingPeriod: 'Q1 2024',
      actualLocalContent: 42.5,
      employmentNumbers: 145,
      trainingCompleted: 'Completed training for 48 engineers',
      procurementAchieved: 'Achieved 58% local procurement',
      challenges: 'Limited availability of specialized local suppliers',
      recommendations: 'Develop supplier development program',
      submissionDate: new Date('2024-04-15'),
      companyId: companies[0].id,
    },
    {
      reportingPeriod: 'Q4 2023',
      actualLocalContent: 38.0,
      employmentNumbers: 110,
      trainingCompleted: 'Training program for 35 technicians completed',
      procurementAchieved: 'Local procurement at 52%',
      challenges: 'Skills gap in advanced technical areas',
      recommendations: 'Partner with technical institutes for advanced training',
      submissionDate: new Date('2024-01-30'),
      companyId: companies[1].id,
    },
  ];

  for (const report of reports) {
    await prisma.lCPerformanceReport.create({
      data: report,
    });
  }
}

async function createPayments(permits) {
  const payments = [
    {
      amount: 250000.00,
      currency: 'USD',
      paymentType: 'APPLICATION_FEE',
      description: 'Application fee for exploration permit',
      dueDate: new Date('2024-01-15'),
      paidDate: new Date('2024-01-12'),
      status: 'PAID',
      permitId: permits[0].id,
    },
    {
      amount: 500000.00,
      currency: 'USD',
      paymentType: 'ANNUAL_FEE',
      description: 'Annual permit maintenance fee',
      dueDate: new Date('2024-06-01'),
      paidDate: null,
      status: 'PENDING',
      permitId: permits[1].id,
    },
    {
      amount: 75000.00,
      currency: 'USD',
      paymentType: 'PROCESSING_FEE',
      description: 'Development permit processing fee',
      dueDate: new Date('2024-03-15'),
      paidDate: new Date('2024-03-10'),
      status: 'PAID',
      permitId: permits[2].id,
    },
  ];

  for (const payment of payments) {
    await prisma.payment.create({
      data: payment,
    });
  }
}

async function createInspections(permits) {
  const inspections = [
    {
      inspectionType: 'COMPLIANCE',
      scheduledDate: new Date('2024-05-15'),
      completedDate: new Date('2024-05-15'),
      findings: 'All safety protocols properly implemented. Minor documentation issues noted.',
      recommendations: 'Update safety documentation to latest standards',
      status: 'COMPLETED',
      permitId: permits[0].id,
    },
    {
      inspectionType: 'SAFETY',
      scheduledDate: new Date('2024-06-20'),
      completedDate: null,
      findings: null,
      recommendations: null,
      status: 'SCHEDULED',
      permitId: permits[1].id,
    },
    {
      inspectionType: 'ENVIRONMENTAL',
      scheduledDate: new Date('2024-04-25'),
      completedDate: new Date('2024-04-25'),
      findings: 'Environmental management systems in good order. Waste disposal procedures compliant.',
      recommendations: 'Continue current environmental monitoring practices',
      status: 'COMPLETED',
      permitId: permits[2].id,
    },
  ];

  for (const inspection of inspections) {
    await prisma.inspection.create({
      data: inspection,
    });
  }
}

async function createNotifications(users) {
  const notifications = [
    {
      title: 'New Permit Application Submitted',
      message: 'A new exploration permit application has been submitted for review.',
      type: 'APPLICATION_SUBMITTED',
      isRead: false,
      userId: users[2].id, // reviewer
    },
    {
      title: 'Payment Due Reminder',
      message: 'Annual permit fee payment is due in 30 days.',
      type: 'PAYMENT_DUE',
      isRead: false,
      userId: users[1].id, // acme admin
    },
    {
      title: 'Inspection Scheduled',
      message: 'Safety inspection has been scheduled for June 20, 2024.',
      type: 'INSPECTION_SCHEDULED',
      isRead: true,
      userId: users[1].id, // acme admin
    },
    {
      title: 'Document Upload Required',
      message: 'Please upload the required environmental impact assessment.',
      type: 'DOCUMENT_REQUIRED',
      isRead: false,
      userId: users[1].id, // acme admin
    },
    {
      title: 'System Maintenance Notice',
      message: 'Scheduled system maintenance on Sunday, 2 AM - 6 AM.',
      type: 'SYSTEM_NOTIFICATION',
      isRead: false,
      userId: users[0].id, // admin
    },
  ];

  for (const notification of notifications) {
    await prisma.notification.create({
      data: notification,
    });
  }
}

async function createAuditLogs(users) {
  const auditLogs = [
    {
      action: 'CREATE',
      entityType: 'Permit',
      entityId: 'PERM-2024-001',
      oldValues: null,
      newValues: JSON.stringify({
        permitNumber: 'PERM-2024-001',
        permitType: 'EXPLORATION',
        status: 'PENDING'
      }),
      userId: users[1].id, // acme admin
    },
    {
      action: 'UPDATE',
      entityType: 'Permit',
      entityId: 'PERM-2024-001',
      oldValues: JSON.stringify({ status: 'PENDING' }),
      newValues: JSON.stringify({ status: 'APPROVED' }),
      userId: users[2].id, // reviewer
    },
    {
      action: 'CREATE',
      entityType: 'User',
      entityId: users[1].id,
      oldValues: null,
      newValues: JSON.stringify({
        email: 'admin@acmeoil.com',
        role: 'COMPANY_ADMIN',
        firstName: 'Acme',
        lastName: 'Administrator'
      }),
      userId: users[0].id, // admin
    },
    {
      action: 'UPDATE',
      entityType: 'Company',
      entityId: 'GHA-REG-12345',
      oldValues: JSON.stringify({ status: 'PENDING' }),
      newValues: JSON.stringify({ status: 'ACTIVE' }),
      userId: users[0].id, // admin
    },
  ];

  for (const log of auditLogs) {
    await prisma.auditLog.create({
      data: log,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });