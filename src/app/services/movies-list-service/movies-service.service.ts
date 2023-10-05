import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesServiceService {
  constructor(private http: HttpClient) {}
  url = 'https://api.sampleapis.com/movies';

  getMovies(genre: string): Observable<any> {
    if (genre == 'cartoon') {
      const newUrl = 'https://api.sampleapis.com/cartoons/cartoons2D';
      return this.http.get<any>(newUrl);
    }
    return this.http.get<any>(this.url + '/' + genre);
  }
}
