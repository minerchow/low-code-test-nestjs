import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { AllExceptionsFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter(), new HttpExceptionFilter());
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
  // // 接口版本化管理
  // app.enableVersioning({
  //    defaultVersion: '1',
  //    type: VersioningType.URI
  // });
  await app.listen(3000);
}
bootstrap();
