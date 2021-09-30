import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, startWith, switchMap } from 'rxjs/operators';
import { StudentService } from '../services/student.service';
import { StudentView } from '../utillity/StudentView';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
  @Input() selectedStudent: any;
  @Output() changePath = new EventEmitter();
  @Output() setSelectedStudent = new EventEmitter();

  sortParams: boolean = true;
  key: string = "";
  role = Number(localStorage.getItem("role"));
  students$!: Observable<StudentView[]>;
  private searchTerms = new Subject<string>();

  constructor(private studentService:StudentService, private router: Router) { }

  ngOnInit(): void {
    this.students$ = this.searchTerms.pipe(
      debounceTime(800),
      distinctUntilChanged(),
      switchMap((term: string) => this.studentService.getStudents(term, this.sortParams)),
    );
  }

  searchStudent(term: string): void {
    this.searchTerms.next(term);
  }

  sortStudents(): void {
    this.sortParams = !this.sortParams;
    console.log(this.key);
    this.searchStudent(this.key);
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
