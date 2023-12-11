import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { BymiaService } from 'src/app/services/bymia.service';
import { CountryCode } from 'src/app/shared/interfaces/countryCode-interface';
import { User } from 'src/app/user/models/user.model';
import { AuthService } from 'src/app/user/services/auth.service';

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
    bymiaService: BymiaService
  ) {
    this.user = new User();
    this.user.gender_type = 1;
    this.user.customer_type_role = 1;
    this.user.country_id = 62;

    bymiaService.getCountryCode().subscribe(resp => {
      this.countryCodes = resp;
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
    this.countryFlag = country_id.country_id.flag;
    this.countryPhoneCode = country_id.country_id.phonecode;
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