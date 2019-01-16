import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { UsersComponent } from './users/users.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ErrorStateMatcher,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule, ShowOnDirtyErrorStateMatcher
} from "@angular/material";
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './users/update/update.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import { ReportComponent } from './report/report.component';
import { ChartComponent } from './report/chart/chart.component';
import {ChartModule} from "angular2-chartjs";

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    LoginComponent,
    RegisterComponent,
    UpdateComponent,
    ReportComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    SweetAlert2Module,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    ChartModule,
  ],
  providers: [SweetAlert2Module,{provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}],
  bootstrap: [AppComponent],
})
export class AppModule { }
