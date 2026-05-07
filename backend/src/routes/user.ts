// backend/src/routes/user.ts
import { Router, Request, Response, NextFunction } from 'express';
import { prisma } from '../index';
import { asyncHandler } from '../utils/asyncHandler';
import { validateEmail } from '../utils/validators';

const router = Router();

// Create user
router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const { email, phone, firstName, lastName } = req.body;

  if (!email || !validateEmail(email)) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  const user = await prisma.user.create({
    data: {
      email,
      phone,
      firstName,
      lastName
    }
  });

  res.status(201).json(user);
}));

// Get user by ID
router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      incomes: { take: 10, orderBy: { date: 'desc' } },
      expenses: { take: 10, orderBy: { date: 'desc' } },
      goals: true,
      _count: { select: { incomes: true, expenses: true } }
    }
  });

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
}));

// Get all users
router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({
    include: { _count: { select: { incomes: true, expenses: true } } }
  });

  res.json(users);
}));

// Update user
router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { email, phone, firstName, lastName } = req.body;

  const user = await prisma.user.update({
    where: { id },
    data: {
      ...(email && { email }),
      ...(phone && { phone }),
      ...(firstName && { firstName }),
      ...(lastName && { lastName })
    }
  });

  res.json(user);
}));

// Delete user
router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await prisma.user.delete({
    where: { id }
  });

  res.json({ message: 'User deleted successfully' });
}));

export default router;
