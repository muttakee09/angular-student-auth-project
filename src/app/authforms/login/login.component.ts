import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface response {
  token: string;
  user: any;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  @Output() changeFlag: EventEmitter<any> = new EventEmitter();

  username: string = "";
  password: string = "";
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  toSignUp(): void {
    this.changeFlag.emit(1);
  }

  onSubmit(): void {
    const formdata = new FormData();
    formdata.append("username", this.username);
    formdata.append("password", this.password);
    this.authService.login(formdata)
        .subscribe(response => {
          if (response) {
            console.log(response);
            localStorage.setItem('token', response.Token);
            localStorage.setItem("user", response.Name);
            localStorage.setItem("role", response.Role);
            this.router.navigateByUrl('/students');
          }
        });
  }

}
