import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './config/database.config';
import { FixturesModule } from './modules/fixtures';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionFilter } from './common';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...databaseConfig,
    }),
    FixturesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      // Exception Handler Integration
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
