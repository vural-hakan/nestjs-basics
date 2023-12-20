import { BadRequestException, Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { validateOrReject } from 'class-validator';

import { IResponse } from '../../common';

import { FixturesDto } from './dto';
import { FixturesService } from './fixtures.service';

@Controller()
export class FixturesController {
  constructor(private readonly fixturesServices: FixturesService) {}

  @MessagePattern('getFixtures')
  async getFixtures(@Payload() message: unknown): Promise<IResponse> {
    const payload = new FixturesDto(message);
    await validateOrReject('FixturesDto', payload, {
      groups: ['getFixtures'],
    }).catch((err) => {
      throw new BadRequestException(err);
    });

    const list = await this.fixturesServices.listFixtures(
      payload.league,
      payload.season,
      payload.page,
      payload.limit,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'SUCCESS',
      data: list,
    };
  }

  @MessagePattern('getLeagues')
  async getLeagues(@Payload() message: unknown): Promise<IResponse> {
    const payload = new FixturesDto(message);
    await validateOrReject('FixturesDto', payload, {
      groups: ['getLeagues'],
    }).catch((err) => {
      throw new BadRequestException(err);
    });

    const list = await this.fixturesServices.listLeagues(
      payload.page,
      payload.limit,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'SUCCESS',
      data: list,
    };
  }

  @MessagePattern('getSeasons')
  async getSeasons(@Payload() message: unknown): Promise<IResponse> {
    const payload = new FixturesDto(message);
    await validateOrReject('FixturesDto', payload, {
      groups: ['getSeasons'],
    }).catch((err) => {
      throw new BadRequestException(err);
    });

    const list = await this.fixturesServices.listSeasons(
      payload.page,
      payload.limit,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'SUCCESS',
      data: list,
    };
  }
}
