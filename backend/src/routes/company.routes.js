const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/auth.middleware');
const notificationService = require('../services/notification.service');
const { CompanyRegistrationStatus, UserRole } = require('@prisma/client'); // Added for CompanyRegistrationStatus and UserRole enum access

/**
 * Company Management Routes
 * Handles company registration, profile management, and company-related operations
 */

// Get all companies
router.get('/', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search, isIndigenous } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      AND: [
        category ? { category } : {},
        isIndigenous !== undefined ? { isIndigenous: isIndigenous === 'true' } : {},
        search ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { registrationNumber: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } }
          ]
        } : {}
      ]
    };

    const [companies, total] = await Promise.all([
      req.prisma.company.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          _count: {
            select: {
              users: true,
              permits: true,
              personnel: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.company.count({ where })
    ]);

    res.json({
      companies,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get companies error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;

    // Company users can only view their own company unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const company = await req.prisma.company.findUnique({
      where: { id },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            role: true,
            isActive: true
          }
        },
        permits: {
          select: {
            id: true,
            permitNumber: true,
            permitType: true,
            status: true,
            applicationDate: true,
            expiryDate: true
          },
          orderBy: { createdAt: 'desc' }
        },
        personnel: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            position: true,
            nationality: true,
            isExpatriate: true
          }
        },
        jvCompanies: true,
        localContentPlans: {
          orderBy: { year: 'desc' }
        },
        performanceReports: {
          orderBy: { createdAt: 'desc' }
        },
        _count: {
          select: {
            users: true,
            permits: true,
            personnel: true,
            documents: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    res.json({ company });
  } catch (error) {
    console.error('Get company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new company
router.post('/', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const {
      name,
      registrationNumber,
      incorporationDate,
      address,
      email,
      phone,
      website,
      category,
      specialization,
      isIndigenous,
      indigenousOwnershipPct
    } = req.body;

    // Check if company already exists
    const existingCompany = await req.prisma.company.findUnique({
      where: { registrationNumber }
    });

    if (existingCompany) {
      return res.status(400).json({ error: 'Company already exists with this registration number' });
    }

    // Create company
    const company = await req.prisma.company.create({
      data: {
        name,
        registrationNumber,
        incorporationDate: new Date(incorporationDate),
        address,
        email,
        phone,
        website,
        category,
        specialization: specialization || [],
        isIndigenous: isIndigenous || false,
        indigenousOwnershipPct: indigenousOwnershipPct || null
      }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'CREATE_COMPANY',
        entityType: 'COMPANY',
        entityId: company.id,
        newValues: { name: company.name, registrationNumber: company.registrationNumber },
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.status(201).json({
      message: 'Company created successfully',
      company
    });
  } catch (error) {
    console.error('Create company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update company
router.put('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const {
      name,
      address,
      email,
      phone,
      website,
      category,
      specialization,
      isIndigenous,
      indigenousOwnershipPct,
      isActive
    } = req.body;

    // Company users can only update their own company unless they're admin
    if (role !== 'ADMIN' && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    // Get old values for audit log
    const oldCompany = await req.prisma.company.findUnique({
      where: { id }
    });

    if (!oldCompany) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const updateData = {
      name,
      address,
      email,
      phone,
      website,
      category,
      specialization: specialization || [],
      isIndigenous: isIndigenous || false,
      indigenousOwnershipPct: indigenousOwnershipPct || null
    };

    // Only admins can change active status
    if (role === 'ADMIN' && isActive !== undefined) {
      updateData.isActive = isActive;
    }

    const updatedCompany = await req.prisma.company.update({
      where: { id },
      data: updateData
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'UPDATE_COMPANY',
        entityType: 'COMPANY',
        entityId: id,
        oldValues: oldCompany,
        newValues: updateData,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    // Notify company users if status changed
    if (role === 'ADMIN' && oldCompany.isActive !== updateData.isActive) {
      const companyUsers = await req.prisma.user.findMany({
        where: { companyId: id },
        select: { id: true, email: true }
      });

      for (const user of companyUsers) {
        await notificationService.sendMultiChannelNotification(req.prisma, {
          userId: user.id,
          sentById: req.user.userId,
          title: 'Company Status Changed',
          message: `Your company ${updatedCompany.name} has been ${updateData.isActive ? 'activated' : 'deactivated'} by an administrator.`,
          email: user.email,
          emailSubject: 'PC-OTS Company Status Changed',
          channels: ['IN_APP', 'EMAIL']
        });
      }
    }

    res.json({
      message: 'Company updated successfully',
      company: updatedCompany
    });
  } catch (error) {
    console.error('Update company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete company (Admin only)
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Check if company exists
    const company = await req.prisma.company.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            users: true,
            permits: true,
            personnel: true
          }
        }
      }
    });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Check if company has active permits or users
    if (company._count.users > 0 || company._count.permits > 0) {
      return res.status(400).json({ 
        error: 'Cannot delete company with active users or permits. Please deactivate instead.' 
      });
    }

    // Soft delete by deactivating
    await req.prisma.company.update({
      where: { id },
      data: { isActive: false }
    });

    // Log the action
    await req.prisma.auditLog.create({
      data: {
        action: 'DELETE_COMPANY',
        entityType: 'COMPANY',
        entityId: id,
        oldValues: company,
        userId: req.user.userId,
        ipAddress: req.ip,
        userAgent: req.get('User-Agent')
      }
    });

    res.json({ message: 'Company deactivated successfully' });
  } catch (error) {
    console.error('Delete company error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company statistics
router.get('/stats/overview', authenticate, authorize(['ADMIN', 'COMPLIANCE_OFFICER']), async (req, res) => {
  try {
    const [totalCompanies, activeCompanies, companiesByCategory, indigenousCompanies, recentCompanies] = await Promise.all([
      req.prisma.company.count(),
      req.prisma.company.count({ where: { isActive: true } }),
      req.prisma.company.groupBy({
        by: ['category'],
        _count: { category: true }
      }),
      req.prisma.company.count({ where: { isIndigenous: true } }),
      req.prisma.company.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          registrationNumber: true,
          category: true,
          isIndigenous: true,
          createdAt: true
        }
      })
    ]);

    const categoryStats = companiesByCategory.reduce((acc, item) => {
      acc[item.category] = item._count.category;
      return acc;
    }, {});

    res.json({
      totalCompanies,
      activeCompanies,
      inactiveCompanies: totalCompanies - activeCompanies,
      indigenousCompanies,
      foreignCompanies: totalCompanies - indigenousCompanies,
      categoryStats,
      recentCompanies
    });
  } catch (error) {
    console.error('Get company stats error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company permits
router.get('/:id/permits', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, status, type } = req.query;
    const skip = (page - 1) * limit;

    // Company users can only view their own company permits unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const where = {
      companyId: id,
      ...(status && { status }),
      ...(type && { permitType: type })
    };

    const [permits, total] = await Promise.all([
      req.prisma.permit.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          personnel: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              position: true
            }
          },
          _count: {
            select: {
              documents: true,
              payments: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.permit.count({ where })
    ]);

    res.json({
      permits,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get company permits error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get company personnel
router.get('/:id/personnel', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { role, companyId } = req.user;
    const { page = 1, limit = 10, nationality, isExpatriate } = req.query;
    const skip = (page - 1) * limit;

    // Company users can only view their own company personnel unless they're admin/inspector
    if (!['ADMIN', 'INSPECTOR', 'COMPLIANCE_OFFICER', 'IMMIGRATION_OFFICER'].includes(role) && companyId !== id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const where = {
      companyId: id,
      ...(nationality && { nationality }),
      ...(isExpatriate !== undefined && { isExpatriate: isExpatriate === 'true' })
    };

    const [personnel, total] = await Promise.all([
      req.prisma.personnel.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: {
          permits: {
            select: {
              id: true,
              permitNumber: true,
              permitType: true,
              status: true,
              expiryDate: true
            }
          }
        },
        orderBy: { createdAt: 'desc' }
      }),
      req.prisma.personnel.count({ where })
    ]);

    res.json({
      personnel,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get company personnel error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Company Registration Routes ---

// Initiate New Company Registration Application
router.post('/register/initiate', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Check if user already has an active or pending registration
    const existingRegistration = await req.prisma.companyRegistration.findFirst({
      where: {
        userId,
        NOT: {
          status: { in: [CompanyRegistrationStatus.APPROVED, CompanyRegistrationStatus.REJECTED] }
        }
      }
    });

    if (existingRegistration) {
      return res.status(400).json({ error: 'You already have an active registration application.', registrationId: existingRegistration.id });
    }

    // Minimal data to initiate, more will be added in the update step
    const { companyName, companyEmail, contactPersonName, contactPersonMobile, permitCategory } = req.body;

    if (!companyName || !companyEmail || !contactPersonName || !contactPersonMobile || !permitCategory) {
        return res.status(400).json({ error: 'Missing required fields for initiation: companyName, companyEmail, contactPersonName, contactPersonMobile, permitCategory' });
    }

    const registration = await req.prisma.companyRegistration.create({
      data: {
        userId,
        companyName,
        companyEmail,
        contactPersonName,
        contactPersonMobile,
        permitCategory,
        // Default status, can be PENDING_FORM_COMPLETION if email is considered verified from user auth
        status: CompanyRegistrationStatus.PENDING_FORM_COMPLETION, 
        // Placeholder for required fields that will be filled in subsequent steps
        incorporationDate: new Date(), // Placeholder
        incorporationPlace: "Placeholder", // Placeholder
        postalAddress: "Placeholder", // Placeholder
        shareholders: [], // Placeholder
        directorsAndManagement: [], // Placeholder
        activityDescription: "Placeholder", // Placeholder
        financialCapabilityInfo: {}, // Placeholder
        fundingSourcesGhana: "Placeholder", // Placeholder
        declarationName: "Placeholder", // Placeholder
        declarationPosition: "Placeholder", // Placeholder
        declarationDate: new Date() // Placeholder
      }
    });

    res.status(201).json({ message: 'Company registration initiated successfully.', registrationId: registration.id, registration });

  } catch (error) {
    console.error('Initiate company registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration initiation.' });
  }
});

// Get User's Company Registration Application
router.get('/register/my-application', authenticate, async (req, res) => {
  try {
    const userId = req.user.userId;
    const registration = await req.prisma.companyRegistration.findFirst({
      where: { userId },
      orderBy: { createdAt: 'desc' } // Get the latest one if multiple (though logic above tries to prevent it)
    });

    if (!registration) {
      return res.status(404).json({ error: 'No registration application found for this user.' });
    }
    res.json(registration);
  } catch (error) {
    console.error('Get user registration application error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// Update Company Registration Form Data
router.put('/register/:registrationId', authenticate, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user.userId;
    const dataToUpdate = req.body; // Expecting all fields from CompanyRegistration model

    const registration = await req.prisma.companyRegistration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration application not found.' });
    }

    // Ensure the user owns this registration or is an admin
    if (registration.userId !== userId && req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.COMMISSION_ADMIN) {
      return res.status(403).json({ error: 'You are not authorized to update this application.' });
    }

    // Prevent updates if application is in a final state, unless by admin for specific fields
    if ([CompanyRegistrationStatus.APPROVED, CompanyRegistrationStatus.REJECTED].includes(registration.status) && req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.COMMISSION_ADMIN) {
      return res.status(400).json({ error: `Application is already ${registration.status} and cannot be updated by user.` });
    }
    if (registration.status === CompanyRegistrationStatus.SUBMITTED_FOR_REVIEW && req.user.role !== UserRole.ADMIN && req.user.role !== UserRole.COMMISSION_ADMIN) {
        return res.status(400).json({ error: 'Application has been submitted and cannot be updated by user. Contact admin for changes.' });
    }

    // Convert date strings to Date objects if present
    if (dataToUpdate.incorporationDate) dataToUpdate.incorporationDate = new Date(dataToUpdate.incorporationDate);
    if (dataToUpdate.declarationDate) dataToUpdate.declarationDate = new Date(dataToUpdate.declarationDate);

    // Exclude status from direct user update here, status changes via specific actions (submit, admin review)
    delete dataToUpdate.status; 
    delete dataToUpdate.userId; // Prevent changing ownership
    delete dataToUpdate.adminReviewComments; // User cannot set this
    delete dataToUpdate.approvedCompanyId; // User cannot set this

    const updatedRegistration = await req.prisma.companyRegistration.update({
      where: { id: registrationId },
      data: dataToUpdate
    });

    res.json({ message: 'Registration application updated successfully.', registration: updatedRegistration });

  } catch (error) {
    console.error('Update company registration error:', error);
    // Check for Prisma specific errors, e.g., type mismatch
    if (error.code === 'P2002' || error.code === 'P2003' || error.message.includes('Invalid `prisma')) {
        return res.status(400).json({ error: 'Invalid data provided for update.', details: error.message });
    }
    res.status(500).json({ error: 'Internal server error during registration update.' });
  }
});

// Submit Company Registration Application
router.post('/register/:registrationId/submit', authenticate, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user.userId;

    const registration = await req.prisma.companyRegistration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration application not found.' });
    }
    if (registration.userId !== userId) {
      return res.status(403).json({ error: 'You are not authorized to submit this application.' });
    }
    if (registration.status !== CompanyRegistrationStatus.PENDING_FORM_COMPLETION && registration.status !== CompanyRegistrationStatus.REQUIRES_CLARIFICATION) {
      return res.status(400).json({ error: `Application cannot be submitted. Current status: ${registration.status}` });
    }

    // TODO: Add comprehensive validation here to ensure all required fields are filled
    // For now, just changing status

    const submittedRegistration = await req.prisma.companyRegistration.update({
      where: { id: registrationId },
      data: { status: CompanyRegistrationStatus.SUBMITTED_FOR_REVIEW }
    });

    // Notify admins
    // await notificationService.sendToAdmins('New Company Registration Submitted', `Company ${registration.companyName} has submitted their registration application.`);

    res.json({ message: 'Registration application submitted successfully.', registration: submittedRegistration });

  } catch (error) {
    console.error('Submit company registration error:', error);
    res.status(500).json({ error: 'Internal server error during registration submission.' });
  }
});

// Get Company Registration Details (for user or admin)
router.get('/register/:registrationId', authenticate, async (req, res) => {
  try {
    const { registrationId } = req.params;
    const userId = req.user.userId;
    const userRole = req.user.role;

    const registration = await req.prisma.companyRegistration.findUnique({
      where: { id: registrationId },
      include: { user: { select: { firstName: true, lastName: true, email: true }} } // Include some user details
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration application not found.' });
    }

    // User can only see their own, admins can see any
    if (registration.userId !== userId && ![UserRole.ADMIN, UserRole.COMMISSION_ADMIN, UserRole.INSPECTOR, UserRole.COMPLIANCE_OFFICER].includes(userRole)) {
      return res.status(403).json({ error: 'You are not authorized to view this application.' });
    }

    res.json(registration);
  } catch (error) {
    console.error('Get company registration details error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


// --- Admin Routes for Company Registrations ---

// Get All Company Registration Applications (Admin/Commission Staff)
router.get('/registrations', authenticate, authorize([UserRole.ADMIN, UserRole.COMMISSION_ADMIN, UserRole.INSPECTOR, UserRole.COMPLIANCE_OFFICER]), async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;
    const skip = (page - 1) * limit;

    const where = {
        AND: [
            status ? { status: status } : {},
            search ? {
                OR: [
                    { companyName: { contains: search, mode: 'insensitive' } },
                    { companyEmail: { contains: search, mode: 'insensitive' } },
                    { user: { email: { contains: search, mode: 'insensitive' } } }
                ]
            } : {}
        ]
    };

    const [registrations, total] = await Promise.all([
        req.prisma.companyRegistration.findMany({
            where,
            skip: parseInt(skip),
            take: parseInt(limit),
            include: {
                user: { select: { id: true, firstName: true, lastName: true, email: true } }
            },
            orderBy: { createdAt: 'desc' }
        }),
        req.prisma.companyRegistration.count({ where })
    ]);

    res.json({
        registrations,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            total,
            pages: Math.ceil(total / limit)
        }
    });
  } catch (error) {
    console.error('Get all company registrations error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Update Company Registration Status (Admin/Commission Staff)
router.put('/registrations/:registrationId/status', authenticate, authorize([UserRole.ADMIN, UserRole.COMMISSION_ADMIN]), async (req, res) => {
  try {
    const { registrationId } = req.params;
    const { status, adminReviewComments } = req.body;

    if (!status || !Object.values(CompanyRegistrationStatus).includes(status)) {
      return res.status(400).json({ error: 'Invalid or missing status provided.' });
    }

    const registration = await req.prisma.companyRegistration.findUnique({
      where: { id: registrationId }
    });

    if (!registration) {
      return res.status(404).json({ error: 'Registration application not found.' });
    }

    let updatedData = { status };
    if (adminReviewComments !== undefined) {
      updatedData.adminReviewComments = adminReviewComments;
    }

    // If approving, create the actual Company record
    if (status === CompanyRegistrationStatus.APPROVED && registration.status !== CompanyRegistrationStatus.APPROVED) {
        // Check if company already exists by registration number (should be unique in Company model)
        // This step assumes that the registration form collects a proposed registration number or one is generated.
        // For now, we'll use a placeholder or assume it's part of the registration data.
        // This part needs careful handling of data mapping from CompanyRegistration to Company.
        
        // Placeholder: Assume 'registrationNumber' and other core fields are in `registration` object
        // This is a simplified creation. In a real scenario, you'd map fields carefully.
        const companyData = {
            name: registration.companyName,
            // This registrationNumber should ideally be part of the CompanyRegistration form
            // and validated for uniqueness before approval.
            registrationNumber: `REG-${Date.now()}-${registration.companyName.substring(0,5).toUpperCase()}`, 
            incorporationDate: registration.incorporationDate || new Date(),
            address: registration.postalAddress || 'N/A',
            email: registration.companyEmail,
            phone: registration.contactPersonMobile || 'N/A',
            website: registration.website,
            category: registration.permitCategory,
            specialization: registration.preferredActivities || [],
            // isIndigenous & indigenousOwnershipPct should come from the form
            isIndigenous: registration.ghanaianOwnershipPercentage ? registration.ghanaianOwnershipPercentage >= 51 : false, 
            indigenousOwnershipPct: registration.ghanaianOwnershipPercentage,
            isActive: true
        };

        try {
            const newCompany = await req.prisma.company.create({
                data: companyData
            });
            updatedData.approvedCompanyId = newCompany.id;

            // Link the user who registered to the new company as COMPANY_ADMIN if not already linked
            // And update their role if they were just a 'PERSONNEL' or generic user before
            await req.prisma.user.update({
                where: { id: registration.userId },
                data: {
                    companyId: newCompany.id,
                    // Optionally, upgrade role if they are the primary registrant
                    // role: UserRole.COMPANY_ADMIN 
                }
            });

            // Notify user of approval
            // await notificationService.sendToUser(registration.userId, 'Company Registration Approved', `Your company ${newCompany.name} has been approved.`);

        } catch (createError) {
            // Handle potential error if company with registrationNumber already exists (e.g. due to race condition or bad data)
            if (createError.code === 'P2002') {
                 return res.status(409).json({ error: 'Failed to create company: A company with this registration number already exists.', details: createError.meta.target });
            }
            console.error('Error creating company from registration:', createError);
            return res.status(500).json({ error: 'Failed to create company record during approval.' });
        }
    }

    const updatedRegistration = await req.prisma.companyRegistration.update({
      where: { id: registrationId },
      data: updatedData
    });

    // Log action
    await req.prisma.auditLog.create({
        data: {
            action: `UPDATE_REGISTRATION_STATUS_TO_${status}`,
            entityType: 'COMPANY_REGISTRATION',
            entityId: registrationId,
            oldValues: { status: registration.status },
            newValues: { status: updatedRegistration.status, adminReviewComments },
            userId: req.user.userId,
        }
    });

    // Notify user of status change
    // await notificationService.sendToUser(registration.userId, `Company Registration Status Updated: ${status}`, `Your application for ${registration.companyName} is now ${status}. Comments: ${adminReviewComments || 'N/A'}`);

    res.json({ message: `Registration status updated to ${status}.`, registration: updatedRegistration });

  } catch (error) {
    console.error('Update company registration status error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});


module.exports = router;