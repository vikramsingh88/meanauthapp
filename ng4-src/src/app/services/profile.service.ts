import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProfileService {
  authToken:any;

  constructor(private http:Http) { }

  getProfile() {
    let headers = new Headers();
    this.loadtoekn();
    headers.append('Authorization',this.authToken);
    headers.append('Content-Type','application/json');
    return this.http.get('http://localhost:3000/users/profile',{headers:headers})
    .map(res =>res.json());
  }

  loadtoekn() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

}
