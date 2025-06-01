# Upstream Tracking System (UTS)

## Overview

The Upstream Tracking System is a comprehensive web application developed for the Petroleum Commission of Ghana to digitize and streamline regulatory, compliance, and permit management workflows in the upstream petroleum sector. The system manages company registrations, personnel permits, joint venture approvals, and compliance tracking with full audit capabilities.

## Features

### 🏢 Company Management
- **Company Registration & Renewal**: Multi-step digital forms with document validation
- **Joint Venture (JV) Registration**: Equity validation and compliance tracking
- **Company Categories**: Support for Specialized and General company types
- **Document Management**: Secure upload and storage of regulatory documents

### 👥 Personnel Management
- **Personnel Registration**: Comprehensive bio-data and employment tracking
- **Permit Applications**: Regular and Rotator permit workflows
- **Document Validation**: Passport, medical, BOSIET, police clearance verification
- **Expiry Tracking**: Automated alerts for certificate and permit renewals

### 📋 Compliance & Workflow
- **Local Content Plans**: Multi-section compliance reporting
- **Performance Reports**: Annual and quarterly submission tracking
- **Approval Workflows**: Queue-based review system with role-based access
- **Status Tracking**: Real-time application and permit status updates

### 📊 Analytics & Reporting
- **Executive Dashboards**: Real-time metrics and KPIs
- **Financial Tracking**: Fee collection, payments, and outstanding amounts
- **Compliance Monitoring**: Ghanaian equity ratios and local content compliance
- **Audit Trails**: Comprehensive logging of all system activities

### 🔐 Security & Access Control
- **Role-Based Access**: Multiple user roles with specific permissions
- **JWT Authentication**: Secure token-based authentication
- **Audit Logging**: Complete activity tracking for compliance

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI, Heroicons
- **Charts**: Recharts
- **HTTP Client**: Axios

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer
- **Email**: Nodemailer
- **Validation**: Built-in validation with Prisma schema

### Infrastructure
- **Containerization**: Docker & Docker Compose
- **Development**: Hot reload with volume mounting
- **Database**: PostgreSQL 14 container
- **Email Testing**: MailHog for development

## User Roles

- **Commission Admin (CEO)**: Executive oversight and final approvals
- **Company Admin**: Company registration and personnel management
- **JV Coordinator**: Joint venture application management
- **Inspector**: Field inspection and compliance verification
- **Compliance Officer**: Local content and regulatory compliance
- **Immigration Officer**: Personnel permit processing
- **Finance Officer**: Payment processing and financial tracking
- **Personnel**: Individual permit applications and renewals

## Prerequisites

- **Docker Desktop**: Version 4.0 or higher
- **Node.js**: Version 18.0 or higher (for local development)
- **Git**: For version control

## Quick Start

### Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd UpstreamTrackingSystem
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3020
   - Backend API: http://localhost:5020
   - Database: localhost:5450
   - MailHog (Email testing): http://localhost:8025

4. **Initialize the database**
   ```bash
   docker-compose exec backend npm run prisma:migrate
   docker-compose exec backend npm run seed
   ```

### Local Development Setup

1. **Install dependencies**
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend
   cd ../backend
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Backend (.env)
   DATABASE_URL="postgresql://postgres:postgres@localhost:5450/pcots"
   JWT_SECRET="your-secret-key"
   PORT=5000
   ```

3. **Start PostgreSQL**
   ```bash
   docker-compose up postgres -d
   ```

4. **Run database migrations**
   ```bash
   cd backend
   npm run prisma:migrate
   npm run seed
   ```

5. **Start development servers**
   ```bash
   # Backend (Terminal 1)
   cd backend
   npm run dev
   
   # Frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

## Project Structure

```
UpstreamTrackingSystem/
├── frontend/                 # Next.js frontend application
│   ├── app/                 # App router pages and layouts
│   ├── src/                 # Source components and utilities
│   ├── public/              # Static assets
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── src/                 # Source code
│   │   ├── routes/          # API route handlers
│   │   ├── middleware/      # Express middleware
│   │   └── services/        # Business logic services
│   ├── prisma/              # Database schema and migrations
│   └── package.json
├── docker-compose.yml       # Docker services configuration
└── README.md
```

## API Documentation

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Company Endpoints
- `GET /api/companies` - List companies
- `POST /api/companies` - Create company
- `PUT /api/companies/:id` - Update company
- `GET /api/companies/:id` - Get company details

### Personnel Endpoints
- `GET /api/personnel` - List personnel
- `POST /api/personnel` - Create personnel record
- `PUT /api/personnel/:id` - Update personnel
- `GET /api/personnel/:id/permits` - Get personnel permits

### Application Endpoints
- `GET /api/applications` - List applications
- `POST /api/applications` - Submit application
- `PUT /api/applications/:id/status` - Update application status
- `GET /api/applications/:id/documents` - Get application documents

## Database Schema

The system uses PostgreSQL with Prisma ORM. Key entities include:

- **Users**: System users with role-based access
- **Companies**: Registered petroleum companies
- **Personnel**: Company employees and contractors
- **Applications**: Permit and registration applications
- **Documents**: Uploaded files and certificates
- **Notifications**: System notifications and alerts
- **AuditLogs**: Complete activity tracking

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint configuration
- Use Prettier for code formatting
- Write descriptive commit messages

### Testing
```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
cd frontend
npm test
```

### Database Operations
```bash
# Generate Prisma client
npm run prisma:generate

# Create migration
npm run prisma:migrate

# View database
npm run prisma:studio

# Seed database
npm run seed
```

## Deployment

### Production Environment
1. Set production environment variables
2. Build the applications:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
3. Run database migrations in production
4. Configure SSL certificates
5. Set up monitoring and logging

### Environment Variables

**Backend (.env)**
```env
DATABASE_URL=postgresql://user:password@host:port/database
JWT_SECRET=your-production-secret
PORT=5000
NODE_ENV=production
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email
SMTP_PASS=your-password
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api
NEXT_PUBLIC_APP_URL=https://your-app-domain.com
```

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Ensure PostgreSQL container is running
   - Check DATABASE_URL environment variable
   - Verify database credentials

2. **Frontend Build Errors**
   - Clear Next.js cache: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`

3. **Docker Issues**
   - Restart Docker Desktop
   - Rebuild containers: `docker-compose up --build`
   - Check container logs: `docker-compose logs [service-name]`

### Logs
```bash
# View all logs
docker-compose logs

# View specific service logs
docker-compose logs frontend
docker-compose logs backend
docker-compose logs postgres
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and commit: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## License

This project is proprietary software developed for the Petroleum Commission of Ghana.

## Support

For technical support or questions:
- Create an issue in the repository
- Contact the development team
- Review the documentation in the `/docs` folder

## Changelog

### Version 0.1.0
- Initial release
- Company registration workflow
- Personnel permit management
- Basic dashboard functionality
- Docker containerization
- Authentication and authorization

---

**Built with ❤️ for the Petroleum Commission of Ghana**