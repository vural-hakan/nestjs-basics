import { Injectable } from '@nestjs/common';

import { BaseService } from './base.service';

@Injectable()
export class RootService extends BaseService {
  constructor() {
    super(parseInt(process.env.SERVICE_PORT, 10));
  }

  getFixtures(league: string, season: string, limit?: number, page?: number) {
    return this.client.send('getFixtures', { league, season, limit, page });
  }

  getLeagues(query: { limit?: number; page?: number }) {
    return this.client.send('getLeagues', { ...query });
  }

  getSeasons(query: { limit?: number; page?: number }) {
    return this.client.send('getSeasons', { ...query });
  }
}
