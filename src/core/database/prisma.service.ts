import {
  InternalServerErrorException,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Databse connected');
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async onModuleDestroy() {
    try {
      await this.$disconnect();
    } catch (error) {
      process.exit(1);
    }
  }
}
