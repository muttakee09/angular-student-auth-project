import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { StudentView } from '../utillity/StudentView';
import { Student } from '../utillity/Student';
import { baseUrl } from '../utillity/constant';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private studentUrl = baseUrl + '/api/student/';  // URL to web api

  httpOptions = {
   // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient) { }

  getStudents(term: string | undefined = undefined, sortParams: boolean = true): Observable<StudentView[]> {
    let params = `?search=${term}`;
    params += sortParams ? `&sortParams=true` : "";
    return this.http.get<StudentView[]>(this.studentUrl + 'get/' + params)
      .pipe(
        tap(_ => console.log('fetched students')),
        catchError(this.handleError<StudentView[]>('getStudents', []))
      );
  }

  /** GET hero by id. Return `undefined` when id not found */
  getStudentNo404<Data>(id: number): Observable<StudentView> {
    const url = `${this.studentUrl}/?id=${id}`;
    return this.http.get<StudentView[]>(url)
      .pipe(
        map(heroes => heroes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          console.log(`${outcome} hero id=${id}`);
        }),
        catchError(this.handleError<StudentView>(`getHero id=${id}`))
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getStudent(id: number): Observable<StudentView> {
    const url = `${this.studentUrl}/get/${id}`;
    return this.http.get<StudentView>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`)),
      catchError(this.handleError<StudentView>(`getHero id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addStudent(student: FormData): Observable<Student> {
    return this.http.post<Student>(this.studentUrl + 'post/', student, this.httpOptions).pipe(
      tap((newHero: Student) => console.log(`added hero w/ id=${newHero?.Id}`)),
      catchError(this.handleError<Student>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/delete/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the hero on the server */
  updateStudent(id: number, student: FormData): Observable<any> {
    return this.http.put(`${this.studentUrl}/put/${id}`, student, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id}`)),
      catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
}
