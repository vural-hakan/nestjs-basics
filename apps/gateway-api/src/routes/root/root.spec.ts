import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { redisStore } from 'cache-manager-redis-yet';

import { AppModule as ServiceAppModule } from '../../../../service/src/app.module';
import databaseConfig from '../../../../service/src/config/database.config';
import { RootService } from '../../services';

import { RootController, RootModule } from './';
describe('RootController', () => {
  let controller: RootController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let microApp: any;

  beforeAll(async () => {
    const microModule: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          ...databaseConfig,
        }),
        ServiceAppModule,
      ],
    }).compile();

    const transporter = {
      transport: Transport.TCP,
      options: {
        port: parseInt(process.env.SERVICE_PORT, 10),
      },
    };

    microApp = await microModule.createNestMicroservice(transporter);
    await microApp.listen();

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register({
          store: redisStore,
          url: process.env.REDIS_URL,
        }),
      ],
      controllers: [RootController],
      providers: [
        RootService,
        {
          provide: APP_INTERCEPTOR,
          useClass: CacheInterceptor,
        },
      ],
    }).compile();

    controller = module.get<RootController>(RootController);
  });

  afterAll(async () => {
    try {
      await microApp.close();
    } catch {}
  });

  it('Module should be defined', () => {
    expect(RootModule).toBeDefined();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ping()', () => {
    it('ping: success', async () => {
      await controller.ping().then((res) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
    });
  });

  describe('error()', () => {
    it('error: success', async () => {
      await controller.error().catch((error) => {
        expect(error).toBeInstanceOf(HttpException);
      });
    });
  });

  describe('time()', () => {
    it('time: success', async () => {
      await controller.time().then((res) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
    });
  });

  describe('getFixtures()', () => {
    it('getFixtures: success', async () => {
      await controller
        .getFixtures({
          limit: '10',
          page: '0',
          season: '2017-2018',
          league: 'E0',
        })
        .then((res) => {
          expect(res.statusCode).toEqual(HttpStatus.OK);
        });
    });
  });

  describe('getLeagues()', () => {
    it('getLeagues: success', async () => {
      await controller.getLeagues({ limit: '10', page: '0' }).then((res) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
    });
  });

  describe('getSeasons()', () => {
    it('getSeasons: success', async () => {
      await controller.getSeasons({ limit: '10', page: '0' }).then((res) => {
        expect(res.statusCode).toEqual(HttpStatus.OK);
      });
    });
  });
});
