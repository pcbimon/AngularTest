import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsersComponent} from "./users/users.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {UpdateComponent} from "./users/update/update.component";

const routes: Routes = [
  { path: 'user',      component: UsersComponent },
  { path: 'user/update/:id',      component: UpdateComponent },
  { path: 'register',      component: RegisterComponent },
  { path: '',      component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
