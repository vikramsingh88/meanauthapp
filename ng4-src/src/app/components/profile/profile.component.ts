import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import {ProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;

  constructor(private profileService:ProfileService) { }

  ngOnInit() {
    this.profileService.getProfile().subscribe(res => {
      this.user = res.user;
    },
    err => {
      console.log(err);
      return false;
    });
  }

}
