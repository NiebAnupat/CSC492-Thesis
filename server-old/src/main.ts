import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filter/httpExceptionFilter';
import { ConfigKey } from './config/config.enum';
import { AppConfig } from './config/config.interface';
import { useRequestLogging } from './middleware/request-logging';

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useRequestLogging(app);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('CSC490 Thesis API')
    .setDescription('The CSC490 Thesis API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document);

  // Start the app
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(ConfigKey.App);
  app.enableCors({
    origin: appConfig.originsURL,
    credentials: true,
  });
  app.use(cookieParser());

  await app.listen(appConfig.port);
}

bootstrap();
