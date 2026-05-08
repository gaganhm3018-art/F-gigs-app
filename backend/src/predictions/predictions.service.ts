import { Injectable } from '@nestjs/common'
import axios from 'axios'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class PredictionsService {
  constructor(private prisma: PrismaService) {}

  async forecast(userId: string) {
    const incomes = await this.prisma.incomeEntry.findMany({
      where: { userId },
    })

    const response = await axios.post(
      `${process.env.ML_SERVICE_URL}/predict`,
      {
        incomes,
      },
    )

    return response.data
  }
}