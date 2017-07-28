import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loginService:LoginService, private flashmessage:FlashMessagesService,private router:Router) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this.loginService.logout();
    this.flashmessage.show('You are now logged out', { cssClass: 'alert-success', timeout: 3000 });
    this.router.navigate(['/login']);
    return false;
  }

}
