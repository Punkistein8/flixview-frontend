import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class UserflixServiceService {
  url = 'http://localhost:8080/api/v1/flix-users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  logicallyDeleteUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, user);
  }
}
