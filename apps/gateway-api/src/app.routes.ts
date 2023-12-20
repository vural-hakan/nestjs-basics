import { Routes } from '@nestjs/core';

import { RootModule } from './routes';

export const AppRoutes: Routes = [
  {
    path: '',
    module: RootModule,
  },
];
