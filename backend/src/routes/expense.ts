// backend/src/routes/expense.ts
import { Router, Request, Response } from 'express';
import { prisma } from '../index';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

// Create expense entry
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { userId, amount, category, date, description } = req.body;

  if (!userId || !amount || !category || !date) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const expense = await prisma.expense.create({
    data: {
      userId,
      amount,
      category,
      date: new Date(date),
      description
    }
  });

  res.status(201).json(expense);
}));

// Get expenses by user
router.get('/user/:userId', asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { startDate, endDate } = req.query;

  const where: any = { userId };

  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date.gte = new Date(startDate as string);
    if (endDate) where.date.lte = new Date(endDate as string);
  }

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: { date: 'desc' }
  });

  res.json(expenses);
}));

// Get expense by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const expense = await prisma.expense.findUnique({
    where: { id }
  });

  if (!expense) {
    return res.status(404).json({ error: 'Expense not found' });
  }

  res.json(expense);
}));

// Update expense
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  const expense = await prisma.expense.update({
    where: { id },
    data: {
      ...(amount && { amount }),
      ...(category && { category }),
      ...(date && { date: new Date(date) }),
      ...(description && { description })
    }
  });

  res.json(expense);
}));

// Delete expense
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.expense.delete({
    where: { id }
  });

  res.json({ message: 'Expense deleted successfully' });
}));

export default router;
