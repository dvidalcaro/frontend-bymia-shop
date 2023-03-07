import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BymiaService } from '../services/bymia.service';
import { navLink } from '../shared/interfaces/navlink';
import { PriceList } from '../shared/interfaces/register-interface';
import { SearchType } from '../shared/interfaces/SearchType';
import { User } from '../user/models/user.model';
import { AuthService } from '../user/services/auth.service';
import { UserService } from '../user/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  urlLogo: string = '../assets/img/logo_bymia.png';
  WishNotifications: number = 0;
  CartNotifications: number = 0;
  switchBar: boolean = false;
  searchTypeList: SearchType[] = [];

  priceList!: PriceList;
  confirmRequest: boolean = false;
  private emailPattern: any = /^[a-zA-Z0-9]{3,}@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;

  public username: string = '';
  public user: User | null = null;

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
    return this.fb.group(
      {
        email: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(this.emailPattern),
          ],
        ],
        confirmEmail: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(this.emailPattern),
          ],
        ],
      },
      { validator: this.matchValues('email', 'confirmEmail') }
    );
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
      links: 'pricelist',
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
  constructor(
    private bymiaService: BymiaService,
    public router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) {
    this.bymiaService.getSearchTypeList().subscribe(resp => {
      this.searchTypeList = resp;
    });

    this.authService.currentUser.subscribe(user => {
      this.user = user;
      this.username = user?.name || '';
      // this.WishNotifications = user?.wish_list ? user.wish_list.length : 0;
      // this.CartNotifications = user?.shop_cart ? user.shop_cart.length : 0;

      this.userService.currentWishlist.subscribe(resp => {
        console.log('navbar resp', resp);
        this.WishNotifications = resp == null ? 0 : resp.wish_list.length;
      });

      if (user !== null) {
        this.userService.notifyWishToAll();
      } else {
        this.WishNotifications = 0;
      }

      console.log('user logeado', this.user);
    });
    this.authService.isUserValid();
  }

  logout() {
    this.username = '';
    this.authService.logout();
  }

  toogleBarSearch() {
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

  ngOnInit(): void {
    this.filter = '';
    this.query = '';
  }
}
