import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { MainLayoutComponent } from '../main-layout/main-layout.component';
import { AdminDetailsComponent } from './admin-details/admin-details.component';
import { AdminListComponent } from './admin-list/admin-list.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'details/:id', component: AdminDetailsComponent },
          { path: '', component: AdminListComponent },
        ],
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
