import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseService } from '../../services/course.service';
import { DialogService } from '../../services/dialog.service';
import { StudentService } from '../../services/student.service';
import { bloodGroupItems } from '../../utillity/constant';
import { Course } from '../../utillity/Course';
import { StudentView } from '../../utillity/StudentView';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit, OnChanges {
  @Input() selectedStudent: StudentView | null | undefined;
  @Output() changePath = new EventEmitter();
  @Output() setSelectedStudent = new EventEmitter<StudentView>();

  studentName: string = "";
  studentAge: string = "";
  gender: string = "0";
  bloodGroup: number = 0;
  image:File | string | null= null;
  bloodGroupItems = bloodGroupItems;
  mainCourse: number = 0;
  supplementaryCourse: number = 0;
  courseList: Course[] = [];

  constructor(private studentService: StudentService,
     private courseService: CourseService, private dialogService: DialogService) { }

  ngOnInit(): void {
    if (this.selectedStudent) {
      this.studentName = this.selectedStudent.StudentName;
      this.studentAge = String(this.selectedStudent.Age);
      this.gender = String(this.selectedStudent.Gender);
      this.bloodGroup = this.selectedStudent.BloodGroup;
      this.image = this.selectedStudent.Image;
      this.bloodGroupItems = bloodGroupItems;
      this.mainCourse = this.selectedStudent.MainCourse;
      this.supplementaryCourse = this.selectedStudent.SupplementaryCourse;
    }
    this.courseService.getCourses().subscribe(
      courses => this.courseList = courses);
  }

  ngOnChanges(): void {
    console.log('damn');
  }

  handleFileInput(target: any): void {
    if (target.files) {
      this.image = target.files.item(0);
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (this.studentName && this.studentAge) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  onSubmit(): void {
    const imageFile = this.image;
    const data = new FormData();
    data.append("StudentName", this.studentName);
    data.append("Age", this.studentAge);
    data.append("BloodGroup", String(this.bloodGroup));
    data.append("Gender", this.gender);
    data.append("MainCourse", String(this.mainCourse));
    data.append("SupplementaryCourse", String(this.supplementaryCourse));
    if (this.image) data.append("Image", this.image);

    console.log(this.image);
    if (this.selectedStudent) {
      this.studentService.updateStudent(this.selectedStudent.Id, data).subscribe(response => {
        console.log(response);
        this.changePath.emit(0);
      })
    }
    else {
      this.studentService.addStudent(data).subscribe(response => {
        console.log(response);
        this.changePath.emit(0);
      })
    }
  }

}
