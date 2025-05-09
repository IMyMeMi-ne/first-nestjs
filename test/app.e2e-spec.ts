import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect('hello');
  });
  describe('/movies', () => {
    it('Get()', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });
    it('Post()', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'test',
          genres: ['test'],
          year: 2025,
        })
        .expect(201);
    });
    it('Delete()', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });
});
