import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({
    status: 201,
    description: 'El producto ha sido creado exitosamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos o faltantes.',
  })
  @ApiResponse({
    status: 404,
    description: 'La categoría especificada no existe.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos con sus categorías' })
  @ApiResponse({
    status: 200,
    description: 'Lista de productos recuperada con éxito.',
  })
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto específico por su ID' })
  @ApiResponse({ status: 200, description: 'Producto encontrado.' })
  @ApiResponse({ status: 404, description: 'El producto no existe.' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar los datos de un producto por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado exitosamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'El producto o la categoría no existen.',
  })
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar un producto del catálogo por su ID' })
  @ApiResponse({ status: 204, description: 'Producto eliminado exitosamente.' })
  @ApiResponse({ status: 404, description: 'El producto no existe.' })
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
