import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { baseUrl } from '../utillity/constant';
import { Student } from '../utillity/Student';
import { StudentView } from '../utillity/StudentView';


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
        })
      );
  }

  /** GET hero by id. Will 404 if id not found */
  getStudent(id: number): Observable<StudentView> {
    const url = `${this.studentUrl}/get/${id}`;
    return this.http.get<StudentView>(url).pipe(
      tap(_ => console.log(`fetched hero id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addStudent(student: FormData): Observable<Student> {
    return this.http.post<Student>(this.studentUrl + 'post/', student, this.httpOptions).pipe(
      tap((newHero: Student) => console.log(`added hero w/ id=${newHero?.Id}`))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteStudent(id: number): Observable<Student> {
    const url = `${this.studentUrl}/delete/${id}`;

    return this.http.delete<Student>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted hero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateStudent(id: number, student: FormData): Observable<any> {
    return this.http.put(`${this.studentUrl}/put/${id}`, student, this.httpOptions).pipe(
      tap(_ => console.log(`updated hero id}`))
    );
  }

  /** Log a HeroService message with the MessageService */
}
