import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AppRoutes } from './app.routes';
import { RootModule } from './routes';
@Module({
  imports: [
    RouterModule.register(AppRoutes),
    // Service Modules
    RootModule,
  ],
})
export class AppModule {}
