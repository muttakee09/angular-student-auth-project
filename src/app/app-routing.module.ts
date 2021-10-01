import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthformsComponent } from './authforms/authforms.component';
import { FooterOnlyLayoutComponent } from './footeronlylayout/footeronlylayout.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { StudentviewComponent } from './studentview/studentview.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const routes: Routes = [
  { path: 'login',
    component: FooterOnlyLayoutComponent,
    children: [
      {path: '', component: AuthformsComponent}
    ] },
  { path: '',
    component: MainLayoutComponent,
    children: [
    { path: 'students', component: StudentviewComponent},
  ]},
  {
    path: 'admins',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    // canLoad: [AuthGuard]
  },
  { path: 'unauthorized', component: UnauthorizedComponent},
  { path: '**', component: PageNotFoundComponent},
  { path: '', redirectTo: localStorage.getItem('token') ? 'students' : 'login', pathMatch: 'full' },
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
