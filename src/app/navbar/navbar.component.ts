import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BymiaService } from '../services/bymia.service';
import { navLink } from '../shared/interfaces/navlink';
import { PriceList } from '../shared/interfaces/register-interface';
import { SearchType } from '../shared/interfaces/SearchType';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  urlLogo: string = '../assets/img/logo_bymia.png';
  WishNotifications: number = 1;
  CartNotifications: number = 2;
  switchBar: boolean = false;
  showListPrice: boolean = false;
  showConfirm: boolean = false;
  searchTypeList: SearchType[] = [];

  priceList!: PriceList;
  confirmRequest:boolean = false;
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

  query: string = '';
  filter: string = 'all';


  linksHeader: navLink[] = [
    {
      label: 'Nosotros',
      links: 'nosotros',
    },

    {
      label: 'FAQs',
      links: 'faqs',
    },

    {
      label: 'Ofertas',
      links: 'ofertas',
    },

    {
      label: 'Lanzamientos',
      links: 'lanzamientos',
    },

    {
      label: 'Flash Sales',
      links: 'flash-sales',
    },
    {
      label: 'Precio De Lista',
      reference: 'listPrice',
    },
  ];
  linksIcon = [
    {
      icon: 'bx bx-tada-hover bx-sm bx-search',
      reference: 'search',
    },
    {
      icon: 'bx bx-tada-hover bx-sm bxs-heart',
      links: 'wish-list',
    },
    {
      icon: 'bx bx-tada-hover bx-sm bxs-cart',
      links: 'shop-cart',
    },
    {
      icon: 'bx bx-tada-hover bx-sm bxs-user-circle',
      links: 'login',
    },
  ];
  constructor(private bymiaService: BymiaService, public router: Router,
     private fb: FormBuilder) {
    bymiaService.getSearchTypeList().subscribe(resp => {
      this.searchTypeList = resp;
    });
  }

  toogleBarSearch() {
    // if (!this.switchBar) {
    //   this.router.navigate(['search']);
    // } else {
    //   this.router.navigate(['/']);
    // }
    this.switchBar = !this.switchBar;
  }

  setFilter(filter: string) {
    this.filter = filter.toLowerCase();
    // console.log('filter', this.filter);
    this.router.navigate(['/search', this.filter, this.query.trim()]);
  }

  clearInput() {
    this.query = '';
    this.filter = '';
    this.router.navigate(['/home']);
  }

  onSeaching(event: any) {
    let key = event.target.value.trim();
    // console.log(key);
    if (key.length > 2) {
      this.router.navigate(['/search', this.filter, key]);
    }
  }
  onSeachingButton() {
    if (this.query.length > 2) {
      this.router.navigate(['/search', this.filter, this.query.trim()]);
    }
  }

  toogleListPrice() {
    this.showListPrice = !this.showListPrice;  
  }
  closelist() {
    console.log('fgh');
    this.showListPrice= false;
    
    
  }
  openConfirm() {

    this.showConfirm = true;
    this.showListPrice = false;
  }



  closeConfirm() {
   
    this.confirmRequest=false;
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
     const plist={
      email:this.priceListform.get('email')?.value
    }
    this.bymiaService.sendPriceList(plist)
    .subscribe(resp => {      
      this.priceListform.reset();       
      this.showListPrice=false;
      this.confirmRequest=true;
    })
  }
   submitPrice(){}
  ngOnInit(): void {
    this.priceListform = this.createFormGroup();
    

  ngOnInit(): void {
    this.filter = '';
    this.query = '';

  }
}
