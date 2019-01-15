import { Component, OnInit } from '@angular/core';
import {User} from "../../../../TestServer/src/models/user.model";
import {ApiService} from "../api.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public userdata: User;
  constructor(private apiService:ApiService){};
  ngOnInit() {
    this.apiService.getAllData('user').subscribe(
      data => this.userdata = data,
      err => console.log(err),
      () => console.log(this.userdata)
    );
  }

}
