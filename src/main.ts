import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Nortesecret - Catálogo y Ventas')
    .setDescription(
      'Sistema de gestión de productos, categorías, clientes y ventas por catálogo de Nortesecret',
    )
    .setVersion('1.0')
    .addTag('Users', 'Gestión de clientes y usuarios')
    .addTag('Categories', 'Gestión de categorías de productos')
    .addTag('Products', 'Gestión del catálogo de productos')
    .addTag('Sales', 'Gestión de ventas y pedidos')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
