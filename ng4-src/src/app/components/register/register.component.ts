import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:string;
  username:string;
  email:string;
  password:string;
  user:User;
  constructor(private validate:ValidateService, private _flashMessagesService: FlashMessagesService, private authService:AuthService, private router:Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    this.user = {
      name : this.name,
      username:this.username,
      email:this.email,
      password:this.password
    }
    if(!this.validate.validateRegister(this.user)) {
      this._flashMessagesService.show('All fields are required', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    if(!this.validate.validateEmail(this.user.email)) {
      this._flashMessagesService.show('Not a valid email', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    //Register user
    this.authService.registerUser(this.user).subscribe(res => {
      if(res.success) {
        this._flashMessagesService.show('you are now registerd', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/login']);
      } else{
        this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/register']);
      }
    });
  }

}

interface User {
  name:string;
  username:string;
  email:string;
  password:string;
}
