import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RolesServiceService {
  url = 'http://localhost:8080/api/v1/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  addRole(role: any): Observable<any> {
    return this.http.post<any>(this.url, role);
  }
}
