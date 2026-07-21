import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min } from 'class-validator';

export class CreateSaleDto {
  @ApiProperty({
    description: 'ID del cliente que realiza la compra',
    example: 1,
  })
  @IsInt()
  @Min(1)
  userId!: number;
}
