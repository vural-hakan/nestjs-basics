import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class FixturesDto {
  constructor(data: unknown) {
    Object.assign(this, data);
  }

  @IsString({
    message: 'LEAGUE MUST BE VALID',
    groups: ['getFixtures'],
  })
  @IsNotEmpty({
    message: 'LEAGUE MUST BE VALID',
    groups: ['getFixtures'],
  })
  league: string;

  @IsString({
    message: 'SEASON MUST BE VALID',
    groups: ['getFixtures'],
  })
  @IsNotEmpty({
    message: 'SEASON MUST BE VALID',
    groups: ['getFixtures'],
  })
  season: string;

  @IsOptional({
    groups: ['getFixtures', 'getLeagues', 'getSeasons'],
  })
  @IsNumber(
    {},
    {
      message: 'LIMIT MUST BE NUMBER',
      groups: ['getFixtures', 'getLeagues', 'getSeasons'],
    },
  )
  limit: number;

  @IsOptional({
    groups: ['getFixtures', 'getLeagues', 'getSeasons'],
  })
  @IsNumber(
    {},
    {
      message: 'PAGE MUST BE NUMBER',
      groups: ['getFixtures', 'getLeagues', 'getSeasons'],
    },
  )
  page: number;
}
