import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class PlanServiceService {
  url = 'http://localhost:8080/api/v1/plans';

  constructor(private http: HttpClient) {}

  getAllPlans(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}
