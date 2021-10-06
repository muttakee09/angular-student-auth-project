import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from '../../services/student.service';
import { StudentView } from '../../utillity/StudentView';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  @Input() selectedStudent: any;
  @Output() changePath = new EventEmitter();
  @Output() setSelectedStudent = new EventEmitter();

  sortParams: boolean = false;
  key: string = "";
  students$!: Observable<StudentView[]>;
  studentsSearched$!: Observable<StudentView[]>;
  private searchTerms = new Subject<string>();

  constructor(private studentService:StudentService, private router: Router) { }

  ngOnInit(): void {
    this.studentsSearched$ = this.searchTerms.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      switchMap((term: string) => {
        return this.studentService.getStudents(term, this.sortParams);
      }),
    );
    this.students$ = this.studentService.getStudents("", this.sortParams);
  }

  searchStudent(term: string): void {
    this.searchTerms.next(term);
    this.students$ = this.studentsSearched$;
  }

  sortStudents(): void {
    this.sortParams = !this.sortParams;
    this.students$ = this.studentService.getStudents(this.key, this.sortParams);
  }

  toDetailPage(student: StudentView) : void {
    this.setSelectedStudent.emit(student);
    this.changePath.emit(1);
  }

  toUpdatePage(student: StudentView) : void {
    this.setSelectedStudent.emit(student);
    this.changePath.emit(2);
  }

  toDeletePage(student: StudentView) : void {
    this.setSelectedStudent.emit(student);
    this.changePath.emit(3);
  }

  logOut(): void  {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
