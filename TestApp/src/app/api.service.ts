import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://localhost:3001/';
  constructor(private http:HttpClient) {
  };
  getAllData(apiItem: String): any {
    return this.http.get(this.baseURL+apiItem, {responseType: 'json'});
  }
  checkuser(Username: String, Password: String): any {
    return this.http.post(this.baseURL + 'user/checkuser', {
      username: Username,
      password: Password
    }).map((response) => response);
  }
  registernewuser(jsonstr: string): any{
    const jsondata  = JSON.parse(jsonstr);
    return this.http.post(this.baseURL + 'user/register', {
      username: jsondata.Username,
      password: jsondata.Password,
      email: jsondata.Email
    }).map((response) => response);
  }
}
