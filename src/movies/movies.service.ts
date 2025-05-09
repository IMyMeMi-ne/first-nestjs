import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update.movie.dto';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }
  getOne(id: number): Movie {
    const findMovie = this.movies.find((movie) => movie.id === +id);
    if (!findMovie) {
      throw new NotFoundException(`${id}의 movie가 존재하지 않습니다.`);
    }
    return findMovie;
  }
  deleteOne(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }
  createMovie(movieData: CreateMovieDto) {
    this.movies.push({
      ...movieData,
      id: this.movies.length + 1,
    });
  }
  updateMovie(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
