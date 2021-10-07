import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { baseUrl } from '../utillity/constant';

interface LoginResponse {
  token: string;
  user: object;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions = {
    //headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  login(data: FormData): Observable<any> {
    const url = `${baseUrl}/api/auth/login`;

    return this.http.post(url, data, this.httpOptions).pipe(
      tap<any>()
      );
  }

  signup(data: FormData): Observable<any> {
    const url = `${baseUrl}/api/auth/signup`;

    return this.http.post(url, data, this.httpOptions).pipe(
      tap<any>()
      );
  }
}
