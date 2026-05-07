# Quick Start Guide - Gig Workers Backend Setup

## 📋 Overview

Complete PostgreSQL + Prisma + Docker + CI/CD implementation for the Gig Workers Income Tracking App.

## 🚀 Quick Start (5 minutes)

### Step 1: Setup Environment
```bash
cd IKYA-gig-workers-app

# Copy environment files
cp database/.env.example database/.env
cp backend/.env.example backend/.env
```

### Step 2: Start with Docker
```bash
# Start all services (Database + Backend API)
docker-compose up -d

# Verify
curl http://localhost:3000/health
```

### Step 3: Initialize Database
```bash
# Run migrations
cd backend
npx prisma migrate deploy

# (Optional) Seed test data
npm run prisma:seed
```

✅ **Done!** API is running at `http://localhost:3000`

## 📁 What Was Created

### Database Files
```
database/
├── prisma/
│   ├── schema.prisma           # Database models
│   └── migrations/             # Migration files
├── docker-compose.yml          # Database container
├── init.sql                    # Database initialization
├── .env.example               # Environment template
└── .env.test                  # Test configuration
```

### Backend Files
```
backend/
├── src/
│   ├── index.ts               # Server
│   ├── routes/                # API routes (user, income, expense, report)
│   ├── middleware/            # Error handling
│   ├── utils/                 # Validators, logger
│   └── __tests__/             # Jest tests
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── jest.config.json           # Testing config
├── Dockerfile                 # Docker image
└── .env.example               # Environment template
```

### CI/CD & Documentation
```
.github/workflows/ci-cd.yml    # GitHub Actions pipeline
DATABASE_SETUP.md              # Complete setup guide
TESTING.md                     # Testing guide
API_DOCUMENTATION.md           # API reference
DEPLOYMENT.md                  # Deployment guide
FILE_HIERARCHY.md              # Directory structure
```

## 🗄️ Database Models

| Model | Purpose |
|-------|---------|
| User | App users with profiles |
| Income | Income entries (Uber, DoorDash, etc) |
| Expense | Expense tracking |
| Tag | Categorization |
| SavingsGoal | Financial goals |
| FinancialReport | Generated reports |
| AuditLog | Action history |

## 🔌 API Endpoints

```
Base: http://localhost:3000/api/v1

USERS
  POST   /users
  GET    /users
  GET    /users/:id
  PUT    /users/:id
  DELETE /users/:id

INCOME
  POST   /income
  GET    /income/user/:userId
  GET    /income/user/:userId/summary
  GET    /income/:id
  PUT    /income/:id
  DELETE /income/:id

EXPENSES
  POST   /expenses
  GET    /expenses/user/:userId
  GET    /expenses/:id
  PUT    /expenses/:id
  DELETE /expenses/:id

REPORTS
  POST   /reports/generate
  GET    /reports/user/:userId
  GET    /reports/:id
  DELETE /reports/:id
```

## 🧪 Testing

```bash
cd backend

# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Watch mode
npm run test:watch

# Specific test
npm test -- user.test.ts
```

**Coverage Goals**: 70% (branches, functions, lines, statements)

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down

# Database CLI access
docker exec -it gig-workers-db psql -U gigworker -d gig_workers_db

# Backend shell
docker exec -it gig-workers-api sh
```

## 📊 Database Queries (psql)

```sql
-- Connect first:
-- docker exec -it gig-workers-db psql -U gigworker -d gig_workers_db

-- List all tables
\dt

-- Check users
SELECT * FROM "User";

-- Check income entries
SELECT * FROM "Income" ORDER BY date DESC;

-- Get income summary
SELECT source, COUNT(*) as count, SUM(amount) as total 
FROM "Income" GROUP BY source;

-- Database size
SELECT pg_size_pretty(pg_database_size('gig_workers_db'));
```

## 🔄 CI/CD Pipeline

Automatic tests & deployment on:
- ✅ Push to `main` or `develop`
- ✅ Pull requests
- ✅ Runs: lint → test → build → security scan → deploy

**Required Secrets** (GitHub Settings):
```
SNYK_TOKEN        # Security scanning
SLACK_WEBHOOK     # Notifications
```

## 📝 Development Commands

```bash
cd backend

# Start dev server (with hot reload)
npm run dev

# Build TypeScript
npm run build

# Start production build
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Database commands
npx prisma generate      # Generate Prisma client
npx prisma studio       # Open DB UI
npx prisma migrate dev   # Create migration
```

## 🚢 Deployment

### Option 1: Docker (Self-hosted)
```bash
docker-compose -f docker-compose.yml up -d
```

### Option 2: Heroku
```bash
heroku create your-app
heroku addons:create heroku-postgresql:standard-0
git push heroku main
heroku run npx prisma migrate deploy
```

### Option 3: AWS/GCP/Azure
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions

## ⚙️ Environment Variables

### Development (.env)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://gigworker:gigworkerpass@localhost:5432/gig_workers_db?schema=public
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
DEBUG=false
```

### Production (set in platform)
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@prod-host:5432/db
PORT=3000
CORS_ORIGIN=https://yourdomain.com
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
lsof -i :5432        # Find process on 5432
lsof -i :3000        # Find process on 3000
kill -9 <PID>        # Kill the process
```

### Database Connection Error
```bash
# Check if postgres is running
docker ps | grep postgres

# Test connection
psql -h localhost -U gigworker -d gig_workers_db
```

### Migration Issues
```bash
# Check status
npx prisma migrate status

# Reset (WARNING: deletes data)
npx prisma migrate reset --force

# Redeploy migrations
npx prisma migrate deploy
```

### Tests Failing
```bash
# Run in verbose mode
npm test -- --verbose

# Check test database is ready
docker ps | grep postgres

# Clear and retry
npx prisma migrate reset --force
npm test
```

## 📚 Documentation Files

| Document | Contains |
|----------|----------|
| [DATABASE_SETUP.md](./DATABASE_SETUP.md) | Complete setup & Prisma guide |
| [TESTING.md](./TESTING.md) | Testing strategy & manual tests |
| [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) | All endpoints with examples |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide |
| [FILE_HIERARCHY.md](./FILE_HIERARCHY.md) | Directory structure |
| [backend/README.md](./backend/README.md) | Backend specific docs |

## ✅ Verification Checklist

- [ ] Docker & docker-compose installed
- [ ] Environment files copied (.env)
- [ ] Services started: `docker-compose up -d`
- [ ] Health check passes: `curl http://localhost:3000/health`
- [ ] Database accessible: `docker exec gig-workers-db psql ...`
- [ ] Tests pass: `npm test`
- [ ] CI/CD pipeline configured (GitHub Secrets)

## 🎯 Next Steps

1. **Test the API**
   ```bash
   # Create user
   curl -X POST http://localhost:3000/api/v1/users \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","firstName":"John","lastName":"Doe"}'
   ```

2. **Add Authentication** (JWT)
   - Implement in middleware
   - Protect endpoints

3. **Add Pagination**
   - Limit/offset parameters
   - Response metadata

4. **Setup Monitoring**
   - Prometheus metrics
   - Grafana dashboard
   - Sentry error tracking

5. **Production Checklist**
   - Configure HTTPS
   - Setup backups
   - Configure monitoring
   - Security headers
   - Rate limiting

## 📞 Support

- **Questions?** Check the detailed documentation files
- **Issues?** See Troubleshooting section
- **Contributing?** Follow git workflow

## 📄 License

MIT - Open source

---

**Created**: January 2024  
**Stack**: Node.js • Express • TypeScript • Prisma • PostgreSQL • Docker • GitHub Actions

🎉 **Ready to go!** Start with `docker-compose up -d`
