import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { BymiaService } from 'src/app/services/bymia.service';
import { MsgContactForm } from 'src/app/shared/interfaces/contactForm';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styles: [],
})
export class HelpComponent implements OnInit {
  private emailPattern: any =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private messages!: MsgContactForm;
  createFormGroup() {
    return new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      country_id: new FormControl('', [
        Validators.required,
        Validators.minLength(1),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(this.emailPattern),
      ]),
      message: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
      ]),
    });
  }

  contactForm: FormGroup;

  constructor(private bymiaService: BymiaService) {
    this.contactForm = this.createFormGroup();
  }

  ngOnInit(): void {}

  onResetForm() {
    this.contactForm.reset();
  }

  onSaveForm() {
    this.messages = {
      name: this.contactForm.controls.name.value,
      country_id: this.contactForm.controls.country_id.value,
      phone: this.contactForm.controls.phone.value,
      email: this.contactForm.controls.email.value,
      message: this.contactForm.controls.message.value,
    };

    // console.log('Saved', this.contactForm.value);
    this.bymiaService.sendContactForm(this.messages).subscribe(res => {
      console.log('correo enviado');

      Swal.fire({
        icon: 'success',
        title: 'Solicitud enviada con éxito',
        text: 'Hemos recibido tu solicitud: Un representante de atención al cliente te contactará a la brevedad.',
      });
    });
    this.onResetForm();
  }

  get name() {
    return this.contactForm.get('name');
  }
  get country_id() {
    return this.contactForm.get('country_id');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get email() {
    return this.contactForm.get('email');
  }
  get message() {
    return this.contactForm.get('message');
  }
}
