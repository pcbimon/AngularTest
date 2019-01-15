import { Component, OnInit } from '@angular/core';
import {User} from "../../../../TestServer/src/models/user.model";
import {ApiService} from "../api.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userdata: User;
  username = '';
  password = '';

  constructor(private apiService:ApiService,private router:Router){

  };
  ngOnInit() {
    this.apiService.getAllData('user').subscribe(
      data => this.userdata = data,
      err => console.log(err),
      () => console.log(this.userdata)
    );
  }
  post_checkuser(){

    const result = this.apiService.checkuser(this.username,this.password)
      .subscribe(
        data => {
          const jsondata = data;
          if (jsondata == null){
            console.log("Not Found User"+jsondata );
            Swal({
              title: 'Something wrong',
              text: 'Your username or password is not correct',
              type:'error',
              timer: 3000
            });

          }
          else {
            console.log("Found Your name is "+jsondata.username);
            localStorage.setItem("userid",jsondata.id);
            localStorage.setItem("username",jsondata.username);
            Swal(
              'Good job!',
              'Found Your name is '+jsondata.username,
              'success'
            )
            this.goIn();
          }
        },
        error => { console.log("Error : ",error); // Error if any
        }
      );
  }
  goIn() {
    this.router.navigate(['/user']);
  }
  get_register() {
    this.router.navigate(['/register']);
  }

}
