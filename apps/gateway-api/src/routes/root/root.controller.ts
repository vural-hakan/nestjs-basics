import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  ServiceUnavailableException,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

import { CommonResponse } from '../../common';
import { RootService } from '../../services';

import {
  ErrorResponse,
  FixturesQuery,
  FixturesResponse,
  LeaguesQuery,
  LeaguesResponse,
  PingResponse,
  SeasonsQuery,
  SeasonsResponse,
  TimeResponse,
} from './interfaces';

@Controller()
@ApiTags('root')
export class RootController {
  constructor(private readonly rootService: RootService) {}
  @ApiOperation({
    summary: `Gateway connectivity ping/pong test endpoint`,
  })
  @ApiOkResponse({ type: PingResponse })
  @HttpCode(HttpStatus.OK)
  @Get('ping')
  async ping(): Promise<CommonResponse> {
    return {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        message: 'pong',
      },
    };
  }

  @ApiOperation({
    summary: `Gateway service unavailable test endpoint`,
  })
  @ApiOkResponse({ type: ErrorResponse })
  @HttpCode(HttpStatus.SERVICE_UNAVAILABLE)
  @Get('error')
  async error(): Promise<CommonResponse> {
    throw new ServiceUnavailableException();
  }

  @ApiOperation({
    summary: `Check server time endpoint`,
  })
  @ApiOkResponse({
    type: TimeResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('time')
  async time(): Promise<CommonResponse> {
    const response = {
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        serverTime: new Date().getTime(),
      },
    };
    return response;
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: `Fetch available leagues endpoint`,
  })
  @ApiOkResponse({
    type: LeaguesResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('get-leagues')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  @CacheKey('all-leagues')
  async getLeagues(@Query() query: LeaguesQuery): Promise<LeaguesResponse> {
    const response = await lastValueFrom(
      this.rootService.getLeagues({
        limit: parseInt(query.limit, 10),
        page: parseInt(query.page, 10),
      }),
    );
    return response;
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: `Fetch available seasons endpoint`,
  })
  @ApiOkResponse({
    type: SeasonsResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('get-seasons')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  @CacheKey('all-seasons')
  async getSeasons(@Query() query: SeasonsQuery): Promise<SeasonsResponse> {
    const response = await lastValueFrom(
      this.rootService.getSeasons({
        limit: parseInt(query.limit, 10),
        page: parseInt(query.page, 10),
      }),
    );
    return response;
  }

  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  @ApiOperation({
    summary: `Fetch fixtures endpoint`,
  })
  @ApiOkResponse({
    type: FixturesResponse,
  })
  @HttpCode(HttpStatus.OK)
  @Get('get-fixtures')
  async getFixtures(@Query() query: FixturesQuery): Promise<FixturesResponse> {
    const response = await lastValueFrom(
      this.rootService.getFixtures(
        query.league,
        query.season,
        parseInt(query.limit, 10),
        parseInt(query.page, 10),
      ),
    );
    return response;
  }
}
