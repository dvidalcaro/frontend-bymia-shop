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
  gender: string = '';
  type_User: string | undefined = '';
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
    userService: UserService
  ) {
    this.user = new User();

    userService.getMyData().subscribe(resp => {
      if (resp.status === true) {
        this.userProfile = resp;

        this.gender = this.userProfile.customerData.gender;

        this.type_User =
          this.userProfile.customerData.latest_billing_data?.type_user;
        this.user.name =
          this.userProfile.customerData.latest_billing_data?.name;
        console.log(this.userProfile.customerData.birthdate);

        this.user.date_of_birth = '08/ 07/1986';
        this.user.gender_type =
          this.gender === 'Masculino' ? 2 : this.gender === 'Femenino' ? 1 : 3;
        this.user.customer_type_role =
          this.type_User === 'Cliente persona' ? 1 : 2;

        this.user.country_id = 62;
        this.user.cel_phone =
          this.userProfile.customerData.latest_billing_data?.phone;

        this.loading = false;
        bymiaService.getCountryCode().subscribe(resp => {
          this.countryCodes = resp;
          console.log(resp);
        });
        setTimeout(() => {
          this.showData = true;
          this.countryFlag = this.countryCodes[62].flag;
          this.countryPhoneCode = this.countryCodes[62].phonecode;
        }, 1000);
      }

      console.log(this.userProfile);
    });

    /* bymiaService.getCountryCode().subscribe(resp => {
      this.countryCodes = resp;
      console.log(this.countryCodes);
      console.log(this.countryCodes[0].phonecode);
      this.user.country_phone_code = parseInt(this.countryCodes[0].phonecode);
      this.countryPhoneCode = this.countryCodes[0].phonecode;
      this.countryFlag = this.countryCodes[0].flag;
      this.countryAlt = this.countryCodes[0].name;
    }); */
  }
  /* selectCountry() {
    if (this.user.country_id) {
      // console.log(this.user.country_id);
      this.countryFlag = this.countryCodes[this.user.country_id].flag;
      this.countryAlt = this.countryCodes[this.user.country_id].name;
      this.user.country_phone_code = this.countryCodes[this.user.country_id].id;
    }
  } */

  getFlagPhone(country_id: any) {
    console.log(country_id.country_id);

    this.countryFlag = this.countryCodes[country_id.country_id].flag;
    this.countryPhoneCode = this.countryCodes[country_id.country_id].phonecode;
    /* this.countryFlag = country_id.country_id.flag;
    this.countryPhoneCode = country_id.country_id.phonecode; */
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
    this.user.country_id = form.value.country_id.id;
    this.user.country_phone_code = form.value.country_id.id;
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      title: 'Registrando a ' + this.user.name,
      text: 'Espere por favor...',
    });
    Swal.showLoading();
    this.auth.register(this.user).subscribe(
      resp => {
        this.errorServer = false;
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          text: 'Te enviamos un correo electrónico para que valides tu cuenta: si no lo ves en tu bandeja de entrada, revisa la carpeta de spam.',
        }).then(result => {
          if (result.isConfirmed) {
            this.router.navigateByUrl('/');
          }
        });
      },
      err => {
        this.errorServer = true;
        this.errorResponse = {
          email: '',
          name: '',
          password: '',
          date_of_birth: '',
          cel_phone: '',
        };
        // console.log(err);
        this.errorResponse = err.error.validation;
        Swal.fire({
          icon: 'error',
          title: err.error.message,
        });
      }
    );
  }
}
