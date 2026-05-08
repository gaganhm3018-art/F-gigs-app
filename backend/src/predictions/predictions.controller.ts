import { Controller, Get } from '@nestjs/common'
import { PredictionsService } from './predictions.service'

@Controller('predictions')
export class PredictionsController {
  constructor(private predictionsService: PredictionsService) {}

  @Get('forecast')
  forecast() {
    return this.predictionsService.forecast('demo-user-id')
  }
}