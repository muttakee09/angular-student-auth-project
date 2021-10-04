import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @Output() changeFlag: EventEmitter<any> = new EventEmitter();

  username : string = "";
  inputPassword : string = "";
  role: string = "0";
  confirmPassword: string = "";
  constructor(private authService: AuthService) { }

  ngOnInit(): void {

  }

  toSignIn(): void {
    this.changeFlag.emit(0);
  }

  onSubmit(): void {
    const formdata = new FormData();
    formdata.append("username", this.username);
    formdata.append("role", this.role);
    formdata.append("password", this.inputPassword);
    this.authService.signup(formdata).subscribe(response => this.changeFlag.emit(0));
  }
}
