import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styles: [],
})
export class ForgetPasswordComponent implements OnInit {
  user: User;
  errorResponse = {
    email: 'Debe ingresar un correo válido',
    password: 'Debe ingresar una password de al menos 6 caracteres',
  };
  errorServer = false;

  constructor(private auth: AuthService, private router: Router) {
    this.user = new User();
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    Swal.fire({
      // allowOutsideClick: false,

      icon: 'success',
      text: 'Te enviamos un correo electronico para que cambies tu contraseña, si no lo ves en tu bandeja de entrada revisa en la carpeta de spam',
    }).then(resp => {
      this.router.navigateByUrl('/');
    });
    /* Swal.showLoading();

    this.auth.login(this.user).subscribe(
      resp => {
        // console.log(resp);
        Swal.close();

        this.router.navigateByUrl('/home');
      },
      err => {
        // console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          // text: err.error.error.message,
        });
      }
    ); */
  }

  ngOnInit(): void {}
}
