import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { BymiaService } from 'src/app/services/bymia.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor...',
    });
    Swal.showLoading();

    this.auth.login(this.user).subscribe(
      resp => {
        console.log(resp);
        Swal.close();

        this.router.navigateByUrl('/home');
      },
      err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Error al autenticar',
          // text: err.error.error.message,
        });
      }
    );
  }

  ngOnInit(): void {}
}
