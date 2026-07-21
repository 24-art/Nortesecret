import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      status: 'online',
      name: 'Nortesecret API',
      version: '1.0.0',
      description: 'API para la gestión de productos, categorías y ventas',
      timestamp: new Date().toISOString(),
    };
  }
}
