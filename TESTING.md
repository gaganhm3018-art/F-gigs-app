# Database Testing & Verification Guide

## Testing Strategy

### Test Levels
1. **Unit Tests**: Individual functions/models
2. **Integration Tests**: API endpoints with database
3. **E2E Tests**: Full workflows (optional)

## Test Setup

### Prerequisites
```bash
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest
```

### Test Database Configuration
Create separate test database via `.env.test`:
```env
DATABASE_URL=postgresql://gigworker_test:gigworkerpass_test@localhost:5433/gig_workers_test_db?schema=public
NODE_ENV=test
```

## Running Tests

### All Tests
```bash
cd backend
npm test
```

### Tests with Coverage Report
```bash
npm test -- --coverage
```

### Watch Mode
```bash
npm run test:watch
```

### Integration Tests Only
```bash
npm run test:integration
```

### Specific Test File
```bash
npm test -- user.test.ts
```

## Test Coverage Report

Coverage report is generated in `backend/coverage/`:
```
coverage/
├── lcov-report/        # HTML report
├── coverage-final.json # JSON report
└── lcov.info          # LCOV format
```

View HTML report:
```bash
open backend/coverage/lcov-report/index.html
```

## Manual Testing

### 1. Create User
```bash
curl -X POST http://localhost:3000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+1234567890"
  }'
```

**Expected Response** (201):
```json
{
  "id": "uuid",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 2. Get User
```bash
curl http://localhost:3000/api/v1/users/{USER_ID}
```

**Expected Response** (200):
```json
{
  "id": "uuid",
  "email": "test@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "incomes": [],
  "expenses": [],
  "goals": [],
  "_count": {
    "incomes": 0,
    "expenses": 0
  }
}
```

### 3. Create Income Entry
```bash
curl -X POST http://localhost:3000/api/v1/income \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{USER_ID}",
    "amount": 150.50,
    "source": "Uber",
    "category": "gig_work",
    "date": "2024-01-15",
    "notes": "Evening shift"
  }'
```

**Expected Response** (201):
```json
{
  "id": "uuid",
  "userId": "user_uuid",
  "amount": 150.50,
  "source": "Uber",
  "category": "gig_work",
  "date": "2024-01-15",
  "notes": "Evening shift",
  "tags": [],
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### 4. Get Income Summary
```bash
curl "http://localhost:3000/api/v1/income/user/{USER_ID}/summary"
```

**Expected Response** (200):
```json
{
  "totalIncome": 150.50,
  "averageIncome": 150.50,
  "maxIncome": 150.50,
  "minIncome": 150.50,
  "count": 1
}
```

### 5. Create Expense Entry
```bash
curl -X POST http://localhost:3000/api/v1/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{USER_ID}",
    "amount": 25.00,
    "category": "fuel",
    "date": "2024-01-15",
    "description": "Gas for car"
  }'
```

### 6. Generate Financial Report
```bash
curl -X POST http://localhost:3000/api/v1/reports/generate \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "{USER_ID}",
    "startDate": "2024-01-01",
    "endDate": "2024-01-31"
  }'
```

**Expected Response** (201):
```json
{
  "id": "uuid",
  "userId": "user_uuid",
  "startDate": "2024-01-01",
  "endDate": "2024-01-31",
  "totalIncome": 150.50,
  "totalExpenses": 25.00,
  "netIncome": 125.50,
  "averageDailyEarnings": 4.05,
  "reportData": {
    "incomeBySource": {
      "Uber": 150.50
    },
    "expenseByCategory": {
      "fuel": 25.00
    },
    "incomeCount": 1,
    "expenseCount": 1
  }
}
```

## Database Verification

### Connect to Database
```bash
docker exec -it gig-workers-db psql -U gigworker -d gig_workers_db
```

### Check All Tables
```sql
\dt
```

### Query Users
```sql
SELECT id, email, "firstName", "lastName" FROM "User";
```

### Query Income Entries
```sql
SELECT id, "userId", amount, source, date FROM "Income" ORDER BY date DESC;
```

### Query Expenses
```sql
SELECT id, "userId", amount, category, date FROM "Expense" ORDER BY date DESC;
```

### Query Reports
```sql
SELECT id, "userId", "startDate", "endDate", "totalIncome", "netIncome" 
FROM "FinancialReport" ORDER BY "startDate" DESC;
```

### Database Statistics
```sql
-- Database size
SELECT pg_size_pretty(pg_database_size('gig_workers_db'));

-- Table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname || '.' || tablename)) AS size
FROM pg_tables
WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
ORDER BY pg_total_relation_size(schemaname || '.' || tablename) DESC;

-- Row counts
SELECT 
  schemaname,
  tablename,
  n_live_tup
FROM pg_stat_user_tables
ORDER BY n_live_tup DESC;
```

## Automated Testing Checklist

### Unit Tests Coverage
- [ ] User model CRUD operations
- [ ] Income model CRUD operations
- [ ] Expense model CRUD operations
- [ ] Report generation logic
- [ ] Validators utility functions
- [ ] Error handling

### Integration Tests Coverage
- [ ] User API endpoints
- [ ] Income API endpoints
- [ ] Expense API endpoints
- [ ] Report API endpoints
- [ ] Error responses
- [ ] Validation errors

### Performance Tests (Optional)
- [ ] Load test: 1000 concurrent users
- [ ] Stress test: Maximum queries per second
- [ ] Database query performance
- [ ] API response time < 200ms

## Continuous Testing (CI/CD)

Tests run automatically via GitHub Actions:
1. On every push to `main` or `develop`
2. On every pull request
3. Code coverage must meet 70% threshold
4. All tests must pass before merge

## Test Failure Diagnosis

### Common Issues

**Connection Refused**
```bash
# Ensure test database is running
docker-compose -f database/docker-compose.yml up -d

# Or use different port
DATABASE_URL=postgresql://user:pass@localhost:5433/db
```

**Table Not Found**
```bash
# Run migrations for test database
npx prisma migrate deploy --preview-feature
```

**Data Not Cleaning Up**
```bash
# Check setup.ts cleanup logic
# Ensure DELETE statements match table names exactly
```

**Timeout Issues**
```bash
# Increase Jest timeout
jest.setTimeout(30000);
```

## CI/CD Testing Requirements

### Before Deployment
- ✓ All unit tests pass
- ✓ All integration tests pass
- ✓ Code coverage ≥ 70%
- ✓ No ESLint errors
- ✓ npm audit passes
- ✓ Docker image builds successfully

### GitHub Actions Secrets Required
```
SNYK_TOKEN         # For security scanning
SLACK_WEBHOOK      # For notifications
```

## Test Monitoring

### View Test Results in CI
1. Go to GitHub repository
2. Click "Actions" tab
3. Select workflow run
4. View test results and coverage

### Local Coverage Analysis
```bash
npm test -- --coverage

# Generate detailed HTML report
npm test -- --coverage --collectCoverageFrom=src/**/*.ts
```

## Performance Benchmarking

### Query Performance
```bash
# Enable query logging
DEBUG=prisma:engine node dist/index.js

# Monitor slow queries
```

### Load Testing (Optional)
```bash
# Install k6
brew install k6

# Run load test
k6 run tests/load-test.js
```

## Debugging Tests

### Run Single Test
```bash
npm test -- user.test.ts
```

### Debug Mode
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### Verbose Output
```bash
npm test -- --verbose
```

## Testing Best Practices

1. **Isolation**: Each test is independent
2. **Cleanup**: Database cleared after each test
3. **Fixtures**: Use factory functions for test data
4. **Assertions**: Clear, specific assertions
5. **Documentation**: Comments explain test purpose
6. **Edge Cases**: Test boundaries and errors
7. **Performance**: Tests complete quickly

## Next Steps

1. Add E2E tests with Cypress/Playwright
2. Implement performance testing
3. Add visual regression tests
4. Set up test coverage trends
5. Configure test reporting dashboard

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Prisma Testing Guide](https://www.prisma.io/docs/guides/testing/unit-testing)
- [Express Testing Guide](https://expressjs.com/en/guide/testing.html)
