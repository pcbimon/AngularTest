import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../api.service";
import Swal from 'sweetalert2';
import {__await} from "tslib";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {
  id: number;
  private sub: any;
  userdata: object;
  Input_username: string;
  Input_email: string;
  Input_password: string;

  constructor(private route: ActivatedRoute,private apiService:ApiService,private router:Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      __await(this.getUserData(this.id));
      // In a real app: dispatch action to load the details here.
    });
  }
  public getUserData(id: number){
    const result = this.apiService.getuserById(id)
      .subscribe(
        data => {
          const jsondata = data;
          console.log(jsondata);
          if (jsondata == null){
            console.log("Not Found User"+jsondata );
            Swal({
              title: 'Something wrong',
              text: 'Data is null',
              type:'error',
              timer: 3000
            });

          }
          else {
            this.userdata = jsondata;
          }
        },
        error => { console.log("Error : ",error); // Error if any
        }
      );
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  post_updateuser(){
    const updatedata = {
      id:this.id,
      Username: this.Input_username,
      Email: this.Input_email,
      Password: this.Input_password
    };
    const updatedatastring: string = JSON.stringify(updatedata);
    const result = this.apiService.updateuser(updatedatastring)
      .subscribe(
        data => {
          const jsondata = data;
          console.log(jsondata);
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
            Swal({
              title: 'Good job!',
              text: 'Update Completed!!! ',
              type: 'success',
              onClose: modalElement => { this.goback(); }
            });
            // this.goback();
          }
        },
        error => { console.log("Error : ",error); // Error if any
        }
      );
  }
  public goback(){
    this.router.navigate(['/user']);
  }

}
