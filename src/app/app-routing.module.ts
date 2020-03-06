import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BizOutComponent } from './system/biz-out/biz-out.component';
import { EmployeeComponent } from './system/employee/employee.component';
import { EmployeeDetailComponent } from './system/employee/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'bizout', component: BizOutComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/:id', component: EmployeeDetailComponent },

  // { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
