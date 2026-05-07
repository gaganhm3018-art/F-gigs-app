// backend/src/__tests__/setup.ts
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config({ path: '../../database/.env.test' });

const prisma = new PrismaClient();

beforeAll(async () => {
  // Run migrations
  console.log('Setting up test database...');
  // Migrations will run automatically via prisma
});

afterAll(async () => {
  // Clean up
  console.log('Cleaning up test database...');
  await prisma.$disconnect();
});

afterEach(async () => {
  // Clear all tables after each test
  const tables = ['AuditLog', 'FinancialReport', 'SavingsGoal', '_IncomeToTag', 'Income', 'Expense', 'Tag', 'User'];

  for (const table of tables) {
    try {
      await prisma.$executeRawUnsafe(`DELETE FROM "${table}";`);
    } catch (error) {
      console.log(`Error clearing ${table}:`, error);
    }
  }
});

export { prisma };
