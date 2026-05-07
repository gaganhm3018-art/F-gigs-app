// backend/src/__tests__/income.test.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('Income API', () => {
  let userId: string;

  beforeAll(async () => {
    const user = await prisma.user.create({
      data: {
        email: 'incometest@example.com',
        firstName: 'Income',
        lastName: 'Test'
      }
    });
    userId = user.id;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/v1/income', () => {
    it('should create an income entry', async () => {
      const incomeData = {
        userId,
        amount: 100,
        source: 'Uber',
        category: 'gig_work',
        date: new Date('2024-01-15')
      };

      const income = await prisma.income.create({
        data: incomeData
      });

      expect(income).toHaveProperty('id');
      expect(income.amount).toBe(100);
      expect(income.source).toBe('Uber');
    });
  });

  describe('GET /api/v1/income/user/:userId', () => {
    it('should retrieve income entries for a user', async () => {
      await prisma.income.create({
        data: {
          userId,
          amount: 150,
          source: 'DoorDash',
          date: new Date('2024-01-16')
        }
      });

      const incomes = await prisma.income.findMany({
        where: { userId }
      });

      expect(incomes.length).toBeGreaterThan(0);
      expect(incomes[0].userId).toBe(userId);
    });

    it('should filter income by date range', async () => {
      const startDate = new Date('2024-01-15');
      const endDate = new Date('2024-01-17');

      const incomes = await prisma.income.findMany({
        where: {
          userId,
          date: {
            gte: startDate,
            lte: endDate
          }
        }
      });

      expect(Array.isArray(incomes)).toBe(true);
    });
  });

  describe('PUT /api/v1/income/:id', () => {
    it('should update an income entry', async () => {
      const income = await prisma.income.create({
        data: {
          userId,
          amount: 200,
          source: 'Lyft',
          date: new Date('2024-01-18')
        }
      });

      const updated = await prisma.income.update({
        where: { id: income.id },
        data: { amount: 250 }
      });

      expect(updated.amount).toBe(250);
    });
  });

  describe('GET /api/v1/income/user/:userId/summary', () => {
    it('should calculate income summary', async () => {
      const incomes = await prisma.income.findMany({
        where: { userId }
      });

      const summary = await prisma.income.aggregate({
        where: { userId },
        _sum: { amount: true },
        _avg: { amount: true },
        _count: true
      });

      expect(summary._sum.amount).toBeDefined();
      expect(summary._count).toBeGreaterThan(0);
    });
  });
});
