import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { IncomeModule } from './income/income.module'
import { AnalyticsModule } from './analytics/analytics.module'
import { PredictionsModule } from './predictions/predictions.module'

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    IncomeModule,
    AnalyticsModule,
    PredictionsModule,
  ],
})
export class AppModule {}