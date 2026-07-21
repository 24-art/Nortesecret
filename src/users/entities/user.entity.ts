import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/generated/prisma/enums';

export class UserEntity {
  @ApiProperty({
    description: 'Identificador unico del cliente',
    example: 1,
  })
  id!: number;

  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Perez',
  })
  name!: string;

  @ApiProperty({
    description: 'Correo electronico unico del cliente',
    example: 'cliente@email.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Tipo de usuario dentro de Nortesecret',
    enum: Role,
    example: Role.CUSTOMER,
  })
  role!: Role;

  @ApiProperty({
    description: 'Indica si el cliente esta activo',
    example: true,
  })
  isActive!: boolean;

  @ApiProperty({
    description: 'Fecha de registro del cliente',
    example: '2026-07-11T15:30:00.000Z',
  })
  createdAt!: Date;
}
