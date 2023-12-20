import { BadRequestException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FixturesEntity } from './entities';
import { FixturesController } from './fixtures.controller';
import { FixturesService } from './fixtures.service';

describe('FixturesController', () => {
  let controller: FixturesController;
  const mockTypeorm = {
    find: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      select: jest.fn().mockReturnThis(),
      distinct: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      take: jest.fn().mockReturnThis(),
      getRawMany: jest.fn().mockReturnValueOnce([
        {
          league: 'E0',
          season: '2017-2018',
        },
      ]),
    })),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FixturesController],
      providers: [
        FixturesService,
        {
          provide: getRepositoryToken(FixturesEntity),
          useValue: mockTypeorm,
        },
      ],
    }).compile();

    controller = module.get<FixturesController>(FixturesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getFixtures()', () => {
    it('dto validation exception', async () => {
      await controller
        .getFixtures({
          league: '',
          season: '',
          limit: 0,
          page: 0,
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(BadRequestException);
        });
    });

    it('valid request', async () => {
      const res = await controller.getFixtures({
        league: 'D1',
        season: '2017-2018',
        limit: 0,
        page: 0,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('valid request with pagination', async () => {
      const res = await controller.getFixtures({
        league: 'D1',
        season: '2017-2018',
        limit: 5,
        page: 2,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });
  });

  describe('getLeagues()', () => {
    it('valid request', async () => {
      const res = await controller.getLeagues({
        limit: 1,
        page: 1,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('valid request with pagination', async () => {
      const res = await controller.getLeagues({
        limit: 1,
        page: 2,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('valid request with non limit', async () => {
      const res = await controller.getLeagues({
        page: 1,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('dto validation exception', async () => {
      await controller
        .getLeagues({
          limit: 'test',
          page: 'test',
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(BadRequestException);
        });
    });
  });

  describe('getSeasons()', () => {
    it('valid request', async () => {
      const res = await controller.getSeasons({
        limit: 1,
        page: 1,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('valid request with pagination', async () => {
      const res = await controller.getSeasons({
        limit: 1,
        page: 2,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('valid request with non limit', async () => {
      const res = await controller.getSeasons({
        page: 1,
      });
      expect(res.statusCode).toEqual(HttpStatus.OK);
    });

    it('dto validation exception', async () => {
      await controller
        .getSeasons({
          limit: 'test',
          page: 'test',
        })
        .catch((error) => {
          expect(error).toBeInstanceOf(BadRequestException);
        });
    });
  });
});
