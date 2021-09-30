import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { LoginComponent } from './login/login.component';
import { StudentformComponent } from './studentform/studentform.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthformsComponent } from './authforms/authforms.component';
import { StudentviewComponent } from './studentview/studentview.component';
import { DeletestudentComponent } from './deletestudent/deletestudent.component';
import { NavigationbarComponent } from './navigationbar/navigationbar.component';
import { BloodTypePipe } from './blood-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    StudentlistComponent,
    LoginComponent,
    StudentformComponent,
    StudentdetailComponent,
    AuthformsComponent,
    StudentviewComponent,
    DeletestudentComponent,
    NavigationbarComponent,
    BloodTypePipe
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
