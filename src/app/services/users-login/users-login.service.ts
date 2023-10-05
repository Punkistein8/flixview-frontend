import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersLoginService {
  url = 'http://localhost:8080/api/v1/flix-users/validate-login';
  constructor(private http: HttpClient) {}

  onLogin(user: any): Observable<any> {
    return this.http.post<any>(this.url, user);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user'); // !! converts the value to boolean
  }

  setUpdatedAuthenticatedUser(): any {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }

    const { email } = JSON.parse(user);

    this.http
      .get<any>(
        'http://localhost:8080/api/v1/flix-users/by-email?email=' + email
      )
      .forEach((user) => {
        localStorage.setItem('user', JSON.stringify(user.data));
        return user.data;
      });
  }

  getAuthenticatedUser(): any {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  logout(): void {
    localStorage.removeItem('user');
  }
}
