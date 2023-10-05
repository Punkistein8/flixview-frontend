import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfilesServiceService {
  url = 'http://localhost:8080/api/v1/profiles';

  constructor(private http: HttpClient) {}

  addProfile(profile: any): Observable<any> {
    return this.http.post<any>(this.url, profile);
  }

  checkIfUserCanAddProfile(user: any): Observable<any> {
    const newUser = {
      fk_id_use: user.id_use,
    };
    return this.http.post<any>(this.url + '/check-if-can-add', newUser);
  }

  getProfilesListByUser(user: any): Observable<any> {
    const usuarioBuscar: any = {
      id_use: user.id_use,
    };
    return this.http.post<any>(this.url + '/get-by-id', usuarioBuscar);
  }

  deleteProfileById(id_pro: any): Observable<any> {
    return this.http.delete<any>(this.url + '/remove-by-id', {
      body: id_pro,
    });
  }
}
