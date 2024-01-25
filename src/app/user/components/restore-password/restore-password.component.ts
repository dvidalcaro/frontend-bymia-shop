import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
})
export class RestorePasswordComponent implements OnInit {
  password: string = '';
  passwordConfirm: string = '';
  disabled: boolean = true;
  id: string = '';
  code: string = '';

  errorResponse = {
    email: 'Debe ingresar un correo válido',
    password: 'Debe ingresar una password de al menos 6 caracteres',
  };
  errorServer = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  enableSend(password: string | null, passwordConfirm: string | null) {
    if (password === passwordConfirm) {
      this.disabled = false;
    }
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.password === this.passwordConfirm) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...',
      });
      Swal.showLoading();
      this.auth.restorePassword(this.id, this.code, this.password).subscribe(
        resp => {
          Swal.close();
          Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Contraseña cambiada con exito',
          });
          this.router.navigate(['/login']);
        },
        err => {
          Swal.fire({
            icon: 'error',
            title: err.errror.message,
          });
        }
      );
    } else {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'El campo password y confirme su password deben ser iguales',
      });
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.code = params['code'];
    });
  }
}
