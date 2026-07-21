import { ApiProperty } from '@nestjs/swagger';

export class CategoryEntity {
  @ApiProperty({
    description: 'Identificador unico de la categoria de producto',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Nombre unico de la categoria de producto',
    example: 'Perfumes',
  })
  name!: string;

  @ApiProperty({
    description: 'Descripcion de la categoria de productos',
    example: 'Fragancias y productos de cuidado personal',
    nullable: true,
  })
  description!: string | null;

  @ApiProperty({
    description: 'Indica si la categoria esta activa',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Fecha de creacion de la categoria',
    example: '2026-07-11T15:30:00.000Z',
  })
  createdAt!: Date;
}
