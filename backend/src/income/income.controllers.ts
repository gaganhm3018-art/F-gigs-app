import { Body, Controller, Get, Post } from '@nestjs/common'
import { IncomeService } from './income.service'

@Controller('income')
export class IncomeController {
  constructor(private incomeService: IncomeService) {}

  @Post()
  create(@Body() body: any) {
    return this.incomeService.create('demo-user-id', body)
  }

  @Get()
  getAll() {
    return this.incomeService.findAll('demo-user-id')
  }
}