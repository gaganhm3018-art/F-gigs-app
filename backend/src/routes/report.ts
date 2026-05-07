// backend/src/routes/report.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Generate financial report
router.post('/generate', asyncHandler(async (req: Request, res: Response) => {
  const { userId, startDate, endDate } = req.body;

  if (!userId || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);

  const incomes = await prisma.income.findMany({
    where: {
      userId,
      date: { gte: start, lte: end }
    }
  });

  const expenses = await prisma.expense.findMany({
    where: {
      userId,
      date: { gte: start, lte: end }
    }
  });

  const totalIncome = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const netIncome = totalIncome - totalExpenses;
  const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  const averageDailyEarnings = days > 0 ? netIncome / days : 0;

  const incomeBySource = incomes.reduce((acc: any, i: any) => {
    acc[i.source] = (acc[i.source] || 0) + i.amount;
    return acc;
  }, {});

  const expenseByCategory = expenses.reduce((acc: any, e: any) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  const report = await prisma.financialReport.create({
    data: {
      userId,
      startDate: start,
      endDate: end,
      totalIncome,
      totalExpenses,
      netIncome,
      averageDailyEarnings,
      reportData: {
        incomeBySource,
        expenseByCategory,
        incomeCount: incomes.length,
        expenseCount: expenses.length
      }
    }
  });

  res.status(201).json(report);
}));

// Get reports by user
router.get('/user/:userId', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;

  const reports = await prisma.financialReport.findMany({
    where: { userId },
    orderBy: { startDate: 'desc' }
  });

  res.json(reports);
}));

// Get report by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const report = await prisma.financialReport.findUnique({
    where: { id }
  });

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  res.json(report);
}));

// Delete report
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.financialReport.delete({
    where: { id }
  });

  res.json({ message: 'Report deleted successfully' });
}));

export default router;
