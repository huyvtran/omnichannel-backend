import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as fs from "fs";
import * as swStats from 'swagger-stats';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  let app;
  if (process.env.HTTPS_STATUS == "1") {
    let httpsOptions = {};
    if (process.env.HTTPS_PRIVATE_KEY) {
      httpsOptions["key"] = fs.readFileSync(
        process.env.HTTPS_PRIVATE_KEY,
        "utf8"
      );
    }
    if (process.env.HTTPS_CERTIFICATE) {
      httpsOptions["cert"] = fs.readFileSync(
        process.env.HTTPS_CERTIFICATE,
        "utf8"
      );
    }
    if (process.env.HTTPS_BUNDLE) {
      httpsOptions["ca"] = fs.readFileSync(process.env.HTTPS_BUNDLE, "utf8");
    }

    app = await NestFactory.create(AppModule, { httpsOptions });
  } else {
    app = await NestFactory.create(AppModule);
  }

  app.enableCors();

  if (process.env.DOC_STATUS == "1") {
    const options = new DocumentBuilder()
      .setTitle("Omnichannel Backend")
      .setDescription("This is API documentation for Omnichannel Backend")
      .setVersion("1.0")
      .addTag("Omnichannel-backend")
      .addBearerAuth()
      .setContact(
        "Akhmad Faudzan Bakri",
        "https://github.com/fdzn",
        "faudzanbakri@gmail.com"
      )
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup("docs", app, document);
  }

  app.useGlobalPipes(new ValidationPipe());
  app.use(swStats.getMiddleware());
  await app.listen(parseInt(process.env.APP_PORT), "0.0.0.0");
}
bootstrap();
