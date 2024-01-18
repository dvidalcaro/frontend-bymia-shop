import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private router: Router) {
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
  openEditProfile() {
    this.router.navigate(['/edit-profile']);
  }
  openeditaLatestBillingData() {
    this.router.navigate(['/edit-billing-data'], {
      queryParams: {
        id: this.userProfile.customerData.latest_billing_data?.code_id,
      },
    });
  }

  ngOnInit(): void {}
}
