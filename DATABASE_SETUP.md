# Database Setup & Backend Documentation

## Overview
This document provides complete setup instructions for the PostgreSQL + Prisma + Docker backend infrastructure for the Gig Workers Income Tracking App.

## Project Structure

```
IKYA-gig-workers-app/
├── database/
│   ├── prisma/
│   │   ├── schema.prisma           # Prisma database schema
│   │   └── migrations/              # Database migrations
│   ├── docker-compose.yml           # Database-only compose file
│   ├── init.sql                     # Database initialization script
│   ├── .env.example                 # Example environment variables
│   └── .env.test                    # Test environment variables
├── backend/
│   ├── src/
│   │   ├── index.ts                # Main server entry point
│   │   ├── routes/                 # API routes
│   │   │   ├── user.ts
│   │   │   ├── income.ts
│   │   │   ├── expense.ts
│   │   │   └── report.ts
│   │   ├── middleware/             # Express middleware
│   │   │   └── errorHandler.ts
│   │   ├── utils/                  # Utility functions
│   │   │   ├── logger.ts
│   │   │   ├── asyncHandler.ts
│   │   │   └── validators.ts
│   │   └── __tests__/              # Test suites
│   │       ├── setup.ts
│   │       ├── user.test.ts
│   │       └── income.test.ts
│   ├── Dockerfile                  # Docker image definition
│   ├── package.json                # Backend dependencies
│   ├── tsconfig.json               # TypeScript configuration
│   ├── jest.config.json            # Jest testing configuration
│   ├── .eslintrc.json              # ESLint configuration
│   ├── .env.example                # Backend environment example
│   └── .gitignore
├── docker-compose.yml              # Full stack compose (DB + Backend)
└── .github/
    └── workflows/
        └── ci-cd.yml               # GitHub Actions CI/CD pipeline
```

## Prerequisites

- **Docker & Docker Compose**: v20.10+
- **Node.js**: v18+ (for local development)
- **npm**: v9+
- **Git**: For version control

## Setup Instructions

### 1. Clone Repository
```bash
git clone <repository-url>
cd IKYA-gig-workers-app
```

### 2. Environment Configuration

Copy environment templates:
```bash
# Database environment
cp database/.env.example database/.env

# Backend environment
cp backend/.env.example backend/.env

# Test environment (optional)
cp database/.env.test database/.env.test
```

Edit `database/.env` with your database credentials:
```env
DB_USER=gigworker
DB_PASSWORD=your_secure_password
DB_NAME=gig_workers_db
DB_PORT=5432
DB_HOST=localhost
DATABASE_URL=postgresql://gigworker:your_secure_password@localhost:5432/gig_workers_db?schema=public
NODE_ENV=development
```

### 3. Start Database Only (Development)

```bash
cd database
docker-compose up -d
```

Verify database is running:
```bash
docker ps | grep gig-workers-db
```

### 4. Setup Backend

Install dependencies:
```bash
cd backend
npm install
```

Generate Prisma client:
```bash
npx prisma generate
```

Run migrations:
```bash
npx prisma migrate deploy
```

### 5. Start Full Stack (Docker)

From project root:
```bash
docker-compose up -d
```

This will start:
- PostgreSQL database (port 5432)
- Node.js backend API (port 3000)

### 6. Verify Setup

Check API health:
```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Schema

### Models

#### User
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  phone     String?  @unique
  firstName String?
  lastName  String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  // Relations
  incomes   Income[]
  expenses  Expense[]
  goals     SavingsGoal[]
  reports   FinancialReport[]
}
```

#### Income
```prisma
model Income {
  id        String   @id @default(uuid())
  userId    String
  amount    Float
  source    String
  category  String   @default("gig_work")
  date      DateTime @db.Date
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  
  user      User     @relation(fields: [userId], references: [id])
  tags      Tag[]
}
```

#### Expense
```prisma
model Expense {
  id          String   @id @default(uuid())
  userId      String
  amount      Float
  category    String
  date        DateTime @db.Date
  description String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  
  user        User     @relation(fields: [userId], references: [id])
}
```

#### FinancialReport
```prisma
model FinancialReport {
  id                    String   @id @default(uuid())
  userId                String
  startDate             DateTime @db.Date
  endDate               DateTime @db.Date
  totalIncome           Float
  totalExpenses         Float
  netIncome             Float
  averageDailyEarnings  Float
  reportData            Json
  createdAt             DateTime @default(now())
  
  user                  User     @relation(fields: [userId], references: [id])
}
```

## API Endpoints

### Base URL: `http://localhost:3000/api/v1`

### Users
- `POST /users` - Create user
- `GET /users` - Get all users
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Income
- `POST /income` - Create income entry
- `GET /income/user/:userId` - Get user's income entries
- `GET /income/user/:userId/summary` - Get income summary
- `GET /income/:id` - Get specific income
- `PUT /income/:id` - Update income
- `DELETE /income/:id` - Delete income

### Expenses
- `POST /expenses` - Create expense entry
- `GET /expenses/user/:userId` - Get user's expenses
- `GET /expenses/:id` - Get specific expense
- `PUT /expenses/:id` - Update expense
- `DELETE /expenses/:id` - Delete expense

### Reports
- `POST /reports/generate` - Generate financial report
- `GET /reports/user/:userId` - Get user's reports
- `GET /reports/:id` - Get specific report
- `DELETE /reports/:id` - Delete report

## Testing

### Run Tests
```bash
cd backend
npm test
```

### Run Tests with Coverage
```bash
npm test -- --coverage
```

### Run Integration Tests
```bash
npm run test:integration
```

### Watch Mode
```bash
npm run test:watch
```

### Test Files Location
```
backend/src/__tests__/
├── setup.ts          # Test configuration & database setup
├── user.test.ts      # User API tests
└── income.test.ts    # Income API tests
```

### Test Coverage Goals
- **Branches**: 70%
- **Functions**: 70%
- **Lines**: 70%
- **Statements**: 70%

## CI/CD Pipeline

GitHub Actions workflow automates:
1. **Test**: Runs all tests on push/PR
2. **Lint**: Checks code quality
3. **Build**: Builds Docker image
4. **Security Scan**: Runs npm audit and Snyk
5. **Deploy**: Deploys to production (main branch only)

### Workflow Triggers
- Push to `main` or `develop`
- Pull requests to `main` or `develop`

### Required Secrets (GitHub Repository Settings)
```
SNYK_TOKEN=<your_snyk_token>
SLACK_WEBHOOK=<your_slack_webhook_url>
```

## Prisma Commands

### Generate Prisma Client
```bash
npx prisma generate
```

### Create Migration
```bash
npx prisma migrate dev --name migration_name
```

### Deploy Migrations (Production)
```bash
npx prisma migrate deploy
```

### Reset Database (Development Only)
```bash
npx prisma migrate reset --force
```

### Open Prisma Studio
```bash
npx prisma studio
```

### Push Schema to Database
```bash
npx prisma db push
```

## Development Workflow

### Local Development with Auto-reload
```bash
cd backend
npm run dev
```

### Build TypeScript
```bash
npm run build
```

### Start Production Build
```bash
npm start
```

### Linting
```bash
npm run lint
npm run lint:fix
```

## Docker Commands

### Start Services
```bash
# Start all services
docker-compose up -d

# Start with logs
docker-compose up

# Rebuild and start
docker-compose up -d --build
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs postgres
docker-compose logs backend

# Real-time logs
docker-compose logs -f backend
```

### Database Access via CLI
```bash
docker exec -it gig-workers-db psql -U gigworker -d gig_workers_db
```

### Useful Queries
```sql
-- List all tables
\dt

-- Check users
SELECT * FROM "User";

-- Check income entries
SELECT * FROM "Income" ORDER BY date DESC;

-- Check database size
SELECT pg_size_pretty(pg_database_size('gig_workers_db'));
```

## Troubleshooting

### Database Connection Issues
```bash
# Check if database is running
docker ps | grep postgres

# Check logs
docker logs gig-workers-db

# Restart database
docker-compose down && docker-compose up -d
```

### Prisma Migration Issues
```bash
# Reset migrations (⚠️ WARNING: Deletes all data)
npx prisma migrate reset --force

# Check migration status
npx prisma migrate status
```

### Port Already in Use
```bash
# Find process using port 5432
lsof -i :5432
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

### Connection Pool Issues
```bash
# Increase connection pool in .env
DATABASE_URL=postgresql://user:pass@localhost:5432/db?schema=public&connection_limit=20
```

## Performance Optimization

### Database Indexes
Indexes are created automatically via Prisma schema on:
- `Income.userId`
- `Income.date`
- `Income.source`
- `Expense.userId`
- `Expense.date`
- `User.email`
- `User.phone`

### Query Optimization Tips
1. Always paginate large result sets
2. Use `select` to retrieve only needed fields
3. Use `include` for relations instead of separate queries
4. Create composite indexes for frequently filtered combinations

### Connection Pooling
Backend uses Prisma connection pool (default: 5 connections)

## Backup & Recovery

### Backup Database
```bash
docker exec gig-workers-db pg_dump -U gigworker gig_workers_db > backup.sql
```

### Restore Database
```bash
docker exec -i gig-workers-db psql -U gigworker gig_workers_db < backup.sql
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **Database Access**: Restrict access to PostgreSQL to backend service
3. **API Authentication**: Consider adding JWT tokens
4. **HTTPS**: Enable in production
5. **SQL Injection**: Use Prisma (parameterized queries)
6. **CORS**: Configure allowed origins in `.env`

## Monitoring & Logging

### Application Logs
Accessible via:
```bash
docker-compose logs -f backend
```

### Database Queries
Enable Prisma query logging in `backend/.env`:
```env
DEBUG=prisma:*
```

### Health Checks
```bash
curl http://localhost:3000/health
```

## Next Steps

1. Implement API authentication (JWT)
2. Add request validation middleware
3. Set up rate limiting
4. Configure environment-specific settings
5. Add API documentation (Swagger/OpenAPI)
6. Implement caching layer (Redis)
7. Set up monitoring tools (e.g., DataDog, New Relic)

## Support & Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions](https://docs.github.com/en/actions)
