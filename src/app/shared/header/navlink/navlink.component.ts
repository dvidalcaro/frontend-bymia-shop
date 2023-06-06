import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';

import { navLink } from '../../interfaces/navlink';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-navlink',
  templateUrl: './navlink.component.html',
  styles: [],
})
export class NavlinkComponent implements OnInit {
 /*  switchBar: boolean = false;
  showPriceList: boolean = false;
  showConfirm: boolean = false;
  private emailPattern: any = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
  
  createFormGroup(): FormGroup {
    return this.fb.group({
      
      email: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      confirmEmail: ['', [Validators.required, Validators.minLength(3), Validators.pattern(this.emailPattern)]],
      
    })
  } */
  pricelistform!: FormGroup;
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
  ];

  constructor(private sharedService: SharedService, private fb: FormBuilder) {}

  /* closeBarSearch() {
    this.switchBar = false;
  }

  openBarSearch() {
    this.switchBar = true;
  }

  openPriceList() {
    this.showPriceList = true;
  }

  closePriceList() {
    this.showPriceList = false;
  }

  openConfirm() {
    this.showConfirm = true;
    this.closePriceList();
  }

  closeConfirm() {
    this.showConfirm = false;
  }

  validateEmailRequired(){

  }
  validateEmailFormat(){}
  validateemailMinLength(){}
  sendPriceList(){
    
  } */

  ngOnInit(): void {
    //this.pricelistform = this.createFormGroup();
  }
}
