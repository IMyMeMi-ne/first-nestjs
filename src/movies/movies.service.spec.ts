import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('createMovie()', () => {
    it('createMovie 호출 시 getAll()의 length가 + 1이 된다.', () => {
      expect(service.getAll()).toHaveLength(0);
      service.createMovie({
        title: '1',
        genres: ['1'],
        year: 2025,
      });
      expect(service.getAll()).toHaveLength(1);
    });
  });
  describe('CRUD test', () => {
    beforeEach(() => {
      service.createMovie({
        title: '1',
        genres: ['1'],
        year: 2025,
      });
      service.createMovie({
        title: '2',
        genres: ['2'],
        year: 2025,
      });
    });
    describe('getAll', () => {
      it('배열을 반환해야 한다.', () => {
        const resultArray = service.getAll();
        expect(resultArray).toBeInstanceOf(Array);
      });
    });
    describe('getOne', () => {
      it('1개의 영화를 가져와야 한다.', () => {
        const movie = service.getOne(1);
        expect(movie).toBeDefined();
      });
    });
    describe('deleteOne', () => {
      it('영화 데이터가 삭제되어야 한다.', () => {
        expect(service.getAll()).toHaveLength(2);
        service.deleteOne(1);
        expect(service.getAll()).toHaveLength(1);
      });
    });
    describe('updateOne', () => {
      it('영화의 데이터가 업데이트되어야 한다.', () => {
        service.updateMovie(1, {
          title: 'updateMovie',
        });
        expect(service.getOne(1).title).toEqual('updateMovie');
      });
    });
  });
});
