import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";
import cookieParser from "cookie-parser";
import { ConfigKey } from "./config/config.enum";
import { AppConfig } from "./config/config.interface";
import { useRequestLogging } from "./middleware/request-logging";

async function bootstrap() {
  // Create the app
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe());
  useRequestLogging(app);

  // Swagger
  const config = new DocumentBuilder()
    .setTitle("CSC490 Thesis API")
    .setDescription("The CSC490 Thesis API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-doc", app, document);

  // Start the app
  const configService = app.get(ConfigService);
  const appConfig = configService.get<AppConfig>(ConfigKey.App);
  app.enableCors({
    origin: appConfig.originsURL,
    credentials: true
  });
  app.use(cookieParser());

  await app.listen(appConfig.port);
}

bootstrap();
