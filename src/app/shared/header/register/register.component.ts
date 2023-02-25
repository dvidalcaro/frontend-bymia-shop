import { JsonPipe } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { BymiaService } from '../../../services/bymia.service';
import { CountryCode } from '../../interfaces/countryCode-interface';
import { RegisterUser } from '../../interfaces/register-interface';

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
  private newUser!: RegisterUser;
  optionPassword: string='password'
  flag:string='';
  codeCountry:string='Cod País'
  today = new Date();
  minDate = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  maxDate = new Date(this.today.getFullYear() - 100, this.today.getMonth(), this.today.getDate());
  opciones:{} = {  day: 'numeric', month: 'numeric' , year: 'numeric'  };
  fechaFormateada = this.minDate.toLocaleDateString('en-EN', this.opciones);
  fechaFormateadaMaxDate = this.maxDate.toLocaleDateString('en-EN', this.opciones);
  fechaObj = new Date(this.fechaFormateada.split("-").reverse().join("-"));
  fechaObjMax = new Date(this.fechaFormateadaMaxDate.split("-").reverse().join("-"));
  fechaISO = this.fechaObj.toISOString().slice(0,10); // "2005-02-25"
  fechaISOMax = this.fechaObjMax.toISOString().slice(0,10); // "2005-02-25"
  closeRegister:boolean=true;
  showCreatedUser: boolean=false;
  

  public phoneCode: CountryCode[] = [];
  showField: boolean = true;
  requered: string = 'required'

  createFormGroup(): FormGroup {
    return this.fb.group({
      userRol: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      birthday: ['',Validators.required],
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
    
      }

     

  ngOnInit(): void {
    this.registerForm = this.createFormGroup();

    this.registerForm.get('userRol')?.valueChanges
    .subscribe(rolValue =>{
      this.disabledField(rolValue);     
    })

    this.registerForm.get('codeCountry')?.valueChanges
    .subscribe(country =>{
      this.getCodeCountryFlag(country);
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
    

    this.newUser={      
        customer_type_role:    this.registerForm.get('userRol')?.value, 
        name:                  this.registerForm.get('name')?.value, 
        email:                 this.registerForm.get('email')?.value, 
        password:              this.registerForm.get('password')?.value, 
        country_phone_code:    this.registerForm.get('codeCountry')?.value, 
        cel_phone:             this.registerForm.get('phone')?.value, 
        /* gender_type:          this.registerForm.get('sexo')?.value, 
        date_of_birth:        this.registerForm.get('birthday')?.value,   */       
    }
       

    this.bymiaservice.registerNewUser(this.newUser).subscribe(resp => {
      this.userCreated();
      this.registerForm.reset();
    }, (err) => {

      if (err === 400) {
        alert('Usuario ya registrado')
      }
      console.log('El status es: ' , )
      console.log("Message:"+ err.error);

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

  viewPassword(){
    
    
    if (this.optionPassword == 'password') {
      this.optionPassword='text'
      setTimeout(() => {
        this.optionPassword='password'
      }, 5000); 
      
    }else{
      this.optionPassword='password'
      
    }
    
  }

  getCodeCountryFlag(id:any){    
    const index:number= this.phoneCode.findIndex(p => p.id == id);
    this.flag=this.phoneCode[index].flag;
    this.codeCountry= this.phoneCode[index].phonecode;
  }

  userCreated(){
    this.closeRegister=false;
    return this.showCreatedUser=true
  }

  get userRol() { return this.registerForm.get('userRol') }


}
