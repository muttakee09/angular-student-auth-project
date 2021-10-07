import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit, AfterViewInit {
  errorMessage : string = "";
  returnUrl: string = "";
  @ViewChild('nameRef')
  nameElementRef!: ElementRef;
  @Output() changeFlag: EventEmitter<any> = new EventEmitter();
  profileForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  constructor(private authService: AuthService, private router: Router,
    private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngAfterViewInit():void {
    this.nameElementRef.nativeElement.focus();
  }

  get username() { return this.profileForm.get('username'); }

  get password() { return this.profileForm.get('password'); }

  toSignUp(): void {
    this.changeFlag.emit(1);
  }

  onSubmit(): void {
    // const formdata = new FormData();
    // formdata.append("username", this.username);
    // formdata.append("password", this.password);
    let formValue = this.profileForm.value;
    var formData = new FormData();

    Object.keys(formValue).map(key => {
        formData.append(key, formValue[key]);
    })

    this.authService.login(formData)
        .subscribe(response => {
          if (response) {
            localStorage.setItem('token', response.Token);
            localStorage.setItem("user", response.Name);
            localStorage.setItem("role", response.Role);
            this.router.navigateByUrl(this.returnUrl);
          }
        });
  }

}
