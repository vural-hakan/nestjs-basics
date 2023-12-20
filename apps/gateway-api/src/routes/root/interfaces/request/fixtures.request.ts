import { ApiProperty } from '@nestjs/swagger';

export class FixturesQuery {
  @ApiProperty({
    title: 'League',
    description: 'League short codes',
    example: 'D1',
    required: true,
  })
  league: string;

  @ApiProperty({
    title: 'Season',
    example: '2017-2018',
    description: 'For calculation assuming seasons start in August',
    required: true,
  })
  season: string;

  @ApiProperty({
    minimum: 0,
    maximum: 10000,
    example: 1,
    title: 'Page',
    required: false,
  })
  page: string;

  @ApiProperty({
    minimum: 0,
    maximum: 15,
    example: 10,
    title: 'Limit',
    required: false,
  })
  limit: string;
}
