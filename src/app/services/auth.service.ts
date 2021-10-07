import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { StudentView } from '../utillity/StudentView';
import { Student } from '../utillity/Student';
import { baseUrl } from '../utillity/constant';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
