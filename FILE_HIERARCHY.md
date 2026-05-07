# Complete File Hierarchy

```
IKYA-gig-workers-app/
│
├── .github/
│   └── workflows/
│       └── ci-cd.yml                    # GitHub Actions CI/CD pipeline
│
├── database/
│   ├── prisma/
│   │   ├── schema.prisma                # Prisma database schema definition
│   │   └── migrations/
│   │       └── 0_initial_schema/
│   │           └── migration.sql        # SQL migration file
│   ├── docker-compose.yml               # Docker Compose for database only
│   ├── init.sql                         # Database initialization script
│   ├── .env.example                     # Example environment file
│   ├── .env.test                        # Test environment file
│   └── .gitignore
│
├── backend/
│   ├── src/
│   │   ├── index.ts                     # Main server entry point
│   │   ├── routes/
│   │   │   ├── user.ts                  # User API routes
│   │   │   ├── income.ts                # Income API routes
│   │   │   ├── expense.ts               # Expense API routes
│   │   │   └── report.ts                # Financial report routes
│   │   ├── middleware/
│   │   │   └── errorHandler.ts          # Global error handler
│   │   ├── utils/
│   │   │   ├── asyncHandler.ts          # Async error wrapper
│   │   │   ├── logger.ts                # Logging utility
│   │   │   └── validators.ts            # Input validators
│   │   └── __tests__/
│   │       ├── setup.ts                 # Test configuration
│   │       ├── user.test.ts             # User model tests
│   │       └── income.test.ts           # Income model tests
│   ├── Dockerfile                       # Docker image for backend
│   ├── package.json                     # Node.js dependencies
│   ├── tsconfig.json                    # TypeScript configuration
│   ├── jest.config.json                 # Jest testing configuration
│   ├── .eslintrc.json                   # ESLint configuration
│   ├── .env.example                     # Backend environment example
│   ├── .gitignore                       # Git ignore rules
│   └── README.md                        # Backend documentation
│
├── src/                                 # React Native frontend
│   └── src/
│       ├── services/
│       │   └── screens/
│       │       ├── DashboardScreen.tsx
│       │       ├── AddIncomeScreen.tsx
│       │       ├── ReportsScreen.tsx
│       │       └── WelcomeScreen.tsx
│       ├── Components/
│       ├── Context/
│       ├── store/
│       └── types/
│
├── docker-compose.yml                   # Full stack Docker Compose
├── DATABASE_SETUP.md                    # Database setup guide
├── TESTING.md                           # Testing guide
├── CI-CD.md                             # CI/CD pipeline documentation
├── API_DOCUMENTATION.md                 # API endpoints documentation
├── DEPLOYMENT.md                        # Deployment guide
├── package.json                         # Root package.json
├── README.md                            # Project README
└── .gitignore                           # Git ignore rules
```

## File Descriptions

### Configuration Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (not in git) |
| `.env.example` | Template for environment variables |
| `.env.test` | Test-specific environment variables |
| `docker-compose.yml` | Full stack Docker Compose |
| `database/docker-compose.yml` | Database-only Docker Compose |
| `tsconfig.json` | TypeScript compiler options |
| `jest.config.json` | Jest testing configuration |
| `.eslintrc.json` | ESLint code style rules |
| `package.json` | NPM dependencies and scripts |

### Source Code

| File | Purpose |
|------|---------|
| `backend/src/index.ts` | Express server setup |
| `backend/src/routes/*.ts` | API route handlers |
| `backend/src/middleware/errorHandler.ts` | Error handling |
| `backend/src/utils/validators.ts` | Input validation |
| `backend/src/utils/logger.ts` | Logging functions |
| `database/prisma/schema.prisma` | Database schema |

### Tests

| File | Purpose |
|------|---------|
| `backend/src/__tests__/setup.ts` | Test environment setup |
| `backend/src/__tests__/user.test.ts` | User API tests |
| `backend/src/__tests__/income.test.ts` | Income API tests |

### Documentation

| File | Purpose |
|------|---------|
| `DATABASE_SETUP.md` | Complete database setup guide |
| `TESTING.md` | Testing strategy and guide |
| `CI-CD.md` | CI/CD pipeline documentation |
| `API_DOCUMENTATION.md` | API endpoints reference |
| `DEPLOYMENT.md` | Deployment instructions |

### CI/CD

| File | Purpose |
|------|---------|
| `.github/workflows/ci-cd.yml` | GitHub Actions workflow |

## Key Directories Explained

### `/database`
Contains all database-related files including Prisma schema, migrations, initialization scripts, and Docker configuration. Separate from backend for modularity.

### `/backend`
Complete Node.js/Express backend API server with TypeScript, all routes, utilities, middleware, and tests. Can be deployed independently.

### `/src`
React Native frontend application. Contains UI components, screens, state management, and business logic for the mobile app.

### `/.github/workflows`
GitHub Actions CI/CD pipeline configuration. Automates testing, building, and deployment on push/PR events.

## Dependencies Structure

```
package.json (root)
├── frontend dependencies (React Native, Expo)
│
└── backend/package.json
    ├── dependencies
    │   ├── @prisma/client
    │   ├── express
    │   ├── cors
    │   └── dotenv
    └── devDependencies
        ├── typescript
        ├── @types/express
        ├── jest
        ├── ts-jest
        ├── eslint
        └── prisma
```

## Environment Variables Structure

### Development (`.env`)
```env
NODE_ENV=development
DB_USER=gigworker
DB_PASSWORD=gigworkerpass
DB_NAME=gig_workers_db
DB_PORT=5432
DATABASE_URL=postgresql://...
PORT=3000
CORS_ORIGIN=*
```

### Testing (`.env.test`)
```env
NODE_ENV=test
DB_USER=gigworker_test
DB_PASSWORD=gigworkerpass_test
DB_NAME=gig_workers_test_db
DB_PORT=5433
DATABASE_URL=postgresql://...
```

### Production
Set in deployment platform (Heroku, AWS, etc.)

## Build Output Structure

```
backend/dist/                   # Compiled TypeScript output
├── index.js
├── routes/
├── middleware/
└── utils/

backend/coverage/               # Test coverage reports
├── lcov-report/
├── coverage-final.json
└── lcov.info
```

## Docker Image Layers

```
Dockerfile
├── FROM node:18-alpine (builder)
├── COPY package*.json
├── RUN npm ci
├── COPY source code
├── RUN npm run build
│
├── FROM node:18-alpine (production)
├── COPY dist/
├── EXPOSE 3000
└── CMD ["node", "dist/index.js"]
```

## CI/CD Pipeline Stages

```
.github/workflows/ci-cd.yml
├── test
│   ├── Setup Node.js
│   ├── Install dependencies
│   ├── Run migrations
│   ├── Run linting
│   ├── Run tests
│   └── Upload coverage
│
├── build
│   ├── Build Docker image
│   └── Push to registry
│
├── security-scan
│   ├── npm audit
│   └── Snyk scan
│
└── deploy (main branch only)
    └── Deploy to production
```
