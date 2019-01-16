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
  displayedColumns: string[] = ['ID', 'UserName', 'Email', 'Password','Edit'];
  username = '';
  password = '';
  constructor(private apiService:ApiService,private router:Router){};
  ngOnInit() {
    if (localStorage.getItem("username") == null){this.router.navigate(['/']);}
    this.curuser = localStorage.getItem("username");
    this.apiService.getAllData('user').subscribe(
      data => this.userdata = data,
      err => console.log(err),
      () => {}
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
  onUpdateId(id: string){
    this.router.navigate(['/user/update/'+id]);
  }
  onDeleteId(id: number){
    //STEP
    //1.Show Dialog to confirm
    //2.Click Yes to confirm
    //3.Refresh Page
    Swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.apiService.deleteuser(id).subscribe(
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
              Swal({
                title: 'Deleted!',
                text: 'Your data has been deleted.',
                type:'success',
                onClose: modalElement => { this.refreshpage(); }
                }
              )
            }
          },
          error => { console.log("Error : ",error); // Error if any
          }
        );

      }
    })

  }
  refreshpage(){
    window.location.reload();
  }

}
