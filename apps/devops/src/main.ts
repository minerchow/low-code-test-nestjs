import { NestFactory } from '@nestjs/core';
import { DevopsModule } from './devops.module';

async function bootstrap() {
  const app = await NestFactory.create(DevopsModule);
  await app.listen(process.env.port ?? 3001);
}
bootstrap();
