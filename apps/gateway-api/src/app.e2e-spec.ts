// app.e2e-spec.ts

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as request from 'supertest';

import { AppModule as ServiceAppModule } from '../../service/src/app.module';
import databaseConfig from '../../service/src/config/database.config';

import { AppModule } from './app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
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
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    try {
      await app.close();
      await microApp.close();
    } catch {}
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('/ping (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/ping')
      .expect(HttpStatus.OK);

    expect(response.body.data).toEqual({ message: 'pong' });
  });

  it('/error (GET)', async () => {
    await request(app.getHttpServer())
      .get('/error')
      .expect(HttpStatus.SERVICE_UNAVAILABLE);
  });

  it('/time (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/time')
      .expect(HttpStatus.OK);

    expect(response.body.data.serverTime).toBeDefined();
  });

  it('/get-leagues (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/get-leagues')
      .expect(HttpStatus.OK);

    expect(response.body.data).toBeDefined();
  });

  it('/get-seasons (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/get-seasons')
      .expect(HttpStatus.OK);

    expect(response.body.data).toBeDefined();
  });

  it('/get-fixtures (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/get-fixtures')
      .query('league="E0"&season="2017-2018"&limit=10&page=1')
      .expect(HttpStatus.OK);

    expect(response.body.data).toBeDefined();
  });

  it('Not Found Exception', async () => {
    await request(app.getHttpServer())
      .post('/ping')
      .expect(HttpStatus.NOT_FOUND);
  });
});
