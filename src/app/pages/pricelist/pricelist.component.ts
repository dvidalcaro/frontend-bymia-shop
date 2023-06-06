import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BymiaService } from 'src/app/services/bymia.service';
import { PriceList } from 'src/app/shared/interfaces/register-interface';

@Component({
  selector: 'app-pricelist',
  templateUrl: './pricelist.component.html',
  styles: [
  ]
})
export class PricelistComponent implements OnInit {

  priceList!: PriceList;
  confirmRequest:boolean = false;
  showListPrice: boolean = true;
  showConfirm: boolean = false;
  private emailPattern: any = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  

   matchValues(field1: string, field2: string) {
    return (formGroup: FormGroup) => {
      const control1 = formGroup.controls[field1];
      const control2 = formGroup.controls[field2];
  
      if (control2.errors && !control2.errors.matchValues) {
        // Si ya hay un error de validación, no hacemos nada
        return;
      }
  
      // Comparamos los valores de los campos
      if (control1.value !== control2.value) {
        control2.setErrors({ matchValues: true });
      } else {
        control2.setErrors(null);
      }
    };
  }
  
  createFormGroup(): FormGroup {
    return this.fb.group({
      
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      confirmEmail: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      
    },{ validator: this.matchValues('email', 'confirmEmail') })
  }
  priceListform!: FormGroup;

  constructor(private bymiaService: BymiaService, public router: Router,
     private fb: FormBuilder) {
    
  }

  openConfirm() {
    this.showConfirm = true;
    this.showListPrice = false;
  }

  validateEmailRequired(): boolean {
    if (this.priceListform.get('email')?.touched && this.priceListform.get('email')?.errors?.['required']) {
      return true
    } else return false
  }

  validateEmailFormat(): boolean {
    if (this.priceListform.get('email')?.touched && this.priceListform.get('email')?.errors?.['pattern']) {
      return true
    } else return false
  }

  validateemailMinLength(): boolean {
    if (this.priceListform.get('email')?.touched && this.priceListform.get('email')?.errors?.['minlength']) {
      return true
    } else return false
  }
  validateConfirmEmailRequired(): boolean {
    if (this.priceListform.get('confirmEmail')?.touched && this.priceListform.get('email')?.errors?.['required']) {
      return true
    } else return false
  }

  validateConfirmEmailFormat(): boolean {
    if (this.priceListform.get('confirmEmail')?.touched && this.priceListform.get('email')?.errors?.['pattern']) {
      return true
    } else return false
  }

  validateConfirmEmailMinLength(): boolean {
    if (this.priceListform.get('confirmEmail')?.touched && this.priceListform.get('email')?.errors?.['minlength']) {
      return true
    } else return false
  }

  validateEqual(){
    if (this.priceListform.get('confirmEmail')?.touched && 
    this.priceListform.get('confirmEmail')?.value != this.priceListform.get('email')?.value) {
      return true
    } else return false
  }
  
  sendPriceList(){
    const plist={email:this.priceListform.get('email')?.value}
    this.bymiaService.sendPriceList(plist)
    .subscribe(resp => {      
      this.priceListform.reset();       
      this.showListPrice=false;
      this.confirmRequest=true;
      setTimeout(() => {
        this.router.navigateByUrl('/')
      }, 5000);
    })
  }
  

  ngOnInit(): void {
    this.priceListform = this.createFormGroup();
  }

}
