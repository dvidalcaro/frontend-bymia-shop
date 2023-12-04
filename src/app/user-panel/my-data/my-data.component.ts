import { Component, OnInit } from '@angular/core';

import {
  UserProfile,
  UserProfileData,
} from 'src/app/shared/interfaces/UserProfileData.inteface';

import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styles: [],
})
export class MyDataComponent implements OnInit {
  userProfile!: UserProfile;
  loading: boolean = true;
  showData: boolean = false;
  constructor(private userService: UserService) {
    this.getdata();
    /* setTimeout(() => {
    }, 1000); */
  }
  getdata() {
    this.userService.getMyData().subscribe(resp => {
      if (resp.status === true) {
        this.userProfile = resp;
        this.loading = false;
        this.showData = true;
      }
      console.log(this.userProfile);
    });
  }
  ngOnInit(): void {}
}
