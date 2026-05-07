// backend/prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.auditLog.deleteMany({});
  await prisma.financialReport.deleteMany({});
  await prisma.savingsGoal.deleteMany({});
  await prisma.income.deleteMany({});
  await prisma.expense.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.user.deleteMany({});

  // Create test users
  const user1 = await prisma.user.create({
    data: {
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+1234567890'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jane@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '+0987654321'
    }
  });

  // Create tags
  const workTag = await prisma.tag.create({
    data: {
      name: 'work',
      color: '#0066CC'
    }
  });

  const personalTag = await prisma.tag.create({
    data: {
      name: 'personal',
      color: '#FF6600'
    }
  });

  // Create income entries for user1
  const income1 = await prisma.income.create({
    data: {
      userId: user1.id,
      amount: 150.50,
      source: 'Uber',
      category: 'gig_work',
      date: new Date('2024-01-15'),
      notes: 'Evening shift',
      tags: {
        connect: [{ id: workTag.id }]
      }
    }
  });

  const income2 = await prisma.income.create({
    data: {
      userId: user1.id,
      amount: 120.00,
      source: 'DoorDash',
      category: 'gig_work',
      date: new Date('2024-01-14'),
      notes: 'Lunch delivery',
      tags: {
        connect: [{ id: workTag.id }]
      }
    }
  });

  const income3 = await prisma.income.create({
    data: {
      userId: user1.id,
      amount: 200.00,
      source: 'Freelance',
      category: 'freelance',
      date: new Date('2024-01-13'),
      notes: 'Web development project',
      tags: {
        connect: [{ id: personalTag.id }]
      }
    }
  });

  // Create income entries for user2
  const income4 = await prisma.income.create({
    data: {
      userId: user2.id,
      amount: 180.75,
      source: 'Lyft',
      category: 'gig_work',
      date: new Date('2024-01-15'),
      notes: 'Night shift'
    }
  });

  // Create expenses for user1
  const expense1 = await prisma.expense.create({
    data: {
      userId: user1.id,
      amount: 25.00,
      category: 'fuel',
      date: new Date('2024-01-15'),
      description: 'Gas for car'
    }
  });

  const expense2 = await prisma.expense.create({
    data: {
      userId: user1.id,
      amount: 50.00,
      category: 'maintenance',
      date: new Date('2024-01-14'),
      description: 'Oil change'
    }
  });

  const expense3 = await prisma.expense.create({
    data: {
      userId: user1.id,
      amount: 15.50,
      category: 'food',
      date: new Date('2024-01-13'),
      description: 'Lunch'
    }
  });

  // Create expenses for user2
  const expense4 = await prisma.expense.create({
    data: {
      userId: user2.id,
      amount: 30.00,
      category: 'fuel',
      date: new Date('2024-01-15'),
      description: 'Gas'
    }
  });

  // Create savings goals
  const goal1 = await prisma.savingsGoal.create({
    data: {
      userId: user1.id,
      title: 'Car Maintenance Fund',
      targetAmount: 1000,
      currentAmount: 150,
      deadline: new Date('2024-06-30'),
      priority: 'high'
    }
  });

  const goal2 = await prisma.savingsGoal.create({
    data: {
      userId: user1.id,
      title: 'Emergency Fund',
      targetAmount: 5000,
      currentAmount: 500,
      deadline: new Date('2024-12-31'),
      priority: 'high'
    }
  });

  // Create financial reports
  const report1 = await prisma.financialReport.create({
    data: {
      userId: user1.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      totalIncome: 470.50,
      totalExpenses: 90.50,
      netIncome: 380.00,
      averageDailyEarnings: 12.26,
      reportData: {
        incomeBySource: {
          Uber: 150.50,
          DoorDash: 120.00,
          Freelance: 200.00
        },
        expenseByCategory: {
          fuel: 25.00,
          maintenance: 50.00,
          food: 15.50
        },
        incomeCount: 3,
        expenseCount: 3
      }
    }
  });

  const report2 = await prisma.financialReport.create({
    data: {
      userId: user2.id,
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-01-31'),
      totalIncome: 180.75,
      totalExpenses: 30.00,
      netIncome: 150.75,
      averageDailyEarnings: 4.87,
      reportData: {
        incomeBySource: {
          Lyft: 180.75
        },
        expenseByCategory: {
          fuel: 30.00
        },
        incomeCount: 1,
        expenseCount: 1
      }
    }
  });

  console.log('Seed data created successfully!');
  console.log(`
    Created users:
    - ${user1.email}
    - ${user2.email}
    
    Created ${3 + 1} income entries
    Created ${3 + 1} expense entries
    Created ${2} savings goals
    Created ${2} financial reports
  `);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
