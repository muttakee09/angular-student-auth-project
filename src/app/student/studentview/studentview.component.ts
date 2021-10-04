import { Component, OnInit } from '@angular/core';
import { StudentView } from '../../utillity/StudentView';

@Component({
  selector: 'app-studentview',
  templateUrl: './studentview.component.html',
  styleUrls: ['./studentview.component.css']
})
export class StudentviewComponent implements OnInit {
  pathFlag: number = 0;
  selectedStudent: StudentView | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  changePath(flag: number):void {
    this.pathFlag = flag;
  }

  setSelectedStudent(student: StudentView):void {
      this.selectedStudent = student;
  }

}
