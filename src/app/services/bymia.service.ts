import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { About } from '../shared/interfaces/About';
import { Categories } from '../shared/interfaces/Categories';
import { FeaturedProduct } from '../shared/interfaces/FeaturedProduct';
import { Slider } from '../shared/interfaces/Slider';
import { TopLevel } from '../shared/interfaces/TopLevel';
import { MsgContactForm } from '../shared/interfaces/contactForm';

import { CountryCode } from '../shared/interfaces/countryCode-interface';

import { Banner } from '../shared/interfaces/Banner';
import { Brand } from '../shared/interfaces/Brand';
import { RegisterUser } from '../shared/interfaces/register-interface';


const url = 'http://back-test.bymiashop.com/api/front';
const urlBannerMock = 'assets/banners.json';
const urlBrandsMock = 'assets/brands.json';

const headers = new HttpHeaders({
  Authorization:
    'Basic NWViY2E3YjYtMzJhYi0xMWVkLWI5NTItZGIxOGU3NTIzOGE2OmIwM2FiOWM0LTkwNjQtNDkwZC05MWE3LTYyNjExYTM3YzU3MA==',
});

@Injectable({
  providedIn: 'root',
})
export class BymiaService {
  private sliders: Slider[] = [];
  private about: About = {};
  private faqs: TopLevel[] = [];
  private categoriesList: Categories[] = [];
  private featuredProducts: FeaturedProduct[] = [];
  private banners: Banner[] = [];
  private brands: Brand[] = [];
  //private msgContactForm: MsgContactForm;
  private countryCode: CountryCode[]=[];

  constructor(private http: HttpClient) {
    // console.log('Bymia Service ready');
  }

  public getSliders() {
    if (this.sliders.length > 0) {
      return of(this.sliders);
    } else {
      return this.http
        .get<Slider[]>(`${url}/sliders`, { headers })
        .pipe(tap(sliders => (this.sliders = sliders)));
    }
  }
  public getAbout() {
    if (this.about.id) {
      return of(this.about);
    } else {
      return this.http
        .get<About>(`${url}/about-us`, { headers })
        .pipe(tap(about => (this.about = about)));
    }
  }
  public getFaqs() {
    if (this.faqs.length > 0) {
      return of(this.faqs);
    } else {
      return this.http
        .get<TopLevel[]>(`${url}/faqs`, { headers })
        .pipe(tap(faqs => (this.faqs = faqs)));
    }
  }
  public getCategoriesList() {
    if (this.categoriesList.length > 0) {
      return of(this.categoriesList);
    } else {
      return this.http
        .get<Categories[]>(`${url}/categoriesList`, { headers })
        .pipe(
          switchMap(categoriesList =>
            of(categoriesList.filter(category => category.principal))
          ),
          tap(categ => (this.categoriesList = categ))
        );
    }
  }
  public getFeaturedProducts(
    feature: string = 'destacados',
    index: number = 0,
    limit: number = 4
  ) {
    if (this.featuredProducts.length > 0) {
      return of(this.featuredProducts);
    } else {
      return this.http
        .get<FeaturedProduct[]>(
          `${url}/products/tag/${feature}?i=${index}&l=${limit}`,
          { headers }
        )
        .pipe(tap(fp => (this.featuredProducts = fp)));
    }
  }

  public sendContactForm(body: MsgContactForm): Observable<any> {
    return this.http.post(`${url}/contact`, body, { headers });
  }

  // Falta enviar el body
  public registerNewUser(body: RegisterUser ):Observable<any>{
    return this.http.post(`${url}/register`, body, { headers });
  }

  public getCountryCode(){
    return this.http.get<CountryCode[]>(`${url}/country-code`, {headers})
    .pipe(tap(cod => (this.countryCode=cod)))
  }
    

  public getBanners(): Observable<any> {
    if (this.banners.length > 0) {
      return of(this.banners);
    } else {
      return this.http
        .get<Banner[]>(`${urlBannerMock}`)
        .pipe(tap(banners => (this.banners = banners)));
    }
  }
  public getBrands(): Observable<any> {
    if (this.brands.length > 0) {
      return of(this.brands);
    } else {
      return this.http
        .get<Brand[]>(`${urlBrandsMock}`)
        .pipe(tap(brands => (this.brands = brands)));
    }

  }
}
