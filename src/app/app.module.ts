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
import { NavigationbarComponent } from './layouts/navigationbar/navigationbar.component';
import { BloodTypePipe } from './blood-type.pipe';
import { FooterComponent } from './layouts/footer/footer.component';
import { FooterOnlyLayoutComponent } from './footeronlylayout/footeronlylayout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

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
    BloodTypePipe,
    FooterComponent,
    FooterOnlyLayoutComponent,
    MainLayoutComponent,
    PageNotFoundComponent,
    MainLayoutComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
