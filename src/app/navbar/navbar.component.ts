import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BymiaService } from '../services/bymia.service';
import { navLink } from '../shared/interfaces/navlink';
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
  constructor(bymiaService: BymiaService, public router: Router) {
    bymiaService.getSearchTypeList().subscribe(resp => {
      this.searchTypeList = resp;
    });
  }

  toogleBarSearch() {
    if (!this.switchBar) {
      this.router.navigate(['search']);
    } else {
      this.router.navigate(['/']);
    }
    this.switchBar = !this.switchBar;
  }
  toogleListPrice() {
    this.showListPrice = !this.showListPrice;
  }
  openConfirm() {
    this.showConfirm = true;
    this.showListPrice = false;
  }

  closeConfirm() {
    this.showConfirm = false;
  }

  ngOnInit(): void {}
}
