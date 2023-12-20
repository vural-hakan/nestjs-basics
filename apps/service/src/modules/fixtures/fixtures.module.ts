import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FixturesEntity } from './entities';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';

@Module({
  controllers: [FixturesController],
  providers: [FixturesService],
  imports: [TypeOrmModule.forFeature([FixturesEntity])],
  exports: [FixturesService],
})
export class FixturesModule {}
