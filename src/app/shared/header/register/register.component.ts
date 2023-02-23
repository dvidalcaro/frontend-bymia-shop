import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BymiaService } from '../../../services/bymia.service';
import { CountryCode } from '../../interfaces/countryCode-interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  private emailPattern: any = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  private passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=?{}[\]:";'<>?,./])(?=.*[a-zA-Z]).{8,}$/;
  private phonePattern: RegExp = /^\d{10}$/;
  

  public phoneCode: CountryCode[] = [];
  showField: boolean = true;
  requered: string = 'required'

  createFormGroup(): FormGroup {
    return this.fb.group({
      userRol: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      birthday: [''],
      sexo: [''],
      codeCountry: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      accept: ['', [Validators.required]]
    })
  }

  registerForm!: FormGroup;
  placeholderName: string = "Nombre y Apellido";

  constructor(private bymiaservice: BymiaService, private fb: FormBuilder) {
    
    bymiaservice.getCountryCode()
      .subscribe((resp: CountryCode[]) => (this.phoneCode = resp));
    console.log(this.phoneCode);

  }

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();

    this.registerForm.get('userRol')?.valueChanges
    .subscribe(rolValue =>{
      this.disabledField(rolValue);     
    })

  }

 
  //validate name
  validateUserRol():boolean{    
     if (this.registerForm.get('userRol')?.touched && this.registerForm.get('userRol')?.errors?.['required']) {
      return true
    } else return false 
  }

  validateNameRequired(): boolean {
    if (this.registerForm.get('name')?.touched && this.registerForm.get('name')?.errors?.['required']) {
      return true
    } else return false
  }

  
   validatenameminength():boolean{
     if (this.registerForm.get('name')?.touched && this.registerForm.get('name')?.errors?.['minlength']) {
       return true
     } else return false
   }

  // Validate mail
  validateEmailRequired(): boolean {
    if (this.registerForm.get('email')?.touched && this.registerForm.get('email')?.errors?.['required']) {
      return true
    } else return false
  }

  validateEmailFormat(): boolean {
    if (this.registerForm.get('email')?.touched && this.registerForm.get('email')?.errors?.['pattern']) {
      return true
    } else return false
  }

  validateemailMinLength(): boolean {
    if (this.registerForm.get('email')?.touched && this.registerForm.get('email')?.errors?.['minlength']) {
      return true
    } else return false
  }
  //validate Password
  validatePasswordRequiered(): boolean {
    if (this.registerForm.get('password')?.touched && this.registerForm.get('password')?.errors?.['required']) {
      return true
    } else return false
  }

  validatePassword(): boolean {
    if (this.registerForm.get('password')?.touched && this.registerForm.get('password')?.errors?.['pattern']) {
      return true
    } else return false
  }

  //Validate date
  validateDateRequiered(): boolean {
    if (this.registerForm.get('birthday')?.touched && this.registerForm.get('birthday')?.errors?.['required'] ) {
      return true
    } else return false
  }

  //Validate sexo
  validateSexoRequiered(): boolean {
    if (this.registerForm.controls.sexo.invalid &&
      (this.registerForm.controls.sexo.dirty || this.registerForm.controls.sexo.touched)) {
      return true
    } else return false
  }
  //Validate code country
  validateCodeRequiered(): boolean {
    if (this.registerForm.get('codeCountry')?.touched && this.registerForm.get('codeCountry')?.errors?.['required'] ) {
      return true
    } else return false
  }

  //Validate phone
  validatePhoneRequiered(): boolean {
    if (this.registerForm.get('phone')?.touched && this.registerForm.get('phone')?.errors?.['required']) {
      return true
    } else return false
  }


  validatePhoneFormat(): boolean {
    if (this.registerForm.get('phone')?.touched && this.registerForm.get('phone')?.errors?.['pattern']) {
      return true
    } else return false
  }

  validateAcceptRequiered(): boolean {
    if (this.registerForm.get('accept')?.touched && this.registerForm.get('accept')?.errors?.['required']) {
      return true
    } else return false
  }



  registerUser() {
    console.log(this.registerForm)

    this.bymiaservice.registerNewUser().subscribe(resp => {
      alert('Usuario registrado con exito')
      console.log(resp)
    }, (err) => {

      if (err === 400) {
        alert('Usuario ya registrado')
      }
      console.log('El status es: ' + err)
      console.log('Message: ' + err.error);

    })
  }



  disabledField(rol: string): boolean {
    const dateForm = this.registerForm.get('birthday') as AbstractControl;
    const sexoForm = this.registerForm.get('sexo') as AbstractControl;
    if (rol == '1') {
      this.placeholderName = "Nombre y Apellido"
      dateForm.setValidators([Validators.required]);
      sexoForm.setValidators([Validators.required]);

      dateForm.updateValueAndValidity();
      sexoForm.updateValueAndValidity();

      return this.showField = true;
    } else {
      this.placeholderName = "Nombre de la empresa"
      sexoForm.clearValidators();
      dateForm.clearValidators();

      dateForm.updateValueAndValidity();
      sexoForm.updateValueAndValidity();

      dateForm.reset();
      sexoForm.reset();

      return this.showField = false;
    }
  }


  get userRol() { return this.registerForm.get('userRol') }


}
