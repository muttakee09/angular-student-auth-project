import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StudentView } from '../utillity/StudentView';

@Component({
  selector: 'app-studentdetail',
  templateUrl: './studentdetail.component.html',
  styleUrls: ['./studentdetail.component.css']
})
export class StudentdetailComponent implements OnInit {
  @Input() selectedStudent: any;
  @Output() changePath = new EventEmitter();
  @Output() setSelectedStudent = new EventEmitter();

  student : StudentView | undefined;
  constructor() { }

  ngOnInit(): void {
    this.student = this.selectedStudent;
  }

  returnToList(): void {
    this.setSelectedStudent.emit(null);
    this.changePath.emit(0);
  }
}
