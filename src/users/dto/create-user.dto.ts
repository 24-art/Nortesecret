import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/generated/prisma/enums';

export class CreateUserDto {
  @ApiProperty({
    description: 'Correo electronico unico del cliente',
    example: 'cliente@email.com',
  })
  @IsEmail({}, { message: 'El correo electronico no es valido' })
  email!: string;

  @ApiProperty({
    description: 'Nombre completo del cliente',
    example: 'Juan Perez',
  })
  @IsString()
  @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
  name!: string;

  @ApiProperty({
    description: 'Tipo de usuario dentro de Nortesecret',
    enum: Role,
    example: Role.CUSTOMER,
  })
  @IsEnum(Role, { message: 'El rol no es valido' })
  role!: Role;
}
