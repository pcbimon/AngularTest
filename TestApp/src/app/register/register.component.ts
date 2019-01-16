import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {ApiService} from "../api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  Username: string;
  Email: string;
  Password: string;
  constructor(private apiService:ApiService,private router:Router) { }

  ngOnInit() {
  }
  post_addnewuser(){
    if (this.Username == undefined || this.Email == undefined || this.Password == undefined)
    {
      Swal({
        title: 'Something wrong',
        text: 'Please fill all the fields',
        type:'error',
        timer: 3000
      });
      return true;
    }
    const registerdata = {
      Username: this.Username,
      Email: this.Email,
      Password: this.Password
    };
    const registerdatastring: string = JSON.stringify(registerdata);
    const result = this.apiService.registernewuser(registerdatastring)
      .subscribe(
        data => {
          const jsondata = data;
          if (jsondata == null){
            console.log("Not Found User"+jsondata );
            Swal({
              title: 'Something wrong',
              text: 'Please Try again.',
              type:'error',
              timer: 3000
            });
          }
          else {
            Swal(
              'Good job!',
              'Register Completed!!! ',
              'success'
            );
            this.goIn();
          }
        },
        error => { console.log("Error : ",error); // Error if any
        }
      );
  }
  goIn() {
    this.router.navigate(['/']);
  }
}
