import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const categoryId = Number(createProductDto.categoryId);

    const categoryExists = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!categoryExists) {
      throw new NotFoundException(
        `La categoría con ID ${createProductDto.categoryId} no existe.`,
      );
    }

    return this.prisma.product.create({
      data: {
        name: createProductDto.name,
        brand: createProductDto.brand,
        description: createProductDto.description,
        price: Number(createProductDto.price),
        stock: Number(createProductDto.stock),
        category: {
          connect: { id: categoryId },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      include: {
        category: true,
      },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: Number(id) },
      include: {
        category: true,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `El producto con ID ${id} no fue encontrado.`,
      );
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.findOne(id);

    const categoryId = updateProductDto.categoryId
      ? Number(updateProductDto.categoryId)
      : undefined;

    return this.prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...(updateProductDto.name && {
          name: updateProductDto.name,
        }),
        ...(updateProductDto.brand && {
          brand: updateProductDto.brand,
        }),
        ...(updateProductDto.description && {
          description: updateProductDto.description,
        }),
        ...(updateProductDto.price && {
          price: Number(updateProductDto.price),
        }),
        ...(updateProductDto.stock && {
          stock: Number(updateProductDto.stock),
        }),
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.product.delete({
      where: { id: Number(id) },
    });
  }
}