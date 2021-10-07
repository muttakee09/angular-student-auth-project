import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SignupComponent } from './authforms/signup/signup.component';
import { StudentlistComponent } from './student/studentlist/studentlist.component';
import { LoginComponent } from './authforms/login/login.component';
import { StudentformComponent } from './student/studentform/studentform.component';
import { StudentdetailComponent } from './student/studentdetail/studentdetail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AuthformsComponent } from './authforms/authforms.component';
import { StudentviewComponent } from './student/studentview/studentview.component';
import { DeletestudentComponent } from './student/deletestudent/deletestudent.component';
import { NavigationbarComponent } from './layouts/navigationbar/navigationbar.component';
import { BloodTypePipe } from './helpers/blood-type.pipe';
import { FooterComponent } from './layouts/footer/footer.component';
import { FooterOnlyLayoutComponent } from './layouts/footeronlylayout/footeronlylayout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminModule } from './admin/admin.module';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HighlighterDirective } from './helpers/highlighter.directive';
import { HttpErrorInterceptor } from './helpers/http-error.interceptor';
import { LoaderInterceptor } from './helpers/loader.interceptor';
import { ListComponent } from './student/studentlist/list/list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

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
    UnauthorizedComponent,
    HighlighterDirective,
    ListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    AdminModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
