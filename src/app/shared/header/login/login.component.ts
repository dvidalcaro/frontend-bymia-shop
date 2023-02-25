
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { RegisterService } from 'src/app/services/register.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
   
  ]
})
export class LoginComponent implements OnInit {
  private emailPattern: any = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  private passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|~\-=?{}[\]:";'<>?,./])(?=.*[a-zA-Z]).{8,}$/;
  optionPassword: string='password'

  showLogin: boolean= false;
  showRegister: boolean= false;
  showRegisterMail: boolean= false;
  showForgetPassword: boolean =false;
  showConfirmMail: boolean= false;

  createFormGroupLogin(): FormGroup {
    return this.fb.group({     
      
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]],
      
    })
  }

  loginForm!: FormGroup;

  constructor(private registerService: RegisterService,  private fb: FormBuilder) { }

  registerUser(){
    console.log('jhhjksad')
      this.registerService.registerNewUser().subscribe(resp => console.log(resp));
  }

  openLogin(){
    this.showLogin = true;
  }

  closeLogin(){
    this.showLogin= false;
  }

  openRegister(){
    this.showRegister=true;
    this.showLogin=false;
  }

  closeRegister(){
    this.showRegister=false;
  }

  openRegisterMail(){
    
     this.showRegister= false; 
     this.showRegisterMail= true;
     this.showLogin=false;
  }

  closeRegisterMail(){
    this.showRegisterMail= false;
  }

  openForgetPassword(){
    this.showForgetPassword=true;
    this.showLogin= false;

  }

  closeForgetPassword(){
    this.showForgetPassword=false;
  }

  // Validate mail
  validateEmailRequired(): boolean {
    if (this.loginForm.get('email')?.touched && this.loginForm.get('email')?.errors?.['required']) {
      return true
    } else return false
  }

  validateEmailFormat(): boolean {
    if (this.loginForm.get('email')?.touched && this.loginForm.get('email')?.errors?.['pattern']) {
      return true
    } else return false
  }

  validateemailMinLength(): boolean {
    if (this.loginForm.get('email')?.touched && this.loginForm.get('email')?.errors?.['minlength']) {
      return true
    } else return false
  }
  //validate Password
  validatePasswordRequiered(): boolean {
    if (this.loginForm.get('password')?.touched && this.loginForm.get('password')?.errors?.['required']) {
      return true
    } else return false
  }

  validatePassword(): boolean {
    if (this.loginForm.get('password')?.touched && this.loginForm.get('password')?.errors?.['pattern']) {
      return true
    } else return false
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
 

  ngOnInit(): void {
    this.loginForm = this.createFormGroupLogin();
  }

}
