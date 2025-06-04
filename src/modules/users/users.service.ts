import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/core/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: CreateUserDto) {
    const checkUsername = await this.prisma.user.findFirst({
      where: { username: userData.username },
    });

    if (checkUsername) throw new ConflictException('username already existed');

    const checkEmail = await this.prisma.user.findFirst({
      where: { email: userData.email },
    });

    if (checkEmail) throw new ConflictException('email already existed');

    const user = await this.prisma.user.create({ data: userData });

    return { message: 'user successful created', data: user };
  }

  async getAllUsers() {
    return await this.prisma.user.findMany();
  }

  async getOneUser(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
  }

  async updateUser(id: string, userData: UpdateUserDto) {
    const findUser = await this.prisma.user.findFirst({ where: { id } });

    if (!findUser) throw new NotFoundException('User not found');

    const checkUser = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: userData.username }, { email: userData.email }],
      },
    });

    if (checkUser)
      throw new ConflictException("Ushbu ma'lumotlar oldin kiritilgan");

    const ans = await this.prisma.user.update({
      where: { id },
      data: userData,
    });

    return { message: 'user successful updated', data: ans };
  }

  async deleteUser(id: string) {
    const findUser = await this.prisma.user.findFirst({ where: { id } });

    if (!findUser) throw new NotFoundException('User not found');

    await this.prisma.user.delete({ where: { id } });

    return { messsage: 'User successful deleted' };
  }
}
