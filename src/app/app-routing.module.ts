import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthformsComponent } from './authforms/authforms.component';
import { StudentviewComponent } from './studentview/studentview.component';

const routes: Routes = [
  { path: 'login', component: AuthformsComponent },
  { path: 'students', component: StudentviewComponent},
  { path: '', redirectTo: localStorage.getItem('token') ? 'students' : '/login', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
