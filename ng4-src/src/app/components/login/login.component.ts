import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:string;
  password:string;
  constructor(private validateService:ValidateService, private flashmessage:FlashMessagesService, private loginService:LoginService, private router:Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    if(!this.validateService.validateLogin(this.username, this.password)) {
      this.flashmessage.show('All fields are required', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    }
    this.loginService.login(this.username, this.password).subscribe(res => {
      if(res.success){
        this.loginService.storeUserData(res.token, res.user);
        this.flashmessage.show('You are now login in', { cssClass: 'alert-success', timeout: 3000 });
        this.router.navigate(['/dashboard']);
      }else{
        this.flashmessage.show(res.msg, { cssClass: 'alert-danger', timeout: 3000 });
        this.router.navigate(['/login']);
      }
    });
  }

}
