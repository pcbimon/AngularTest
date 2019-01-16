import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UpdateComponent} from "./users/update/update.component";
import {ReportComponent} from "./report/report.component";
import {ChartComponent} from "./report/chart/chart.component";

const routes: Routes = [
  { path: '',      component: LoginComponent },
  { path: 'user',      component: UsersComponent },
  { path: 'user/update/:id',      component: UpdateComponent },
  { path: 'register',      component: RegisterComponent },
  { path: 'report',      component: ReportComponent },
  { path: 'chart',      component: ChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
