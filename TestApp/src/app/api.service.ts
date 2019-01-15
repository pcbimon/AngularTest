import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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

}
