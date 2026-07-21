import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';

@Injectable()
export class SalesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSaleDto: CreateSaleDto) {
    return this.prisma.sale.create({
      data: {
        userId: createSaleDto.userId,
      },
    });
  }

  async findAll() {
    return this.prisma.sale.findMany({
      include: {
        user: true,
        details: true,
      },
    });
  }

  async findOne(id: number) {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        user: true,
        details: true,
      },
    });

    if (!sale) {
      throw new NotFoundException(`La venta con ID ${id} no fue encontrada.`);
    }

    return sale;
  }

  async update(id: number, updateSaleDto: UpdateSaleDto) {
    await this.findOne(id);

    return this.prisma.sale.update({
      where: { id },
      data: {
        ...(updateSaleDto.userId !== undefined && {
          userId: updateSaleDto.userId,
        }),
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.sale.delete({
      where: { id },
    });
  }
}
