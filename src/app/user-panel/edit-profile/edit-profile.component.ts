import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { BymiaService } from 'src/app/services/bymia.service';
import { CountryCode } from 'src/app/shared/interfaces/countryCode-interface';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';
import { UserService } from '../../user/services/user.service';
import { UserProfile } from 'src/app/shared/interfaces/UserProfileData.inteface';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  user: User;
  countryPhoneCode: string = '';
  countryCodes: CountryCode[] = [];
  countryFlag: string = '';
  countryAlt: string = '';
  userProfile!: UserProfile;

  loading: boolean = true;
  showData: boolean = false;

  public remember = false;
  errorResponse = {
    email: 'Debe ingresar un correo válido',
    name: 'Debe ingresar un nombre de al menos 6 letras',
    password: 'Debe ingresar una password de al menos 6 caracteres',
    date_of_birth: 'Ej. de fecha válida: 1980-12-31',
    cel_phone: 'Debe ingresar un teléfono válido de al menos 6 digitos',
  };
  errorServer = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    bymiaService: BymiaService,
    private userService: UserService
  ) {
    this.user = new User();

    this.userService.getMyData().subscribe(resp => {
      if (resp.status === true) {
        this.userProfile = resp;
        this.user.customer_type_role =
          this.userProfile.customerData.type_user_id;
        this.user.name = this.userProfile.customerData.name;
        this.user.date_of_birth = this.userProfile.customerData.birthdate;

        this.user.date_of_birth = this.changeDateFormat(
          this.userProfile.customerData.birthdate
        );
        this.user.gender_type = this.userProfile.customerData.gender_id;

        this.user.country_id = this.userProfile.customerData.country_id;
        this.user.cel_phone = this.userProfile.customerData.phone;

        this.loading = false;
        bymiaService.getCountryCode().subscribe(resp => {
          this.countryCodes = resp;
        });
        setTimeout(() => {
          this.showData = true;
          const country = this.countryCodes.find(country => {
            return (
              country.name ===
              this.userProfile.customerData.latest_billing_data?.country
            );
          });
          this.countryFlag = country!.flag;
          this.countryPhoneCode = country!.phonecode;
        }, 1000);
      }
    });
  }
  changeDateFormat(date: string) {
    let partesFecha = this.userProfile.customerData.birthdate.split('/');
    return `${partesFecha[2]}-${partesFecha[1]}-${partesFecha[0]}`;
  }
  getFlagPhone(country_id: any) {
    const country = this.countryCodes.find(country => {
      return country.id === country_id.country_id;
    });

    this.countryFlag = country!.flag;
    this.countryPhoneCode = country!.phonecode;
    this.user.cel_phone = '';
  }

  clearEmailError() {
    this.errorResponse.email = '';
  }
  clearDateOfBirthError() {
    this.errorResponse.date_of_birth = '';
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Modificando a ' + this.user.name,
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.userService.editProfile(this.user).subscribe(resp => {
      this.errorServer = false;
      Swal.fire({
        icon: 'success',
        title: 'Datos modificados correctamente',
        text: form.value.name,
      }).then(result => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/my-data');
        }
      }),
        (err: {
          error: {
            validation: {
              email: string;
              name: string;
              password: string;
              date_of_birth: string;
              cel_phone: string;
            };
            message: any;
          };
        }) => {
          this.errorServer = true;
          this.errorResponse = {
            email: '',
            name: '',
            password: '',
            date_of_birth: '',
            cel_phone: '',
          };

          this.errorResponse = err.error.validation;
          Swal.fire({
            icon: 'error',
            title: err.error.message,
          });
        };
    });
  }
}
