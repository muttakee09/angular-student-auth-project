import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { baseUrl } from '../utillity/constant';
import { Course } from '../utillity/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseUrl = baseUrl + '/api/course/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.courseUrl + 'get')
      .pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<Course[]>('getStudents', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

}