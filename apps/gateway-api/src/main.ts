import { NestApplicationOptions, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

import './config/configuration';

import { AppModule } from './app.module';
import { AllExceptionFilter, LoggingInterceptor } from './common';
import { RootModule } from './routes';

async function bootstrap() {
  const options: NestApplicationOptions = {
    cors: true,
    ...(process.env.NODE_ENV === 'local' // Define the log levels based on the environment
      ? {
          logger: ['error', 'warn', 'log', 'debug', 'verbose'],
        }
      : {
          logger: ['error', 'warn'],
        }),
  };
  const app = await NestFactory.create(AppModule, options);

  // Versioning
  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'api-version',
  });

  if (process.env.NODE_ENV !== 'production') {
    // Swagger Configurations for non-production environments
    const swaggerConfig = new DocumentBuilder()
      .setTitle('NestJS Basic Development Documentations')
      .setDescription('NestJS Basic Description')
      .setDescription(
        `
        This document is only for service.
       `,
      )
      .setVersion('1.0')
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      include: [RootModule],
    });
    SwaggerModule.setup('/docs', app, swaggerDocument, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
        displayOperationId: true,
        requestSnippetsEnabled: true,
        syntaxHighlight: {
          activate: true,
          theme: 'tomorrow-night',
        },
      },
    } as SwaggerCustomOptions);
  }

  //Exception Filter for sending alerts
  app.useGlobalFilters(new AllExceptionFilter());
  //Logging for all requests integration
  app.useGlobalInterceptors(new LoggingInterceptor());

  await app.listen(process.env.PORT);
}

bootstrap();
