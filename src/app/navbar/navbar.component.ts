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

  k: string = '';

  c: string[] = [];
  b: string[] = [];
  t: string[] = [];

  linksHeader: navLink[] = [
    {
      label: 'Nosotros',
      links: 'nosotros',
    },

    {
      label: 'FAQs',
      links: 'faqs',
    },

    /* {
      label: 'Ofertas',
      links: 'ofertas',
    }, */

    /*   {
      label: 'Lanzamientos',
      links: 'lanzamientos',
    },
 */
    /* {
      label: 'Flash Sales',
      links: 'flash-sales',
    }, */
    {
      label: 'Precio de lista',
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
      // this.CartNotifications = user?.shop_cart ? user.shop_cart.length : 0;

      this.userService.currentWishlist.subscribe(resp => {
        //console.log('navbar resp', resp);
        this.WishNotifications = resp.wish_list?.length || 0;
      });
      this.userService.currentCartlist.subscribe(resp => {
        // console.log('navbar resp', resp);
        this.CartNotifications = resp.shop_cart_list?.length || 0;
      });

      if (user !== null) {
        this.userService.notifyWishToAll();
        this.userService.notifyCartToAll();
      } else {
        this.WishNotifications = 0;
        this.CartNotifications = 0;
      }

      //console.log('user logeado', this.user);
    });
    this.authService.isUserValid();
  }

  logout() {
    this.username = '';
    this.authService.logout();
  }

  toogleBarSearch() {
    this.switchBar = !this.switchBar;
    this.clearInput();
  }

  setFilter(slug: string, filter: string) {
    // console.log('slug', slug, 'filter', filter);
    switch (slug.substring(0, 1)) {
      case 'c':
        if (this.c.filter(f => f == filter).length <= 0) {
          this.c.push(filter);
        } else {
          this.c = this.c.filter(f => f != filter);
        }
        break;
      case 'b':
        if (this.b.filter(f => f == filter).length <= 0) {
          this.b.push(filter);
        } else {
          this.b = this.b.filter(f => f != filter);
        }
        break;
      case 't':
        if (this.t.filter(f => f == filter).length <= 0) {
          this.t.push(filter);
        } else {
          this.t = this.t.filter(f => f != filter);
        }
        break;
      default:
        break;
    }

    if (
      this.c.length > 0 ||
      this.b.length > 0 ||
      this.t.length > 0 ||
      this.k.length > 2
    ) {
      this.router.navigate(['/search'], {
        queryParams: {
          k: this.k,
          c: JSON.stringify(this.c),
          b: JSON.stringify(this.b),
          t: JSON.stringify(this.t),
        },
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }

  clearInput() {
    this.k = '';
    this.c = [];
    this.b = [];
    this.t = [];
    this.router.navigate(['/home']);
  }

  onSeaching(event: any) {
    let key = event.target.value.trim();
    // console.log(key);
    if (key.length > 2) {
      this.router.navigate(['/search'], {
        queryParams: {
          k: this.k,
          c: JSON.stringify(this.c),
          b: JSON.stringify(this.b),
          t: JSON.stringify(this.t),
        },
      });
    }
  }
  onSeachingButton() {
    if (this.k.length > 2) {
      this.router.navigate(['/search'], {
        queryParams: {
          k: this.k,
          c: JSON.stringify(this.c),
          b: JSON.stringify(this.b),
          t: JSON.stringify(this.t),
        },
      });
    }
  }

  ngOnInit(): void {
    this.c = [];
    this.b = [];
    this.t = [];
    this.k = '';
  }

  isSelected(list: string, value: string) {
    switch (list.substring(0, 1)) {
      case 'c':
        if (this.c.filter(f => f == value).length <= 0) {
          return false;
        } else {
          return true;
        }
        break;
      case 'b':
        if (this.b.filter(f => f == value).length <= 0) {
          return false;
        } else {
          return true;
        }
        break;
      case 't':
        if (this.t.filter(f => f == value).length <= 0) {
          return false;
        } else {
          return true;
        }
        break;
      default:
        return false;
        break;
    }
  }
}
