import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Nombre unico de la categoria de producto',
    example: 'Perfumes',
  })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Descripcion de la categoria de productos',
    example: 'Fragancias y perfumes para dama y caballero',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
}
