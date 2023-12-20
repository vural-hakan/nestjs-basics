import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FixturesEntity } from './entities';

@Injectable()
export class FixturesService {
  constructor(
    @InjectRepository(FixturesEntity)
    private repository: Repository<FixturesEntity>,
  ) {}

  async listFixtures(
    league: string,
    season: string,
    page?: number,
    limit?: number,
  ): Promise<FixturesEntity[]> {
    const take = limit ? limit : 15;
    const skip = page && page > 1 ? (page - 1) * take : 0;
    const data = await this.repository.find({
      where: { league, season },
      order: { id: 'ASC' },
      skip: skip,
      take: take,
    });
    return data;
  }

  async listLeagues(page?: number, limit?: number): Promise<FixturesEntity[]> {
    const take = limit ? limit : 15;
    const skip = page && page > 1 ? (page - 1) * take : 0;
    const data = await this.repository
      .createQueryBuilder('fixtures')
      .select('league')
      .distinct(true)
      .skip(skip)
      .take(take)
      .getRawMany();

    return data.flatMap((k) => k.league).sort();
  }

  async listSeasons(page?: number, limit?: number): Promise<FixturesEntity[]> {
    const take = limit ? limit : 15;
    const skip = page && page > 1 ? (page - 1) * take : 0;
    const data = await this.repository
      .createQueryBuilder('fixtures')
      .select('season')
      .distinct(true)
      .skip(skip)
      .take(take)
      .getRawMany();

    return data.flatMap((k) => k.season).sort();
  }
}
