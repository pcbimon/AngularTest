import { Component, OnInit } from '@angular/core';
import {User} from "../../../../TestServer/src/models/user.model";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userdata: User;
  public curuser: String;
  displayedColumns: string[] = ['ID', 'UserName', 'Email', 'Password'];
  username = '';
  password = '';
  constructor(private apiService:ApiService,private router:Router){};
  ngOnInit() {
    if (localStorage.getItem("username") == null){this.router.navigate(['/']);}
    this.curuser = localStorage.getItem("username");
    this.apiService.getAllData('user').subscribe(
      data => this.userdata = data,
      err => console.log(err),
      () => console.log(this.userdata)
    );
  }
  onClickLogout(){
    localStorage.clear();
    Swal(
      'Good job!',
      'Logout Complete',
      'success'
    );
    this.router.navigate(['/']);
  }

}
