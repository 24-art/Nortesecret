import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import { Brand } from 'src/generated/prisma/enums';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre único del producto',
    example: 'Satin Violet',
  })
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name!: string;

  @ApiProperty({
    description: 'Marca del producto',
    enum: Brand,
    example: Brand.LBEL,
  })
  @IsEnum(Brand, {
    message: 'La marca debe ser ESIKA, LBEL o CYZONE',
  })
  brand!: Brand;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example: 'Fragancia con notas florales y de larga duración',
  })
  @IsString({ message: 'La descripción debe ser un texto válido' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio de venta al público',
    example: 35,
  })
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser mayor que 0' })
  price!: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
  })
  @IsNumber({}, { message: 'El stock debe ser un número válido' })
  @Min(0, { message: 'El stock no puede ser negativo' })
  stock!: number;

  @ApiProperty({
    description: 'ID de la categoría',
    example: 1,
  })
  @IsNumber({}, { message: 'El ID de la categoría debe ser numérico' })
  categoryId!: number;
}