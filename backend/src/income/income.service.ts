
@Injectable()
export class IncomeService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: any) {
    return this.prisma.incomeEntry.create({
      data: {
        ...data,
        userId,
      },
    })
  }

  async findAll(userId: string) {
    return this.prisma.incomeEntry.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    })
  }
}