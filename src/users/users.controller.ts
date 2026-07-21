import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos los clientes activos' })
  @ApiOkResponse({
    description: 'Listado de clientes activos',
    type: UserEntity,
    isArray: true,
  })
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente activo por su ID' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiOkResponse({
    description: 'Cliente encontrado',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El cliente no existe' })
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Registrar un nuevo cliente' })
  @ApiCreatedResponse({
    description: 'Cliente registrado exitosamente',
    type: UserEntity,
  })
  @ApiConflictResponse({
    description: 'Ya existe un cliente con ese correo',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar información del cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiOkResponse({
    description: 'Cliente actualizado exitosamente',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El cliente no existe' })
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Desactivar un cliente' })
  @ApiParam({ name: 'id', description: 'ID del cliente', example: 1 })
  @ApiOkResponse({
    description: 'Cliente desactivado exitosamente',
    type: UserEntity,
  })
  @ApiNotFoundResponse({ description: 'El cliente no existe' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.remove(id);
  }
}
