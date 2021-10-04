import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentService } from '../../services/student.service';
import { StudentView } from '../../utillity/StudentView';

@Component({
  selector: 'app-deletestudent',
  templateUrl: './deletestudent.component.html',
  styleUrls: ['./deletestudent.component.css']
})
export class DeletestudentComponent implements OnInit {
  student: StudentView | undefined;
  @Input() selectedStudent: any;
  @Output() changePath = new EventEmitter();
  @Output() setSelectedStudent = new EventEmitter<StudentView>();

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.student = this.selectedStudent;
  }

  deleteStudent(): void {
    this.studentService.deleteStudent(this.selectedStudent.Id).subscribe(response => {
      console.log(response);
      this.changePath.emit(0);
    })
  }

}
