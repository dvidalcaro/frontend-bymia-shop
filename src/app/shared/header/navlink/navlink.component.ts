import { Component, OnInit } from '@angular/core';
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
  switchBar: boolean = false;
  showPriceList: boolean = false;
  showConfirm: boolean = false;

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

  constructor(private sharedService: SharedService) {}

  closeBarSearch() {
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

  ngOnInit(): void {}
}
