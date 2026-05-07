// backend/README.md
# Gig Workers Backend API

Node.js/Express REST API for the Gig Workers Income Tracking Application built with TypeScript, Prisma, and PostgreSQL.

## Features

- ✅ RESTful API endpoints
- ✅ PostgreSQL database with Prisma ORM
- ✅ TypeScript for type safety
- ✅ Comprehensive error handling
- ✅ Request validation
- ✅ Automated testing with Jest
- ✅ Docker containerization
- ✅ CI/CD pipeline with GitHub Actions
- ✅ Logging and monitoring ready

## Tech Stack

- **Runtime**: Node.js v18+
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Testing**: Jest
- **Linting**: ESLint
- **Containerization**: Docker

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose (optional)
- PostgreSQL (or use Docker)

### Installation

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Setup environment
cp .env.example .env

# Run migrations
npx prisma migrate deploy

# Start development server
npm run dev
```

### Using Docker

```bash
# Start full stack
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

## Available Scripts

```bash
npm run dev              # Start development server with hot reload
npm run build            # Build TypeScript
npm start                # Start production server
npm test                 # Run tests with coverage
npm run test:watch      # Run tests in watch mode
npm run lint             # Check code style
npm run lint:fix         # Fix code style issues
npm run prisma:generate  # Generate Prisma client
npm run prisma:studio    # Open Prisma Studio
npm run db:reset         # Reset database (development only)
```

## API Documentation

See [API_DOCUMENTATION.md](../API_DOCUMENTATION.md) for comprehensive API endpoints documentation.

### Base URL
```
http://localhost:3000/api/v1
```

### Health Check
```bash
curl http://localhost:3000/health
```

## Database

### Schema
See [database/prisma/schema.prisma](../database/prisma/schema.prisma)

### Models
- **User**: Application users
- **Income**: Income entries from gig work
- **Expense**: Expense entries
- **Tag**: Categorization tags
- **SavingsGoal**: Financial goals
- **FinancialReport**: Generated reports
- **AuditLog**: Action logging

### Migrations

```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Deploy migrations (production)
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Check migration status
npx prisma migrate status
```

## Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm run test:watch

# Run specific test file
npm test -- user.test.ts
```

### Test Coverage Goals
- Branches: 70%
- Functions: 70%
- Lines: 70%
- Statements: 70%

## Project Structure

```
src/
├── index.ts              # Server entry point
├── routes/               # API route handlers
│   ├── user.ts
│   ├── income.ts
│   ├── expense.ts
│   └── report.ts
├── middleware/           # Express middleware
│   └── errorHandler.ts
├── utils/                # Utility functions
│   ├── asyncHandler.ts
│   ├── logger.ts
│   └── validators.ts
└── __tests__/            # Test suites
    ├── setup.ts
    ├── user.test.ts
    └── income.test.ts
```

## Environment Variables

```env
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/database
CORS_ORIGIN=http://localhost:3000,http://localhost:19000
DEBUG=false
```

## Error Handling

The API implements comprehensive error handling:
- 400 Bad Request - Invalid input
- 404 Not Found - Resource not found
- 409 Conflict - Unique constraint violation
- 500 Server Error - Unexpected errors

All errors include timestamp and request path for debugging.

## Logging

Application logs are available via:
```bash
# Docker logs
docker logs gig-workers-api

# Development console output
npm run dev
```

## Security Features

- ✅ CORS configured
- ✅ SQL injection prevention (Prisma)
- ✅ Input validation
- ✅ Error message sanitization
- ✅ Environment variable isolation

## Deployment

See [DEPLOYMENT.md](../DEPLOYMENT.md) for detailed deployment instructions.

Supported platforms:
- Docker
- Heroku
- AWS (EC2, ECS, RDS)
- Google Cloud Run
- Azure

## CI/CD Pipeline

GitHub Actions workflow includes:
- Automated testing
- Code linting
- Docker image building
- Security scanning
- Automated deployment

See [.github/workflows/ci-cd.yml](../.github/workflows/ci-cd.yml)

## Performance Optimization

- Database query indexing
- Connection pooling
- Request validation
- Error handling middleware
- Response compression ready

## Monitoring & Troubleshooting

### Common Issues

**Database Connection Error**
```bash
# Check database is running
docker ps | grep postgres

# Test connection
psql -h localhost -U user -d database
```

**Port Already in Use**
```bash
# Find process
lsof -i :3000

# Kill process
kill -9 <PID>
```

**TypeScript Errors**
```bash
# Rebuild TypeScript
npm run build

# Check for errors
npx tsc --noEmit
```

## Contributing

1. Create feature branch
2. Make changes
3. Run tests
4. Submit pull request

## Useful Resources

- [Express.js Documentation](https://expressjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)

## Support

For issues or questions:
- GitHub Issues
- Email: support@example.com

## License

MIT
