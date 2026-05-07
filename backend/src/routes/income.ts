// backend/src/routes/income.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Create income entry
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { userId, amount, source, category, date, notes, tags } = req.body;

  if (!userId || !amount || !source || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const income = await prisma.income.create({
    data: {
      userId,
      amount,
      source,
      category: category || 'gig_work',
      date: new Date(date),
      notes,
      tags: tags ? {
        connect: tags.map((id: string) => ({ id }))
      } : undefined
    },
    include: { tags: true }
  });

  res.status(201).json(income);
}));

// Get income entries by user
router.get('/user/:userId', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  const where: any = { userId };

  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate as string);
    if (endDate) where.date.lte = new Date(endDate as string);
  }

  const incomes = await prisma.income.findMany({
    where,
    include: { tags: true },
    orderBy: { date: 'desc' }
  });

  res.json(incomes);
}));

// Get income by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const income = await prisma.income.findUnique({
    where: { id },
    include: { tags: true }
  });

  if (!income) {
    return res.status(404).json({ error: 'Income entry not found' });
  }

  res.json(income);
}));

// Update income
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, source, category, date, notes, tags } = req.body;

  const income = await prisma.income.update({
    where: { id },
    data: {
      ...(amount && { amount }),
      ...(source && { source }),
      ...(category && { category }),
      ...(date && { date: new Date(date) }),
      ...(notes && { notes }),
      ...(tags && {
        tags: {
          set: tags.map((id: string) => ({ id }))
        }
      })
    },
    include: { tags: true }
  });

  res.json(income);
}));

// Delete income
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.income.delete({
    where: { id }
  });

  res.json({ message: 'Income entry deleted successfully' });
}));

// Get income summary
router.get('/user/:userId/summary', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  const where: any = { userId };

  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate as string);
    if (endDate) where.date.lte = new Date(endDate as string);
  }

  const result = await prisma.income.aggregate({
    where,
    _sum: { amount: true },
    _avg: { amount: true },
    _max: { amount: true },
    _min: { amount: true },
    _count: true
  });

  res.json({
    totalIncome: result._sum.amount || 0,
    averageIncome: result._avg.amount || 0,
    maxIncome: result._max.amount || 0,
    minIncome: result._min.amount || 0,
    count: result._count
  });
}));

export default router;
