import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';

import { BymiaService } from 'src/app/services/bymia.service';
import { CountryCode } from 'src/app/shared/interfaces/countryCode-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  user: User;
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
    this.user.country_id = 10;

    bymiaService.getCountryCode().subscribe(resp => {
      this.countryCodes = resp;
      // console.log(this.countryCodes);
      this.user.country_phone_code = parseInt(this.countryCodes[10].phonecode);
      this.countryFlag = this.countryCodes[10].flag;
      this.countryAlt = this.countryCodes[10].name;
    });
  }
  selectCountry() {
    if (this.user.country_id) {
      // console.log(this.user.country_id);
      this.countryFlag = this.countryCodes[this.user.country_id].flag;
      this.countryAlt = this.countryCodes[this.user.country_id].name;
      this.user.country_phone_code = parseInt(
        this.countryCodes[this.user.country_id].phonecode
      );
    }
  }

  clearEmailError() {
    this.errorResponse.email = '';
  }
  clearDateOfBirthError() {
    this.errorResponse.date_of_birth = '';
  }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(this.user);
    console.log(form.invalid);
    if (form.invalid) {
      return;
    }

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
        console.log(resp);
        Swal.fire({
          icon: 'success',
          title: 'Usuario creado correctamente',
          text: 'Por favor verifica tu correo',
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
        console.log(err);
        this.errorResponse = err.error.validation;
        Swal.fire({
          icon: 'error',
          title: err.error.message,
        });
      }
    );
  }
}
