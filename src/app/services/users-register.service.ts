import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersRegisterService {
  url = 'http://localhost:8080/api/v1/flix-users';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    return this.http.post<any>(this.url + '/register', user);
  }

  assignPlanToUser(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/assign-plan', data);
  }
}
