import { Component } from '@angular/core';
import {User} from "../../../TestServer/src/models/user.model";
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TestApp';

}
