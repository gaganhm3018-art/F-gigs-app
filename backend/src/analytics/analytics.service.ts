import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async monthlySummary(userId: string) {
    const incomes = await this.prisma.incomeEntry.findMany({
      where: { userId },
    })

    const total = incomes.reduce((acc, item) => acc + item.amount, 0)

    return {
      totalIncome: total,
      entries: incomes.length,
    }
  }
}