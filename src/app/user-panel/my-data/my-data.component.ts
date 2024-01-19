import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  UserProfile,
  UserProfileData,
} from 'src/app/shared/interfaces/UserProfileData.inteface';

import { UserService } from 'src/app/user/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styles: [],
})
export class MyDataComponent implements OnInit {
  userProfile!: UserProfile;
  loading: boolean = true;
  showData: boolean = false;
  closedConfirms: boolean = false;
  id_address!: number;
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

  openEditAddress(id: number) {
    console.log(id);

    this.router.navigate(['/edit-address'], {
      queryParams: {
        id: id,
      },
    });
  }
  openDeleteAddress(id: number) {
    console.log(id);

    this.router.navigate(['/my-data'], {
      queryParams: {
        id: id,
      },
    });

    this.closedConfirms = true;

    this.id_address = this.userProfile.customerData.my_addresses.findIndex(
      item => item.code_id === id
    );
  }

  closedConfirm() {
    this.closedConfirms = false;
    this.router.navigate(['/my-data']);
  }

  addAddress() {}
  deletedAddress() {
    if (this.id_address !== -1) {
      this.userProfile.customerData.my_addresses.splice(this.id_address, 1);
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        title:
          'Eliminando dirección de ' +
          this.userProfile.customerData.my_addresses[this.id_address].name,
        text: 'Espere por favor...',
      });

      Swal.showLoading();

      setTimeout(() => {
        Swal.fire({
          icon: 'success',
          title: 'Datos eliminados correctamente',
          /* text: this.userProfile.customerData.name, */
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigate(['/my-data']);
            this.closedConfirms = false;
          }
        });
      }, 2000);
    }
  }

  ngOnInit(): void {}
}
