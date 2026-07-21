import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre único del producto',
    example: 'Perfume Norte Secreto Intenso',
  })
  @IsString({ message: 'El nombre debe ser un texto válido' })
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción detallada del producto',
    example: 'Fragancia con notas maderadas y de larga duración',
  })
  @IsString({ message: 'La descripción debe ser un texto válido' })
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Precio de venta al público',
    example: 29.99,
  })
  @IsNumber({}, { message: 'El precio debe ser un número válido' })
  @IsPositive({ message: 'El precio debe ser un número mayor a 0' })
  price: number;

  @ApiProperty({
    description: 'Cantidad disponible en inventario',
    example: 50,
  })
  @IsNumber({}, { message: 'El stock debe ser un número entero' })
  @Min(0, { message: 'El stock no puede ser un número negativo' })
  stock: number;

  @ApiProperty({
    description: 'ID de la categoría a la que pertenece',
    example: 'uuid-de-la-categoria',
  })
  @IsString({ message: 'El ID de la categoría debe ser un texto válido' })
  @IsNotEmpty({
    message: 'La categoría es obligatoria para clasificar el producto',
  })
  categoryId: string;
}
