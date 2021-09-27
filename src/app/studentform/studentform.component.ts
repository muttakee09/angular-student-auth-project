import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { bloodGroupItems } from '../utillity/constant';
import { Course } from '../utillity/Course';
import { StudentView } from '../utillity/StudentView';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.css']
})
export class StudentformComponent implements OnInit {
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

  constructor(private studentService: StudentService, private courseService: CourseService) { }

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

  handleFileInput(target: any): void {
    if (target.files) {
      this.image = target.files.item(0);
    }
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
